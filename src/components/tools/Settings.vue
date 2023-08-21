<template>
  <div class="setting-panel">
    <h2>{{ typeTitle }}</h2>
    <el-divider content-position="left">通用</el-divider>
    <el-form ref="ruleFormRef" class="demo-ruleForm" status-icon>
      <el-form-item label="名称">
        <el-input v-model="name" @input="$emit('changeName', isNode, name)" />
      </el-form-item>

      <el-form-item label="选择风格" v-if="isNode">
        <div class="style-wrapper">
          <div class="style-item" @click="$emit('changeStyle', item)" v-for="(item, index) in styleConfig" :key="index"
            :style="item"></div>
        </div>
      </el-form-item>
      <!-- <div v-if="isNode">
        <div class="setting-item-title">选择风格</div>
        <div class="style-wrapper">
          <div class="style-item" @click="$emit('changeStyle', item)" v-for="(item, index) in styleConfig" :key="index"
            :style="item"></div>
        </div>
      </div> -->
    </el-form>
  </div>
</template>
  
<script lang="ts" setup>
import type { NodeData } from '@logicflow/core/types/type'
import { ref, onMounted, watch, computed, PropType } from 'vue'
import { useFlowStore } from '@/store';
const flowStore = useFlowStore();

const props = defineProps({
  nodeData: {
    type: Object as PropType<NodeData>,
    default: () => {
      return {}
    }
  }
})

const isNode = computed(() => props.nodeData.id)
const typeTitle = computed(() => {
  if (isNode.value) {
    return props.nodeData.type;
  } else {
    return '规则引擎';
  }
})
const styleConfig = ref([
  {
    backgroundColor: 'rgb(255, 255, 255)',
    borderColor: 'rgb(42, 42, 42)',
    borderWidth: '1px'
  },
  {
    backgroundColor: 'rgb(245, 245, 245)',
    borderColor: 'rgb(102, 102, 102)',
    borderWidth: '1px'
  },
  {
    backgroundColor: 'rgb(218, 232, 252)',
    borderColor: 'rgb(108, 142, 191)',
    borderWidth: '1px'
  },
  {
    backgroundColor: 'rgb(213, 232, 212)',
    borderColor: 'rgb(130, 179, 102)',
    borderWidth: '1px'
  },
  {
    backgroundColor: 'rgb(248, 206, 204)',
    borderColor: 'rgb(184, 84, 80)',
    borderWidth: '1px'
  }
])
const name = ref('')
const setName = (nodeData: NodeData) => {
  if (isNode.value) {
    name.value = nodeData?.text?.value;
  } else {
    name.value = flowStore.ruleName;
  }
}
onMounted(() => {
  setName(props.nodeData);
})
watch(
  () => props.nodeData,
  (val) => {
    setName(val)
  }
);
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