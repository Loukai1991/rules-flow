<template>
    <el-form ref="ruleFormRef" :model="formValue" :rules="rules" class="demo-ruleForm" :size="formSize" status-icon>
        <el-divider content-position="left">通用</el-divider>
        <el-form-item label="名称">
            <el-input v-model="formValue.name" @change="$emit('updateProperties', id, { name: formValue.name })" />
        </el-form-item>
        <el-divider content-position="left">动作</el-divider>
        <el-form-item label="参数类型" prop="paramsType">
            <el-select v-model="formValue.paramsType" placeholder="select"
                @change="$emit('updateProperties', id, { paramsType: formValue.paramsType })">
                <el-option label="String" value="String" />
                <el-option label="Boolean" value="Boolean" />
                <el-option label="Object" value="Object" />
                <el-option label="List" value="List" />
                <el-option label="Decimal" value="Decimal" />
                <el-option label="Integer/Long" value="Integer/Long" />
                <el-option label="Date" value="Date" />
            </el-select>
        </el-form-item>
        <!-- <el-form-item label="Loop Object Name" prop="loopObjName">
            <el-input v-model="formValue.loopObjName" />
        </el-form-item> -->
    </el-form>
</template>
    
<script lang="ts" setup>
import { reactive, ref, watch, PropType } from "vue";
import type { FormInstance, FormRules } from "element-plus";

export interface FormValueType {
    paramsType: string;
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

const emit = defineEmits(["submit"]);
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
    