<template>
    <div class="toolbox-container">
        <div class="search">
            <el-input placeholder="请输入" v-model="searchValue" @input="handleSearch" :suffix-icon="Search"></el-input>
        </div>
        <el-collapse v-model="activeNames">
            <el-scrollbar>
                <template v-for="actions in systemActions" :key="actions.name">
                    <el-collapse-item :title="actions.title" :name="actions.name" v-show="filter(actions.children).length">
                        <div class="nodes-container">
                            <div class="palette-node" v-for="(item, index) in filter(actions.children)" :key="index"
                                @mousedown="startDrag(item)">
                                <div class=" icon-container">
                                    <img :src="item.icon" class="icon" />
                                </div>
                                <div class="label">{{ item.text }}</div>
                            </div>
                        </div>
                    </el-collapse-item>
                </template>

            </el-scrollbar>

        </el-collapse>
    </div>
</template>
    
<script lang="ts" setup>
import LogicFlow from "@logicflow/core";
import { ref } from "vue";
import { getImgUrl } from '@/util/chartHelper.js'
import { Search } from '@element-plus/icons-vue'
const searchValue = ref('')
const tabActiveName = ref("actions");

const props = defineProps({
    lf: {
        type: LogicFlow,
        required: true,
    },
});

const startDrag = (item) => {
    const { lf } = props;
    lf.dnd.startDrag({
        type: item.registerType || item.type,
        text: item.text,
        label: item.label,
        properties: {
            name: item.text,
            type: item.type,
            icon: item.icon
        }
    });
};
type Action = {
    type: string,
    text: string;
    icon: string;
    [propName: string]: any;
}
const filter = (data: Action[]) => {
    return data.filter(action => action.text.includes(searchValue.value))
}
// const getImgUrl = name => {
//     const path = new URL('@/icons/svg/', import.meta.url);
//     return `${path}/${name}.svg`;
// }
const systemActions = [
    {
        title: '基础活动',
        name: 'baseActions',
        children: [
            {
                type: "params",
                // label: '参数',
                text: "参数",
                background: "rgb(231, 231, 174)",
                icon: getImgUrl('params'),
            },
            {
                type: "anotation",
                text: "注释",
                background: "rgb(231, 231, 174)",
                icon: getImgUrl('annotation'),
            },
            {
                type: "loop",
                text: "循环",
                background: "rgb(231, 231, 174)",
                icon: getImgUrl('loop'),
            },
            {
                type: "startEvent",
                text: "开始事件",
                background: "rgb(231, 231, 174)",
                registerType: 'circleHtmlNode',
                icon: getImgUrl('start'),
            },
            {
                type: "endEvent",
                text: "结束事件",
                registerType: 'circleHtmlNode',
                background: "rgb(231, 231, 174)",
                icon: getImgUrl('end'),
            },
            // {
            //     type: "errorEvent",
            //     text: "错误事件",
            //     background: "rgb(253, 208, 162)",
            //     icon: "public/images/function.svg",
            // },
            {
                type: "continueEvent",
                registerType: 'circleHtmlNode',
                text: "继续事件",
                background: "rgb(226, 217, 110)",
                icon: getImgUrl('continue'),
            },
            {
                type: "breakEvent",
                text: "中断事件",
                registerType: 'circleHtmlNode',
                background: "rgb(230, 224, 248)",
                icon: getImgUrl('break'),
            }
        ]
    },
    {
        title: '决策活动',
        name: 'decisionActions',
        children: [
            {
                registerType: 'diamondHtmlNode',
                type: "decision",
                text: "布尔值决策",
                background: "rgb(231, 231, 174)",
                icon: getImgUrl('booleanDecision'),
            },
            {
                registerType: 'diamondHtmlNode',
                type: "enumDecision",
                text: "枚举值决策",
                background: "rgb(231, 231, 174)",
                icon: getImgUrl('enumDecision'),
            },
            {
                registerType: 'diamondHtmlNode',
                type: "merge",
                text: "合并",
                background: "rgb(231, 231, 174)",
                icon: getImgUrl('merge'),
            }
        ]
    },
    {
        title: '对象活动',
        name: 'objectActions',
        children: [{
            registerType: 'rectHtmlNode',
            type: "createInstance",
            text: "创建对象",
            background: "rgb(231, 231, 174)",
            icon: getImgUrl('createObj'),
        },
        {
            registerType: 'rectHtmlNode',
            type: "editInstance",
            text: "修改对象",
            background: "rgb(231, 231, 174)",
            icon: getImgUrl('changeObj'),
        },
        {
            registerType: 'rectHtmlNode',
            type: "commitInstance",
            text: "提交对象",
            background: "rgb(231, 231, 174)",
            icon: getImgUrl('commitObj'),
        },
        {
            registerType: 'rectHtmlNode',
            type: "deleteInstance",
            text: "删除对象",
            background: "rgb(231, 231, 174)",
            icon: getImgUrl('deleteObj'),
        },
        {
            registerType: 'rectHtmlNode',
            type: "retriveInstance",
            text: "对象检索",
            background: "rgb(231, 231, 174)",
            icon: getImgUrl('retrieveObj'),
        },]
    },
    {
        title: '列表活动',
        name: 'listActions',
        children: [
            {
                registerType: 'rectHtmlNode',
                type: "createList",
                text: "创建列表",
                background: "rgb(231, 231, 174)",
                icon: getImgUrl('createList'),
            },
            {
                registerType: 'rectHtmlNode',
                type: "changeList",
                text: "更改列表",
                background: "rgb(231, 231, 174)",
                icon: getImgUrl('changeList'),
            },
            {
                registerType: 'rectHtmlNode',
                type: "aggregateList",
                text: "汇总列表",
                background: "rgb(231, 231, 174)",
                icon: getImgUrl('aggregateList'),
            },
            {
                registerType: 'rectHtmlNode',
                type: "listOperation",
                text: "列表操作",
                background: "rgb(231, 231, 174)",
                icon: getImgUrl('listOperation'),
            },
        ]
    },
    {
        title: '调用活动',
        name: 'callActions',
        children: [
            {
                registerType: 'rectHtmlNode',
                type: "callJava",
                text: "调用java",
                background: "rgb(231, 231, 174)",
                icon: getImgUrl('callJava'),
            },
            {
                registerType: 'rectHtmlNode',
                type: "callMicroflow",
                text: "调用规则引擎",
                background: "rgb(231, 231, 174)",
                icon: getImgUrl('callMicroflow'),
            },
        ]
    },
    {
        title: '变量活动',
        name: 'variableActions',
        children: [
            {
                registerType: 'rectHtmlNode',
                type: "createVariable",
                text: "创建变量",
                background: "rgb(231, 231, 174)",
                icon: getImgUrl('createVariable'),
            },
            {
                registerType: 'rectHtmlNode',
                type: "changeVariable",
                text: "修改变量",
                background: "rgb(231, 231, 174)",
                icon: getImgUrl('changeVariable'),
            },
        ]
    },
    {
        title: '集成活动',
        name: 'integrationActions',
        children: [
            {
                registerType: 'rectHtmlNode',
                type: "restApi",
                text: "rest服务",
                background: "rgb(231, 231, 174)",
                icon: getImgUrl('rest'),
            },
            {
                registerType: 'rectHtmlNode',
                type: "database",
                text: "数据库",
                background: "rgb(231, 231, 174)",
                icon: getImgUrl('database'),
            },
        ]
    },
    {
        title: '文件活动',
        name: 'fileActions',
        children: [
            {
                registerType: 'rectHtmlNode',
                type: "exportExcel",
                text: "导出excel",
                background: "rgb(231, 231, 174)",
                icon: getImgUrl('exportExcel'),
            },
        ]
    }
]
const groupNames: string[] = systemActions.map(group => group.name)
const activeNames = ref(groupNames);
const handleSearch = () => {
    activeNames.value = groupNames;
}
</script>

