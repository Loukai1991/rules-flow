<template>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="自定义活动名称1" name="event">
        <div
          class="red-ui-palette-node ui-draggable ui-draggable-handle"
          @mousedown="startDrag(item)"
          v-for="(item, index) in baseNodes"
          :key="index"
          :style="{ backgroundColor: item.background }"
        >
          <div class="red-ui-palette-label">{{ item.text }}</div>
          <div class="red-ui-palette-icon-container">
            <div
              class="red-ui-palette-icon"
              :style="{ backgroundImage: `url(${item.icon})` }"
            ></div>
          </div>
          <div class="red-ui-palette-port red-ui-palette-port-input"></div>
          <div class="red-ui-palette-port red-ui-palette-port-output"></div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </template>
    
    <script lang="ts" setup>
  import LogicFlow from "@logicflow/core";
  import { ref } from "vue";
  
  const tabActiveName = ref("actions");
  
  const props = defineProps({
    lf: {
      type: LogicFlow,
      required: true,
    },
  });
  
  const activeNames = ref(["base"]);
  
  const startDrag = (item) => {
    const { lf } = props;
    lf.dnd.startDrag({
      type: item.type,
      text: item.text,
    });
  };

  const baseNodes = ref([
    {
      type: "fetch-node",
      text: "参数",
      background: "rgb(231, 231, 174)",
      icon: "public/images/fetch.svg",
    },
    {
      type: "fetch-node",
      text: "注释",
      background: "rgb(231, 231, 174)",
      icon: "public/images/fetch.svg",
    },
    {
      type: "loop",
      text: "循环",
      background: "rgb(231, 231, 174)",
      icon: "public/images/fetch.svg",
    },
    {
      type: "endEvent",
      text: "结束事件",
      background: "rgb(231, 231, 174)",
      icon: "public/images/fetch.svg",
    },
    {
      type: "errorEvent",
      text: "错误事件",
      background: "rgb(253, 208, 162)",
      icon: "public/images/function.svg",
    },
    {
      type: "continueEvent",
      text: "继续事件",
      background: "rgb(226, 217, 110)",
      icon: "public/images/switch.svg",
    },
    {
      type: "breakEvent",
      text: "中断事件",
      background: "rgb(230, 224, 248)",
      icon: "public/images/delay.svg",
    },
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