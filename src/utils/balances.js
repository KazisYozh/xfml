import genericERC20Abi from '../assets/ABI/ERC20ABI.json';
import {Contract} from "@ethersproject/contracts";
import {formatUnits} from "@ethersproject/units";

const GRAPH_API_URL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";

const ethPriceQuery = `{
    bundles(first: 1) {
      ethPriceUSD
    }
}`;

export const populateTokensWithUSDCBalances = async (tokens) => {
    const ethPriceResponse = await fetch(GRAPH_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: ethPriceQuery
        })
    });
    const parsedResponse = await ethPriceResponse.json();
    const ethPriceUsd = parsedResponse.data.bundles[0].ethPriceUSD;

    const tokensWithUSDCBalances = await Promise.all(tokens.map(async (token) => {
        const tokenDerivedEthQuery = `{
            token(id:"${token.address?.toLowerCase()}") {
              derivedETH
          }
        }`;

        const tokenDerivedEthResponse = await fetch(GRAPH_API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: tokenDerivedEthQuery
            })
        });
        const parsedResponse = await tokenDerivedEthResponse.json();
        if (token.symbol === 'ETH') {
          console.log('parsedResponse', parsedResponse);
        }
        const derivedEthAmount = parsedResponse.data.token === null && token.symbol === 'ETH' 
            ? "1"
            // if there are no pools for imported tokens 
            : parsedResponse.data.token === null 
                ? '0'
                // most used for all the tokens
                : parsedResponse.data.token.derivedETH;

        const fiatAmount = parseFloat(derivedEthAmount) * ethPriceUsd * parseFloat(token.tokenAmount)

        return {
            ...token,
            fiatAmount: fiatAmount.toFixed(2)
        }
    }))

    return tokensWithUSDCBalances;
}

const getTokenAmount = async (token, userAddress, provider, decimals) => {
    if (!token || !userAddress || !provider) return 0;
    
    let balanceInWei;
    let erc20Contract

    /* Test case */
    // if (tokenAddress === '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599') {
    //     balanceInWei = BigNumber.from('1000000000000000000') //await web3.getBalance(userAddress);
    // } 
    if (token.symbol === 'ETH') {
      balanceInWei = await provider.getBalance(userAddress);
    } else {
      erc20Contract = new Contract(token.address, genericERC20Abi, provider);
      balanceInWei = await erc20Contract.balanceOf(userAddress);
    }


    const balanceInEth = formatUnits(balanceInWei, decimals);
    const valueToReturn = Math.ceil(parseFloat(balanceInEth)) === 0 ? 0 : balanceInEth;
    return valueToReturn;
};

export const populateTokensWithBalances = async (tokens, userAddress, provider) => {
    if(tokens.length === 0) return [];

    return await Promise.all(tokens.map(async (token) => ({
        ...token,
        tokenAmount: await getTokenAmount(token, userAddress, provider, token.decimals),

    })))
}