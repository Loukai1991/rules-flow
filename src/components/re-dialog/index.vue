<script setup lang="ts">
import {
    closeDialog,
    dialogStore,
    type EventType,
    type ButtonProps,
    type DialogOptions
} from "./index";
import { ref, computed } from "vue";
import { isFunction } from "@vue/shared";

const Fullscreen = 'full_screen';
const ExitFullscreen = 'exit_screen'
const fullscreen = ref(false);
const footerButtons = computed(() => {
    return (options: DialogOptions) => {
        return options?.footerButtons?.length > 0
            ? options.footerButtons
            : ([
                {
                    label: "取消",
                    text: true,
                    bg: true,
                    btnClick: ({ dialog: { options, index } }) => {
                        const done = () =>
                            closeDialog(options, index, { command: "cancel" });
                        if (options?.beforeCancel && isFunction(options?.beforeCancel)) {
                            options.beforeCancel(done, { options, index });
                        } else {
                            done();
                        }
                    }
                },
                {
                    label: "确定",
                    type: "primary",
                    text: true,
                    bg: true,
                    btnClick: ({ dialog: { options, index } }) => {
                        const done = () =>
                            closeDialog(options, index, { command: "sure" });
                        if (options?.beforeSure && isFunction(options?.beforeSure)) {
                            options.beforeSure(done, { options, index });
                        } else {
                            done();
                        }
                    }
                }
            ] as Array<ButtonProps>);
    };
});

const fullscreenClass = computed(() => {
    return [
        "el-icon",
        "el-dialog__close",
        "-translate-x-2",
        "cursor-pointer",
        "hover:!text-[red]"
    ];
});

function eventsCallBack(
    event: EventType,
    options: DialogOptions,
    index: number
) {
    fullscreen.value = options?.fullscreen ?? false;
    if (options?.[event] && isFunction(options?.[event])) {
        return options?.[event]({ options, index });
    }
}

function handleClose(
    options: DialogOptions,
    index: number,
    args = { command: "close" }
) {
    closeDialog(options, index, args);
    eventsCallBack("close", options, index);
}
</script>


<template>
    <el-dialog class="pure-dialog" v-for="(options, index) in dialogStore" :key="index" v-model="options.visible"
        v-bind="options" :fullscreen="fullscreen ? true : options?.fullscreen ? true : false"
        @close="handleClose(options, index)" @opened="eventsCallBack('open', options, index)"
        @openAutoFocus="eventsCallBack('openAutoFocus', options, index)"
        @closeAutoFocus="eventsCallBack('closeAutoFocus', options, index)">
        <!-- header -->
        <template v-if="options?.fullscreenIcon || options?.headerRenderer" #header="{ close, titleId, titleClass }">
            <div v-if="options?.fullscreenIcon" class="flex-center">
                <span :id="titleId" :class="titleClass">{{ options?.title }}</span>
                <i v-if="!options?.fullscreen" :class="fullscreenClass" @click="fullscreen = !fullscreen">
                    <svg-icon class="pure-dialog-svg" :name="options?.fullscreen
                        ? ExitFullscreen
                        : fullscreen
                            ? ExitFullscreen
                            : Fullscreen
                        " />
                </i>
            </div>
            <component v-else :is="options?.headerRenderer({ close, titleId, titleClass })" />
        </template>
        <component v-bind="options?.props" :is="options.contentRenderer({ options, index })"
            @close="args => handleClose(options, index, args)" />
        <!-- footer -->
        <template v-if="!options?.hideFooter" #footer>
            <template v-if="options?.footerRenderer">
                <component :is="options?.footerRenderer({ options, index })" />
            </template>
            <span v-else>
                <el-button v-for="(btn, key) in footerButtons(options)" :key="key" v-bind="btn" @click="
                    btn.btnClick({
                        dialog: { options, index },
                        button: { btn, index: key }
                    })
                    ">
                    {{ btn?.label }}
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<style lang="scss" scoped>
.flex-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
