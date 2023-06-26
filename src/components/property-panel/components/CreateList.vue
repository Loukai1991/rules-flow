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
    <el-row>
      <el-col :span="12">
        <el-form-item label="请选择对象类型" prop="objectType">
          <el-select v-model="formValue.objectType" placeholder="select">
            <el-option label="规则" value="rules" />
            <el-option label="表达式" value="expression" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="10" :offset="2">
        <el-link style="line-height: 32px"
          >没有可用的对象模型? 请导入结构</el-link
        >
      </el-col>
    </el-row>
    <el-divider content-position="left">输出</el-divider>
    <el-form-item label="列表名称" prop="listName">
      <el-input v-model="formValue.listName" />
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
  objectType: string;
  listName: string;
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
      