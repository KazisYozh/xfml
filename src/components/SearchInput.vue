<template>
    <el-input class="search-input" v-model="value" :placeholder="placeholder">
        <div slot="prepend" class="search-icon"></div>
        <div slot="append" class="close-icon" v-on:click="cleanInput"></div>
    </el-input>
</template>

<script>
export default {
    name: 'SearchInput',
    props: ["placeholder"],
    computed: {
        value: {
            get() { return this.$store.getters.searchInput },
            set(val) {this.$store.commit('setSearchInput', val)}
        }
    },
    methods: {
        cleanInput() {
            this.$store.commit('setSearchInput', '')
        },
    }
}
</script>

<style>
.search-input .el-input__inner {
    font-weight: 400;
    color: #15151F;
    padding-left: 0;
}
.search-input input::placeholder {
    color: #777A8F;
}
.search-input:focus-within {
    border-radius: 12px;
    outline: 1px solid #6D38FF;
}
.search-icon {
    background: url('../assets/icons/search.svg');
    height: 20px;
    width: 20px;
}
.close-icon {
    background: url('../assets/icons/clear.svg');
    height: 20px;
    width: 20px;
}
.close-icon:hover {
    cursor: pointer;
}
.el-input-group__prepend {
    background-color: #F0F2FA;
    border: none;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    padding-left: 14.5px;
    padding-right: 12px;
}
.el-input-group__append {
    background-color: #F0F2FA;
    border: none;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    padding-right: 12px;
    padding-left: 0;
}
</style>