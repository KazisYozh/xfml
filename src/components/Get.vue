<template>
  <div class="get">
    <div class="main">
      <div class="headerGet">
        <div>Get<span class="estimated"> (estimated)</span></div>
        <div class="getBalance">Balance: {{balanceOutput || '0'}}</div>
      </div>
      <div class="outputToken">
        <div class="input">
          <el-input placeholder="0" v-model="output_value" type="number"></el-input>
          <div class="approximateValue">≈${{outputAmountValueUSD || '0'}}</div>
        </div>
        <div>
          <SelectTokenBtn :selectedTokenSymbol="selectedTokenSymbol" :handleClick="openTokenSelectionModal" />
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import SelectTokenBtn from "./SelectTokenBtn";
import {debounce} from "@/utils";

export default {
  name: "Get",
  props: ['openTokenSelectionModal'],
  components: {
    SelectTokenBtn,
  },
  watch: {
    output_value: function (value) {
      console.log('value', value)
      if (this.$store.getters.incomingValue === 'Out') {
        this.debouncedCalcAmountIn(value);
      }
    }
  },
  created() {
    this.debouncedCalcAmountIn = debounce(this.outputMethod, 1000);
  },
  computed: {
    balanceOutput() {
      return this.$store.getters.balanceOutput;
    },
    changeToken() {
      return this.$store.getters.outputToken;
    },
    output_value: {
      get() {
        return this.$store.getters.outputAmountValue;
      },
      set(value) {
        this.$store.dispatch('setIncomingValue', 'Out');
        if (value) {
          this.$store.dispatch('setOutputAmountValue', value);
        } else {
          this.$store.dispatch('setInputAmountValue', '');
          this.$store.dispatch('setOutputAmountValue', '');
          this.$store.commit('setOutputAmountFiatPerToken', '');
          this.$store.commit('setRate', '');
          this.$store.commit('setInputAmountValueUSD', '');
          this.$store.commit('setOutputAmountValueUSD', '');
        }
      }
    },
    outputAmountValueUSD() {
      return this.$store.getters.outputAmountValueUSD;
    },
    selectedTokenSymbol() {
      return this.$store.getters.outputToken.symbol;
    }
  },
  methods: {
    async outputMethod(value) {
      console.log(22);
      if (value) {
        await this.$store.dispatch('routeOutput');
        const route = this.$store.getters.autoRouterOutput;
        console.log('route inputAmount', route.inputAmount);
        this.$store.dispatch('setInputAmountValue', route.inputAmount);
        await this.$store.dispatch('outputUSDValue');
        await this.$store.dispatch('inputUSDValue');
      }
    },
    setTokenOut(token) {
      this.$store.dispatch("setOutputToken", token);
      this.$store.dispatch("setOutputAmountValue", '');
      this.$store.dispatch("setOutputAmountValue", '');
    }
  }
}
</script>

<style>
.get {
  height: 124px;
  border: 2px solid #F0F2FA;
  border-radius: 12px;
  margin-bottom: 16px;
}
.main {
  display: flex;
  flex-direction: column;
  height: 78px;
  padding: 10px 14px 0px 14px;
  background-color: #F0F2FA;
  border-radius: 12px;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
}
.headerGet {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin-bottom: 12px;
}
.estimated, .getBalance {
  color: #71768A;
  font-size: 12px;
}
.outputToken {
  display: flex;
  justify-content: space-between;
}
</style>