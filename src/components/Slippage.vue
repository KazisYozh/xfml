<template>
  <div class="slippage-wrapper">
    <div class="header">
      <img :src="slippageIcon" class="slippage-icon"/>
      <span class="title">Slippage tolerance</span>
      <InfoTooltip placement="bottom"
                   content="Your transaction well revert if the price changes unfavorably by more than this percentage"/>
    </div>
    <div class="slippage-option-wrapper">
      <el-radio-group v-model="input_value" size="small" class="radio-group">
        <el-radio-button label="0.3%" class="radio-button"></el-radio-button>
        <el-radio-button label="0.5%" class="radio-button"></el-radio-button>
        <el-radio-button label="1%" class="radio-button"></el-radio-button>
        <el-radio-button label="5%" class="radio-button"></el-radio-button>
        <input type="number" v-maxlen="2" maxlength="2"  placeholder="Custom" v-model="custom_input_value" class="custom" :required="!!custom_input_value">
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import InfoTooltip from './InfoTooltip.vue';
import slippage from '../assets/icons/slippage.png';

export default {
  name: 'Slippage',
  components: { InfoTooltip,  },
  data() {
    return {
      slippageIcon: slippage
    }
  },
  methods: {
    handleGasCategorySelect(category) {
        this.$store.commit('setGasPriceCategory', category)
    },
  },
  computed: {
    selected() {
        return this.$store.getters.gasPriceCategory
    },

    input_value: {
      get() {
        return this.$store.getters.slippage + '%';
      },

      set(value) {
        this.$store.commit('setCustomSlippage', '');
        const checkValue = value.includes('%') ? value.slice(0, -1) : value;
        this.$store.dispatch('setSlippage', checkValue);

        console.log('getters.slippage', this.$store.getters.slippage);
      }
    },

    custom_input_value: {
      get() {
        console.log('getters.customSlippage', this.$store.getters.customSlippage);
        const customSlippage = this.$store.getters.customSlippage;
        const result = customSlippage;
        return result;
      },

      set(value) {
        console.log('set value', value);
        const checkNumber = Number(value) >= 50 ? 49 : Number(value);
        if(checkNumber) {
          console.log('check value', checkNumber);
          this.$store.dispatch('setSlippage', '');
          this.$store.commit('setCustomSlippage', String(checkNumber));
        } else {
          this.$store.commit('setCustomSlippage', '');
        }
      }
    }
  }
}
</script>

<style>
.slippage-wrapper {
    padding: 0px 16px;
}
.slippage-wrapper .header {
    display: flex;
    margin-bottom: 12px;
}
.slippage-wrapper .slippage-icon {
    width: 38px;
    height: 38px;
}
.slippage-wrapper .title {
    color: #15151F;
    font-weight: 600;
    font-size: 18px;
    line-height: 20px;
    margin-left: 12px;
    margin-right: 5px;
}
.slippage-option-wrapper {
    background-color: #F0F2FA;
    display: flex;
    align-items: center;
    border-radius: 12px;
    padding: 4px;
}

.slippage-option-wrapper .radio-group .el-radio-button--small .el-radio-button__inner:hover {
  color: black;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.5);
}
.slippage-option-wrapper .radio-group .el-radio-button--small .el-radio-button__inner {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 14px;
  width: 66px;
  height: 36px;
  background-color: #F0F2FA;
  border: none;
  margin-right: 4px;
}

.slippage-option-wrapper .radio-group .el-radio-button--small:last-child .el-radio-button__inner{
  width: 80px;
  margin: 0;
}

.slippage-option-wrapper .radio-group .custom,
.slippage-option-wrapper .radio-group .custom:invalid {
  font-family: "TTFirsNeue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  width: 80px;
  height: 36px;
  text-align: center;
  outline: none;
  border: none;
  background-color: #F0F2FA;
  font-weight: 600;
  padding: 0;
}

.slippage-option-wrapper .radio-group .custom:focus {
  color: black !important;
}

.slippage-option-wrapper .radio-group .custom:focus,
.slippage-option-wrapper .radio-group .custom:required {
  color: #6D38FF;
  font-size: 14px;
  background-color: white !important;
  border-radius: 8px;
  border: none;
}

.slippage-option-wrapper .radio-group .custom:focus::-webkit-input-placeholder {
  color: transparent !important;
}

.slippage-option-wrapper .radio-group .custom::-webkit-input-placeholder {
  font-weight: 400;
}

.slippage-option-wrapper .radio-group .custom:hover::-webkit-input-placeholder,
.slippage-option-wrapper .radio-group .custom:hover {
  cursor: pointer;
  color: black;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.5);
}


.slippage-option-wrapper .radio-group .el-radio-button__orig-radio:checked+.el-radio-button__inner {
  color: #6D38FF;
  font-weight: 600;
  background-color: white;
  border-radius: 8px;
  border: none;
  box-shadow: 0px 0px 0px 1px rgba(0, 44, 94, 0.05), 0px 3px 6px -1px rgba(0, 44, 94, 0.15) !important;
}

</style>