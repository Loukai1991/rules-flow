<template>
    <div class="right-menu-container">
        <div class="right-menu">
            <el-icon class="right-menu-item">
                <Document />
            </el-icon>
            <el-icon class="right-menu-item">
                <View />
            </el-icon>
            <el-icon class="right-menu-item">
                <FullScreen />
            </el-icon>
            <SvgIcon name="bug" class="right-menu-item"></SvgIcon>
            <el-button type="primary" class="right-menu-item" size="small" @click="handleSave">保存</el-button>
            <el-button type="primary" class="right-menu-item" size="small" @click="handlePublish">发布</el-button>
        </div>

    </div>
</template>
<script setup lang="ts">
// import { saveFlow } from '@/api/index.js'
import { storeToRefs } from "pinia"
import { useFlowStore } from "@/store";
const flowStore = useFlowStore();
const { lf } = storeToRefs(flowStore)
const handleSave = async () => {
    const graphData = lf.value?.getGraphData();
    console.log('保存的数据是', graphData)
    // const res = await saveFlow({ ...graphData });
    // console.log('lf', lf, graphData)
    // router.replace({ path: "/redirect/error" })
}
const handlePublish = async () => {
    const graphData = lf.value?.getGraphData();
    console.log('提交的数据是', graphData)
}
</script>
<style lang="scss" scoped>
.right-menu-container {
    flex: 1;

    .right-menu {
        float: right;
        margin-right: 10px;
        height: 100%;
        display: flex;
        align-items: center;
        color: #606266;

        .right-menu-item {
            margin: 0 10px;
            cursor: pointer;
        }
    }
}
</style>