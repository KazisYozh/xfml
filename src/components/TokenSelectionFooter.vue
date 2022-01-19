<template>
    <div 
        v-on:click="handleClick" 
        class="token-selection-footer" 
        @mouseover="hover = true"
        @mouseleave="hover = false"
    >
        <img v-if="!hover" :src="editIcon" />
        <img v-if="hover" :src="editIconActive" />
        <span>Manage tokens</span>
    </div>
</template>

<script>
import edit_icon from '../assets/icons/edit-icon.svg';
import edit_icon_active from '../assets/icons/edit-icon-active.svg';

export default {
    name: 'ManageTokensFooter',
    props: ['handleClick'],
    data() {
        return {
            editIcon: edit_icon,
            editIconActive: edit_icon_active,
            hover: false
        }
    }
}
</script>

<style scoped>
.token-selection-footer {
    z-index: 100;
    border-top: 1px solid #E4E8F2;
    background: #fff;
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    transition: all .2s ease-out;
}
.token-selection-footer span {
    font-weight: 600;
}
.token-selection-footer img {
    margin-right: 12px;
}
.token-selection-footer:hover {
    cursor: pointer;
}
.token-selection-footer:hover span {
    color: #6D38FF;
}
</style>