<template>
    <div class="control-wrapper">

        <SvgIcon name="cancel" @click="undo"></SvgIcon>
        <SvgIcon name="redo" @click="redo"></SvgIcon>
        <SvgIcon name="zoomin" @click="zoomIn"></SvgIcon>
        <SvgIcon name="zoomout" @click="zoomOut"></SvgIcon>
        <SvgIcon name="fit" @click="fitView"></SvgIcon>
        <SvgIcon name="beauti" @click="beautify"></SvgIcon>
        <SvgIcon name="map" @click="navigation($event)"></SvgIcon>
        <SvgIcon name="viewdata" @click="viewData"></SvgIcon>
    </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useFlowStore } from "@/store";
import jsonViewer from "./JsonViewer.vue";
import {
    addDialog,
    closeDialog,
    updateDialog,
    closeAllDialog
} from "@/components/re-dialog";

const flowStore = useFlowStore();
const { lf } = storeToRefs(flowStore)
const undo = () => lf.value?.undo();
const redo = () => lf.value?.redo();
const fitView = () => lf.value?.fitView(100, 100)
const zoomIn = () => lf.value?.zoom(true)
const zoomOut = () => lf.value?.zoom(false)

// console.log('dd', lf.value?.extension.dagre)
// const beautify = lf.value?.extension.dagre && lf.value?.extension.dagre.layout({
//     nodesep: 2,
//     ranksep: 20,
//     begin: [100, 100],
// });
const beautify = () => {
    console.log('fuc', lf.value?.extension.dagre)
    lf.value?.extension.dagre && lf.value?.extension.dagre.layout({
        align: 'UL',
        rankdir: 'LR',
        nodesep: 2,
        ranksep: 80,
        //begin: [120, 120],
        radial: true,
    });
}
const navigation = (e) => {
    const position = lf.value?.getPointByClient(e.x, e.y)
    lf.value?.extension.miniMap.show(position.domOverlayPosition.x - 120, 40)
}
const viewData = () => {
    const graphData = lf.value?.getGraphData();
    const globalSettings = {
        globalSettings: {
            ruleName: flowStore.ruleName,
            rollback: flowStore.rollback
        }

    }
    const data = { ...globalSettings, ...graphData }
    console.log('查看la', graphData)
    addDialog({
        title: "基本使用",
        fullscreenIcon: true,
        class: 'fuck you',
        props: {
            graphData: data
        },
        contentRenderer: () => jsonViewer
    })
}
</script>
<style lang="scss" scoped>
.control-wrapper {
    height: var(--v3-controlpanel-height);
    display: flex;
    align-items: center;
    box-shadow: 0 0 1px #888;

    .svg-icon {
        margin-left: 10px;
        cursor: pointer;
    }
}
</style>