<template>
    <div class="toolbox-wrapper">
        <el-tabs v-model="activeName" class="toolbox-tabs" @tab-click="handleClick">
            <el-tab-pane label="工具箱" name="toolbx">
                <ToolBox :lf="props.lf"></ToolBox>
            </el-tab-pane>
            <el-tab-pane label="自定义" name="second">Config</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import ToolBox from './ToolBox.vue'
import LogicFlow from "@logicflow/core";
const activeName = ref('toolbx')

const props = defineProps({
    lf: {
        type: LogicFlow,
        required: true,
    }
})

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
</script>
<style lang="scss" scoped>
.toolbox-wrapper {
    width: var(--v3-toolbox-width);
    overflow: hidden;
    height: 100%;
    user-select: none;

    .toolbox-tabs {
        :deep(.el-tabs__header) {
            padding-left: 14px;
        }

        :deep(.el-collapse-item__header) {
            padding-left: 14px;
        }

        // padding-left: 16px;

        :deep(.el-tabs__item) {
            height: var(--v3-controlpanel-height) !important;
            line-height: var(--v3-controlpanel-height) !important;
            font-size: 12px !important;
        }

    }
}
</style>