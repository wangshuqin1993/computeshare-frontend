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
export function apiPublicNetworkInfo(computerId: string) {
  return httpRequest({
    url: `/v1/network-mappings/next?computerId=${computerId}`,
    method: "get",
  });
}

// 获取已绑定域名列表
export function apiDomainBindingList(page: number, size: number, networkMappingId: string) {
  return httpRequest({
    url: `/v1/domain-binding?page=${page}&size=${size}&networkMappingId=${networkMappingId}`,
    method: "get",
  });
}

// 绑定域名
export function apiBindDomain(params: bindDomainParams) {
  return httpRequest({
    url: `/v1/domain-binding`,
    method: "post",
    data: params
  });
}

interface bindDomainParams {
  networkMappingId: string,
  name: string,
  domain: string
}

// 获取公网Ip和端口
// export function apiPublicNetworkInfo(computerId: string) {
//   return httpRequest({
//     url: `/v1/network-mappings/next?computerId=${computerId}`,
//     method: "get",
//   });
// }

// 获取公网Ip和端口
// export function apiPublicNetworkInfo(computerId: string) {
//   return httpRequest({
//     url: `/v1/network-mappings/next?computerId=${computerId}`,
//     method: "get",
//   });
// }

// 获取公网Ip和端口
// export function apiPublicNetworkInfo(computerId: string) {
//   return httpRequest({
//     url: `/v1/network-mappings/next?computerId=${computerId}`,
//     method: "get",
//   });
// }

// 获取公网Ip和端口
// export function apiPublicNetworkInfo(computerId: string) {
//   return httpRequest({
//     url: `/v1/network-mappings/next?computerId=${computerId}`,
//     method: "get",
//   });
// }