import Vuex from 'vuex';
import Vue from "vue";
import {ethers} from "ethers";
import ERC20ABI from "@/assets/ABI/ERC20ABI.json";
import {computePoolAddress} from "@uniswap/v3-sdk";
import {ChainID, gasOptionsPriorityPercent} from '../utils';
import {CurrencyAmount, Percent, Token, TradeType, Ether} from "@uniswap/sdk-core";
import {AlphaRouter} from "@uniswap/smart-order-router";
import JSBI from 'jsbi';
import {populateTokensWithUSDCBalance} from "@/utils/USDbalance";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tokensList: [],
    requireLogin: false,
    account: null,
    balance: '',
    balanceInput: '',
    balanceOutput: '',
    network: ChainID.Ethereum,
    inputAmountValue: '',
    inputAmountValueUSD: '',
    inputAmountFiatPerToken: '',
    outputAmountValue: '',
    outputAmountValueUSD: '',
    outputAmountFiatPerToken: '',
    inputToken: '',
    outputToken: '',
    connectBtnTitle: 'Connect Wallet',
    etherWeb3Provider: null,
    pool: null,
    graphResponse: null,
    searchInput: '',
    route: null,
    incomingValue: null,
    xfamily: null,
    slippage: 5,
    customSlippage: '',
    autoRouterInput: null,
    autoRouterOutput: null,
    gasPriceCategory: 'Medium',
    rate: '',
    gasOptions: [
      {
        category: 'Instant',
        time: 'less than 10 sec',
        price: '',
        priority: 0,
      },
      {
        category: 'High',
        time: 'about 12 sec',
        price: '',
        priority: 0,
      },
      {
        category: 'Medium',
        time: 'about 30 sec',
        price: '',
        priority: 0,
      },
      {
        category: 'Low',
        time: 'more than 1 min',
        price: '',
        priority: 0,
      }
    ]
  },

  mutations: {
    setSlippage(state, value) {
      state.slippage = value;
    },

    setCustomSlippage(state, value) {
      state.customSlippage = value;
    },

    setTokensList(state, value) {
      state.tokensList = value;
    },

    setIncomingValue(state, value) {
      state.incomingValue = value;
    },

    setContractRoute(state, value) {
      state.route = value;
    },

    setPool(state, value) {
      state.pool = value;
    },

    setGraphResponse(state, value) {
      state.graphResponse = value;
    },

    setBalance(state, value) {
      state.balance = value;
    },

    setBalanceInput(state, value) {
      state.balanceInput = value;
    },

    setBalanceOutput(state, value) {
      state.balanceOutput = value;
    },

    setInputAmountValue(state, value) {
      state.inputAmountValue = value;
    },

    setNetwork(state, value) {
      state.network = value;
    },

    setOutputAmountValue(state, value) {
      state.outputAmountValue = value;
    },

    setInputToken(state, value) {
      state.inputToken = value;
    },

    setOutputToken(state, value) {
      state.outputToken = value;
    },

    setRequireLogin(state, newVal) {
      state.requireLogin = newVal;
    },

    setConnectBtnTitle(state, value) {
      state.connectBtnTitle = value;
    },

    logIn(state, data) {
      state.account = data.account;
      state.etherWeb3Provider = data.etherWeb3Provider;
      data.etherWeb3Provider.on('accountsChanged', (accounts) => {
        state.account = accounts.length ? accounts[0] : null;
      });
    },

    logOut(state) {
      state.account = null;
      state.balance = null;
      state.connectBtnTitle = 'Connect Wallet';
      state.etherWeb3Provider.provider.close();
      state.etherWeb3Provider = null;
      state.requireLogin = true;
    },

    routeInput(state, data) {
      state.autoRouterInput = data;
    },

    routeOutput(state, data) {
      state.autoRouterOutput = data;
    },

    setSearchInput(state, value) {
      state.searchInput = value
    },

    setGasPriceCategory(state, value) {
      state.gasPriceCategory = value
    },

    setInputAmountValueUSD(state, value) {
      state.inputAmountValueUSD = value;
    },

    setOutputAmountValueUSD(state, value) {
      state.outputAmountValueUSD = value;
    },

    setRate(state, value) {
      state.rate = value;
    },

    setInputAmountFiatPerToken(state, value) {
      state.inputAmountFiatPerToken = value;
    },

    setOutputAmountFiatPerToken(state, value) {
      state.outputAmountFiatPerToken = value;
    },

    setGasOptionsPrice(state, value) {
      for(let i = 0; i < state.gasOptions.length; i++ ) {
        state.gasOptions[i].price = value[i].gasPriceGweiRange;
        state.gasOptions[i].priority = value[i].priority;
      }
      // state.gasOptions[0].price = value.instant;
      // state.gasOptions[1].price = value.high;
      // state.gasOptions[2].price = value.medium;
      // state.gasOptions[3].price = value.low;
    }

  },
  actions: {
    setIncomingValue({commit}, value) {
      commit('setIncomingValue', value);
    },

    async exactInput({getters, dispatch}) {
      // const chainId = 1;
      // const slippage = 1;
      // const vaultFee = 100;
      const uniswapV3SwapRouter2 = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45';
      // const vaultAddress = '0x1B21B125be9284D17550e97BD4215b9EBd507047';
      // const account = getters.account;
      const signer = getters.etherWeb3Provider.getSigner();
      // const provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.alchemyapi.io/v2/LHhUmi_SflwbY-znjWmregjsns0ndRKl");

      // const router = new AlphaRouter({ chainId, provider });
      //
      // const token0 = getters.inputToken;
      // const token1 = getters.outputToken;
      //
      // const tokenIn = getters.inputToken.value === 'ETH' ? new Ether(token0.chainId) : new Token(
      //   token0.chainId,
      //   token0.address,
      //   token0.decimals,
      //   token0.value
      // );
      //
      // const tokenOut = getters.outputToken.value === 'ETH' ? new Ether(token1.chainId) : new Token(
      //   token1.chainId,
      //   token1.address,
      //   token1.decimals,
      //   token1.value
      // );
      //
      // const amountForSwap = getters.inputAmountValue * 10**token0.decimals;
      // console.log('amountForSwap', amountForSwap);
      // const currencyAmount = CurrencyAmount.fromRawAmount(tokenIn, JSBI.BigInt(amountForSwap));
      //
      // const calculateDeadline = Math.round((Date.now() + 9100000) / 1000);
      // const route = await router.route(
      //   currencyAmount,
      //   tokenOut,
      //   TradeType.EXACT_INPUT,
      //   {
      //     recipient: account,
      //     slippageTolerance: new Percent(slippage, 100),
      //     deadline: calculateDeadline,
      //     fee: {
      //       fee: new Percent(vaultFee, 10000),
      //       recipient: vaultAddress,
      //     }
      //   }
      // );
      // console.log('route: ', route);
      // console.log('route inputAmount: ', route.trade.swaps[0].inputAmount.toSignificant());
      // console.log('route outputAmount: ', route.trade.swaps[0].outputAmount.toSignificant());
      // console.log(`Quote Exact In: ${route.quote.toFixed()}`);
      // console.log(`Gas Adjusted Quote In: ${route.quoteGasAdjusted.toFixed(2)}`);
      // console.log(`Gas Used USD: ${route.estimatedGasUsedUSD.toFixed(6)}`);
      const route = getters.autoRouterInput;
      const gasOptions = getters.gasOptions.filter(option => option.category === getters.gasPriceCategory);
      console.log('route', route);
      console.log('gasOptions', gasOptions);
      console.log('gasOptions priority', gasOptions[0].priority);

      const transaction = {
        data: route.data,
        to: uniswapV3SwapRouter2,
        value: route.value,
        maxPriorityFeePerGas: gasOptions[0].priority
      };

      // const transaction = {
      //   data: route.methodParameters.calldata,
      //   to: uniswapV3SwapRouter2,
      //   value: route.methodParameters.value,
      // };

      if (route.tokenIn.isToken) {
        const maxValue = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
        const tokenContract = new ethers.Contract(getters.inputToken.address, ERC20ABI, signer);
        const allowance = await tokenContract.allowance(getters.account, uniswapV3SwapRouter2);
        const allowanceComparison = allowance._hex === maxValue;
        if (!allowanceComparison) {
          await tokenContract.approve(uniswapV3SwapRouter2, '0');
          await tokenContract.approve(uniswapV3SwapRouter2, maxValue);
        }
      }

      const tx = await signer.sendTransaction(transaction);

      const result = await tx.wait();
      if (result) {
        await dispatch('balance');
      }
      console.log('tx exactInput:', tx);
    },

    async exactOutput({getters, dispatch}) {
      // const chainId = 1;
      // const slippage = 1;
      // const vaultFee = 100;
      const uniswapV3SwapRouter2 = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45';
      // const vaultAddress = '0x1B21B125be9284D17550e97BD4215b9EBd507047';
      // const account = getters.account;
      const signer = getters.etherWeb3Provider.getSigner();
      // const provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.alchemyapi.io/v2/LHhUmi_SflwbY-znjWmregjsns0ndRKl");
      //
      // const router = new AlphaRouter({ chainId, provider });
      //
      // const token0 = getters.inputToken;
      // const token1 = getters.outputToken;
      //
      // const tokenIn = getters.inputToken.value === 'ETH' ? new Ether(token0.chainId) : new Token(
      //   token0.chainId,
      //   token0.address,
      //   token0.decimals,
      //   token0.value
      // );
      //
      // const tokenOut = getters.outputToken.value === 'ETH' ? new Ether(token1.chainId) : new Token(
      //   token1.chainId,
      //   token1.address,
      //   token1.decimals,
      //   token1.value
      // );
      //
      // const amountForSwap = getters.outputAmountValue * 10**token1.decimals;
      // const currencyAmount = CurrencyAmount.fromRawAmount(tokenOut, JSBI.BigInt(amountForSwap));
      //
      // const calculateDeadline = Math.round((Date.now() + 9100000) / 1000);
      // const route = await router.route(
      //   currencyAmount,
      //   tokenIn,
      //   TradeType.EXACT_OUTPUT,
      //   {
      //     recipient: account,
      //     slippageTolerance: new Percent(slippage, 100),
      //     deadline: calculateDeadline,
      //     fee: {
      //       fee: new Percent(vaultFee, 10000),
      //       recipient: vaultAddress,
      //     }
      //   }
      // );
      //
      // const transaction = {
      //   data: route.methodParameters.calldata,
      //   to: uniswapV3SwapRouter2,
      //   value: route.methodParameters.value,
      // };

      const route = getters.autoRouterOutput;
      const gasOptions = getters.gasOptions.filter(option => option.category === getters.gasPriceCategory);
      console.log('route', route);
      console.log('gasOptions', gasOptions);
      console.log('gasOptions priority', gasOptions[0].priority);


      const transaction = {
        data: route.data,
        to: uniswapV3SwapRouter2,
        value: route.value,
        maxPriorityFeePerGas: gasOptions[0].priority
      };

      if (route.tokenIn.isToken) {
        const maxValue = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
        const tokenContract = new ethers.Contract(getters.inputToken.address, ERC20ABI, signer);
        const allowance = await tokenContract.allowance(getters.account, uniswapV3SwapRouter2);
        const allowanceComparison = allowance._hex === maxValue;
        if (!allowanceComparison) {
          await tokenContract.approve(uniswapV3SwapRouter2, '0');
          await tokenContract.approve(uniswapV3SwapRouter2, maxValue);
        }
      }

      const tx = await signer.sendTransaction(transaction);

      const result = await tx.wait();
      if (result) {
        await dispatch('balance');
      }

      console.log('tx exactOutput:', tx);
    },

    async routeInput({getters, commit}) {
      const chainId = getters.network;
      const slippage = getters.slippage || getters.customSlippage;
      const vaultFee = 100;
      const vaultAddress = '0x1B21B125be9284D17550e97BD4215b9EBd507047';
      const account = getters.account;
      const provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.alchemyapi.io/v2/LHhUmi_SflwbY-znjWmregjsns0ndRKl");

      const router = new AlphaRouter({ chainId, provider });

      const token0 = getters.inputToken;
      const token1 = getters.outputToken;

      const tokenIn = getters.inputToken.symbol === 'ETH' ? new Ether(token0.chainId) : new Token(
        token0.chainId,
        token0.address,
        token0.decimals,
        token0.symbol
      );

      const tokenOut = getters.outputToken.symbol === 'ETH' ? new Ether(token1.chainId) : new Token(
        token1.chainId,
        token1.address,
        token1.decimals,
        token1.symbol
      );

      const amountForSwap = ethers.utils.parseUnits(getters.inputAmountValue, token0.decimals).toString();
      console.log('amountForSwap', amountForSwap.toString());
      const currencyAmount = CurrencyAmount.fromRawAmount(tokenIn, amountForSwap);

      const calculateDeadline = Math.round((Date.now() + 9100000) / 1000);
      const route = await router.route(
        currencyAmount,
        tokenOut,
        TradeType.EXACT_INPUT,
        {
          recipient: account,
          slippageTolerance: new Percent(slippage, 100),
          deadline: calculateDeadline,
          fee: {
            fee: new Percent(vaultFee, 10000),
            recipient: vaultAddress,
          }
        }
      );

      console.log('route: ', route);
      console.log('route inputAmount: ', route.trade.swaps[0].inputAmount.toSignificant());
      console.log('route outputAmount: ', route.trade.swaps[0].outputAmount.toSignificant());
      console.log(`Quote Exact In: ${route.quote.toFixed()}`);
      console.log(`Gas Adjusted Quote In: ${route.quoteGasAdjusted.toFixed(2)}`);
      console.log(`Gas Used USD: ${route.estimatedGasUsedUSD.toFixed(6)}`);

      const routeData = {
        outputAmount: route.quote.toFixed(4),
        data: route.methodParameters.calldata,
        value: route.methodParameters.value,
        tokenIn
      };

      commit('routeInput', routeData);
    },

    async routeOutput({getters, commit}) {
      const chainId = getters.network;
      const slippage = getters.slippage || getters.customSlippage;
      const vaultFee = 100;
      const vaultAddress = '0x1B21B125be9284D17550e97BD4215b9EBd507047';
      const account = getters.account;
      const provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.alchemyapi.io/v2/LHhUmi_SflwbY-znjWmregjsns0ndRKl");

      const router = new AlphaRouter({ chainId, provider });

      const token0 = getters.inputToken;
      const token1 = getters.outputToken;

      const tokenIn = getters.inputToken.symbol === 'ETH' ? new Ether(token0.chainId) : new Token(
        token0.chainId,
        token0.address,
        token0.decimals,
        token0.symbol
      );

      const tokenOut = getters.outputToken.symbol === 'ETH' ? new Ether(token1.chainId) : new Token(
        token1.chainId,
        token1.address,
        token1.decimals,
        token1.symbol
      );

      const amountForSwap = JSBI.BigInt(getters.outputAmountValue * 10**token1.decimals);
      const currencyAmount = CurrencyAmount.fromRawAmount(tokenOut, amountForSwap);

      const calculateDeadline = Math.round((Date.now() + 9100000) / 1000);
      const route = await router.route(
        currencyAmount,
        tokenIn,
        TradeType.EXACT_OUTPUT,
        {
          recipient: account,
          slippageTolerance: new Percent(slippage, 100),
          deadline: calculateDeadline,
          fee: {
            fee: new Percent(vaultFee, 10000),
            recipient: vaultAddress,
          }
        }
      );

      const routeData = {
        inputAmount: route.quote.toFixed(4),
        data: route.methodParameters.calldata,
        value: route.methodParameters.value,
        tokenIn,
      };

      commit('routeOutput', routeData);
    },

    logIn({commit, dispatch}, data) {
      commit('logIn', data);
      dispatch('balance');
    },

    logOut({commit}) {
      commit('logOut');
    },

    setInputAmountValue({commit}, value) {
      commit("setInputAmountValue", value);
    },

    setOutputAmountValue({commit}, value) {
      commit("setOutputAmountValue", value);
    },

    setNetwork({commit}, value) {
      commit("setNetwork", value);
    },

    setInputToken({commit, dispatch}, value) {
      commit("setInputToken", value);
      dispatch("balance");
    },

    setOutputToken({commit, dispatch}, value) {
      commit("setOutputToken", value);
      dispatch("balance");
    },

    async pool({commit, getters}) {
      const pool = computePoolAddress({
        factoryAddress: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
        tokenA: getters.tokenIn,
        tokenB: getters.tokenOut,
        fee: 3000
      });
      commit('setPool', pool);
    },

    async subGraph({commit, getters}) {
      const APIURL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";
      let query = `{
        pools(where:{token0:"${getters.tokenIn}", token1: "${getters.tokenOut}"}, orderBy: liquidity, orderDirection: desc){
          id
          feeTier
          liquidity
          token0Price
          token1Price
          sqrtPrice
          tick
        }
      }`;
      async function fetchGraph(api, query) {
        const response = await fetch(APIURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query
          })
        });
        const json = await response.json();
        return json;
      }

      let result = (await fetchGraph(APIURL, query)).data.pools[0];
      if (!result) {
        query = `{
          pools(where:{token0:"${getters.tokenOut}", token1: "${getters.tokenIn}"}, orderBy: liquidity, orderDirection: desc){
            id
            feeTier
            liquidity
            token0Price
            token1Price
          }
        }`;
        result = (await fetchGraph(APIURL, query)).data.pools[0];
      }
      commit('setGraphResponse', result);
    },

    async balance({commit, getters}) {
      if (getters.account) {
        const balanceETH = await getters.etherWeb3Provider.getBalance(getters.account);
        commit('setBalance', Number(ethers.utils.formatEther(balanceETH)).toFixed(4));
        // commit('setBalance', Math.round(balanceETH.toString() / 10 ** 14) / divider);

        if (getters.inputToken.symbol === 'ETH') {
          commit('setBalanceInput', Number(ethers.utils.formatEther(balanceETH)).toFixed(4));
        } else {
          const tokenContract = new ethers.Contract(getters.tokenIn, ERC20ABI, getters.etherWeb3Provider);
          const balanceToken = await tokenContract.balanceOf(getters.account);
          const decimals = await tokenContract.decimals();

          commit('setBalanceInput', Number(ethers.utils.formatUnits(balanceToken, decimals)).toFixed(4));
        }

        if (getters.outputToken.symbol === 'ETH') {
          commit('setBalanceOutput', Number(ethers.utils.formatEther(balanceETH)).toFixed(4));
        } else {
          const tokenContract = new ethers.Contract(getters.tokenOut, ERC20ABI, getters.etherWeb3Provider);
          const balanceToken = await tokenContract.balanceOf(getters.account);
          const decimals = await tokenContract.decimals();

          commit('setBalanceOutput', Number(ethers.utils.formatUnits(balanceToken, decimals)).toFixed(4));
        }
      }
    },

    async inputUSDValue({getters: {inputToken, inputAmountValue}, commit, dispatch}) {
      const tokenAmountInUSD = await populateTokensWithUSDCBalance(inputToken.address, inputToken.symbol, inputAmountValue);
      commit('setInputAmountValueUSD', tokenAmountInUSD.fiatAmount);
      commit('setInputAmountFiatPerToken', tokenAmountInUSD.fiatPerToken.toFixed(5));
      dispatch('rateCalculate');
    },

    async outputUSDValue({getters, commit, dispatch}) {
      const tokenAmountOutUSD = await populateTokensWithUSDCBalance(getters.outputToken.address, getters.outputToken.symbol, getters.outputAmountValue);
      commit('setOutputAmountValueUSD', tokenAmountOutUSD.fiatAmount);
      commit('setOutputAmountFiatPerToken', tokenAmountOutUSD.fiatPerToken.toFixed(2));
      dispatch('rateCalculate');
    },

    rateCalculate({getters, commit}) {
      const rate = getters.inputAmountValue / getters.outputAmountValue;
      commit('setRate', rate.toFixed(4));
    },

    setSlippage({commit}, value) {
      commit('setSlippage', value);
    },

    async getGasPrice({commit, getters}, provider) {
      const gasPrice = await provider.getGasPrice();
      const oneHundred = gasOptionsPriorityPercent.oneHundred;
      const gasPriceGwei = Number(ethers.utils.formatUnits(gasPrice, "gwei"));
      const instantCategoryPriority = gasPrice.mul(gasOptionsPriorityPercent.twentyFive).div(oneHundred);
      const instantCategory = instantCategoryPriority.add(gasPrice);
      const highCategoryPriority = gasPrice.mul(gasOptionsPriorityPercent.five).div(oneHundred);
      const highCategory = highCategoryPriority.add(gasPrice);
      const mediumCategoryPriority = gasPrice.mul(gasOptionsPriorityPercent.two).div(oneHundred);
      const mediumCategory = mediumCategoryPriority.add(gasPrice);
      const lowCategoryPriority = gasPrice.div(oneHundred);
      const lowCategory = lowCategoryPriority.add(gasPrice);

      const gasOptionsFiltered = getters.gasOptions.filter(option => option.category === getters.gasPriceCategory);
      console.log('gasOptionsFiltered', gasOptionsFiltered[0]);
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
      console.log('gasPriceGwei', gasPriceGwei);
      console.log('gasPrice', gasPrice.toString());
      console.log('----------------------------------')
      console.log('instantCategory', instantCategory.toString());
      console.log('highCategory', highCategory.toString());
      console.log('mediumCategory', mediumCategory.toString());
      console.log('lowCategory', lowCategory.toString());
      console.log('---------------------------------')
      console.log('instantCategoryPriority', instantCategoryPriority.toString(), ethers.utils.formatUnits(instantCategoryPriority, 'gwei'));
      console.log('highCategoryPriority', highCategoryPriority.toString());
      console.log('mediumCategoryPriority', mediumCategoryPriority.toString());
      console.log('lowCategoryPriority', lowCategoryPriority.toString());
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')

      const gasOptions = [
        {
          gasPriceGweiRange: `${gasPriceGwei.toFixed(2)} - ${Number(ethers.utils.formatUnits(instantCategory, 'gwei')).toFixed(2)} Gwei`,
          priority: instantCategoryPriority
        },
        {
          gasPriceGweiRange: `${gasPriceGwei.toFixed(2)} - ${Number(ethers.utils.formatUnits(highCategory, 'gwei')).toFixed(2)} Gwei`,
          priority: highCategoryPriority
        },
        {
          gasPriceGweiRange: `${gasPriceGwei.toFixed(2)} - ${Number(ethers.utils.formatUnits(mediumCategory, 'gwei')).toFixed(2)} Gwei`,
          priority: mediumCategoryPriority
        },
        {
          gasPriceGweiRange: `${gasPriceGwei.toFixed(2)} - ${Number(ethers.utils.formatUnits(lowCategory, 'gwei')).toFixed(2)} Gwei`,
          priority: lowCategoryPriority
        },
      ]

      commit('setGasOptionsPrice', gasOptions);
    }

  },

  getters: {
    xfamily(state) {
      return state.xfamily;
    },

    incomingValue(state) {
      return state.incomingValue;
    },

    isLoggedIn: state => Boolean(state.account),

    tokensList(state) {
      return state.tokensList;
    },

    etherWeb3Provider(state) {
      return state.etherWeb3Provider;
    },

    network(state) {
      return state.network;
    },

    account(state) {
      return state.account;
    },

    tokenIn(state) {
      return state.inputToken.address;
    },

    tokenOut(state) {
      return state.outputToken.address;
    },

    connectBtnTitle(state) {
      return state.connectBtnTitle;
    },

    inputAmountValue(state) {
      return state.inputAmountValue;
    },

    outputAmountValue(state) {
      return state.outputAmountValue;
    },

    inputToken(state) {
      return state.inputToken;
    },

    outputToken(state) {
      return state.outputToken;
    },

    balance(state) {
      return state.balance;
    },

    balanceInput(state) {
      return state.balanceInput;
    },

    balanceOutput(state) {
      return state.balanceOutput;
    },

    graphResponse(state) {
      return state.graphResponse;
    },

    route(state) {
      return state.route;
    },

    slippage(state) {
      return state.slippage;
    },

    customSlippage(state) {
      return state.customSlippage;
    },

    autoRouterInput(state) {
      return state.autoRouterInput;
    },

    autoRouterOutput(state) {
      return state.autoRouterOutput;
    },

    searchInput(state) {
      return state.searchInput;
    },

    gasPriceCategory(state) {
      return state.gasPriceCategory;
    },

    inputAmountValueUSD(state) {
      return state.inputAmountValueUSD;
    },

    outputAmountValueUSD(state) {
      return state.outputAmountValueUSD;
    },

    rate(state) {
      return state.rate;
    },

    inputAmountFiatPerToken(state) {
      return state.inputAmountFiatPerToken;
    },

    outputAmountFiatPerToken(state) {
      return state.outputAmountFiatPerToken;
    },

    gasOptions(state) {
      return state.gasOptions;
    },

  }
})

