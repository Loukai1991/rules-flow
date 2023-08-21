<template>
    <div class="setting-panel">
        <el-form ref="ruleFormRef" class="demo-ruleForm" status-icon>
            <el-form-item label="名称">
                <el-input v-model="name" />
            </el-form-item>
            <el-form-item label="开启事务">
                <el-switch v-model="rollback" />
            </el-form-item>
        </el-form>
    </div>
</template>
    
<script lang="ts" setup>
import type { NodeData } from '@logicflow/core/types/type'
import { ref, onMounted, watch, computed, PropType } from 'vue'
import { useFlowStore } from '@/store';
const flowStore = useFlowStore();


const name = computed({
    get() {
        return flowStore.ruleName
    },
    set(value) {
        flowStore.setRuleName(value)
    }
})
const rollback = computed({
    get() {
        return flowStore.rollback
    },
    set(value) {
        flowStore.setRollback(value)
    }
})

// // const name = ref('')
// const setName = (nodeData: NodeData) => {
//     if (isNode.value) {
//         name.value = nodeData?.text?.value;
//     } else {
//         name.value = flowStore.ruleName;
//     }
// }
// onMounted(() => {
//     setName(props.nodeData);
// })
// watch(
//     () => props.nodeData,
//     (val) => {
//         setName(val)
//     }
// );
</script>
    
<style scoped>
.setting-panel {
    padding: 10px;
    background: #FFFFFF;
    /* border-left: 1px solid #dadce0; */
    /* border-bottom: 1px solid #dadce0; */
    width: 200px;
}

.style-wrapper {
    display: flex;
}

.style-item {
    width: 20px;
    height: 20px;
    border: 1px solid #FFF;
    margin-right: 5px;
    cursor: pointer;
}

.setting-item-title {
    font-size: 14px;
    color: #333;
    margin-top: 10px;
}
</style>