import httpRequest from "@/request";
import { basePageInfo } from "./index";

// 订单列表
export function apiGetOrderList(pageInfo: basePageInfo) {
  return httpRequest({
    url: `/v1/order?page=${pageInfo.page}&size=${pageInfo.size}`,
    method: "get",
  });
}