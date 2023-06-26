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
      <el-col :span="12">
        <el-form-item label="请选择规则引擎" prop="action">
        <el-select v-model="formValue.action" placeholder="select">
          <el-option label="Boolean" value="Boolean" />
          <el-option label="Date and Time" value="Date and Time" />
          <el-option label="Decimal" value="Decimal" />
          <el-option label="Enumeration" value="Enumeration" />
          <el-option label="Integer/Long" value="Integer/Long" />
          <el-option label="String" value="String" />
        </el-select>
      </el-form-item>
    </el-col>
     <el-col :span="6" :offset="2">
        <el-link style="line-height: 32px;">没有可用的规则? 请创建自定义规则引擎</el-link>
    </el-col>
      <el-form-item label="参数:根据规则引擎活动定义决定有没有参数" prop="actionParams">
        <el-input v-model="formValue.actionParams" />
      </el-form-item>
      <el-form-item label="返回值类型" prop="returnType">
        <el-input v-model="formValue.returnType" />
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
    action: string;
    actionParams: string;
    returnType: string;
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
        