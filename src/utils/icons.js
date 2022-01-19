import eth from '../assets/tokens-icons/eth.svg';
import wbtc from '../assets/tokens-icons/wbtc.svg';
import usdt from '../assets/tokens-icons/usdt.svg';
import usdc from '../assets/tokens-icons/usdc.svg';
import dai from '../assets/tokens-icons/dai.svg';
import uni from '../assets/tokens-icons/uni.svg';
import none from '../assets/icons/none-icon.svg';

export const tokenIcons = {
    ETH: eth,
    WBTC: wbtc,
    USDT: usdt,
    USDC: usdc,
    DAI: dai,
    UNI: uni
}

export const populateTokensWithIcons = (tokensArr) => {
    if(!tokensArr || tokensArr.length === 0) return [];
    return tokensArr.map(token => ({
        ...token,
        icon: tokenIcons[token.symbol] ?? none
    }));
}