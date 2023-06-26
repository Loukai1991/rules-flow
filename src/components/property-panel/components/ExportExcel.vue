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

    <el-form-item label="请选择数据来源" prop="dataSource">
      <el-select v-model="formValue.dataSource" placeholder="select">
        <el-option label="变量1" value="Boolean" />
        <el-option label="变量2" value="Date and Time" />
        <el-option label="String" value="String" />
      </el-select>
    </el-form-item>

    <el-form-item label="参数(如果是api)" prop="params">
      <el-input v-model="formValue.params" />
    </el-form-item>
    <el-form-item label="导出字段" prop="exportFields">
      <el-select
        v-model="formValue.exportFields"
        multiple
        placeholder="Select"
        style="width: 240px"
      >
        <el-option label="字段1" value="Boolean" />
        <el-option label="字段2" value="Date and Time" />
        <el-option label="字段3" value="String" />
      </el-select>
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
  dataSource: string;
  params: string;
  exportFields: string;
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
        