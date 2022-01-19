<template>
    <div class="delete-icon-wrapper" v-on:click="handleClick">
        <div class="delete-icon"></div>
    </div>
</template>

<script>

export default {
    name: 'DeleteBtn',
    props: ["handleClick"],
}
</script>

<style>
.delete-icon {
    width: 15px;
    height: 15px;
    margin: 8px;
    background: url('../assets/icons/delete-icon.svg');
}
.delete-icon-wrapper {
    border-radius: 12px;
    max-height: 32px;
    max-width: 32px;
}
.delete-icon-wrapper:hover {
    background-color: #DA0049;
    cursor: pointer;
    transition: all .2s ease-out;
}
.delete-icon-wrapper:hover .delete-icon {
    background: url('../assets/icons/delete-icon-active.svg');
}
</style>