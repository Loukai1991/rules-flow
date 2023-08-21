<template>
    <div class="node-wrap" :class="wrapperClass">
        <div class="node-title">
            <div class="node-icon">
                <div class="diamond-container">
                    <img :src="properties.icon" alt="Centered Image">
                </div>
            </div>
            <span class="node-name">
                <span>{{ properties.name }}</span>
            </span>
        </div>
        <div class="icon-info">
            <span class="warning-icon item">
                <img :src="waringIcon" />
            </span>
            <span class="breakpoint-icon item">
                <img :src="breakpointIcon" />
            </span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import defaultIcon from '@/icons/svg/default.svg';
import waringIcon from '@/icons/svg/error.svg'
import breakpointIcon from '@/icons/svg/breakpoint.svg'
import diamondbase from '@/icons/svg/diamondbase.svg'
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

</script>
<style lang="scss">
foreignObject {
    overflow: visible;
}

.diamond-center {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>
<style lang="scss" scoped>
@import '@/styles/mixins.scss';

.diamond-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

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
        .node-title .node-icon {
            border: 2px solid var(--node-active-color);
        }
    }

    .node-title {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        // background-color: #fff;
        overflow: visible;


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
        }

        .node-name {
            flex: 1;
            width: 100%;
            margin-top: 10px;

            span {
                display: inline-block;
                text-align: center;
                width: 100%;
                overflow: hidden;
                text-align: center;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 12px;
                font-weight: 400;
                line-height: 20px;
            }
        }
    }

    .icon-info {
        display: flex;
        position: absolute;
        right: -25px;
        top: calc(50% - 16px);
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

}
</style>