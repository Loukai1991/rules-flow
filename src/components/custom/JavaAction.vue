<template>
  <myDialog
    title="自定义java action1"
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
      <el-tabs
        v-model="activeName"
        type="card"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane label="通用" name="first">
          <el-form-item label="名称" prop="name">
            <el-input v-model="formValue.name" />
          </el-form-item>
          <el-form-item label="参数" prop="params">
            <el-input v-model="formValue.params" />
          </el-form-item>
          <el-form-item label="返回值类型" prop="returnType">
            <el-input v-model="formValue.returnType" />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="放到工具箱" name="second">
          <el-alert
            title="提示"
            type="info"
            description="将自定义活动放置到工具箱中以后，工具箱将会多出一条活动出来。并且该活动呈现的图标，文字描述，分组等信息都是此处面板设置的结果。"
            :closable="false"
          />
          <el-form-item label="设置为工具活动" prop="expose">
            <el-switch v-model="formValue.expose" />
          </el-form-item>
          <el-form-item label="标题" prop="caption">
            <el-input v-model="formValue.caption" />
          </el-form-item>
          <el-form-item label="类别" prop="category">
            <el-input v-model="formValue.category" />
          </el-form-item>
          <el-form-item label="图标" prop="icon">
            <el-input v-model="formValue.icon" />
          </el-form-item>
          <el-form-item label="图像" prop="image">
            <el-input v-model="formValue.image" />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="代码" name="third">
          <el-form-item label="代码" prop="code">
            <el-input v-model="formValue.code" type="textarea" />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="文档" name="fourth">
          <el-form-item label="文档" prop="doc">
            <el-input v-model="formValue.doc" type="textarea" />
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
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
  params: string;
  returnType: string;
  expose: boolean;
  caption: string;
  category: string;
  icon: string;
  image: string;
  code: string;
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