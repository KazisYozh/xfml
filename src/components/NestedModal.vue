<template>
    <div class="nested-modal" v-if="isOpen" :style="{ zIndex }">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'NestedModal',
    props: ['isOpen', 'zIndex']
}
</script>

<style scoped>
.nested-modal {
    width: 100%;
    height: 100%;
    z-index: 1000;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #ffffff;
    border-radius: 20px;
}
</style>