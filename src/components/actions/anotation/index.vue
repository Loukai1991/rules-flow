<template>
    <div class="anotation-wrapper">
        <div ref="content" class="content" contenteditable="true" @keydown="keyDownHandler" @keyup="keyupHandler"
            @keypress="keyDownHandler" @input="inputHandler">
            {{ properties.name }}
        </div>
        <!-- <div class="resize-handle"></div> -->
    </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted, onUpdated, onBeforeUpdate, reactive } from 'vue'

const content = ref(null);
const props = defineProps({
    properties: {
        type: Object,
        default: () => { }
    },
    model: {
        type: Object,
        default: () => { }
    },
});

const prevText = reactive({
    id: '',
    text: ''
})

onUpdated(() => {
    content.value.focus();
    placeCaretAtEnd(content.value);
    console.log('fuck ', prevText.id)
    if (prevText.id !== '') {
        props.model.setProperties(Object.assign(props.model.properties, { name: prevText.text }));
        prevText.id = ''
        prevText.text = ''
    }
    console.log('value', content.value)
    console.log('model', props.model)
    console.log('走这里updated')
})
const placeCaretAtEnd = el => {
    if (window.getSelection !== undefined && document.createRange !== undefined) {
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
}
const inputHandler = ev => {
    const { innerText: value } = ev.target as HTMLElement;
    console.log('avlue', value)
    prevText.id = props.model.id
    prevText.text = value.replace(/(\r\n)+$|(\n)+$/, '')
    // props.model.setProperties(Object.assign(props.model.properties, { name: value.replace(/(\r\n)+$|(\n)+$/, '') }));
}
const keyupHandler = (ev) => {

    // 按下alt+enter表示输入完成
    if (ev.key === 'Enter' && ev.altKey) {
        console.log('what model', props.model)
        props.model.setElementState(0);
    }
};
const keyDownHandler = ev => {
    console.log('ev', ev)
    ev.stopPropagation();
}
</script>
<style lang="scss" scoped>
@import '@/styles/mixins.scss';

.anotation-wrapper {
    // width: 120px;
    // height: 60px;
    width: 100%;
    height: 100%;
    // left: 1128.75px;
    // top: 509px;
    background-color: rgb(255, 255, 255);
    position: relative;
    overflow: visible;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.08), 0px 1px 4px 0px rgba(0, 0, 0, 0.04);
    // border: 1px solid rgb(204, 204, 204);
    box-sizing: border-box;
    overflow-wrap: normal;
    text-align: left;
    outline: none;
    border-left: 4px solid rgba(0, 0, 0, 0.30);
    // @include ellipsis();

    .content {
        box-sizing: border-box;
        // width: 100%;
        // height: 100%;
        word-break: break-all;
        outline: none;
        overflow-wrap: break-word;
        font-family: Arial, sans-serif;
        font-size: 12px;
        font-weight: normal;
        line-height: 1.2;
        padding: 5px 5px 7px 7px;

        color: #666;
        font-family: ABeeZee;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;

        /* 150% */
    }

    // .resize-handle {
    //     position: absolute;
    //     bottom: 0px;
    //     right: 0px;
    //     cursor: nwse-resize;
    //     width: 0px;
    //     height: 0px;
    //     border-width: 3px;
    //     border-style: solid;
    //     border-color: transparent rgb(204, 204, 204) rgb(204, 204, 204) transparent;
    // }
}
</style>