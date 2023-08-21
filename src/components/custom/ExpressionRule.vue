<template>
  <myDialog title="自定义决策规则" @save-submit="submitForm(ruleFormRef)">
    <el-form ref="ruleFormRef" :model="formValue" :rules="rules" label-width="120px" class="demo-ruleForm"
      :size="formSize" status-icon>
      <el-form-item label="规则名称" prop="name">
        <el-input v-model="formValue.name" />
      </el-form-item>
    </el-form>
  </myDialog>
</template>
  
<script lang="ts" setup>
import { ref, reactive, watch, PropType } from "vue";
import type { TabsPaneContext, FormInstance, FormRules } from "element-plus";
import myDialog from "../dialog/Index.vue";

export interface FormValueType {
  name: string;
  expression: string;
  doc: string;
}

const props = defineProps({
  editData: {
    type: Object as PropType<FormValueType>,
    default: () => {
      return {};
    },
  },
});
const emit = defineEmits(["submit"]);
watch(
  () => props.editData,
  (val) => {
    formValue.value = val;
  }
);


const formValue = ref(props.editData);
const formSize = ref("default");
const rules = reactive<FormRules>({
  name: [
    { required: true, message: "请输入规则名称", trigger: "blur" },
    { min: 1, max: 5, message: "Length should be 1 to 5", trigger: "blur" },
  ]
});
const ruleFormRef = ref<FormInstance>();

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(formValue.value);
      emit("submit", formValue.value);
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>