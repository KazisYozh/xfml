<template>
  <div class="footer">
    <div class="rate">
      <div>Rate</div>
      <div>1 {{ tokenOut }} = {{ rate || '0' }} {{ tokenIn }} (~${{ tokenOutFiatPerToken || '0' }})</div>
    </div>
    <div class="route">
      <div>Route</div>
      <div>{{ tokenIn }} > {{ tokenOut }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Get",
  computed: {
    tokenIn() {
      // const res = this.$store.state.inputToken.value ? this.$store.state.inputToken.value : 'ETH'
      return this.$store.getters.inputToken.symbol;
    },
    tokenOut() {
      // const res = this.$store.state.outputToken.value ? this.$store.state.outputToken.value : ' ';
      return this.$store.getters.outputToken.symbol;
    },
    tokenOutFiatPerToken() {
      return this.$store.getters.outputAmountFiatPerToken;
    },
    rate() {
      return this.$store.getters.rate;
    }
  },
}
</script>

<style>
.footer, .rate, .route {
  display: flex;
}
.footer {
 flex-direction: column;
  color: #71768A;
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  margin-bottom: 12px;
}
.rate {
  margin-bottom: 8px;
}
.rate, .route {
  display: flex;
  justify-content: space-between;
}
</style>