import { request, payloadStringify } from "@/util/http";


//获取规则列表(规则引擎)
export const getFlow = (params) =>
  request({
    url: payloadStringify("/api/rule-engine/rules", params),
    method: "get",
  });
  
//新增规则
export const addFlow = (record) =>
  request({
    url: "/api/rule-engine/rules/add",
    method: "post",
    data: record,
  });
//编辑暂存规则
export const saveFlow = (record) =>
  request({
    url: "/api/rule-engine/rules",
    method: "post",
    data: record,
  });
// 发布规则
export const submitFlow = (id, record) =>
  request({
    url: `/api/bpm/models//${id}`,
    method: "patch",
    data: record,
  });
  
//新增自定义java action
export const saveCustomJaveAction = (record) =>
  request({
    url: "/api/rule/custom",
    method: "post",
    data: record,
  });

export const editCustomJaveAction = (record) =>
  request({
    url: "/api/rule/custom",
    method: "post",
    data: record,
  });
