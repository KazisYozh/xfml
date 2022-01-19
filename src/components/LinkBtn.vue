<template>
    <a :href="url" target="_blank" class="link-icon-wrapper">
        <div class="link-icon"></div>
    </a>
</template>

<script>

export default {
    name: 'LinkBtn',
    props: ["url", "newPage"],
}
</script>

<style>
.link-icon {
    width: 14px;
    height: 14px;
    margin: 8px;
    background: url('../assets/icons/link-icon.svg');
}
.link-icon-wrapper {
    border-radius: 12px;
    max-height: 32px;
    max-width: 32px;
}
.link-icon-wrapper:hover {
    background-color: #6D38FF;
    cursor: pointer;
    transition: all .2s ease-out;
}
.link-icon-wrapper:hover .link-icon {
    background: url('../assets/icons/link-icon-active.svg');
}
</style>