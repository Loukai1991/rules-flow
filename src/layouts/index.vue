<template>
    <div class="app-wrapper">
        <div class="layout-header">
            <Logo></Logo>
            <RightMenu></RightMenu>
        </div>
        <div class="layout-body">
            <!-- <SideBar></SideBar> -->
            <div class="main-container">
                <TagsView></TagsView>
                <div class="app-main-container">
                    <Palette v-if="lf" :lf="lf"></Palette>
                    <div class="chart-container">
                        <ControlPanel></ControlPanel>
                        <AppMain></AppMain>
                    </div>
                    <PropertyPanel v-if="lf" :lf="lf" :node-data="currentNode"></PropertyPanel>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { AppMain, SideBar, TagsView, Palette, ControlPanel, PropertyPanel, Logo, RightMenu } from "./components";
import { useFlowStore } from '@/store'
const flowStore = useFlowStore();
const lf = computed(() => flowStore.lf);
const currentNode = computed(() => flowStore.currentNode);
// console.log('what lf', lf)
</script>
<style lang="scss" scoped>
.app-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    background: var(--v3-header-bg-color);
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .layout-header {
        height: var(--v3-header-height);
        // position: fixed;
        // top: 0;
        // right: 0;
        width: 100%;
        display: flex;
        box-shadow: 0 0 1px #888;
        flex-shrink: 0;
        flex-grou: 0;
    }

    .layout-body {
        flex: 1;
        // padding-top: var(--v3-header-height);
        // height: 100vh;

        .main-container {
            position: relative;
            height: 100%;
            // margin-left: var(--v3-sidebar-width);
            // transition: margin-left var(--pure-transition-duration);
            display: flex;
            flex-direction: column;

            .app-main-container {
                flex: 1;
                display: flex;
                flex-direction: row;
                height: 100%;

                .chart-container {
                    flex: 1;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
            }
        }
    }
}
</style>
