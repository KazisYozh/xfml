<template>
    <NestedModal :isOpen="isOpen" :zIndex="1010">
        <div class="token-selection-header">
            <BackBtn :handleClick="closeModal" />
            <span class="token-selection-title">Manage tokens</span>
        </div>
        <div class="token-selection-input-holder">
            <SearchInput placeholder="Search name or paste address" />
        </div>
        <TokenList v-if="importedTokens.length > 0" :tokens="importedTokens" />
        <ListIsEmpty :title="`List is empty`" :subtitle="`Can’t find any custom token`" :show="importedTokens.length < 1" />
        <div v-if="importedTokens.length > 0" class="manage-tokens-footer">
            <span v-if="!confirmClear" class="text">{{ importedTokens.length }} custom tokens</span>
            <span v-if="confirmClear" class="text black-bold">Are you sure you want to delete all tokens?</span>
            <div class="buttons">
                <el-button v-on="{ click: confirmClear ? clearAll : openConfirmClear }">
                    Clear all
                </el-button>
                <el-button v-if="confirmClear" @click="cancelClear">
                    Cancel
                </el-button>
            </div>
        </div>
    </NestedModal>
</template>

<script>
import NestedModal from './NestedModal.vue'
import BackBtn from './BackBtn.vue'
import ListIsEmpty from './ListIsEmpty.vue'
import TokenList from './TokenList.vue'
import SearchInput from './SearchInput.vue'
import {LocalStorageKeys} from '../utils';

export default {
    name: 'ManageTokens',
    components: { NestedModal, BackBtn, ListIsEmpty, TokenList, SearchInput },
    props: ['isOpen', 'closeModal'],
    data() {
        return {
            importedTokens: [],
            searchInput: '',
            confirmClear: false
        }
    },
    created() {
        const importedTokens = JSON.parse(localStorage.getItem(LocalStorageKeys.eth_imported_tokens));
        
        this.importedTokens = importedTokens.map(token => ({
            ...token,
            buttons: {
                delete: () => {
                    if (!token.address) return;
                    const itemsWithoutCurrentToken = importedTokens.filter(t => t.address !== token.address);
                    if (itemsWithoutCurrentToken.length < 1) {
                        localStorage.removeItem(LocalStorageKeys.eth_imported_tokens);
                    } else {
                        localStorage.setItem(LocalStorageKeys.eth_imported_tokens, JSON.stringify(itemsWithoutCurrentToken));
                    }
                    this.importedTokens = itemsWithoutCurrentToken
                },
                link: `https://etherscan.io/token/${token.address}`
            }
        }));
    },
    methods: {
        openConfirmClear() {
            this.confirmClear = true;
        },
        cancelClear() {
            this.confirmClear = false;
        },
        clearAll() {
            localStorage.removeItem(LocalStorageKeys.eth_imported_tokens);
            this.importedTokens = [];
            this.confirmClear = false;
        }
    }
}
</script>

<style>
.manage-tokens-footer {
    z-index: 100;
    border-top: 1px solid #E4E8F2;
    background: #fff;
    width: 100%;
    padding: 16px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 0;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}
.manage-tokens-footer .text {
    font-size: 14px;
    line-height: 16px;
    color: #71768A;
    margin-left: 16px;
    padding-right: 24px;
}
.manage-tokens-footer .text.black-bold {
    font-weight: 600;
    color: #15151F;
    text-align: left;
}
.manage-tokens-footer .buttons {
    display: flex;
    margin-right: 16px;
    margin-left: 24px;
}
.manage-tokens-footer .buttons .el-button {
    border-radius: 8px;
    background-color: #F0F2FA;
    color: #15151F;
    padding: 8px 12px;
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
    border: none;
}
.manage-tokens-footer .buttons .el-button:hover {
    border: none;
    background-color: #E4E8F2;
    transition: all .2s ease-out;
}
</style>