<template>
  <el-dialog
    v-model="dialogVisible"
    width="800px"
    :fullscreen="fullscreen"
    draggable
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <template #header>
      <div class="custom-header">
        <span>{{ title }}</span>
        <div class="right-btn">
            <el-icon @click="changeScreen"><FullScreen /></el-icon>
            <el-icon @click="close"><Close /></el-icon>
        </div>
    </div>
    </template>
    <el-scrollbar>
      <div :class="formBody">
        <slot></slot>
      </div>
    </el-scrollbar>
    <template v-if="footer" #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="saveSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, reactive, watch, computed } from "vue";

let props = defineProps({
  modelValue: {
    type: Boolean,
    require: true,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  footer: {
    type: Boolean,
    default: true,
  },
  saveSubmit: {
    type: Function,
    default: () => {
      return Function;
    },
  },
});

const dialogVisible = ref(props.modelValue); //显示弹窗
const title = ref(props.title); //弹窗标题
const fullscreen = ref(false); //是否全屏
const formBody = ref("form-body"); //弹窗body部分css

let emits = defineEmits(["update:modelValue", "saveSubmit"]); //全屏
const changeScreen = () => {
  if (fullscreen.value == true) {
    fullscreen.value = false;
    formBody.value = "form-body";
  } else {
    fullscreen.value = true;
    formBody.value = "form-body-new";
  } //fullscreen.value = !fullscreen.value;
}; //销毁
const close = () => {
  dialogVisible.value = false;
  emits("update:modelValue", false);
}; //保存表单方法
const saveSubmit = () => {
  emits("saveSubmit", props.saveSubmit);
}; //监听value

watch(
  () => props.modelValue,
  (value, o) => {
    if (value == true) {
      fullscreen.value = false;
    }
    dialogVisible.value = value;
  }
);
</script>
<style scoped>
.custom-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 40px;
}

.custom-header .right-btn {
  height: 40px;
  cursor: pointer;
}

.custom-header .right-btn .el-icon {
  margin-right: 10px;
  height: 100%;
}

.custom-header .right-btn .el-icon:hover {
  color: #fff000;
}

.form-body {
  /* padding-right: 120px;
  height: 500px;
  margin-bottom: 52px; */
}

.form-body-new {
  /* padding-right: 120px;
  height: 750px;
  margin-bottom: 52px; */
}

.el-scrollbar {
  /* margin-bottom: 30px; */
}
</style>

