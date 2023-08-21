<script setup lang="ts">
import { reactive, watch } from "vue";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

const props = defineProps({
    graphData: {
        type: Object,
        required: true,
    }
})

defineOptions({
    name: "JsonEditor"
});


const state = reactive({
    data: props.graphData,
    showLine: true,
    showLineNumber: false,
    showDoubleQuotes: true,
    showLength: true,
    editable: false,
    showIcon: true,
    deep: 3,
    virtual: true
});

</script>

<template>
    <el-card shadow="never">
        <template #header>
            <div class="card-header">
                查看规则引擎画布渲染的数据，可以辅助调试使用
            </div>
        </template>
        <vue-json-pretty v-model:data="state.data" :deep="state.deep" :show-double-quotes="state.showDoubleQuotes"
            :show-line="state.showLine" :show-length="state.showLength" :show-icon="state.showIcon"
            :show-line-number="state.showLineNumber" :editable="state.editable" />
    </el-card>
</template>
