import {BigNumber} from "@ethersproject/bignumber";


export const tokenSelectionTitle = {
    get: 'You get',
    send: 'You send'
}

export const LocalStorageKeys = {
    eth_imported_tokens: 'eth_imported-tokens'
}

export const nativeTokens = {
  '1': {
    "chainId": 1,
    "name": "Ethereum",
    "symbol": "ETH",
    "decimals": 18,
    "logoURI": "https://cdn.worldvectorlogo.com/logos/ethereum-eth.svg"
  },
}

export const gasOptionsPriorityPercent = {
  oneHundred: BigNumber.from(100),
  twentyFive: BigNumber.from(25),
  five: BigNumber.from(5),
  two: BigNumber.from(2)
}