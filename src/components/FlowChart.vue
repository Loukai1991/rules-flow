<template>
  <div class="btn-container">
    <button @click="getData">获取数据</button>
    <button @click="openLoadDataInput">加载数据</button>
    <div v-if="showLoadDataInput">
      <textarea v-model="loadedData" rows="10" cols="40"></textarea>
      <button @click="loadData">确认</button>
      <button @click="closeLoadDataInput">关闭</button>
    </div>
    <button @click="save">保存</button>
    <button @click="submit">提交</button>
  </div>
  <div class="flow-chart">
    <div ref="container" class="container"></div>
    <Setting
      v-if="currentNode"
      @changeStyle="changeStyle"
      :nodeData="currentNode"
      class="setting-panel"
    ></Setting>
    <palette v-if="lf" :lf="lf"></palette>
    <el-dialog
      v-model="dialogPropertyFormVisible"
      :title="dialogPropertyTitle"
      width="600px"
    >
      <PropertyPanel
        v-if="dialogPropertyFormVisible"
        :nodeData="currentNode"
        @submit="handleSaveProperty"
      ></PropertyPanel>
    </el-dialog>
    <el-dialog
      v-model="dialogCustomJavaActionVisible"
      title="自定义java action"
      width="600px"
    >
      <CustomJavaAction
        v-if="dialogCustomJavaActionVisible"
        :editActionData="editActionData"
        @submit="handleSaveProperty"
      ></CustomJavaAction>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import LogicFlow from "@logicflow/core";
import "@logicflow/core/dist/style/index.css";
import { SelectionSelect, Group, Menu } from "@logicflow/extension";
import "@logicflow/extension/lib/style/index.css";

