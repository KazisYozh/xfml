<template>
    <NestedModal :isOpen="open" class="settings-wrapper">
        <div class="settings-header">
            <el-button @click="defaultOptions">
                Reset
            </el-button>
            <span class="title">
                Settings
            </span>
            <CloseBtn :handleClose="handleClose" />
        </div>
        <GasPrice />
        <Slippage />
    </NestedModal>
</template>

<script>
import NestedModal from './NestedModal.vue'
import CloseBtn from './CloseBtn.vue'
import GasPrice from './GasPrice.vue'
import Slippage from './Slippage.vue'

export default {
    name: 'Settings',
    components: { NestedModal, CloseBtn, GasPrice, Slippage },
    props: ['open', 'handleClose'],
    methods: {
      defaultOptions() {
        this.$store.commit('setGasPriceCategory', 'Medium');
        this.$store.dispatch('setSlippage', 5);
        this.$store.commit('setCustomSlippage', '');
      }
    }
}
</script>

<style>
.settings-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
}
.settings-header .el-button {
    border-radius: 8px;
    background-color: #F0F2FA;
    color: #71768A;
    padding: 4px 8px;
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
    border: none;
}
.settings-header .el-button:hover {
    border: none;
    color: #71768A;
    background-color: #E4E8F2;
    transition: all .2s ease-out;
}
.settings-header .title {
    color: #15151F;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
}
</style>