<template>
  <div class="network">
    <SelectNetwork />
    <div class="account" v-show="account" @click="logOut">
      <div class="wallet">
        <div class="balance">{{balance}} ETH</div>
        <div class="accountAddress">{{account}}</div>
      </div>
      <img class="walletConnectIcon" :src="icons.walletConnectIcon">
    </div>
  </div>
</template>

<script>
// import Web3 from 'web3';
import SelectNetwork from './SelectNetwork'
import wltcnct from '../assets/icons/wltcnct.svg'

// let acc;

export default {
  name: "Network",
  // methods: {
    // balance: async () => {
    //   const account = this.$store.state?.account;
    //   let balance = await this.$store.state?.web3.eth.getBalance(account);
    //   return balance;
    // }
  // },
  data() {
    return {
      icons: {
        walletConnectIcon: wltcnct,
      },
    }
  },
  // async created() {
  //   const account = this.$store.state?.account;
  //   this.balance = await this.$store.state?.web3.eth.getBalance(account);
  //   console.log('bal', this.balance);
  // },
  computed: {
    account() {
      const acc = this.$store.state?.account;
      if (!acc) {
        return '';
      }
      const first = acc.slice(0, 9);
      const last = acc.slice(-7);
      return first + '...' + last;
    },
    balance() {
      return this.$store.getters.balance;
    }
  },
  components: {
    SelectNetwork,
  },
  methods: {
    logOut() {
      this.$store.dispatch('logOut')
    }
  }
}
</script>

<style scoped>

.network {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 44px;
  margin-bottom: 8px;
}
.account {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: 12px;
  background-color: #F0F2FA;
  margin-left: 8px;
  /*margin-right: 8px;*/
  cursor: pointer;
}
.wallet {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.balance {
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  color: black;
}
.accountAddress {
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #71768A;
}
.walletConnectIcon {
  margin: 0 8px;
}
</style>