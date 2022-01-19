const GRAPH_API_URL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";

const ethPriceQuery = `{
    bundles(first: 1) {
      ethPriceUSD
    }
}`;

export const populateTokensWithUSDCBalance = async (tokenAddress, tokenSymbol, tokenAmount) => {
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

    const tokenDerivedEthQuery = `{
          token(id:"${tokenAddress?.toLowerCase()}") {
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
    const parsedResponseDerivedEth = await tokenDerivedEthResponse.json();
    const derivedEthAmount = parsedResponseDerivedEth.data.token === null && tokenSymbol === 'ETH'
      ? "1"
      // if there are no pools for imported tokens
      : parsedResponseDerivedEth.data.token === null
        ? '0'
        // most used for all the tokens
        : parsedResponseDerivedEth.data.token.derivedETH;
    const fiatPerToken = parseFloat(derivedEthAmount) * ethPriceUsd;
    const fiatAmount = fiatPerToken * parseFloat(tokenAmount);

    return {
      fiatAmount: fiatAmount.toFixed(2),
      fiatPerToken,
    };
}