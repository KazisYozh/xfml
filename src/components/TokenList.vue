<template>
    <div class="token-list-wrapper">
        <ul v-bind:class="{ 'list-hoverable': listHoverable }">
            <li v-for="option in options" :class="{'list-item': option.symbol !== disabledSymbol}" :key="option.symbol" v-on="listHoverable && handleItemClick && option.symbol !== disabledSymbol ? { click: () => handleItemClick(option) } : {}">
                <section :class="{'token-item-wrapper': true, disabled: option.symbol === disabledSymbol }">
                    <aside>
                        <img :src="option.logoURI" class="token-icon" />
                        <img v-if="option.symbol === selectedSymbol" :src="selectedIcon" class="selected-icon" />
                    </aside>
                    <div class="fields-wrapper">
                        <div class="left">
                            <span>
                                {{ option.symbol }}
                            </span>
                            <span>
                                {{ option.name }}
                            </span>
                        </div>
                        <div v-if="!option.button && !option.buttons" class="right">
                            <span>
                                {{ option.tokenAmount }}
                            </span>
                            <span v-if="option.tokenAmount > 0">
                                {{ currency }}{{ option.fiatAmount }}
                            </span>
                        </div>
                        <div v-if="!!option.button">
                            <el-button class="action-button" v-on:click="option.button.handleClick(option)">
                                {{ option.button.label }}
                            </el-button>
                        </div>
                        <div v-if="!!option.buttons" class="buttons">
                            <DeleteBtn :handleClick="option.buttons.delete" />
                            <LinkBtn :url="option.buttons.link" />
                        </div>
                    </div>
                </section>
            </li>
        </ul>
    </div>
</template>

<script>
import selected_circle from '../assets/icons/selected-circle.svg';
import DeleteBtn from './DeleteBtn.vue';
import LinkBtn from './LinkBtn.vue';

export default {
    name: 'TokenList',
    components: { LinkBtn, DeleteBtn },
    props: ['tokens', 'handleItemClick', "selectedSymbol", "disabledSymbol"],
    data() {
        return {
            selectedIcon: selected_circle,
            currency: '$'
        }
    },
    computed: {
        options() {
            return this.tokens
        },
        listHoverable() {
            return this.tokens.every(token => !token.button || !token.buttons)
        },
    }
}
</script>

<style>
.token-list-wrapper {
    overflow-y: auto;
    height: 300px;
}
.token-list-wrapper ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
.token-list-wrapper .list-hoverable .list-item:hover {
    transition: all .1s ease-out;
    cursor: pointer;
    background-color: #F0F2FA;
}
.token-item-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 12px 0;
}
.token-item-wrapper.disabled {
    background-color: #fff;
    opacity: 0.36;
}
.token-item-wrapper .token-icon {
    margin-left: 20px;
    margin-right: 12px;
    width: 42px;
    height: 42px;
}
.token-item-wrapper aside {
    position: relative;
}
.token-item-wrapper .selected-icon {
    width: 32px;
    height: 32px;
    position: absolute;
    left: 5px;
    top: 5px;
}
.token-item-wrapper section {
    width: 100%;
}
.token-item-wrapper .fields-wrapper {
    width: 100%;
    display: flex;
    margin-right: 20px;
}
.token-item-wrapper .fields-wrapper .left {
    display: flex;
    flex-direction: column;
}
.token-item-wrapper .fields-wrapper .right {
    display: flex;
    flex-direction: column;
}
.token-item-wrapper div .left {
    align-items: flex-start;
    width: 100%;
}
.token-item-wrapper div .right {
    align-items: flex-end;
    justify-content: center;
}
.token-item-wrapper div span:nth-child(1) {
    font-weight: 600;
}
.token-item-wrapper div span:nth-child(2) {
    color: #71768A;
    font-size: 14px;
}
.fields-wrapper .action-button {
    color: #FFFFFF;
    transition: all .4s ease-out;
    border-radius: 12px;
    background: linear-gradient(93.58deg, #3246FF 0%, #AD26FF 100%);
}
.fields-wrapper .action-button:hover {
    background: linear-gradient(93.58deg, #AD26FF 0%, #3246FF 100%);
}
.fields-wrapper .buttons {
    display: flex;
}
.fields-wrapper .buttons .delete-icon-wrapper {
    margin-right: 12px;
}
</style>