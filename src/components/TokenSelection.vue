<template>
    <NestedModal :isOpen="!!title">
        <div class="token-selection-header">
            <BackBtn :handleClick="closeModal" />
            <span class="token-selection-title">{{ title }}</span>
        </div>
        <div class="token-selection-input-holder">
            <SearchInput placeholder="Search name or paste address" />
        </div>
        <TokenList v-if="options.length > 0" :tokens="options" :selectedSymbol="selectedTokenSymbol" :disabledSymbol="disabledSymbol" :handleItemClick="handleTokenSelection" />
        <ListIsEmpty :show="options.length === 0" :title="`Nothing founded`" :subtitle="`We can’t find this token`" />
        <TokenSelectionFooter :handleClick="openManageTokens" />
    </NestedModal>
</template>

<script>
import {utils, Contract} from 'ethers';
import NestedModal from './NestedModal.vue';
import BackBtn from './BackBtn.vue';
import TokenList from './TokenList.vue';
import TokenSelectionFooter from './TokenSelectionFooter.vue';
import ListIsEmpty from './ListIsEmpty.vue';
import SearchInput from './SearchInput.vue';
import {tokenSelectionTitle, LocalStorageKeys, populateTokensWithBalances, populateTokensWithUSDCBalances, debounce} from '../utils';
import none_icon from '../assets/icons/none-icon.svg';
import genericERC20Abi from '../assets/ABI/ERC20ABI.json';

export default {
    name: 'TokenSelection',
    props: ['title', 'closeModal', 'openManageTokens', 'openImportToken'],
    components: { NestedModal, BackBtn, SearchInput, TokenList, ListIsEmpty, TokenSelectionFooter },
    data() {
        return {
            importedTokens: [],
            fetchedTokens: this.$store.getters.tokensList.filter(token => token.chainId === this.$store.getters.network),
            disabledSymbol: this.title === tokenSelectionTitle.send 
            ? this.$store.getters.outputToken.symbol
            : this.title === tokenSelectionTitle.get
                ? this.$store.getters.inputToken.symbol
                : '',
            options: []
        }
    },
    watch: {
        searchInput: function (input) {
            this.debouncedGetTokensList(input)
        }
    },
    created() {
        this.getTokensList();
        this.debouncedGetTokensList = debounce(this.getTokensList, 100);
    },
    methods: {
        async getTokensList(searchInput) {
            if (!searchInput) return this.options = [...this.fetchedTokens, ...this.importedTokens];

            const isValidAddress = utils.isAddress(searchInput);

            if (isValidAddress && this.$store.getters.etherWeb3Provider) {
                const erc20Contract = new Contract(searchInput, genericERC20Abi, this.$store.getters.etherWeb3Provider);
                const token = {
                    address: searchInput,
                    chainId: this.$store.getters.network,
                    decimals: await erc20Contract.decimals(),
                    logoURI: none_icon,
                    name: await erc20Contract.name(),
                    symbol: await erc20Contract.symbol(),
                    button: {
                        label: "Import",
                        handleClick: (token) => {
                            return this.openImportToken(token)
                        }
                    }
                };
                return this.options = [token];
            }

            if (this.searchInput) {
              const allTokens = [...this.fetchedTokens, ...this.importedTokens];
              this.options = allTokens.filter(token => {
                return token.name.toLowerCase().includes(this.searchInput.toLowerCase())
                    || token.symbol.toLowerCase() === this.searchInput.toLowerCase();
              })
              return this.options;
            }

            return;
        },
        handleTokenSelection(tokenSymbol) {
            if (this.title === tokenSelectionTitle.send) {
                this.$store.dispatch('setInputToken', tokenSymbol);
            }
            if (this.title === tokenSelectionTitle.get) {
                this.$store.dispatch('setOutputToken', tokenSymbol);
            }
            this.$store.commit('setSearchInput', '');
            this.closeModal();
            return;
        },
    },
    async mounted() {
        const importedTokens = JSON.parse(localStorage.getItem(LocalStorageKeys.eth_imported_tokens)) ?? [];
        const combinedTokens = [...this.options, ...importedTokens];
        console.log('combinedTokens', combinedTokens);
        const optionsWithTokenAmount = await populateTokensWithBalances(combinedTokens, this.$store.getters.account, this.$store.getters.etherWeb3Provider);
        console.log('optionsWithTokenAmount', optionsWithTokenAmount);
        const optionsWithFiatAmount = await populateTokensWithUSDCBalances(optionsWithTokenAmount);
        console.log('optionsWithFiatAmount', optionsWithFiatAmount);

        this.options = optionsWithFiatAmount;
    },
    computed: {
        searchInput() {
            return this.$store.getters.searchInput
        },
        selectedTokenSymbol() {
            const tokenSymbol = this.title === tokenSelectionTitle.send 
                ? this.$store.getters.inputToken.symbol
                : this.$store.getters.outputToken.symbol;
            return tokenSymbol;
        },
        // async options() {
        //     if (!this.searchInput) return [...this.fetchedTokens, ...this.importedTokens];

        //     const isValidAddress = utils.isAddress(this.searchInput);

        //     if (isValidAddress) {
        //         const erc20Contract = new Contract(this.searchInput, genericERC20Abi, this.$store.getters.etherWeb3Provider);
        //         const token = {
        //             address: this.searchInput,
        //             chainId: this.$store.getters.network,
        //             decimals: (await erc20Contract.decimals()).toNumber(),
        //             logoURI: none_icon,
        //             name: await erc20Contract.name(),
        //             symbol: await erc20Contract.symbol(),
        //             button: {
        //                 label: "Import",
        //                 handleClick: (token) => {
        //                     return this.openImportToken(token)
        //                 }
        //             }
        //         };
        //         return [token];
        //     } 

        //     if (this.searchInput) {
        //         const allTokens = [...this.fetchedTokens, ...this.importedTokens];
        //         return allTokens.filter(token => token.name.toLowerCase().includes(this.searchInput.toLowerCase()))
        //     }

        //     return []
        // }
    }
}
</script>

<style>
.token-selection-header {
    padding: 16px 12px;
    display: flex;
    align-items: center;
}
.token-selection-title {
    margin: auto;
    font-weight: 600;
    font-size: 18px;
    padding-right: 30px;
    line-height: 24px;
}
.token-selection-input-holder {
    padding: 0px 16px 12px;
}
</style>