<template>
  <el-form ref="ruleFormRef" :model="formValue" :rules="rules" class="demo-ruleForm" :size="formSize" status-icon>
    <el-divider content-position="left">通用</el-divider>
    <el-form-item label="名称">
      <el-input v-model="formValue.name" @change="$emit('updateProperties', id, { name: formValue.name })" />
    </el-form-item>
    <el-divider content-position="left">动作</el-divider>

    <el-form-item label="请选择对象类型" prop="objectType">
      <el-select v-model="formValue.objectType" placeholder="select"
        @change="$emit('updateProperties', id, { objectType: formValue.objectType })">
        <el-option label="规则" value="rules" />
        <el-option label="表达式" value="expression" />
      </el-select>
    </el-form-item>

    <el-table :data="tableData" style="width: 100%; margin-bottom: 10px;" size="small">
      <el-table-column label="属性">
        <template #default="scope">
          <el-select v-model="scope.row.key">
            <el-option label="Long" value="Long" />
            <el-option label="String" value="String" />
            <el-option label="Integer" value="Integer" />
            <el-option label="Double" value="Double" />
            <el-option label="BigDecimal" value="BigDecimal" />
            <el-option label="Date" value="Date" />
            <el-option label="Boolean" value="Boolean" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="属性类型">
        <template #default="scope">
          <el-select v-model="scope.row.keytype">
            <el-option label="Long" value="Long" />
            <el-option label="String" value="String" />
            <el-option label="Integer" value="Integer" />
            <el-option label="Double" value="Double" />
            <el-option label="BigDecimal" value="BigDecimal" />
            <el-option label="Date" value="Date" />
            <el-option label="Boolean" value="Boolean" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="属性值">
        <template #default="scope">
          <el-input v-model="scope.row.value"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-divider content-position="left">输出</el-divider>
    <el-form-item label="保存为变量名" prop="outputName">
      <el-input v-model="formValue.outputName"
        @change="$emit('updateProperties', id, { outputName: formValue.outputName })" />
    </el-form-item>

  </el-form>
</template>
    
<script lang="ts" setup>
import { reactive, ref, watch, PropType } from "vue";
import type { FormInstance, FormRules } from "element-plus";

export interface FormValueType {
  name: string;
  caption: string;
  objectType: string;
  outputName: string;
  expression: string;
  rule: string;
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

interface User {
  date: string;
  name: string;
  address: string;
}
const tableData: User[] = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};
</script>
    