<template>
    <div class="gas-price-wrapper">
        <div class="header">
            <img :src="gasIcon" class="gas-icon" />
            <span class="title">Gas price</span>
            <InfoTooltip placement="bottom" content="Setting a high gas price can help transactions succeed, but the transaction fee will be higher. Use with caution." />
        </div>
        <div>
            <div v-for="option in options" :key="option.category" class="gas-option-wrapper">
                <RadioBtn :selected="selected === option.category" :handleSelect="() => handleGasCategorySelect(option.category)" />
                <div class="gas-info">
                    <div class="category-and-time">
                        <span class="category">{{ option.category }}</span>
                        <span class="time">{{ option.time }}</span>
                    </div>
                    <span class="price">{{ option.price }}</span>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import InfoTooltip from './InfoTooltip.vue';
import gas_pump from '../assets/icons/gas-pump.png';
import RadioBtn from './RadioBtn.vue';
// import {gasOptionsMock} from '../utils/__mocks__';

export default {
    name: 'GasPrice',
    components: { InfoTooltip, RadioBtn },
    data() {
        return {
            gasIcon: gas_pump,
            // options: gasOptionsMock
        }
    },
    methods: {
        handleGasCategorySelect(category) {
            this.$store.commit('setGasPriceCategory', category);
        }
    },
    computed: {
        selected() {
            return this.$store.getters.gasPriceCategory
        },

        options() {
            return this.$store.getters.gasOptions
        }
    }
}
</script>

<style>
.gas-price-wrapper {
    padding: 0px 16px;
    margin-bottom: 16px;
}
.gas-price-wrapper .header {
    display: flex;
    margin-bottom: 8px;
}
.gas-price-wrapper .gas-icon {
    width: 38px;
    height: 38px;
}
.gas-price-wrapper .title {
    color: #15151F;
    font-weight: 600;
    font-size: 18px;
    line-height: 20px;
    margin-left: 12px;
    margin-right: 5px;
}
.gas-option-wrapper {
    background-color: #F0F2FA;
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    border-radius: 12px;
    padding: 12px 16px;
}
.gas-option-wrapper .gas-info {
    width: calc(100% - 32px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 12px;
}
.gas-info .category-and-time {
    display: flex;
    flex-direction: column;
    text-align: left;
}
.gas-info .category-and-time .category {
    color: #15151F;
    font-size: 14px;
    font-weight: 600;
    line-height: 16px;
}
.gas-info .category-and-time .time {
    color: #71768A;
    font-size: 12px;
    line-height: 16px;
}
.gas-info .price {
    color: #15151F;
    font-size: 14px;
    line-height: 16px;
}

</style>