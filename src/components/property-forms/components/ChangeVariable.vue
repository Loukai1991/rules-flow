<template>
  <el-form ref="ruleFormRef" :model="formValue" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize"
    status-icon>
    <el-divider content-position="left">通用</el-divider>
    <el-form-item label="名称">
      <el-input v-model="formValue.name" @change="$emit('updateProperties', id, { name: formValue.name })" />
    </el-form-item>
    <el-divider content-position="left">动作</el-divider>

    <el-form-item label="请选择数据类型" prop="dataType">
      <el-select v-model="formValue.dataType" placeholder="select"
        @change="$emit('updateProperties', id, { dataType: formValue.dataType })">
        <el-option label="Boolean" value="Boolean" />
        <el-option label="Date and Time" value="Date and Time" />
        <el-option label="Decimal" value="Decimal" />
        <el-option label="Enumeration" value="Enumeration" />
        <el-option label="Integer/Long" value="Integer/Long" />
        <el-option label="String" value="String" />
      </el-select>
    </el-form-item>
    <el-form-item label="值" prop="value">
      <el-input v-model="formValue.value" @change="$emit('updateProperties', id, { value: formValue.value })" />
    </el-form-item>
  </el-form>
</template>
        
<script lang="ts" setup>
import { reactive, ref, watch, PropType } from "vue";
import type { FormInstance, FormRules } from "element-plus";

export interface FormValueType {
  name: string;
  dataType: string;
  value: string;
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

const emit = defineEmits(["updateProperties"]);
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

// const submitForm = async (formEl: FormInstance | undefined) => {
//   if (!formEl) return;
//   await formEl.validate((valid, fields) => {
//     if (valid) {
//       emit("submit", props.id, formValue.value);
//     } else {
//       console.log("error submit!", fields);
//     }
//   });
// };

</script>
        