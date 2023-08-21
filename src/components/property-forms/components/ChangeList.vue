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
    <el-form-item label="列表选择" prop="listName">
      <el-select v-model="formValue.listName" placeholder="select">
        <el-option label="list1" value="Boolean" />
        <el-option label="list2" value="Date and Time" />
        <el-option label="list3" value="Decimal" />
      </el-select>
    </el-form-item>

    <el-form-item label="操作类型" prop="operateType">
      <el-radio-group v-model="formValue.operateType">
        <el-radio label="Add" />
        <el-radio label="Remove" />
        <el-radio label="Clear" />
        <el-radio label="Replace" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="值" prop="value">
      <el-input v-model="formValue.value" />
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
  listName: string;
  operateType: string;
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
        