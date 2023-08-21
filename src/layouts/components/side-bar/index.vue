<template>
    <div class="sidebar-wrapper">
        <div class="sidebar-wrapper-top">
            <svg-icon name="menu"></svg-icon>
            <svg-icon name="settings"></svg-icon>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.sidebar-wrapper {
    position: fixed;
    top: var(--v3-header-height);
    bottom: 0;
    left: 0;
    // z-index: 1001;
    width: var(--v3-sidebar-width);
    height: 100%;
    overflow: hidden;
    box-shadow: 1px 0px rgba(0, 0, 0, 0.08);
    overflow: hidden;

    .sidebar-wrapper-top {
        width: 100%;
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .svg-icon {
            cursor: pointer;
            font-size: 30px;
        }
    }
}
</style>
