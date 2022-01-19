import {ethers} from "ethers";

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
  oneHundred: ethers.BigNumber.from(100),
  twentyFive: ethers.BigNumber.from(25),
  five: ethers.BigNumber.from(5),
  two: ethers.BigNumber.from(2)
}