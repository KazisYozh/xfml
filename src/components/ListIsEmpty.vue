<template>
    <div v-if="show">
        <img :src="emptyListIcon" alt="empty-list-icon" />
        <h6>{{ title }}</h6>
        <span>{{ subtitle }}</span>
    </div>
</template>

<script>
import search_paper from '../assets/images/search-paper.png';

export default {
    name: 'ListIsEmpty',
    props: ['show', 'title', 'subtitle'],
    data() {
        return { emptyListIcon: search_paper }
    }
}
</script>

<style scoped>
img {
    width: 88px;
    height: 100px;
    margin-top: 88px;
}
h6 {
    font-size: 18px;
    font-weight: 600;
    margin: 16px 0 4px;
}
span {
    color: #777A8F;
    font-size: 14px;
}
</style>