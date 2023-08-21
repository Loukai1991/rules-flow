<template>
    <div class="node-wrap" :class="wrapperClass">
        <div class="node-title">
            <span class="node-icon">
                <img :src="properties.icon || defaultIcon" />
            </span>
            <span class="node-name">
                <span>{{ properties.name }}</span>
            </span>
        </div>
        <div class="var-info" v-if="hasVar">
            <span class="var-name">obj</span>
            <span class="var-type">MONEY</span>
        </div>
        <div class="icon-info">
            <span class="warning-icon item">
                <img :src="waringIcon" />
            </span>
            <span class="breakpoint-icon item">
                <img :src="breakpointIcon" />
            </span>
        </div>
        <div class="ellipse-info" v-show="isHovered || isSelected" @click="showPopover">
            <img :src="ellipseIcon" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import defaultIcon from '@/icons/svg/default.svg';
import waringIcon from '@/icons/svg/error.svg'
import breakpointIcon from '@/icons/svg/breakpoint.svg'
import ellipseIcon from '@/icons/svg/ellipse.svg'
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
    return { hovered: props.isHovered, selected: props.isSelected }
})
const hasVar = computed(() => {
    return true
})
const showPopover = () => {
    alert('打开pop')
}

</script>
<style lang="scss">
foreignObject {
    overflow: visible;
}
</style>
<style lang="scss" scoped>
@import '@/styles/mixins.scss';



.node-wrap {
    width: 100%;
    height: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    background: transparent;

    &.selected {
        .node-title {
            border: 2px solid var(--node-active-color);
        }
    }

    .node-title {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        background-color: #fff;
        overflow: hidden;
        border-radius: 8px;
        // border: 2px solid #bac1d0;
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.08), 0px 1px 4px 0px rgba(0, 0, 0, 0.04);

        .node-icon {
            width: 48px;
            height: 48px;
            display: flex;
            justify-content: center;
            align-items: center;
            pointer-events: none;
            flex-shrink: 0;

        }

        .node-name {
            overflow: hidden;
            // text-align: center;
            // text-overflow: ellipsis;
            // white-space: nowrap;
            display: flex;
            width: 82px;
            height: 52px;
            flex-direction: column;
            justify-content: center;
            flex-shrink: 0;
            color: rgba(0, 0, 0, 0.92);
            font-family: PingFang SC;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 16px;

            span {
                width: 100%;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;

            }
        }
    }

    .var-info {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        left: 0;
        width: 100%;
        font-size: 12px;
        line-height: 20px;
        bottom: calc(50% - 36px);
        transform: translateY(100%);

        .var-name,
        .var-type {
            width: 100%;
            text-align: center;
            @include ellipsis();
        }

        .var-name {
            font-weight: 400;
            color: rgba(0, 0, 0, 0.68)
        }

        .var-type {
            color: rgba(0, 0, 0, 0.92);
            font-weight: 500;
        }

        // transform: translateY(-100%);
    }

    .icon-info {
        display: flex;
        position: absolute;
        right: 0;
        top: calc(50% - 34px);
        transform: translateY(-100%);

        .item {
            height: 16px;
            cursor: pointer;
            width: 16px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .ellipse-info {
        position: absolute;
        right: 5px;
        top: 0;
        display: flex;
        width: 16px;
        height: 16px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;

        img {
            width: 100%;
            height: 100%;
        }
    }

}
</style>