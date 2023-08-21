import { defineStore } from 'pinia';
import { ref } from "vue"
import LogicFlow from "@logicflow/core";
import { NodeData } from '@logicflow/core/types'
export const useFlowStore = defineStore('flow-store', () => {
    const ruleName = ref('');
    const rollback = ref('')
    const setRuleName = (newName: string) => ruleName.value = newName;
    const setRollback = (strategy: string) => rollback.value = strategy
    const lf = ref<LogicFlow>()
    const setLf = (instance: LogicFlow) => {
        lf.value = instance;
    }


    const currentNode = ref<NodeData>()
    const setCurrentNode = (node: NodeData) => {
        console.log('come he', node)
        currentNode.value = node;
    }
    return {
        ruleName,
        setRuleName,
        rollback,
        setRollback,
        lf,
        currentNode,
        setLf,
        setCurrentNode
    }
})