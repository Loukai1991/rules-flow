<template>
    <el-collapse v-model="activeNames">
      <el-collapse-item  name="actions">
        <template #title>
            自定义java 函数<el-icon class="header-icon" @click="handleAdd">
            <plus />
          </el-icon>
        </template>
        <div
          class="red-ui-palette-node ui-draggable ui-draggable-handle"
          @click="handleEdit(item)"
          v-for="(item, index) in actions"
          :key="index"
        >
          <div class="red-ui-palette-label">{{ item.name }}</div>

        </div>
      </el-collapse-item>
    </el-collapse>
    <JavaActionDialog v-model="dialogVisible" :editData="formValue"></JavaActionDialog>
  </template>
    
    <script lang="ts" setup>

  import { ref } from "vue";
 import JavaActionDialog from "../custom/JavaAction.vue";
  const dialogVisible = ref(false)
  const formValue = ref({})
  
  const activeNames = ref(["actions"]);
  
  const handleEdit = (item) => {
    formValue.value = item;
    dialogVisible.value = true;
  };

  const handleAdd = () => {
    formValue.value = {}
    dialogVisible.value = true;

  }
  const actions = ref([
    {
      name: "fetch",
      params: "参数",
      returnType: "string",
      expose: false,
      code: '',
      doc:''
    }
  ]);

  </script>
    <style scoped>
  .demo-collapse {
    width: 350px;
    position: absolute;
    left: 0;
    top: 0;
  }
  .demo-collapse :deep(.el-collapse-item__header) {
    text-indent: 20px;
  }
  .red-ui-palette-node {
    cursor: move;
    background: #fff;
    margin: 10px auto;
    height: 25px;
    border-radius: 5px;
    border: 1px solid #999;
    background-position: 5% 50%;
    background-repeat: no-repeat;
    width: 120px;
    background-size: contain;
    position: relative;
  }
  .red-ui-palette-label {
    color: #333;
    font-size: 13px;
    margin: 4px 0 4px 32px;
    line-height: 20px;
    overflow: hidden;
    text-align: center;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .red-ui-palette-icon-container {
    position: absolute;
    text-align: center;
    top: 0;
    bottom: 0;
    left: 0;
    width: 30px;
    border-right: 1px solid rgba(0, 0, 0, 0.05);
    background-color: rgba(0, 0, 0, 0.05);
  }
  .red-ui-palette-icon {
    display: inline-block;
    width: 20px;
    height: 100%;
    background-position: 50% 50%;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .red-ui-palette-port-output {
    left: auto;
    right: -6px;
  }
  .red-ui-palette-port {
    position: absolute;
    top: 8px;
    left: -5px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    background: #d9d9d9;
    border-radius: 3px;
    width: 10px;
    height: 10px;
    border: 1px solid #999;
  }
  .red-ui-palette-port-output {
    left: auto;
    right: -6px;
  }
  </style>