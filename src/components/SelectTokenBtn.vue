<template>
  <el-button class="select-button" v-on:click="handleClick">
    <img :src="selected.logoURI" />
    <span>{{ selected.symbol }}</span>
    <div class="icon-chevron-down" />
  </el-button>
</template>

<script>
// import {mockTokenSelectionOptions} from '../utils/__mocks__';
import chevron_down from '../assets/icons/chevron-down.svg';
import none_symbol from '../assets/icons/none-icon.svg';

export default {
  name: "SelectTokenBtn",
  props: ["selectedTokenSymbol", "handleClick"],
  data() {
    return {
      chevron_icon: chevron_down
    }
  },
  computed: {
    selected() {
      // return  mockTokenSelectionOptions.find(option => option.symbol === this.selectedTokenSymbol) ?? {
      //   icon: none_symbol,
      //   symbol: this.selectedTokenSymbol
      // }
      const tokens = this.$store.getters.tokensList;
      return  tokens.find(option => option.symbol === this.selectedTokenSymbol) ?? {
        icon: none_symbol,
        symbol: this.selectedTokenSymbol
      }
    }
  }
}
</script>

<style>
div .select-button {
  font-family: TTFirsNeue, Avenir, Helvetica, Arial, sans-serif;
  color: #15151F;
  font-weight: 600;
  padding: 8px;
  height: 40px;
  border: none;
  border-radius: 12px;
}
div .select-button img {
  width: 24px;
  height: 24px;
}
div .select-button:hover {
  background-color: #FFFFFF;
  color: #6D38FF;
}
div .select-button:hover .icon-chevron-down {
  background: url("../assets/icons/chevron-down-purple.svg");
}
div .select-button span {
  display: flex;
  align-items: center;
}
div .select-button span span {
  margin-left: 8px;
  margin-right: 10px;
}
div .select-button img {
  margin-top: 0px;
}
div .icon-chevron-down {
  background: url("../assets/icons/chevron-down.svg");
  width: 10px;
  height: 6px;
}
div .select-button i {
  margin-left: 10px;
}
</style>