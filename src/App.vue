<template>
  <div id="app">
    <Header :openSettings="openSettings" />
    <Network />
    <Send :openTokenSelectionModal="setSendTitle" />
    <Get :openTokenSelectionModal="setGetTitle" />
    <Footer />
    <ConnectButton />
    <TokenSelection
      v-if="selectTokenTitle && !manageTokensOpen && !tokenToImport"
      :title="selectTokenTitle" 
      :closeModal="closeSelectTokenModal" 
      :openManageTokens="openManageTokens" 
      :openImportToken="openImportToken" 
    />
    <ManageTokens 
      v-if="manageTokensOpen"
      :isOpen="manageTokensOpen" 
      :closeModal="closeManageTokens" 
    />
    <ImportToken 
      v-if="!!tokenToImport" 
      :tokenToImport="tokenToImport" 
      :closeModal="closeImportToken" 
    />
    <Settings
      v-if="settingsOpen"
      :open="settingsOpen"
      :handleClose="closeSettings"
    />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Network from './components/Network.vue'
import Send from './components/Send.vue'
import Get from './components/Get.vue'
import Footer from './components/Footer.vue'
import ConnectButton from './components/ConnectButton.vue'
import TokenSelection from './components/TokenSelection.vue'
import ManageTokens from './components/ManageTokens.vue'
import ImportToken from './components/ImportToken.vue'
import Settings from './components/Settings.vue'
import {tokenSelectionTitle, nativeTokens, uniswap_tokens_git_gist} from './utils'
import {ethers} from "ethers";
import store from './store';

export default {
  store,
  name: 'App',
  components: {
    Header,
    Network,
    Send,
    Get,
    Footer,
    ConnectButton,
    TokenSelection,
    ManageTokens,
    ImportToken,
    Settings
  },
  data() {
    return {
      selectTokenTitle: '',
      manageTokensOpen: false,
      tokenToImport: null,
      settingsOpen: false,
    }
  },
  async mounted() {
    // const urlNetwork = process.env.NODE_ENV === 'development' ? 'http://localhost:8545' :'https://eth-mainnet.alchemyapi.io/v2/LHhUmi_SflwbY-znjWmregjsns0ndRKl'
    const provider = ethers.getDefaultProvider('https://eth-mainnet.alchemyapi.io/v2/LHhUmi_SflwbY-znjWmregjsns0ndRKl');
    provider.on("block", async () => await this.$store.dispatch('getGasPrice', provider));
    const uniswapResponse = await fetch(uniswap_tokens_git_gist);
    const parsedUniswapResponse = await uniswapResponse.json();
    // const uniswapTokens = parsedUniswapResponse.tokens;
    const uniswapTokens = [ nativeTokens[this.$store.getters.network], ...parsedUniswapResponse.tokens];
    const ethToken = uniswapTokens.find(token => token.symbol === 'ETH');
    const usdtToken = uniswapTokens.find(token => token.symbol === 'USDT');
    this.$store.dispatch('setInputToken', ethToken);
    this.$store.dispatch('setOutputToken', usdtToken);
    this.$store.commit('setTokensList', uniswapTokens);
  },
  methods: {
    setSendTitle() {
      this.selectTokenTitle = tokenSelectionTitle.send
    },
    setGetTitle() {
      this.selectTokenTitle = tokenSelectionTitle.get
    },
    closeSelectTokenModal() {
      this.selectTokenTitle = ''
    },
    openManageTokens() {
      this.manageTokensOpen = true
    },
    closeManageTokens() {
      this.manageTokensOpen = false
    },
    openImportToken(token) {
      this.tokenToImport = {
        symbol: token.symbol,
        name: token.name,
        icon: token.icon,
        address: token.address
      }
    },
    closeImportToken() {
      this.tokenToImport = null
    },
    openSettings() {
      this.settingsOpen = true
    },
    closeSettings() {
      this.settingsOpen = false
    }
  }
}
</script>

<style>
@font-face {
  font-family: "TTFirsNeue";
  src: local("TTFirsNeue"),
  url(./fonts/TTFirsNeue/TTFirsNeue-Regular.ttf) format("truetype");
}
#app {
  font-family: TTFirsNeue, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  border-radius: 20px;
  width: 368px;
  background-color: white;
  border: 2px solid black;
  margin: auto;
  margin-top: 20px;
  padding: 16px;
  position: relative;
}
body {
 margin: 0;
}
</style>
