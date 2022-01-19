<template>
    <el-tooltip :placement="placement" :content="content" popper-class="custom-popper">
        <div class="info-icon"></div>
    </el-tooltip>
</template>

<script>
export default {
    name: 'InfoTooltip',
    props: {
        placement: {
            default: 'top',
            type: String
        },
        content: {
            default: '',
            type: String
        }
    }
}
</script>

<style>
.info-icon {
    background: url('../assets/icons/info-icon.svg');
    width: 16px;
    height: 16px;
}
.custom-popper {
    width: 268px;
    font-family: "TTFirsNeue";
    padding: 8px 12px;
    background: #15151F;
    border-radius: 8px;
    opacity: 1;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
}
</style>