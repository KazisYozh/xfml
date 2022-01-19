<template>
    <NestedModal :isOpen="!!tokenToImport" :zIndex="1020">
        <div class="import-token-header">
            <BackBtn :handleClick="closeModal" />
            <span class="token-selection-title">Import a token</span>
        </div>
        <section class="token-item-wrapper import-token-item">
            <aside>
                <img :src="tokenToImport.icon" class="token-icon" />
            </aside>
            <div class="fields-wrapper">
                <div class="left">
                    <span>
                        {{ tokenToImport.symbol }}
                    </span>
                    <span>
                        {{ tokenToImport.name }}
                    </span>
                </div>
                <div class="link-icon-btn-wrapper">
                    <LinkBtn url='http://test' />
                </div>
            </div>
        </section>
        <div class="import-token-address"> 
            <span>
                {{ tokenToImport.address }}
            </span>
        </div>
        <div class="import-token-disclaimer">
            <div class="disclaimer-title">
                <div class="alert-circle-icon"></div>
                <span>Trade at your own risk</span>
            </div>
                <p>
                    This token doesn’t appear on the active token list. Make sure this is the token that you want to trade.
                </p>
                <p>
                    Anyone can create a token, including creating fake versions of existing tokens that claim to represent projects.
                </p>
                <p>
                    If you purchase this token, you may not be able to sell it back. Do your own research.
                </p>
        </div>
        <div class="import-token-checkbox-wrapper">
            <el-checkbox v-model="checked">Ok, I understand it</el-checkbox>
        </div>
        <div class="import-token-button-wrapper">
            <el-button :disabled="!checked" @click="importToken(tokenToImport)" class="import-token-button">
                Import
            </el-button>
        </div>
    </NestedModal>
</template>

<script>
import NestedModal from './NestedModal.vue';
import BackBtn from './BackBtn.vue';
import LinkBtn from './LinkBtn.vue';
import {LocalStorageKeys} from '../utils/constants';

export default {
    name: 'ImportToken',
    components: { NestedModal, BackBtn, LinkBtn },
    props: ['tokenToImport', 'closeModal'],
    data() {
        return {
            checked: false
        }
    },
    methods: {
        importToken(token) {
            const existingTokens = JSON.parse(localStorage.getItem(LocalStorageKeys.eth_imported_tokens)) ?? [];
            localStorage.setItem(LocalStorageKeys.eth_imported_tokens, JSON.stringify([...existingTokens, {...token, tokenAmount: 0}]));
            
            this.closeModal();
            this.$store.commit('setSearchInput', '');
        }
    }
}
</script>

<style>
.import-token-header {
    padding: 16px 12px 0 12px;
    display: flex;
    align-items: center;
}
.import-token-item {
    padding-bottom: 0;
}
.link-icon-btn-wrapper {
    display: flex;
    justify-content: flex-end;
}
.import-token-address {
    display: flex;
    margin: 0 16px;
    line-height: 16px;
}
.import-token-address span {
    color: #15151F;
    font-size: 14px;
}
.import-token-disclaimer {
    margin: 32px 16px 0px 16px;
    border-radius: 12px;
    padding: 12px 16px 4px 16px;
    background-color: #FFEBF1;
}
.import-token-disclaimer .disclaimer-title {
    display: flex;
}
.import-token-disclaimer .disclaimer-title span {
    font-weight: 600;
    color: #DA0049;
    line-height: 20px;
}
.alert-circle-icon {
    width: 20px;
    height: 20px;
    background: url('../assets/icons/alert-circle-icon.svg')
}
.import-token-disclaimer .disclaimer-title .alert-circle-icon {
    margin-right: 10px;
}
.import-token-disclaimer p {
    text-align: left;
    font-size: 14px;
    color: #15151F;
    margin: 12px 0;
    line-height: 16px;
}
.import-token-checkbox-wrapper {
    text-align: left;
    background-color: #F0F2FA;
    border-radius: 12px;
    padding: 14px 16px;
    margin: 8px 16px;
}
.el-checkbox__label {
    color: #15151F;
    line-height: 16px;
}
.el-checkbox__input.is-checked+.el-checkbox__label {
    color: #15151F;
}
.import-token-checkbox-wrapper .el-checkbox .el-checkbox__input .el-checkbox__inner {
    width: 20px;
    height: 20px;
}
.import-token-checkbox-wrapper .el-checkbox .el-checkbox__input .el-checkbox__inner::after {
    height: 10px;
    width: 5px;
    left: 6px;
    top: 1px;
    border-width: 2px;
    border-radius: 0px;
}
.import-token-checkbox-wrapper .el-checkbox .el-checkbox__inner:hover {
    border-color: #511CE3;
}
.import-token-checkbox-wrapper .el-checkbox .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #511CE3;
}
.import-token-checkbox-wrapper .el-checkbox .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #511CE3;
    border-color: #511CE3;
}
.import-token-button-wrapper {
    padding: 0px 16px 10px 16px;
}
.import-token-button {
    color: #FFFFFF;
    border-radius: 12px;
    background: linear-gradient(93.58deg, #3246FF 0%, #AD26FF 100%);
    width: 100%;
    padding: 16px 0;
    transition: all .2s ease-out;
    font-weight: 600;
    font-size: 16px;
}
.import-token-button:hover {
    background: linear-gradient(93.58deg, #3763FF 0%, #C726FF 100%);
    box-shadow: 0px 16px 12px -16px rgba(4, 0, 185, 0.4);
    color: #fff;
}
.import-token-button.is-disabled {
    background: linear-gradient(93.58deg, #3246FF 0%, #AD26FF 100%);
    opacity: 0.36;
}
.import-token-button.is-disabled:hover {
    background: linear-gradient(93.58deg, #3246FF 0%, #AD26FF 100%);
    box-shadow: none;
}
</style>