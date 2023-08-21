<template>
    <div class="logo-container">
        <img src="@/assets/logo.png" />
        <span class="name">
            规则引擎Plus
        </span>
    </div>
</template>
<script setup lang="ts">

</script>
<style lang="scss" scoped>
.logo-container {
    width: 300px;
    display: flex;
    flex-wrap: nowrap;
    height: var(--v3-header-heigh);
    line-height: var(--v3-header-heigh);
    overflow: hidden;
    align-items: center;
    padding-left: 10px;
    // background: rgba(0, 0, 0, 0.92);

    img {
        display: inline-block;
        width: 52.2px;
        // height: 8px;

    }

    .name {
        display: inline-block;
        height: 22px;
        line-height: 22px;
        font-family: PingFang SC;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.92);
        margin-left: 8px;
    }

}
</style>