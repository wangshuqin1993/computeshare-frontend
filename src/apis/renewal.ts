import httpRequest from "@/request";
import { basePageInfo } from "./index";

// 续费管理列表
export function apiGetRenewalList(pageInfo: basePageInfo) {
    return httpRequest({
      url: `/v1/cycle/renewal?page=${pageInfo.page}&size=${pageInfo.size}`,
      method: "get",
    });
  }

// 关闭自动续费
export function apiCloseCycle(id: string) {
    return httpRequest({
      url: `/v1/cycle/renewal/${id}/close`,
      method: "put",
      data: {}
    });
  }

// 打开自动续费
export function apiOpenCycle(id: string) {
    return httpRequest({
      url: `/v1/cycle/renewal/${id}/open`,
      method: "put",
      data: {}
    });
  }

// 手动续费
export function apiManualCycle(id: string) {
    return httpRequest({
      url: `/v1/cycle/renewal/${id}/manual-renew`,
      method: "post",
      data: {}
    });
  }

// 手动续费弹框的实例信息
export function apiGetInstanceInfo(id: string) {
    return httpRequest({
      url: `/v1/cycle/renewal/${id}`,
      method: "get",
    });
  }