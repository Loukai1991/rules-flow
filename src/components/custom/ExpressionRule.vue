<template>
    <myDialog
      title="自定义规则表达式"
      @save-submit="submitForm(ruleFormRef)"
    >
      <el-form
        ref="ruleFormRef"
        :model="formValue"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
      <el-form-item label="规则名称" prop="name">
        <el-input v-model="formValue.name" />
      </el-form-item>
      <el-form-item label="表达式内容" prop="expression">
        <el-input v-model="formValue.expression" />
      </el-form-item>
      <el-form-item label="文档说明" prop="doc">
        <el-input v-model="formValue.doc" />
      </el-form-item>
      </el-form>
    </myDialog>
  </template>
  
  <script lang="ts" setup>
  import { ref, reactive, watch, PropType } from "vue";
  import type { TabsPaneContext, FormInstance, FormRules } from "element-plus";
  import myDialog from "../dialog/Index.vue";
  // const visible = ref({
  //   all: false,
  // });
  // console.log('visi', visible.value)
  // debugger
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
  const emit = defineEmits([ "submit"]);
  watch(
    () => props.editData,
    (val) => {
      formValue.value = val;
    }
  );
  
  const activeName = ref("first");
  
  const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event);
  };
  const formValue = ref(props.editData);
  const formSize = ref("default");
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