import Web3 from 'web3'
import store from '../store/index'
import { CONTRACT_PROVIDER, VNLA_HASH, VNLADIST_HASH, VNLA_HUSD_HASH, HUSD_HASH, MAX_NUMBER, pairs } from '../config/constant'
import abi from './vnla.json'
import yfodistABI from './vnladist.json'
import BigNumber from 'bignumber.js'

const web3 = new Web3(CONTRACT_PROVIDER)

export const homeRequestsInBatch = (callbacks) => {
  const { address } = store.state.wallet

  web3.eth.getBlockNumber().then(f => {
    const batch = new web3.BatchRequest()
  
    const contract_yfo = new web3.eth.Contract(abi, VNLA_HASH)
    const contract_yfodist = new web3.eth.Contract(yfodistABI, VNLADIST_HASH)
  
    let promise1 = new Promise((resolve, rej) => {
      batch.add(contract_yfo.methods.totalSupply().call.request(null, (err, res) => {
        resolve(res)
      }))
    })
    let promise2 = new Promise((resolve, rej) => {
      batch.add(contract_yfodist.methods.vnlaPerBlock().call.request(null, (err, res) => {
        resolve(res)
      }))
    })
    let promise3 = new Promise((resolve, rej) => {
        batch.add(contract_yfodist.methods.f(f).call.request(null, (err, res) => {
          resolve(res)
        }))
    })
  
    Promise.all([promise1, promise2, promise3]).then(res => {
      const [total, vnlaPerBlock, f] = res
      // console.log([total, vnlaPerBlock, f]);
      callbacks[0](false, total - vnlaPerBlock * f)
    })
  
    batch.add(contract_yfodist.methods.rewardPerBlock().call.request(null, callbacks[1]))
  
    batch.execute()
  })

  if(address) {
    getHomepageBalance(callbacks[2])
  }
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

export const VNLAAPY = (id) => {
  const contract_yfodist = new web3.eth.Contract(yfodistABI, VNLADIST_HASH)

  const batch = new web3.BatchRequest()

  let promise1 = new Promise((resolve, rej) => {
    batch.add(contract_yfodist.methods.poolInfo(id).call.request(null, (err, res) => {
      // console.log('lpSupply', res['4']);
      resolve(res['4'])
    }))
  })

  let promise2 = new Promise((resolve, rej) => {
    batch.add(contract_yfodist.methods.rewardPerBlock().call.request(null, (err, res) => {
      // console.log('rewardPerBlock', res);
      resolve(res)
    }))
  })

  batch.execute()

  return Promise.all([promise1, promise2]).then(res => {
    const [lpSupply, rewardPerBlock] = res
    const vnlahusdapy = (rewardPerBlock*0.4/lpSupply)*((365*24*60*60/3)*100)
    return vnlahusdapy
  })
}


export const VNLAHUSDAPY = ({ hash, id }) => {
  const vnla = new web3.eth.Contract(abi, VNLA_HASH)
  const lpToken = new web3.eth.Contract(abi, hash)
  const contract_yfodist = new web3.eth.Contract(yfodistABI, VNLADIST_HASH)

  const batch = new web3.BatchRequest()

  let promise1 = new Promise((resolve, rej) => {
    batch.add(contract_yfodist.methods.poolInfo(id).call.request(null, (err, res) => {
      // console.log('lpSupply', res);
      resolve(res['4'])
    }))
  })

  let promise2 = new Promise((resolve, rej) => {
    batch.add(contract_yfodist.methods.rewardPerBlock().call.request(null, (err, res) => {
      // console.log('rewardPerBlock', res);
      resolve(res)
    }))
  })

  let promise3 = new Promise((resolve, rej) => {
    batch.add(vnla.methods.balanceOf(hash).call.request(null, (err, res) => {
      // console.log('amount', res);
      resolve(res)
    }))
  })

  let promise4 = new Promise((resolve, rej) => {
    batch.add(lpToken.methods.totalSupply().call.request(null, (err, res) => {
      // console.log('totalSupply', res);
      resolve(res)
    }))
  })

  batch.execute()

  return Promise.all([promise1, promise2, promise3, promise4]).then(res => {
    const [lpSupply, rewardPerBlock, amount, totalSupply] = res
    const vnlahusdapy = (rewardPerBlock*0.6/lpSupply)/(2*amount/totalSupply)*(365*24*60*60/3)*100
    return vnlahusdapy
  })
}



export const getTotalValue = (callbacks) => {
  const vnla = new web3.eth.Contract(abi, VNLA_HASH)
  const husd = new web3.eth.Contract(abi, HUSD_HASH)
  const lpToken = new web3.eth.Contract(abi, VNLA_HUSD_HASH)
  const contract_yfodist = new web3.eth.Contract(yfodistABI, VNLADIST_HASH)

  const batch = new web3.BatchRequest()

  let promise1 = new Promise((resolve, rej) => {
    batch.add(vnla.methods.balanceOf(VNLA_HUSD_HASH).call.request(null, (err, res) => {
      console.log('balanceOfVNLA', res);
      resolve(res)
    }))
  })
  let promise2 = new Promise((resolve, rej) => {
    batch.add(husd.methods.balanceOf(VNLA_HUSD_HASH).call.request(null, (err, res) => {
      console.log('balanceOfHUSD', res);
      resolve(res)
    }))
  })
  let promise3 = new Promise((resolve, rej) => {
    batch.add(lpToken.methods.totalSupply().call.request(null, (err, res) => {
      console.log('totalSupply', res);
      resolve(res)
    }))
  })

  let promise4 = new Promise((resolve, rej) => {
    batch.add(contract_yfodist.methods.poolInfo(1).call.request(null, (err, res) => {
      console.log('lpSupply_VNLA', res[4]);
      resolve(res[4])
    }))
  })

  let promise5 = new Promise((resolve, rej) => {
    batch.add(contract_yfodist.methods.poolInfo(0).call.request(null, (err, res) => {
      console.log('lpSupply_lp', res[4]);
      resolve(res[4])
    }))
  })

  batch.execute()

  return Promise.all([promise1, promise2, promise3, promise4, promise5]).then(res => {
    const [balanceOfVNLA, balanceOfHUSD, totalSupply, lpSupply_VNLA, lpSupply_lp] = res
    const totalvalue = ((balanceOfVNLA/balanceOfHUSD)*lpSupply_VNLA + (2*balanceOfHUSD/totalSupply)*lpSupply_lp) / 1e+27
    callbacks[0] && callbacks[0](totalvalue)
    callbacks[1] && callbacks[1](balanceOfVNLA/balanceOfHUSD/1e+14)
  })
}