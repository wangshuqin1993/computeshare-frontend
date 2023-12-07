import httpRequest from "@/request";

interface networkMap {
  name: string,
  computerId: string,
  computerPort: number,
}

interface networkMapList {
  page: number,
  size: number,
}

export function apiNetworkMap(params: networkMap) {
  return httpRequest({
    url: `/v1/network-mappings`,
    method: "post",
    data: params,
  });
}

export function apiNetworkMapList(params: networkMapList) {
  return httpRequest({
    url: `/v1/network-mappings/page`,
    method: "get",
    params:params,
  });
}

export function apiNetworkMapById(id:string) {
  return httpRequest({
    url: `/v1/network-mappings/${id}`,
    method: "get",
  });
}

export function apiDeleteNetworkMapById(id:string) {
  return httpRequest({
    url: `/v1/network-mappings/${id}`,
    method: "delete",
  });
}

// 获取公网Ip和端口
export function apiPublicNetworkInfo() {
  return httpRequest({
    url: `/v1/network-mappings/next`,
    method: "get",
  });
}