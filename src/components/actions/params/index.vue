<template>
    <div class="params-wrapper" :class="wrapperClass">
        <span class="node-icon">
            <img src="@/icons/svg/params.svg" />
        </span>
        <span class="node-name">{{ properties.name }}</span>
        <span class="node-type">{{ properties.paramsType }}</span>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
    properties: {
        type: Object,
        default: () => { }
    },
    isHovered: {
        type: Boolean,
        default: false,
    },
    isSelected: {
        type: Boolean,
        default: false
    }
});
const wrapperClass = computed(() => {
    console.log('chufa了吗', props.isHovered)
    return { hovered: props.isHovered, selected: props.isSelected }
})
const emit = defineEmits(["updateProperties"]);
</script>
<style lang="scss" scoped>
.params-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: transparent;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #1f3252;
    line-height: 16px;
    font-weight: 400;
    box-sizing: border-box;
    cursor: pointer;

    &.selected {
        .node-icon {
            border: 2px solid var(--node-active-color);
        }
    }

    .node-icon {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        border-radius: 50%;
        background: #FFF;
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.08), 0px 1px 4px 0px rgba(0, 0, 0, 0.04);

        img {
            width: 100%;
            height: 100%;

        }
    }

    .node-name {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
        line-height: 16px;
        font-weight: 400;
        margin-top: 8px;
        color: rgba(0, 0, 0, 0.68);
    }


    .node-type {
        width: 100%;
        // overflow: hidden;
        white-space: nowrap;
        // text-overflow: ellipsis;
        text-align: center;
        font-weight: 500;
        line-height: 16px;
        color: rgba(0, 0, 0, 0.92);
    }


}
</style>