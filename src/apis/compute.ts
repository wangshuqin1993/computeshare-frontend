// 后端接口
import httpRequest from "@/request";

// 规格
export function apiGetSpec() {
  return httpRequest({
    url: "/v1/compute/spec",
    method: "get",
  });
}

// 操作系统
export function apiGetImage() {
  return httpRequest({
    url: "/v1/compute/image",
    method: "get",
  });
}

// 使用时长
export function apiGetDuration() {
  return httpRequest({
    url: "/v1/compute/duration",
    method: "get",
  });
}

// 创建实例
interface instanceParams {
  specId: number,
  imageId: number,
  duration: number,
  name: string,
}
export function apiPostInstance(params: instanceParams) {
  return httpRequest({
    url: "/v1/instance",
    method: "post",
    data: params,
  });
}

//实例列表
export function apiGetInstanceList() {
  return httpRequest({
    url: "/v1/instance",
    method: "get",
  });
}

//获取实例
export function apiGetInstance(id: string) {
  return httpRequest({
    url: `/v1/instance/${id}`,
    method: "get",
  });
}

//启动实例
export function apiInstanceStart(id: string) {
  return httpRequest({
    url: `/v1/instance/${id}/start`,
    method: "put",
    data:{}
  });
}

//关闭实例
export function apiInstanceStop(id: string) {
  return httpRequest({
    url: `/v1/instance/${id}/stop`,
    method: "put",
    data:{}
  });
}

//删除实例
export function apiInstanceDelete(id: string) {
  return httpRequest({
    url: `/v1/instance/${id}`,
    method: "delete",
  });
}

//重启实例
export function apiInstanceRestart(id: string) {
  return httpRequest({
    url: `/v1/instance/${id}/restart`,
    method: "put",
    data:{}
  });
}

// 获取vnc 的访问地址
export function apiInstanceVncURL(id: string) {
  return httpRequest({
    url: `/v1/instance/${id}/vnc`,
    method: "get",
  });
}

//重置虚拟机
export function apiResetVm(id: string, params: resetVmParams) {
  return httpRequest({
    url: `/v1/instance/${id}/recreate`,
    method: "put",
    data: params
  });
}

interface resetVmParams {
  imageId: number,
  publicKey: string,
  password: string,
  // 非必填
  dockerCompose?: string
}