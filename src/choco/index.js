import Web3 from 'web3'
import store from '../store/index'
import detectEthereumProvider from '@metamask/detect-provider'
import { CONTRACT_PROVIDER, VNLA_HASH, VNLADIST_HASH, MAX_NUMBER, pairs } from '../config/constant'
import abi from './vnla.json'
import yfodistABI from './vnladist.json'
import BigNumber from 'bignumber.js'

export const init = async () => {
  const provider = await detectEthereumProvider()

  if (provider) {
    let web3 = new Web3(provider)

    const netVersion = await provider.request({ method: 'net_version' })
    store.commit('update:wallet', {
      name: 'MetaMask',
      netVersion
    })

    const accounts = await provider.request({ method: 'eth_accounts' })
    const address = accounts[0] || ''
    const checksumAddress = address && web3.utils.toChecksumAddress(address)

    const walletInfo = {
      name: 'MetaMask',
      installed: true,
    }

    walletInfo.address = checksumAddress
    store.commit('update:wallet', walletInfo)


    provider.on('accountsChanged', accounts => {
      const address = accounts[0] || ''
      const checksumAddress = address && web3.utils.toChecksumAddress(address)

      store.commit('update:wallet', {
        name: 'MetaMask',
        address: '',
      })
    })

    provider.on('chainChanged', network => {
      store.commit('update:wallet', {
        name: 'MetaMask',
        netVersion: parseInt(network,16).toString(),
        address: '',
      })
    })

  } else {
  }
}

export const connect = async () => {
  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  } catch(e) {
  }
}

export const getContract = ({ provider, abi, contractHash }) => {
  const web3 = new Web3(provider)
  return new web3.eth.Contract(abi, contractHash)
}

export const putApprove = async (pid, callback) => {
  try {
    var web3 = new Web3(window.ethereum);
    const assetContract = new web3.eth.Contract(abi, pid)
    await assetContract.methods
      .approve(VNLADIST_HASH, MAX_NUMBER)
      .send({
        from: store.state.wallet.address
      }, callback)
  } catch (e) {
    throw new Error('')
  }
}

export const getAvaliableLP = async (pid) => {
  const contract = getContract({
    provider: CONTRACT_PROVIDER,
    contractHash: pid,
    abi,
  })

  try {
    return await contract.methods.balanceOf(store.state.wallet.address).call()
  } catch (e) {
    return '0'
  }
}

export const getStakedLP = async (pid) => {
  const contract = getContract({
    provider: CONTRACT_PROVIDER,
    contractHash: VNLADIST_HASH,
    abi: yfodistABI,
  })

  try {
    return await contract.methods.userInfo(pid, store.state.wallet.address).call()
  } catch (e) {
    return '0'
  }
}

export const getRewardLP = async (hash) => {
  const contract = getContract({
    provider: CONTRACT_PROVIDER,
    contractHash: VNLADIST_HASH,
    abi: yfodistABI,
  })

  try {
    return await contract.methods.pendingVnla(hash, store.state.wallet.address).call()
  } catch (e) {
    return '0'
  }
}

export const getAllowance = async (contractHash, spendHash) => {
  const contract = getContract({
    provider: CONTRACT_PROVIDER,
    contractHash,
    abi,
  })

  try {
    return await contract.methods.allowance(store.state.wallet.address, spendHash).call()
  } catch (e) {
    return '0'
  }
}

export const putDeposit = async (pid, amount, callback) => {
  try {
    const x = new BigNumber(10).pow(18)
    const _amount = x.multipliedBy(amount).toString()
    var web3 = new Web3(window.ethereum);
    const assetContract = new web3.eth.Contract(yfodistABI, VNLADIST_HASH)
    await assetContract.methods
      .deposit(pid, _amount)
      .send({
        from: store.state.wallet.address
      }, callback)
  } catch (e) {
    return '0'
  }
}

export const putWithdrawAll = async (pid, amount, callback) => {
  try {
    const x = new BigNumber(10).pow(18)
    const _amount = x.multipliedBy(amount).toString()
    var web3 = new Web3(window.ethereum);
    const assetContract = new web3.eth.Contract(yfodistABI, VNLADIST_HASH)
    await assetContract.methods
      .withdraw(pid, _amount)
      .send({
        from: store.state.wallet.address
      }, callback)
  } catch (e) {
    return '0'
  }
}

export const getTotalSupply = async () => {
  const contract = getContract({
    provider: CONTRACT_PROVIDER,
    contractHash: VNLA_HASH,
    abi,
  })

  try {
    return await contract.methods.totalSupply().call()
  } catch (e) {
    return '0'
  }
}

export const getRewardPerBlock = async () => {
  const contract = getContract({
    provider: CONTRACT_PROVIDER,
    contractHash: VNLADIST_HASH,
    abi: yfodistABI,
  })

  try {
    return await contract.methods.rewardPerBlock().call()
  } catch (e) {
    return '0'
  }
}

export const getAvailableBalance = async () => {
  const contract = getContract({
    provider: CONTRACT_PROVIDER,
    contractHash: VNLA_HASH,
    abi,
  })

  try {
    return await contract.methods.balanceOf(store.state.wallet.address).call()
  } catch (e) {
    return '0'
  }
}