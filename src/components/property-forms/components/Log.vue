<template>
  <el-form
    ref="ruleFormRef"
    :model="formValue"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-divider content-position="left">动作</el-divider>

    <el-form-item label="请选择日志级别" prop="logLevel">
      <el-select v-model="formValue.logLevel" placeholder="select">
        <el-option label="规则" value="Trace" />
        <el-option label="表达式" value="Debug" />
        <el-option label="表达式" value="Info" />
        <el-option label="表达式" value="Warning" />
        <el-option label="表达式" value="Error" />
        <el-option label="表达式" value="Critical" />
      </el-select>
    </el-form-item>
    <el-form-item label="记录节点名称" prop="logNodeName">
      <el-input v-model="formValue.logNodeName" />
    </el-form-item>
    <el-form-item label="日志模版" prop="template">
      <el-input v-model="formValue.template" />
    </el-form-item>
    <el-form-item label="参数" prop="parameters">
      <el-input v-model="formValue.parameters" />
    </el-form-item>
    <el-form-item label="包含最近的堆栈信息" prop="includeLatestStackTrace">
      <el-radio-group v-model="formValue.includeLatestStackTrace">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        保存
      </el-button>
    </el-form-item>
  </el-form>
</template>
      
      <script lang="ts" setup>
import { reactive, ref, watch, PropType } from "vue";
import type { FormInstance, FormRules } from "element-plus";

export interface FormValueType {
  logLevel: string;
  logNodeName: string;
  template: string;
  parameters: string;
  outputName: string;
  includeLatestStackTrace: boolean;
}

const props = defineProps({
  properties: {
    type: Object as PropType<FormValueType>,
    default: () => {
      return {};
    },
  },
  id: {
    type: String,
    default: "",
  },
});
watch(
  () => props.properties,
  (val) => {
    formValue.value = val;
  }
);

const emit = defineEmits(["submit"]);
const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const formValue = ref(props.properties);

const rules = reactive<FormRules>({
  // loopObjName: [
  //   { required: true, message: "Please input loop obj name", trigger: "blur" },
  //   { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  // ],
  // loopOver: [
  //   {
  //     required: true,
  //     message: "Please select loopover",
  //     trigger: "change",
  //   },
  // ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      emit("submit", props.id, formValue.value);
    } else {
      console.log("error submit!", fields);
    }
  });
};

</script>
      