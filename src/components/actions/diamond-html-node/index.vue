<template>
    <div class="node-wrap" :class="wrapperClass">
        <div class="node-title">
            <!-- <div class="node-icon">
                <div class="diamond-container">
                    <img :src="properties.icon" alt="Centered Image">
                </div>
            </div> -->
            <svg width="62.225" height="62.225" xmlns="http://www.w3.org/2000/svg" class="node-icon">
                <defs>
                    <filter id="box-shadow">
                        <feDropShadow dx="2" dy="2" stdDeviation="4" flood-color="rgba(0, 0, 0, 0.08)" />
                    </filter>
                </defs>
                <polygon class="diamond" points="31.1125,0 62.225,31.1125 31.1125,62.225 0,31.1125" stroke="#FFF"
                    filter="url(#box-shadow)" />
                <foreignObject x="0" y="0" width="62.225" height="62.225">
                    <div class="diamond-container">
                        <img :src="properties.icon" alt="Centered Image">
                    </div>
                </foreignObject>
            </svg>
            <span class="node-name">
                <span>{{ properties.name }}</span>
            </span>
        </div>

        <!-- <div class="node-title">
            <span class="node-icon">
                <img :src="diamondbase" class="background-img" />
                <img :src="properties.icon || defaultIcon" class="dynamic-img" />
            </span>
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
    </div> -->
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
        .node-title .node-icon .diamond {
            stroke: var(--node-active-color) // border: 2px solid #ff7f0e;
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
            border-radius: 4px;
            // border: 2px solid #bac1d0;
            background-color: transparent;

            // .background-img {
            //     width: 100%;
            //     height: 100%;
            //     position: absolute;
            //     left: 0;
            //     top: 0;
            // }

            // .dynamic-img {
            //     width: 48px;
            //     height: 48px;
            //     position: absolute;
            //     left: 50%;
            //     top: 50%;
            //     transform: translate(-50%, -50%);
            // }

            // img {
            //     transform: rotate(-45deg);
            // }
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
        right: 0;
        top: calc(50% - 30px);
        transform: translateY(-100%);

        .item {
            height: 26px;
            cursor: pointer;
            width: 26px;
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