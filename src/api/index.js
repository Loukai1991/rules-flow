import { request, payloadStringify } from "@/util/http";


//获取规则列表(规则引擎)
export const getFlow = (params) =>
  request({
    url: payloadStringify("/api/rule-engine/rules", params),
    method: "get",
  });
  
//新增规则
export const saveFlow = (record) =>
  request({
    url: "/api/rule-engine/rules",
    method: "post",
    data: record,
  });

// 修改流程
export const submitFlow = (id, record) =>
  request({
    url: `/api/bpm/models//${id}`,
    method: "patch",
    data: record,
  });
