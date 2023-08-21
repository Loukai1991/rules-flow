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
    <el-form-item label="type" prop="type">
      <el-select v-model="formValue.type" placeholder="select">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="Loop Object Name" prop="loopObjName">
        <el-input v-model="ruleForm.loopObjName" />
      </el-form-item> -->
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
    type: string;
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
    default: ""
  }
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
const formValue = ref(props.properties)

const rules = reactive<FormRules>({
  type: [
    {
      required: true,
      message: "Please select type",
      trigger: "change",
    },
  ],
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
  