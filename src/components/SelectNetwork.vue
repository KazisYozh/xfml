<template>
  <el-select v-model="value" value-key="value" placeholder="Select" class="network" v-on:change="setNetwork">
    <template slot="prefix"><img class="prefix" :src="value.photo" /></template>
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item">
      <img class="inSelect" :src="item.photo">
      <span>{{ item.label }}</span>
    </el-option>
  </el-select>
</template>

<script>
import eth from '../assets/network-icons/eth.svg'
import opt from '../assets/network-icons/opt.svg'
import bnb from '../assets/network-icons/bnb.svg'
import arbitrum from '../assets/network-icons/arbitrum.svg'
import polygon from '../assets/network-icons/polygon.svg'
import {ChainID} from '../utils'

export default {
  name: "SelectNetwork",
  mounted() {
    this.setNetwork(this.value);
  },
  data() {
    return {
      options: [
          {
        value: ChainID.Ethereum,
        label: 'Ethereum',
        photo: eth
      }, {
        value: ChainID.BSC,
        label: 'BSC Mainnet',
        photo: bnb
      }, {
        value: ChainID.Polygon,
        label: 'Polygon',
        photo: polygon
      }, {
        value: ChainID.Optimism,
        label: 'Optimism',
        photo: opt
      }, {
        value: ChainID.Arbitrum,
        label: 'Arbitrum',
        photo: arbitrum
      }],
      value: null
    }
  },
  created() {
    this.value = this.options.find(option => option.value === this.$store.getters.network)
  },
  methods: {
    setNetwork(network) {
      this.$store.dispatch('setNetwork', network.value);
    }
  }
}
</script>

<style>
.el-scrollbar__wrap::-webkit-scrollbar {
  width: 0;
}
.el-select-dropdown__wrap, .el-scrollbar__wrap {
  overflow: hidden;
}
.prefix {
  margin-top: 10px;
}
img {
  width: 24px;
  height: 24px;
}
.inSelect {
  margin-right: 7px;
}
.el-popper[x-placement^=bottom] {
  margin-top: 8px;
}
.el-popper .popper__arrow {
  display: none;
}
.el-input__prefix {
  left: 12px;
}
.el-input--prefix .el-input__inner {
  padding-left: 44px;
}
.el-select-dropdown {
  box-shadow: none;
  border: none;
}
.el-input__inner {
  color: black;
  font-weight: 600;
  height: 44px;
  background: #F0F2FA;
  border: none;
  border-radius: 12px;
  font-family: TTFirsNeue, Avenir, Helvetica, Arial, sans-serif;
}
.el-select-dropdown__list {
  border-radius: 12px;
  font-weight: 600;
  background: #F0F2FA;
  font-family: TTFirsNeue, Avenir, Helvetica, Arial, sans-serif;
}
.el-select-dropdown__item:nth-last-child(n+2) {
  border-bottom: 2px solid white;
}
.el-select-dropdown__item:first-child {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
.el-select-dropdown__item:last-child {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}
.el-select-dropdown__item.hover {
  background-color: #E4E8F2;
}
.el-select-dropdown__item.selected {
  font-weight: 600;
  color: #8a60ff;
}
.el-select-dropdown__item {
  color: black;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 0 12px;
  height: 44px;
}
.el-scrollbar__view, .el-select-dropdown__list{
  padding: 0px;
}
.el-select__caret {
  font-weight: 900;
}

.network .el-select:hover .el-select__caret {
  color: #8a60ff;
}
.network .el-select:hover .el-input__inner {
  background-color: #E4E8F2;
}

.el-popper {
  border-radius: 12px;
}
</style>