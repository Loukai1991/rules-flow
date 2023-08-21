<template>
  <el-form ref="ruleFormRef" :model="formValue" :rules="rules" class="demo-ruleForm" :size="formSize" status-icon>
    <el-divider content-position="left">通用</el-divider>
    <el-form-item label="名称">
      <el-input v-model="formValue.name" @change="$emit('updateProperties', id, { name: formValue.name })" />
    </el-form-item>
    <el-divider content-position="left">动作</el-divider>
    <el-form-item label="决策类型" prop="decisionType">
      <el-select v-model="formValue.decisionType" placeholder="select"
        @change="$emit('updateProperties', id, { decisionType: formValue.decisionType })">
        <el-option label="规则" value="rules" />
        <el-option label="表达式" value="expression" />
      </el-select>
    </el-form-item>
    <el-form-item label="错误处理方式" prop="errorHandlingType">
      <el-select v-model="formValue.errorHandlingType" placeholder="select"
        @change="$emit('updateProperties', id, { errorHandlingType: formValue.errorHandlingType })">
        <el-option label="回滚" value="rollback" />
        <el-option label="自定义回滚" value="customRollBack" />
        <el-option label="无" value="none" />
      </el-select>
    </el-form-item>
    <el-form-item label="表达式内容" prop="expression">
      <el-input v-model="formValue.expression"
        @change="$emit('updateProperties', id, { expression: formValue.expression })" />
    </el-form-item>
    <el-form-item label="规则" prop="rule">
      <el-select v-model="formValue.rule" placeholder="select"
        @change="$emit('updateProperties', id, { rule: formValue.rule })">
        <el-option label="规则1" value="rule1" />
        <el-option label="规则2" value="rule2" />
        <el-option label="规则3" value="rule3" />
      </el-select>
    </el-form-item>
    <el-form-item label="规则参数" prop="ruleParams">
      <el-input v-model="formValue.ruleParams"
        @change="$emit('updateProperties', id, { ruleParams: formValue.ruleParams })" />
    </el-form-item>
    <el-form-item label="描述" prop="caption">
      <el-input v-model="formValue.caption" @change="$emit('updateProperties', id, { caption: formValue.caption })" />
    </el-form-item>
    <!-- <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        保存
      </el-button>
    </el-form-item> -->
  </el-form>
</template>
    
<script lang="ts" setup>
import { reactive, ref, watch, PropType } from "vue";
import type { FormInstance, FormRules } from "element-plus";

export interface FormValueType {
  name: string;
  caption: string;
  decisionType: string;
  errorHandlingType: string;
  expression: string;
  rule: string;
  ruleParams: string; //TODO 应该是数组
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
    