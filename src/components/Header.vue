<template>
  <div class="header">
    <div class="tabs">
      <div class="tab">Swap</div>
      <div class="tab">Buy/Sell</div>
      <div class="tab">DEX</div>
    </div>
    <div class="settings">
      <div class="setting refresh"></div>
      <div class="setting gas" @click="openSettings"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['openSettings']
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 12px;
}

.tabs {
  display: flex;
}
.tab:last-child {
  cursor: pointer;
}
.tab:nth-last-child(n+2) {
  margin-right: 20px;
  color: #71768A;
  opacity: 0.6;
}

.settings {
  display: flex;
}
.setting:nth-last-child(n+2) {
  margin-right: 8px;
}
.setting {
  height: 32px;
  width: 32px;
  box-sizing: border-box;
  cursor: pointer;
}
.refresh {
  background: url('../assets/settings-icons/refresh.svg');
}
.refresh:hover {
  background: url('../assets/settings-icons/refresh-hover.svg');
}
.gas {
  background: url('../assets/settings-icons/gas.svg');
}
.gas:hover {
  background: url('../assets/settings-icons/gas-hover.svg');
}

</style>