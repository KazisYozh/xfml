<template>
  <div class="connect" @click="onClickWalletConnectLogin">
    {{ connectBtnTitle }}
  </div>
</template>

<script>
import WalletConnectProvider from "@walletconnect/web3-provider";
import * as providers from "@ethersproject/providers";
// import xfamilyABI from "../assets/ABI/xfamilyAbi.json";

export default {
  name: "ConnectButton",
  computed: {
    connectBtnTitle() {
      return this.$store.getters.connectBtnTitle;
    }
  },
  methods: {
    async onClickWalletConnectLogin() {
      console.log('process.env.NODE_ENV', process.env.NODE_ENV);
      if (this.$store.getters.connectBtnTitle === 'Connect Wallet') {
        const provider = new WalletConnectProvider({
          infuraId: "9c4edeefd4864bb493cec3e1071fec15",
          rpc: {1337: "http://localhost:8545/"},
          chainId: process.env.NODE_ENV === 'development' ? 1337 : this.$store.getters.network,
        });
        console.log(process.env.NODE_ENV === 'development' ? 1337 : this.$store.getters.network);
        console.log('provider', provider);
        const accounts = await provider.enable();
        console.log('accounts', accounts);
        const etherWeb3Provider = new providers.Web3Provider(provider);
        await this.$store.dispatch('logIn', { provider: 'WalletConnect', account: accounts[0], etherWeb3Provider });
        this.$store.commit('setConnectBtnTitle', 'Go to Swap');

      } else if (
          this.$store.getters.connectBtnTitle === 'Go to Swap' &&
          this.$store.getters.inputAmountValue &&
          this.$store.getters.incomingValue === 'In'
      ) {

        await this.$store.dispatch('exactInput');

      } else if (
          this.$store.getters.connectBtnTitle === 'Go to Swap' &&
          this.$store.getters.outputAmountValue &&
          this.$store.getters.incomingValue === 'Out'
      ) {

        await this.$store.dispatch('exactOutput');

      }
    }
  },
}
</script>

<style>
.connect {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  width: 100%;
  height: 56px;
  background: linear-gradient(93.58deg, #3246FF 0%, #AD26FF 100%);
  border-radius: 12px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
}
</style>