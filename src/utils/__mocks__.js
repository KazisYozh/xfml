import eth from '../assets/tokens-icons/eth.svg';
import wbtc from '../assets/tokens-icons/wbtc.svg';
import usdt from '../assets/tokens-icons/usdt.svg';
import usdc from '../assets/tokens-icons/usdc.svg';
import dai from '../assets/tokens-icons/dai.svg';
import uni from '../assets/tokens-icons/uni.svg';
import none from '../assets/icons/none-icon.svg';

export const mockTokenSelectionOptions = [
    {
        symbol: 'ETH',
        name: 'Ethereum',
        icon: eth,
        tokenAmount: 0.54421,
        fiatAmount: '1,050.16'
    },
    {
        symbol: 'WBTC',
        name: 'Wrapped Bitcoin',
        icon: wbtc,
        tokenAmount: 0.03456,
        fiatAmount: '1,746.44'
    },
    {
        symbol: 'USDT',
        name: 'Tether',
        icon: usdt,
        tokenAmount: 0,
        fiatAmount: ''
    },
    {
        symbol: 'USDC',
        name: 'UDC Coin',
        icon: usdc,
        tokenAmount: 0,
        fiatAmount: ''
    },
    {
        symbol: 'DAI',
        name: 'Dai',
        icon: dai,
        tokenAmount: 0,
        fiatAmount: ''
    },
    {
        symbol: 'UNI',
        name: 'Uniswap',
        icon: uni,
        tokenAmount: 0,
        fiatAmount: ''
    }
]

export const testSearchInputOption = [
    {
        symbol: 'WEMP',
        name: 'Women Empowerment Token',
        icon: none,
        button: {
            label: "Import",
            handleClick: (symbol) => alert(`Trigger import of ${symbol}`)
        }
    }
]

export const gasOptionsMock = [
    {
        category: 'Instant',
        time: 'less than 10 sec',
        price: '91.25 - 139.79 Gwei'
    },
    {
        category: 'High',
        time: 'about 12 sec',
        price: '91.25 - 106.70 Gwei'
    },
    {
        category: 'Medium',
        time: 'about 30 sec',
        price: '91.25 - 102.54 Gwei'
    },
    {
        category: 'Low',
        time: 'more than 1 min',
        price: '91.25 - 101.31 Gwei'
    }
]