<template>
    <div class="close-icon-wrapper" v-on:click="handleClose">
        <img :src="closeIcon" class="close-icon" />
    </div>
</template>

<script>
import close_icon from '../assets/icons/close-icon.svg';

export default {
    name: 'CloseBtn',
    props: ["handleClose"],
    data() {
        return {
            closeIcon: close_icon
        }
    }
}
</script>

<style scoped>
.close-icon {
    width: 16px;
    height: 16px;
}
.close-icon-wrapper {
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.close-icon-wrapper:hover {
    background-color: #F0F2FA;
    border-radius: 12px;
    cursor: pointer;
    transition: all .2s ease-out;
}
</style>