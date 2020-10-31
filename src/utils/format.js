import BigNumber from 'bignumber.js'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const getBalanceNumber = (balance, decimals = 18) => {
  const displayBalance = BigNumber(balance).dividedBy(new BigNumber(10).pow(1 * decimals))
  return displayBalance.toNumber()
}

export const getDisplayBalance = (balance, decimals = 18) => {
  const displayBalance = BigNumber(balance).dividedBy(new BigNumber(10).pow(1 * decimals))
  if (displayBalance.lt(1)) {
    if (displayBalance.gt(0.001) || displayBalance.eq(0)) {
      return displayBalance.toPrecision(5)
    } else {
      return displayBalance.toString()
    }
  } else {
    return useGroup(displayBalance.toFixed(4, 1))
  }
}

export const getFullDisplayBalance = (balance, decimals = 18) => {
  return BigNumber(balance).dividedBy(new BigNumber(10).pow(1 * decimals)).toFixed()
}

export const getDisplayBalanceToFixed = (balance, decimals = 18) => {
  const displayBalance = BigNumber(balance).dividedBy(new BigNumber(10).pow(1 * decimals))
  return displayBalance.toFixed(2, 1).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const useGroup = ( balance ) => {
  balance += '' 
  let [x0, x1] = balance.split('.')
  x0 = x0.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return [x0, x1].join('.')
}

export const getDisplayLP = (num) => {
  let displayBalance = BigNumber(num).dividedBy(new BigNumber(10).pow(18))
  if (displayBalance.lt(1)) {
    return displayBalance.toFixed(8, 1)
  } else {
    return useGroup(displayBalance.toFixed(4, 1))
  }
}

export const getFunsWithThousand = (num) => {
  let displayBalance = BigNumber(num).dividedBy(new BigNumber(10).pow(18))
  if (displayBalance.lt(1000)) {
    return [displayBalance.toFixed(2, 1), '']
  } else {
    return [displayBalance.dividedBy(new BigNumber(10).pow(3)).toFixed(2, 1), 'K']
  }
}