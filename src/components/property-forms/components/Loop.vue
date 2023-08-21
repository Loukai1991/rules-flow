<template>
  <el-form ref="ruleFormRef" :model="formValue" :rules="rules" class="demo-ruleForm" :size="formSize" status-icon>
    <el-divider content-position="left">通用</el-divider>
    <el-form-item label="名称">
      <el-input v-model="formValue.name" @change="$emit('updateProperties', id, { name: formValue.name })" />
    </el-form-item>
    <el-divider content-position="left">动作</el-divider>
    <el-form-item label="Loop type" prop="loopType">
      <el-select v-model="formValue.loopType" placeholder="select"
        @change="$emit('updateProperties', id, { loopType: formValue.loopType })">
        <el-option label="For" value="for" />
        <el-option label="While" value="while" />
      </el-select>
    </el-form-item>
    <el-form-item label="Loop Over" prop="loopOver">
      <el-select v-model="formValue.loopOver" placeholder="select"
        @change="$emit('updateProperties', id, { loopOver: formValue.loopOver })">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="Loop Object Name" prop="loopObjName">
      <el-input v-model="formValue.loopObjName"
        @change="$emit('updateProperties', id, { loopObjName: formValue.loopObjName })" />
    </el-form-item>
  </el-form>
</template>
  
<script lang="ts" setup>
import { reactive, ref, watch, PropType } from "vue";
import type { FormInstance, FormRules } from "element-plus";

export interface FormValueType {
  loopType: string;
  loopOver: string;
  loopObjName: string;
  name: string;
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
  loopObjName: [
    { required: true, message: "Please input loop obj name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  loopOver: [
    {
      required: true,
      message: "Please select loopover",
      trigger: "change",
    },
  ],
});

</script>
  