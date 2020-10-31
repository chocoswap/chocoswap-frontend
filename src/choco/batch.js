import Web3 from 'web3'
import store from '../store/index'
import { CONTRACT_PROVIDER, VNLA_HASH, VNLADIST_HASH, MAX_NUMBER, pairs } from '../config/constant'
import abi from './vnla.json'
import yfodistABI from './vnladist.json'
import BigNumber from 'bignumber.js'

const web3 = new Web3(CONTRACT_PROVIDER)

export const homeRequestsInBatch = (callbacks) => {
  const { address } = store.state.wallet
  const batch = new web3.BatchRequest()

  const contract_yfo = new web3.eth.Contract(abi, VNLA_HASH)
  const contract_yfodist = new web3.eth.Contract(yfodistABI, VNLADIST_HASH)

  batch.add(contract_yfo.methods.totalSupply().call.request(null, callbacks[0]))
  batch.add(contract_yfodist.methods.rewardPerBlock().call.request(null, callbacks[1]))

  if(address) {
    getHomepageBalance(callbacks[2])
  }

  batch.execute()
}

const getHomepageBalance = (callback) => {
  const { address } = store.state.wallet
  const batch = new web3.BatchRequest()
  const contract_yfo = new web3.eth.Contract(abi, VNLA_HASH)
  const contract_yfodist = new web3.eth.Contract(yfodistABI, VNLADIST_HASH)

  batch.add(contract_yfo.methods.balanceOf(address).call.request({ from: address }, _callback))

  for(const item in pairs){
    batch.add(contract_yfodist.methods.pendingVnla(pairs[item].id, address).call.request({ from: address }, _callback))
  }
  batch.execute()

  const tmp = []
  function _callback(err, result) {
    tmp.push(result)
    if(tmp.length == Object.keys(pairs).length + 1) {
      callback(tmp)
    }
  }
}

export const menuDetailRequestsInBatch = (params, callbacks) => {
  const { address } = store.state.wallet
  const batch = new web3.BatchRequest()

  const contract = new web3.eth.Contract(abi, params.hash)
  const contract_yfodist = new web3.eth.Contract(yfodistABI, VNLADIST_HASH)

  batch.add(contract.methods.balanceOf(address).call.request({from: address}, callbacks[0]))

  batch.add(contract_yfodist.methods.userInfo(params.id, address).call.request({from: address}, callbacks[1]))

  batch.add(contract_yfodist.methods.pendingVnla(params.id, address).call.request({from: address}, callbacks[2]))

  batch.add(contract.methods.allowance(address, VNLADIST_HASH).call.request({from: address}, callbacks[3]))

  batch.execute()
}