<template>
    <div class="beforeSelect" :class="{ 'radio-button': true, selected: selected}" @click="handleSelect">
        <div class="radio-button-background"></div>
    </div>
</template>

<script>
export default {
    name: 'RadioBtn',
    props: ['selected', 'handleSelect']
}
</script>

<style scoped>
.radio-button {
    width: 16px;
    height: 16px;
    border-radius: 24px;
    /*border: 2px solid #CED3E0;*/
    padding: 2px;
    background-color: #CED3E0;
    transition: all .1s ease-out;
}
.selected {
    background: linear-gradient(93.58deg, #3246FF 0%, #AD26FF 100%);
    width: 8px;
    height: 8px;
    padding: 6px;
    border: none;
    /*border-image: linear-gradient(93.58deg, #3246FF 0%, #AD26FF 100%);*/
}
.selected:hover {
    padding: 2px;
    width: 16px;
    height: 16px;
}

.beforeSelect:hover {
    cursor: pointer;
}

.selected .radio-button-background {
    width: 100%;
    height: 100%;
    border-radius: 24px;
    background-color: #fff;
}

.radio-button-background {
  width: 100%;
  height: 100%;
  border-radius: 24px;
  background-color: #F0F2FA;
}
</style>