<style scoped lang="scss">
@import '@/styles/mixins.scss';


.toolbox-container {
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .search {
        flex-shrink: 0;
        flex-grow: 0;
        padding-left: 12px;
        padding-right: 12px;
        margin-bottom: 10px;
    }

    .el-collapse {
        height: calc(100vh - 130px);
        overflow-y: auto;
        padding-bottom: 25px;

        :deep(.el-collapse-item__header) {
            background-color: #F2F5F7;
            box-shadow: 1px 0px 0px 0px #EBEBEB;
            height: 32px;
        }

        :deep(.el-collapse-item__content) {
            padding-bottom: 8px;
            padding-top: 8px;
        }
    }

    .nodes-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        padding-left: 10px;
        padding-right: 10px;

        &:after {
            content: '';
            flex: auto;
        }

        .palette-node {
            cursor: pointer;
            width: calc(50% - 10px);
            height: 56px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            &:nth-child(odd) {
                margin-right: 20px;
            }

            &:hover .icon-container .icon {
                transform: scale(1.2);
                transition: transform 0.3s ease-in-out;
            }

            &:hover .label {
                font-weight: 500;
            }

            .icon-container {
                width: 100%;
                height: 32px;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;


                .icon {
                    width: 32px;
                    height: 32px;
                    pointer-events: none;
                }
            }

            .label {
                width: 100%;
                flex: 1;
                font-size: 12px;
                font-weight: 400;
                line-height: 22px;
                text-align: center;
                @include ellipsis();
                user-select: none;
            }
        }
    }

}
</style>