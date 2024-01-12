import httpRequest from "@/request";
import { basePageInfo } from "./index";

interface rechargeCyclesParams {
    rechargeChannel: number,
    cycle: number,
    amount: number
}

// 购买cycle
export function apiRechargeCycles(params: rechargeCyclesParams) {
  return httpRequest({
    url: "/v1/cycle/recharge",
    method: "post",
    data: params
  });
}

// 获取cycle余额
export function apiGetCycleBalance() {
    return httpRequest({
      url: "/v1/cycle/balance",
      method: "get",
    });
}

// 兑换码兑换
export function apiCycleRedeem(params: redeemParams) {
    return httpRequest({
      url: "/v1/cycle/redeem",
      method: "post",
      data: params
    });
  }

interface redeemParams {
    redeemCode: string
}

// 通过订单号获取支付状态
export function apiGetRechargeState(outTradeNo: string) {
    return httpRequest({
      url: `/v1/cycle/recharge/state?outTradeNo=${outTradeNo}`,
      method: "get",
    });
}

// 充值记录(明细)列表
export function apiGetTransactionList(pageInfo: basePageInfo) {
    return httpRequest({
      url: `/v1/cycle/transaction?page=${pageInfo.page}&size=${pageInfo.size}`,
      method: "get",
    });
  }

