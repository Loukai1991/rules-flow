<template>
    <div class="property-panel-container">
        <el-tabs v-model="activeName" class="property-tabs">
            <el-tab-pane label="属性" name="property">
                <el-scrollbar max-height="1000px">
                    <h2>{{ typeTitle }}</h2>
                    <GlobalSetting v-if="!isNode"></GlobalSetting>
                    <PropertyForms v-else class="property-forms" :nodeData="nodeData" @updateProperties="updateProperties">
                    </PropertyForms>
                </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane label="文档" name="document">
                我是文档说句
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import LogicFlow from "@logicflow/core";
import GlobalSetting from '@/components/property-forms/components/GlobalSetting.vue';
import PropertyForms from "@/components/property-forms/index.vue";
import { useFlowStore } from '@/store';
import { useRouter, useRoute } from 'vue-router'
const flowStore = useFlowStore();
const router = useRouter();
const route = useRoute();
const activeName = ref('property')

const props = defineProps({
    lf: {
        type: LogicFlow,
        required: true,
    },
    nodeData: {
        type: Object,
        default: () => {
            return {}
        }
    }
})

const isNode = computed(() => props.nodeData.id)
const typeTitle = computed(() => {
    if (isNode.value) {
        return props.nodeData.properties.type;
    } else {
        return '规则引擎';
    }
})
console.log('what fuc', props.nodeData)
// const changeStyle = (style) => {
//     props.lf.setProperties(props.nodeData.id, {
//         style,
//     });
// };
const updateProperties = (id: string, data: any) => {
    const node = props.lf.graphModel.nodesMap[id];
    const edge = props.lf.graphModel.edgesMap[id];

    if (node) {
        node.model.setProperties(Object.assign(node.model.properties, data));
    } else if (edge) {
        edge.model.setProperties(Object.assign(edge.model.properties, data));
    }
};
// const changeName = (isNode: Boolean, newName: string) => {
//     if (isNode) {
//         //注意是统一设置properties
//         props.lf.setProperties(props.nodeData.id, { name: newName })
//         //下面可以去掉
//         props.lf.updateText(props.nodeData.id, newName);
//     } else {
//         flowStore.setRuleName(newName)
//         router.replace({ path: route.path, query: { ...route.query, name: newName } })
//     }
// }
</script>
<style lang="scss" scoped>
.property-panel-container {
    width: var(--v3-propertypanel-width);
    height: 100%;
    overflow: hidden;
    padding-left: 10px;

    .property-tabs {
        :deep(.el-tabs__item) {
            height: var(--v3-controlpanel-height) !important;
            line-height: var(--v3-controlpanel-height) !important;
            font-size: 12px !important;
        }

        .property-forms {
            padding-left: 10px;
            padding-right: 10px;
        }

    }
}
</style>