import NodeRedExtension from "./node-red/index";
import ActionsExtension from "./actions";
import Setting from "./tools/Settings.vue";
import Palette from "./palette/Index.vue";
import { saveFlow, submitFlow } from "@/api/index.js";
import "./node-red/style.css";
import PropertyPanel from "./property-panel/Index.vue";
import CustomJavaAction from './custom/JavaAction.vue'
import { ContextMenu } from "./context-menu";
import SetContextPad from "./setContextPad";
import SetMenu from './setMenu'
const container = ref();
const lf = ref(null);
const currentNode = ref({});
const editActionData = ref({});
const dialogPropertyFormVisible = ref(false);
const dialogCustomJavaActionVisible = ref(false);
const dialogPropertyTitle = ref("");
onMounted(() => {
  lf.value = new LogicFlow({
    container: container.value,
    grid: {
      visible: true,
      type: "mesh",
      size: 10,
      config: {
        color: "#eeeeee",
      },
    },
    overlapMode: 1,
    autoWrap: true,
    metaKeyMultipleSelected: true,
    // adjustEdge: false,
    // hoverOutline: false,
    edgeSelectedOutline: false,
    stopMoveGraph: true,
    keyboard: {
      enabled: true,
    },
    // keyboard: true,
    plugins: [
      ActionsExtension,
      NodeRedExtension,
      Group,
      ContextMenu,
      SelectionSelect,
      Menu,
    ],
  });
  SetContextPad(lf.value, {
    togglePropertyPanel,
    setCurrentNode,
    setPropertyTitle,
  });
  SetMenu(lf.value, {toggleCustomJavaActionDialogVisible})
  lf.value.render({
    nodes: [
      {
        type: "loop",
        x: 300,
        y: 300,
      },
      {
        type: "decision",
        x: 750,
        y: 500,
      },
      // {
      //   type: "group",
      //   x: 300,
      //   y: 300,
      // },
      {
        id: "node_1",
        type: "startEvent",
        x: 220,
        y: 200,
        text: "start",
      },
      {
        id: "node_8",
        type: "endEvent",
        x: 220,
        y: 200,
        text: "end",
      },
      //  {
      //   id: 'node_123_1',
      //   type: 'vue-html',
      //   x: 720,
      //   y: 400,
      //   text: '2',
      //   properties: {
      //     t: 3
      //   }
      // },
      {
        id: "node_2",
        type: "fetch-node",
        x: 420,
        y: 200,
        text: "fetch data",
      },
      // {
      //   id:'dfddf',
      //   type:'vue-html',
      //   x:500,
      //   y:600,
      //   text: "20",
      // },
      {
        id: "node_3",
        type: "function-node",
        x: 620,
        y: 200,
        text: "function",
      },
      {
        id: "node_4",
        type: "delay-node",
        x: 420,
        y: 300,
        text: "function",
      },
      {
        id: "node_5",
        type: "switch-node",
        x: 820,
        y: 200,
        text: "switch",
      },
      {
        id: "node_6",
        type: "function-node",
        x: 1020,
        y: 200,
        text: "function",
      },
      {
        id: "node_7",
        type: "createInstance",
        x: 1020,
        y: 300,
        text: "创建对象实例",
      },
    ],
    edges: [
      {
        type: "flow-link",
        sourceNodeId: "node_1",
        targetNodeId: "node_2",
      },
      {
        type: "flow-link",
        sourceNodeId: "node_2",
        targetNodeId: "node_3",
      },
      {
        type: "flow-link",
        sourceNodeId: "node_3",
        startPoint: {
          x: 680,
          y: 200,
        },
        targetNodeId: "node_4",
      },
      {
        type: "flow-link",
        sourceNodeId: "node_4",
        startPoint: {
          x: 360,
          y: 300,
        },
        targetNodeId: "node_2",
      },
      {
        type: "flow-link",
        sourceNodeId: "node_3",
        targetNodeId: "node_5",
      },
      {
        type: "flow-link",
        sourceNodeId: "node_5",
        targetNodeId: "node_6",
      },
      {
        type: "flow-link",
        sourceNodeId: "node_5",
        targetNodeId: "node_8",
      },
    ],
  });
  // lf.value.on("node:dbclick", ({ data }) => {
  //   console.log("dbclick", data);
  //   currentNode.value = data;
  //   if (data.properties.hasCustomProperty) {
  //     togglePropertyPanel()
  //     // dialogPropertyFormVisible.value = true;
  //     dialogPropertyTitle.value = data.type;
  //   }
  //   // debugger
  //   // dialogPropertyFormTitle = `设置${data.properties.templateCnName}`;
  // });

  lf.value.on("node-red:start", () => {
    // todo: 让流程跑起来
    console.log("我要开始执行流程了");
  });
  lf.value.on("vue-node:click", (data) => {
    lf.value.setProperties(data.id, {
      t: ++data.val,
    });
  });
  lf.value.on("node:click", ({ data }) => {
    currentNode.value = data;
  });
  lf.value.on("blank:click", ({ data }) => {
    console.log(currentNode);
    currentNode.value = null;
  });
});
const setCurrentNode = (data) => (currentNode.value = data);
const setPropertyTitle = (title) => (dialogPropertyTitle.value = title);
const changeStyle = (style) => {
  console.log("what style", style);
  console.log("currentNode.value", currentNode.value);
  lf.value.setProperties(currentNode.value.id, {
    style,
  });
  console.log("fuck", lf.value.getProperties(currentNode.value.id));
};
// 更新属性
const updateProperty = (id: string, data: any) => {
  const node = lf.value.graphModel.nodesMap[id];
  const edge = lf.value.graphModel.edgesMap[id];

  if (node) {
    node.model.setProperties(Object.assign(node.model.properties, data));
  } else if (edge) {
    edge.model.setProperties(Object.assign(edge.model.properties, data));
  }
};
const handleSaveProperty = (id, data) => {
  updateProperty(id, data);
  togglePropertyPanel();
  // dialogPropertyFormVisible.value = false;
};
const togglePropertyPanel = () =>
  (dialogPropertyFormVisible.value = !dialogPropertyFormVisible.value);
  const toggleCustomJavaActionDialogVisible = () => (dialogCustomJavaActionVisible.value = !dialogCustomJavaActionVisible.value);
