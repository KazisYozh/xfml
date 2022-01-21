<template>
    <div class="block">
      <el-slider
          v-model="value"
          :step="10"
          show-stops
          v-on:change="setAmount">
      </el-slider>
    </div>
</template>

<script>

export default {
  name: "Slider",
  data() {
    return {
      value: 0
    }
  },
  methods: {
    async setAmount() {
      const balance = this.$store.getters.balanceInput;
      const amountCalc = Math.round((balance * this.value / 100) * 10000) / 10000;
      this.$store.dispatch('setInputAmountValue', amountCalc.toString());

      await this.$store.dispatch("subGraph");

      if (this.$store.getters.inputToken.value === 'ETH' && this.$store.getters.outputToken.value === 'USDT') {
        const outputValue = Math.round(Number(this.$store.getters.inputAmountValue * this.$store.getters.graphResponse.token1Price) * 10000) / 10000;
        this.$store.dispatch("setOutputAmountValue", outputValue.toString());
      } else if (this.$store.getters.inputToken.value === 'USDT' && this.$store.getters.outputToken.value === 'ETH') {
        const outputValue = Math.round(Number(this.$store.getters.inputAmountValue / this.$store.getters.graphResponse.token1Price) * 10000) / 10000;
        this.$store.dispatch("setOutputAmountValue", outputValue.toString());
      }

      if (this.$store.getters.inputToken.value === 'ETH' && this.$store.getters.outputToken.value === 'DAI') {
        const outputValue = Math.round(Number(this.$store.getters.inputAmountValue * this.$store.getters.graphResponse.token0Price) * 10000) / 10000;
        this.$store.dispatch("setOutputAmountValue", outputValue.toString());
      } else if (this.$store.getters.inputToken.value === 'DAI' && this.$store.getters.outputToken.value === 'ETH') {
        const outputValue = Math.round(Number(this.$store.getters.inputAmountValue / this.$store.getters.graphResponse.token0Price) * 10000) / 10000;
        this.$store.dispatch("setOutputAmountValue", outputValue.toString());
      }

      if (this.$store.getters.inputToken.value === 'USDT' && this.$store.getters.outputToken.value === 'DAI') {
        const outputValue = Math.round(Number(this.$store.getters.inputAmountValue * this.$store.getters.graphResponse.token0Price) * 10000) / 10000;
        this.$store.dispatch("setOutputAmountValue", outputValue.toString());
      } else if (this.$store.getters.inputToken.value === 'DAI' && this.$store.getters.outputToken.value === 'USDT') {
        const outputValue = Math.round(Number(this.$store.getters.inputAmountValue / this.$store.getters.graphResponse.token0Price) * 10000) / 10000;
        this.$store.dispatch("setOutputAmountValue", outputValue.toString());
      }
    }
  }
}
</script>

<style>
.block .el-slider__runway {
  margin: 0;
  margin-bottom: 16px;
  height: 4px;
}
.block .el-slider__bar {
  height: 4px;
  background: linear-gradient(
      93.58deg, #3246FF 0%, #AD26FF 100%);
}
.block .el-slider__stop {
  height: 4px;
  width: 4px;
}
.block .el-slider__button-wrapper {
  z-index: 100;
  top: -16px;
}
.block .el-slider__button {
  width: 4px;
  height: 4px;
  border: 4px solid #A12AFF;
}
</style>