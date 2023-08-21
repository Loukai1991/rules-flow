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
  
      <el-form-item label="执行函数" prop="functionName">
        <el-select v-model="formValue.functionName" placeholder="select">
          <el-option label="求和" value="Sum" />
          <el-option label="求平均数" value="Average" />
          <el-option label="列表中对象总数" value="Count" />
          <el-option label="最小值" value="Minimum" />
          <el-option label="最大值" value="Maximum" />
        </el-select>
      </el-form-item>
      <el-form-item label="属性" prop="attribute">
        <el-select v-model="formValue.attribute" placeholder="select">
          <el-option label="att1" value="Boolean" />
          <el-option label="att2" value="Date and Time" />
          <el-option label="att3" value="Decimal" />
        </el-select>
      </el-form-item>
      <el-form-item label="保存变量名" prop="variableName">
        <el-input v-model="formValue.variableName" />
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
    functionName: string;
    attribute: string;
    variableName: string;
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
          