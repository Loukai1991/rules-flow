<template>
  <el-form ref="ruleFormRef" :model="formValue" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize"
    status-icon>
    <el-divider content-position="left">动作</el-divider>
    <el-col :span="12">
      <el-form-item label="请选择Java活动" prop="action">
        <el-input ref="action" readonly v-model="formValue.action" placeholder="选择活动" @focus="onInputFocus">
          <template #suffix>
            <el-icon class="el-input__icon" @click="onInputFocus">
              <Search />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-col>
    <el-form-item label="参数:根据java活动定义决定有没有参数" prop="actionParams">
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
  <el-dialog v-model="dialogVisible" title="选择java action" width='600px'>
    <div class="dialog-select">
      <el-input v-model="searchValue" placeholder="搜索" />
      <div class="source-select"></div>
      <el-divider></el-divider>
      <div class="result-container">
        <div class="result-container-title">
          <div class="name">Actions</div>
          <div class="icon area">
            <el-icon class="el-input__icon">
              <Plus />
            </el-icon>
          </div>
        </div>
        <div class="result-container-content">
          <el-scrollbar>
            <div v-for="(o, index) in options" :key="index" class="item" @click="setCurrentSelect(o)">{{ 'List item ' +
              o.name }}</div>
          </el-scrollbar>
        </div>

      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSelect">
          选择
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
        
<script lang="ts" setup>
import { reactive, ref, watch, PropType } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { Plus, Search } from '@element-plus/icons-vue'

//关于弹窗
const searchValue = ref('')
const current = ref({})
const options = ref([{ name: 'name1' }, { name: 'name2' }, { name: 'name3' }])
const setCurrentSelect = item => {
  current.value = item;
}
const handleSelect = () => {
  if (!current.value.name) {
    return
  }
  formValue.value.action = current.value.name;
  dialogVisible.value = false
}
//end 弹窗



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
const dialogVisible = ref(false)
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
const action = ref<HTMLInputElement | null>(null)
const onInputFocus = () => {
  dialogVisible.value = true;
  action.value.blur();

}
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
<style scoped>
.dialog-select {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .result-container {
    display: flex;
    position: relative;
    flex: 1;
    /* height: calc(100% - 60px); */
    overflow: hidden;
    flex-direction: column;

    .result-container-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;
      font-weight: bold;

      .area {
        cursor: pointer;
      }

      /* padding-right 16px; */
    }

    .item {
      cursor: pointer;

    }
  }
}
</style>
        