//流程图数据
const showLoadDataInput = ref(false);
const loadedData = ref("");
const data = reactive({});
data.value = {
  nodes: [
    {
      id: "37068e44-b7f8-4d43-a379-b294842cc35f",
      type: "CommonNode",
      x: 360,
      y: 260,
      properties: { nodeType: "COMMON", nodeId: "id1" },
      text: { x: 360, y: 260, value: "id1" },
    },
    {
      id: "248a88cf-445d-4938-b6e6-2fa42975e572",
      type: "CommonNode",
      x: 600,
      y: 140,
      properties: { nodeType: "COMMON", nodeId: "id2" },
      text: { x: 600, y: 140, value: "id2" },
    },
    {
      id: "8fe456c3-34dd-46f3-bd07-2f733d1e5c37",
      type: "CommonNode",
      x: 660,
      y: 320,
      properties: { nodeType: "COMMON", nodeId: "id3" },
      text: { x: 660, y: 320, value: "id3" },
    },
    {
      id: "1eda6434-fa6d-40dc-a725-57d44bdadea8",
      type: "CommonNode",
      x: 1140,
      y: 160,
      properties: { nodeType: "COMMON", nodeId: "id4" },
      text: { x: 1140, y: 160, value: "id4" },
    },
    {
      id: "0e5feb52-da0d-4121-a3fd-4ef72281280c",
      type: "CommonNode",
      x: 900,
      y: 380,
      properties: { nodeType: "COMMON", nodeId: "id5" },
      text: { x: 900, y: 380, value: "id5" },
    },
    {
      id: "bcc07763-9d31-4c8e-a260-cdb443667215",
      type: "CommonNode",
      x: 900,
      y: 260,
      properties: { nodeType: "COMMON", nodeId: "id6" },
      text: { x: 900, y: 260, value: "id6" },
    },
    {
      id: "80128100-68af-43a7-8815-a9b5b75814df",
      type: "WhenGroupNode",
      x: 760,
      y: 300,
      properties: { nodeSize: { width: 544, height: 420 }, nodeType: "WHEN" },
      children: [
        "248a88cf-445d-4938-b6e6-2fa42975e572",
        "8fe456c3-34dd-46f3-bd07-2f733d1e5c37",
        "846b5512-3861-4a9d-811d-4ab456d0abc5",
      ],
    },
    {
      id: "846b5512-3861-4a9d-811d-4ab456d0abc5",
      type: "WhenGroupNode",
      x: 900,
      y: 340,
      properties: { nodeSize: { width: 214, height: 257 }, nodeType: "WHEN" },
      children: [
        "0e5feb52-da0d-4121-a3fd-4ef72281280c",
        "bcc07763-9d31-4c8e-a260-cdb443667215",
      ],
    },
  ],
  edges: [
    {
      id: "2b4b05d6-0836-4275-b99a-276d54a71dfa",
      type: "polyline",
      sourceNodeId: "37068e44-b7f8-4d43-a379-b294842cc35f",
      targetNodeId: "248a88cf-445d-4938-b6e6-2fa42975e572",
      startPoint: { x: 420, y: 260 },
      endPoint: { x: 540, y: 140 },
      properties: {},
      pointsList: [
        { x: 420, y: 260 },
        { x: 510, y: 260 },
        { x: 510, y: 140 },
        { x: 540, y: 140 },
      ],
    },
    {
      id: "5bfc56ee-0f9e-4867-8f23-466052667a84",
      type: "polyline",
      sourceNodeId: "37068e44-b7f8-4d43-a379-b294842cc35f",
      targetNodeId: "8fe456c3-34dd-46f3-bd07-2f733d1e5c37",
      startPoint: { x: 420, y: 260 },
      endPoint: { x: 600, y: 320 },
      properties: {},
      pointsList: [
        { x: 420, y: 260 },
        { x: 510, y: 260 },
        { x: 510, y: 320 },
        { x: 600, y: 320 },
      ],
    },
    {
      id: "fcc45eb3-ae34-4ce8-aed1-d5aab974292e",
      type: "polyline",
      sourceNodeId: "248a88cf-445d-4938-b6e6-2fa42975e572",
      targetNodeId: "1eda6434-fa6d-40dc-a725-57d44bdadea8",
      startPoint: { x: 660, y: 140 },
      endPoint: { x: 1080, y: 160 },
      properties: {},
      pointsList: [
        { x: 660, y: 140 },
        { x: 870, y: 140 },
        { x: 870, y: 160 },
        { x: 1080, y: 160 },
      ],
    },
    {
      id: "162a655f-5137-458a-b4c7-6aeeb046c78d",
      type: "polyline",
      sourceNodeId: "8fe456c3-34dd-46f3-bd07-2f733d1e5c37",
      targetNodeId: "0e5feb52-da0d-4121-a3fd-4ef72281280c",
      startPoint: { x: 720, y: 320 },
      endPoint: { x: 840, y: 380 },
      properties: {},
      pointsList: [
        { x: 720, y: 320 },
        { x: 780, y: 320 },
        { x: 780, y: 380 },
        { x: 840, y: 380 },
      ],
    },
    {
      id: "070868b0-8fb5-46ff-9f95-bdf132f420a4",
      type: "polyline",
      sourceNodeId: "8fe456c3-34dd-46f3-bd07-2f733d1e5c37",
      targetNodeId: "bcc07763-9d31-4c8e-a260-cdb443667215",
      startPoint: { x: 720, y: 320 },
      endPoint: { x: 840, y: 260 },
      properties: {},
      pointsList: [
        { x: 720, y: 320 },
        { x: 780, y: 320 },
        { x: 780, y: 260 },
        { x: 840, y: 260 },
      ],
    },
    {
      id: "5c3a01c0-3811-492d-ba65-2045e60d52ce",
      type: "polyline",
      sourceNodeId: "bcc07763-9d31-4c8e-a260-cdb443667215",
      targetNodeId: "1eda6434-fa6d-40dc-a725-57d44bdadea8",
      startPoint: { x: 960, y: 260 },
      endPoint: { x: 1080, y: 160 },
      properties: {},
      pointsList: [
        { x: 960, y: 260 },
        { x: 1050, y: 260 },
        { x: 1050, y: 160 },
        { x: 1080, y: 160 },
      ],
    },
    {
      id: "ad16b375-8e9b-45f6-b3d7-e45ba8a1a919",
      type: "polyline",
      sourceNodeId: "0e5feb52-da0d-4121-a3fd-4ef72281280c",
      targetNodeId: "1eda6434-fa6d-40dc-a725-57d44bdadea8",
      startPoint: { x: 960, y: 380 },
      endPoint: { x: 1080, y: 160 },
      properties: {},
      pointsList: [
        { x: 960, y: 380 },
        { x: 1050, y: 380 },
        { x: 1050, y: 160 },
        { x: 1080, y: 160 },
      ],
    },
  ],
};

const getData = () => {
  console.log(JSON.stringify(lf.value?.getGraphRawData()));
};

const openLoadDataInput = () => {
  showLoadDataInput.value = true;
};
const closeLoadDataInput = () => {
  showLoadDataInput.value = false;
};
const loadData = () => {
  let a = JSON.parse(loadedData.value);
  console.log(a);
  lf.value?.render(a);
};
const save = async () => {
  const graphData = lf.value?.getGraphData();
  const res = await saveFlow({ ...graphData });
};
const submit = async () => {
  const graphData = lf.value?.getGraphData();
  const res = await submitFlow({ ...graphData });
};
</script>


<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.flow-chart {
  position: relative;
  width: 100%;
  height: 100%;
}
.flow-chart :deep(.lf-red-node),
.flow-chart :deep(.lf-element-text) {
  cursor: move;
}
.flow-chart :deep(svg) {
  display: block;
}
.flow-chart-palette {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.setting-panel {
  position: absolute;
  top: 50px;
  right: 0;
}
.btn-container {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 1;
}
</style>
