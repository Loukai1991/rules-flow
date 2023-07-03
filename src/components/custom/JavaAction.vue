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
    <el-tabs
      v-model="activeName"
      type="card"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="通用" name="first">
        <el-form-item label="名称" prop="actionParams">
          <el-input v-model="formValue.actionParams" />
        </el-form-item>
        <el-form-item label="参数" prop="actionParams">
          <el-input v-model="formValue.actionParams" />
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
      <el-tab-pane label="代码" name="third">Role</el-tab-pane>
      <el-tab-pane label="文档" name="fourth">Task</el-tab-pane>
    </el-tabs>
  </el-form>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, PropType } from "vue";
import type { TabsPaneContext, FormInstance, FormRules } from "element-plus";

export interface FormValueType {
  action: string;
  actionParams: string;
  returnType: string;
  expose: boolean;
  caption: string;
  category: string;
  icon: string;
  image: string;
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

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
const formValue = ref(props.properties);
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
</script>