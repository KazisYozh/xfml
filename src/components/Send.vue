<template>
  <div class="send">
    <div class="header">
      <div class="title">Send</div>
      <div class="balance">
        <div class="currentBalance" >Balance: {{balanceInput || '0'}}</div>
        <div class="btnMaxBalance" v-on:click="maxBalance">MAX</div>
      </div>
    </div>
    <Slider />
    <div class="inputToken">
      <div class="input">
        <el-input placeholder="0" v-model="input_value" type="number"></el-input>
        <div class="approximateValue">≈${{inputAmountValueUSD || '0'}}</div>
      </div>
      <div>
        <SelectTokenBtn :selectedTokenSymbol="selectedTokenSymbol" :handleClick="openTokenSelectionModal" />
      </div>
    </div>
  </div>
</template>

<script>
import Slider from './Slider.vue';
import SelectTokenBtn from "./SelectTokenBtn.vue";
import {debounce} from "@/utils";

export default {
  name: "Send",
  props: ['openTokenSelectionModal'],
  watch: {
    input_value: function (value) {
      console.log('value', value)
      if(this.$store.getters.incomingValue === 'In')
        this.debouncedCalcAmountOut(value)
    }
  },
  created() {
    this.debouncedCalcAmountOut = debounce(this.inputMethod, 1000);
  },
  computed: {
    balanceInput() {
      return this.$store.getters.balanceInput;
    },
    input_value: {
      get() {
        return this.$store.getters.inputAmountValue;
      },
      set(value) {
        this.$store.dispatch('setIncomingValue', 'In');
        if (value) {
          this.$store.dispatch('setInputAmountValue', value);
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
    inputAmountValueUSD() {
      return this.$store.getters.inputAmountValueUSD;
    },
    selectedTokenSymbol() {
      return this.$store.getters.inputToken.symbol;
    }
  },
  methods: {
    async inputMethod(value) {
      if (value) {
        await this.$store.dispatch('routeInput');
        const route = this.$store.getters.autoRouterInput;
        console.log('route outputAmount', route.outputAmount);
        this.$store.dispatch('setOutputAmountValue', route.outputAmount);
        await this.$store.dispatch('inputUSDValue');
        await this.$store.dispatch('outputUSDValue');
      }
    },
    setTokenIn(token) {
      this.$store.dispatch("setInputToken", token);
      this.$store.dispatch("setInputAmountValue", '');
      this.$store.dispatch("setOutputAmountValue", '');
    },
    async maxBalance() {
      this.$store.dispatch('setInputAmountValue', this.$store.getters.balanceInput.toString());

      await this.$store.dispatch("subGraph");

      if (this.$store.getters.inputToken.value === 'ETH') {
        const outputValue = Math.round(Number(this.$store.getters.inputAmountValue * this.$store.getters.graphResponse.token1Price) * 10000) / 10000;
        this.$store.dispatch("setOutputAmountValue", outputValue.toString());
      } else {
        const outputValue = Math.round(Number(this.$store.getters.inputAmountValue / this.$store.getters.graphResponse.token1Price) * 10000) / 10000;
        this.$store.dispatch("setOutputAmountValue", outputValue.toString());
      }
    },
  },
  components: {
    SelectTokenBtn,
    Slider,
  },
}
</script>

<style>
.inputToken {
  display: flex;
  justify-content: space-between;
}
.send {
  background-color: #F0F2FA;
  border-radius: 12px;
  padding: 12px 16px 8px 16px;
  margin-bottom: 4px;
}
.header, .balance {
  display: flex;
  align-items: center;
}
.send .header {
  justify-content: space-between;
  margin-bottom: 8px;
  height: 16px;
}
.currentBalance {
  margin-right: 8px;
  font-size: 12px;
  color: #71768A;
}
.btnMaxBalance {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 16px;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  background-color: #FFFFFF;
  color: #71768A;
  border-radius: 4px;
  cursor: pointer;
}
.btnMaxBalance:hover {
  color: #FFFFFF;
  background-color: #6D38FF;
}
.input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.input div input {
  padding: 0;
  border-radius: 0;
  height: 20px;
}
.approximateValue {
  display: flex;
  align-items: flex-start;
  font-size: 12px;
  color: #71768A;
  width: 100%;
  overflow: hidden;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>