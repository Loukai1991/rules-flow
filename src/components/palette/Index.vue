<template>
    <div class="demo-collapse">
      <el-scrollbar max-height="1000px">
        <el-collapse v-model="activeNames">
        <el-collapse-item title="基础活动" name="event" >
          <div
            class="red-ui-palette-node ui-draggable ui-draggable-handle"
            @mousedown="startDrag(item)"
            v-for="(item, index) in baseNodes"
            :key="index"
            :style="{ backgroundColor: item.background }"
          >
            <div class="red-ui-palette-label">{{item.text}}</div>
            <div class="red-ui-palette-icon-container">
              <div class="red-ui-palette-icon" :style="{ backgroundImage: `url(${item.icon})`}"></div>
            </div>
            <div class="red-ui-palette-port red-ui-palette-port-input"></div>
            <div class="red-ui-palette-port red-ui-palette-port-output"></div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="决策活动" name="decision" >
          <div
            class="red-ui-palette-node ui-draggable ui-draggable-handle"
            @mousedown="startDrag(item)"
            v-for="(item, index) in decisionNodes"
            :key="index"
            :style="{ backgroundColor: item.background }"
          >
            <div class="red-ui-palette-label">{{item.text}}</div>
            <div class="red-ui-palette-icon-container">
              <div class="red-ui-palette-icon" :style="{ backgroundImage: `url(${item.icon})`}"></div>
            </div>
            <div class="red-ui-palette-port red-ui-palette-port-input"></div>
            <div class="red-ui-palette-port red-ui-palette-port-output"></div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="对象活动" name="object" >
          <div
            class="red-ui-palette-node ui-draggable ui-draggable-handle"
            @mousedown="startDrag(item)"
            v-for="(item, index) in objectNodes"
            :key="index"
            :style="{ backgroundColor: item.background }"
          >
            <div class="red-ui-palette-label">{{item.text}}</div>
            <div class="red-ui-palette-icon-container">
              <div class="red-ui-palette-icon" :style="{ backgroundImage: `url(${item.icon})`}"></div>
            </div>
            <div class="red-ui-palette-port red-ui-palette-port-input"></div>
            <div class="red-ui-palette-port red-ui-palette-port-output"></div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="列表活动" name="list" >
          <div
            class="red-ui-palette-node ui-draggable ui-draggable-handle"
            @mousedown="startDrag(item)"
            v-for="(item, index) in listNodes"
            :key="index"
            :style="{ backgroundColor: item.background }"
          >
            <div class="red-ui-palette-label">{{item.text}}</div>
            <div class="red-ui-palette-icon-container">
              <div class="red-ui-palette-icon" :style="{ backgroundImage: `url(${item.icon})`}"></div>
            </div>
            <div class="red-ui-palette-port red-ui-palette-port-input"></div>
            <div class="red-ui-palette-port red-ui-palette-port-output"></div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="调用活动" name="call" >
          <div
            class="red-ui-palette-node ui-draggable ui-draggable-handle"
            @mousedown="startDrag(item)"
            v-for="(item, index) in callNodes"
            :key="index"
            :style="{ backgroundColor: item.background }"
          >
            <div class="red-ui-palette-label">{{item.text}}</div>
            <div class="red-ui-palette-icon-container">
              <div class="red-ui-palette-icon" :style="{ backgroundImage: `url(${item.icon})`}"></div>
            </div>
            <div class="red-ui-palette-port red-ui-palette-port-input"></div>
            <div class="red-ui-palette-port red-ui-palette-port-output"></div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="变量活动" name="variable" >
          <div
            class="red-ui-palette-node ui-draggable ui-draggable-handle"
            @mousedown="startDrag(item)"
            v-for="(item, index) in variableNodes"
            :key="index"
            :style="{ backgroundColor: item.background }"
          >
            <div class="red-ui-palette-label">{{item.text}}</div>
            <div class="red-ui-palette-icon-container">
              <div class="red-ui-palette-icon" :style="{ backgroundImage: `url(${item.icon})`}"></div>
            </div>
            <div class="red-ui-palette-port red-ui-palette-port-input"></div>
            <div class="red-ui-palette-port red-ui-palette-port-output"></div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="集成活动" name="integration" >
          <div
            class="red-ui-palette-node ui-draggable ui-draggable-handle"
            @mousedown="startDrag(item)"
            v-for="(item, index) in integrationNodes"
            :key="index"
            :style="{ backgroundColor: item.background }"
          >
            <div class="red-ui-palette-label">{{item.text}}</div>
            <div class="red-ui-palette-icon-container">
              <div class="red-ui-palette-icon" :style="{ backgroundImage: `url(${item.icon})`}"></div>
            </div>
            <div class="red-ui-palette-port red-ui-palette-port-input"></div>
            <div class="red-ui-palette-port red-ui-palette-port-output"></div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="日志活动" name="log" >
          <div
            class="red-ui-palette-node ui-draggable ui-draggable-handle"
            @mousedown="startDrag(item)"
            v-for="(item, index) in logNodes"
            :key="index"
            :style="{ backgroundColor: item.background }"
          >
            <div class="red-ui-palette-label">{{item.text}}</div>
            <div class="red-ui-palette-icon-container">
              <div class="red-ui-palette-icon" :style="{ backgroundImage: `url(${item.icon})`}"></div>
            </div>
            <div class="red-ui-palette-port red-ui-palette-port-input"></div>
            <div class="red-ui-palette-port red-ui-palette-port-output"></div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="文件活动" name="file" >
          <div
            class="red-ui-palette-node ui-draggable ui-draggable-handle"
            @mousedown="startDrag(item)"
            v-for="(item, index) in fileNodes"
            :key="index"
            :style="{ backgroundColor: item.background }"
          >
            <div class="red-ui-palette-label">{{item.text}}</div>
            <div class="red-ui-palette-icon-container">
              <div class="red-ui-palette-icon" :style="{ backgroundImage: `url(${item.icon})`}"></div>
            </div>
            <div class="red-ui-palette-port red-ui-palette-port-input"></div>
            <div class="red-ui-palette-port red-ui-palette-port-output"></div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="自定义活动" name="custom" >
          <div
            class="red-ui-palette-node ui-draggable ui-draggable-handle"
            @mousedown="startDrag(item)"
            v-for="(item, index) in customNodes"
            :key="index"
            :style="{ backgroundColor: item.background }"
          >
            <div class="red-ui-palette-label">{{item.text}}</div>
            <div class="red-ui-palette-icon-container">
              <div class="red-ui-palette-icon" :style="{ backgroundImage: `url(${item.icon})`}"></div>
            </div>
            <div class="red-ui-palette-port red-ui-palette-port-input"></div>
            <div class="red-ui-palette-port red-ui-palette-port-output"></div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
     
    </div>
  </template>
  
  <script lang="ts" setup>
  import LogicFlow from "@logicflow/core"
  
  import { ref } from 'vue'
  
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
    width: 150px;
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