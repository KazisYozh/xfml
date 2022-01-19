<template>
    <div class="chevron-back-icon-wrapper" v-on:click="handleClick">
        <img :src="backIcon" class="chevron-back-icon" />
    </div>
</template>

<script>
import chevron_left from '../assets/icons/chevron-left.svg';

export default {
    name: 'BackBtn',
    props: ["handleClick"],
    data() {
        return {
            backIcon: chevron_left
        }
    }
}
</script>

<style>
.chevron-back-icon {
    width: 16px;
    height: 16px;
    margin: 8px 10px 4px;
}
.chevron-back-icon-wrapper:hover {
    background-color: #F0F2FA;
    border-radius: 12px;
    cursor: pointer;
    transition: all .2s ease-out;
}
</style>