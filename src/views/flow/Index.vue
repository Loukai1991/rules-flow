<template>
    <div class="flow-chart">
        <div ref="container" class="container"></div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { useRoute } from 'vue-router'
import LogicFlow from "@logicflow/core";
import "@logicflow/core/dist/style/index.css";
import { SelectionSelect, Menu, MiniMap } from "@logicflow/extension";
import { InsertNodeInPolyline, Group } from '@/vendor'
import "@logicflow/extension/lib/style/index.css";
import { Dagre } from "@logicflow/layout";
// import NodeRedExtension from "@/components/node-red/index";
import ActionsExtension from "@/components/actions";
// import "@/components/node-red/style.css";
// import { ContextMenu } from "@/components/context-menu";
import { merge } from 'lodash-unified';
// import SetContextPad from "@/components/setContextPad";
import SetMenu from "@/components/setMenu";
import { useFlowStore } from '@/store'
import type { NodeData } from '@logicflow/core/types/type'
import { getImgUrl } from "@/util/chartHelper.js";

const flowStore = useFlowStore()

const container = ref();
const lf = ref<LogicFlow>();
const name = ref('');
const type = ref('1') // 1是通用规则引擎，2是决策规则
const id = ref('')
const route = useRoute()

// const javaActionForm = ref()

// interface Query {
//   name: string;
//   type?: string;
//   id?: string;
//   [propName: string]: any
// }
onMounted(() => {

    let data = {
        nodes: [
            {
                id: "node_1",
                type: "circleHtmlNode",
                x: 220,
                y: 200,
                text: "start",
                properties: {
                    name: '',
                    type: 'startEvent',
                    icon: getImgUrl('start')
                }
            },
            {
                id: "node_2",
                type: "circleHtmlNode",
                x: 1280,
                y: 200,
                text: "end",
                properties: {
                    name: '',
                    type: 'endEvent',
                    icon: getImgUrl('end')
                }
            },
        ],
        edges: [
            {
                type: "polyline",
                sourceNodeId: "node_1",
                targetNodeId: "node_2",
            },
        ]
    }
    // if (window.location.search) {
    //   // const query = window.location.search.substring(1).split('&').reduce((map, kv) => {
    //   //   const [key, value] = kv.split('=')
    //   //   map[key] = value
    //   //   return map
    //   // }, {})
    //   const query = route.query
    //   debugger
    //   name.value = query.name;
    //   type.value = query.type;
    //   id.value = query.id;
    //   // this.filename = query.filename
    //   // const d = window.sessionStorage.getItem(this.filename)
    //   // if (d) {
    //   //   data = JSON.parse(d)
    //   // }
    // }
    const query = route.query
    console.log(route.path)
    name.value = query.name;
    type.value = query.type;
    id.value = query.id;
    flowStore.setRuleName(name.value)
    initLogicFlow(data)
});

const initLogicFlow = data => {
    lf.value = new LogicFlow({
        container: container.value,
        background: {
            background: '#F2F2F2'
        },
        // autoExpand: false,
        // overlapMode: 1,
        // autoWrap: true,
        metaKeyMultipleSelected: true,
        edgeSelectedOutline: false,
        stopZoomGraph: false,
        stopMoveGraph: true, // 只有设置为true, 才能具有默认框选效果
        keyboard: {
            enabled: true,
        },
        // keyboard: true,
        plugins: [
            ActionsExtension,
            // NodeRedExtension,
            Group,
            // ContextMenu,
            SelectionSelect,
            Menu,
            MiniMap,
            Dagre,
            InsertNodeInPolyline
        ],
    });
    //TODO 
    flowStore.setLf(lf.value)
    // SetContextPad(lf.value);
    SetMenu(lf.value);
    registerListener(lf.value)
    lf.value.render(data);

    // lf.value.on("node:click", ({ data }) => {
    //     flowStore.setCurrentNode(data)
    // });
    // lf.value.on("blank:click", () => {
    //     flowStore.setCurrentNode({} as NodeData)
    // });
    // //注意当画布中直接双击修改节点名称的时候，如果鼠标不点击空白处，右侧属性区无法响应，所以需要单独处理一下；
    // //将来接入studio的时候，同样可能需要抛出一个事件通知
    // lf.value.on("text:update", (data) => {
    //     flowStore.setCurrentNode(merge(flowStore.currentNode, { text: { value: data.text }, properties: { name: data.text } }))
    // });

    // /* 删除节点自动连接原首尾节点；首尾节点大于2个则不自动连 */
    // lf.value.on("node:delete", ({ data }) => {
    //     reconnect(data, lf.value);
    // });

}
const registerListener = (lf: LogicFlow) => {
    // debugger
    lf.on("node:click", ({ data }) => {
        flowStore.setCurrentNode(data)
    });
    lf.on("blank:click", () => {
        flowStore.setCurrentNode({} as NodeData)
    });
    //注意当画布中直接双击修改节点名称的时候，如果鼠标不点击空白处，右侧属性区无法响应，所以需要单独处理一下；
    //将来接入studio的时候，同样可能需要抛出一个事件通知
    lf.on("text:update", (data) => {
        flowStore.setCurrentNode(merge(flowStore.currentNode, { text: { value: data.text }, properties: { name: data.text } }))
    });

    /* 删除节点自动连接原首尾节点；首尾节点大于2个则不自动连 */
    lf.on("node:delete", ({ data }) => {
        reconnect(data, lf);
    });
}
const reconnect = (data: NodeData, lf: LogicFlow) => {
    const undos = lf.history.undos;
    const preData = undos[undos.length - 1];
    const { edges } = preData
    let sourceNodeId = '';
    let targetNodeId = ''
    let allowReconncect = true;
    for (let i = 0; i < edges.length; i++) {
        if (edges[i].sourceNodeId === data.id) {
            if (targetNodeId) {
                allowReconncect = false;
                break;
            } else {
                targetNodeId = edges[i].targetNodeId
            }
        }

        if (edges[i].targetNodeId === data.id) {
            if (sourceNodeId) {
                allowReconncect = false;
                break;
            } else {
                sourceNodeId = edges[i].sourceNodeId
            }
        }
    }
    if (!allowReconncect) {
        return;
    }
    if (sourceNodeId && targetNodeId) {
        lf.addEdge({
            sourceNodeId: sourceNodeId,
            targetNodeId: targetNodeId
        })
    }
}
</script>
  
  
<style scoped lang="scss">
.flow-chart,
.container {
    width: 100%;
    height: 100%;
    border: 1px solid rgba(0, 0, 0, 0.08);
}

// .lf-canvas-overlay {
//     background: #F2F2F2;
// }
</style>