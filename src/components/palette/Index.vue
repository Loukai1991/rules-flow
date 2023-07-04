<template>
    <div class="demo-collapse">
      <el-tabs v-model="tabActiveName" class="demo-tabs" tab-position="left">
    <el-tab-pane label="工具箱" name="actions">
      <el-scrollbar max-height="1000px">
        <ToolBox :lf="lf"></ToolBox>
    </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane label="自定义工具" name="custom actions">Config</el-tab-pane>
    <el-tab-pane label="自定义java action" name="custom java actions">Role</el-tab-pane>
    <el-tab-pane label="自定义规则表达式" name="custom expression rules">Task</el-tab-pane>
  </el-tabs>

     
    </div>
  </template>
  
  <script lang="ts" setup>
  import LogicFlow from "@logicflow/core"
  import ToolBox from "./ToolBox.vue";
  import CustomToolBox from "./CustomToolBox.vue";
  import CustomJavaActions from "./CustomJavaActions.vue";
  import CustomRules from "./CustomRules.vue";
  import { ref } from 'vue'
  
  const tabActiveName = ref('actions')


  const props = defineProps({
    lf: {
      type: LogicFlow,
      required: true,
    }
  })
 
  const activeNames = ref(['base'])
  
  const startDrag = (item) => {
    const { lf } = props;
    lf.dnd.startDrag({
      type: item.type,
      text: item.text
    })
  }
  
  // const baseNodes = ref([
  // {
  //     type: 'endEvent',
  //     text: '结束事件',
  //     background: 'rgb(231, 231, 174)',
  //     icon: 'public/images/fetch.svg'
  //   },
  //   {
  //     type: 'fetch-node',
  //     text: 'fetch',
  //     background: 'rgb(231, 231, 174)',
  //     icon: 'public/images/fetch.svg'
  //   },
  //   {
  //     type: 'function-node',
  //     text: 'function',
  //     background: 'rgb(253, 208, 162)',
  //     icon: 'public/images/function.svg'
  //   },
  //   {
  //     type: 'switch-node',
  //     text: 'switch',
  //     background: 'rgb(226, 217, 110)',
  //     icon: 'public/images/switch.svg'
  //   },
  //   {
  //     type: 'delay-node',
  //     text: 'delay',
  //     background: 'rgb(230, 224, 248)',
  //     icon: 'public/images/delay.svg'
  //   }
  // ])
  const baseNodes = ref([
  {
      type: 'fetch-node',
      text: '参数',
      background: 'rgb(231, 231, 174)',
      icon: 'public/images/fetch.svg'
    },
    {
      type: 'fetch-node',
      text: '注释',
      background: 'rgb(231, 231, 174)',
      icon: 'public/images/fetch.svg'
    },
    {
      type: 'loop',
      text: '循环',
      background: 'rgb(231, 231, 174)',
      icon: 'public/images/fetch.svg'
    },
  {
      type: 'endEvent',
      text: '结束事件',
      background: 'rgb(231, 231, 174)',
      icon: 'public/images/fetch.svg'
    },
    {
      type: 'errorEvent',
      text: '错误事件',
      background: 'rgb(253, 208, 162)',
      icon: 'public/images/function.svg'
    },
    {
      type: 'continueEvent',
      text: '继续事件',
      background: 'rgb(226, 217, 110)',
      icon: 'public/images/switch.svg'
    },
    {
      type: 'breakEvent',
      text: '中断事件',
      background: 'rgb(230, 224, 248)',
      icon: 'public/images/delay.svg'
    }
  ])
  const decisionNodes = ref([
  {
      type: 'decision',
      text: '决策',
      background: 'rgb(231, 231, 174)',
      icon: 'public/images/fetch.svg'
    },
    {
      type: 'merge',
      text: '合并',
      background: 'rgb(231, 231, 174)',
      icon: 'public/images/fetch.svg'
    }
  ])
  const objectNodes = ref([
  {
      type: 'createInstance',
      text: '创建对象实例',
      background: 'rgb(231, 231, 174)',
      icon: 'public/images/fetch.svg'
    },
    {
      type: 'editInstance',
      text: '修改对象实例',
      background: 'rgb(231, 231, 174)',
      icon: 'public/images/fetch.svg'
    },
    {
      type: 'deleteInstance',
      text: '删除对象实例',
      background: 'rgb(231, 231, 174)',
      icon: 'public/images/fetch.svg'
    },
    {
      type: 'retriveInstance',
      text: '检索',
      background: 'rgb(231, 231, 174)',
      icon: 'public/images/fetch.svg'
    }
  ])
  const listNodes = ref([
  {
      type: 'createList',
      text: '创建列表',
      background: 'rgb(231, 231, 174)',
      icon: 'public/images/fetch.svg'
    },
    {
      type: 'changeList',
      text: '更改列表',
      background: 'rgb(231, 231, 174)',
      icon: 'public/images/fetch.svg'
    },
    {
      type: 'aggregateList',
      text: '汇总列表',
      background: 'rgb(231, 231, 174)',
      icon: 'public/images/fetch.svg'
    },
    {
      type: 'listOperation',
      text: '列表操作',
      background: 'rgb(231, 231, 174)',
      icon: 'public/images/fetch.svg'
    }
  ])
  const callNodes = ref([
  {
      type: 'callJava',
      text: '调用java',
      background: 'rgb(231, 231, 174)',
      icon: 'public/images/fetch.svg'
    },
    {
      type: 'callJs',
      text: '调用js',
      background: 'rgb(231, 231, 174)',
      icon: 'public/images/fetch.svg'
    },
    {
      type: 'callMicroflow',
      text: '调用规则引擎',
      background: 'rgb(231, 231, 174)',
      icon: 'public/images/fetch.svg'
    }
  ])
  const variableNodes = ref([
  {
      type: 'createVariable',
      text: '创建变量',
      background: 'rgb(231, 231, 174)',
      icon: 'public/images/fetch.svg'
    },
    {
      type: 'changeVariable',
      text: '修改变量',
      background: 'rgb(231, 231, 174)',
      icon: 'public/images/fetch.svg'
    }
  ])
  const integrationNodes = ref([
  {
      type: 'restApi',
      text: 'rest服务',
      background: 'rgb(231, 231, 174)',
      icon: 'public/images/fetch.svg'
    }
  ])
  const logNodes = ref([
  {
      type: 'log',
      text: '日志消息',
      background: 'rgb(231, 231, 174)',
      icon: 'public/images/fetch.svg'
    }
  ])
  const fileNodes = ref([
  {
      type: 'exportExcel',
      text: '导出excel',
      background: 'rgb(231, 231, 174)',
      icon: 'public/images/fetch.svg'
    }
  ])
  const customNodes = ref([])
  </script>
  <style scoped>
  .demo-collapse {
    width: 350px;
    position:absolute;
    left:0;
    top:0;
  }
  .demo-collapse :deep(.el-collapse-item__header)  {
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
    border-right: 1px solid rgba(0,0,0,.05);
    background-color: rgba(0,0,0,.05);
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