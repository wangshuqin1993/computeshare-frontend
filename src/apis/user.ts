// 后端接口
import httpRequest from "@/request";

interface AddLoginParams {
  countryCallCoding: string,
  telephoneNumber: string,
  password: string,
}
interface phoneCodeParams {
  countryCallCoding: string,
  telephoneNumber: string,
  validateCode: string,
}
interface sendParams {
  countryCallCoding: string,
  telephoneNumber: string,
}
interface pwdParams {
  oldPassword: string,
  newPassword: string,
}
interface userParams {
  name: string,
  icon: string,
}

// login 密码登录
export function apiLogin(params: AddLoginParams) {
  return httpRequest({
    url: "/v1/user/login",
    method: "post",
    data: params,
  });
}

// login ​验证码登录
export function apiLoginByVc(params: phoneCodeParams) {
  return httpRequest({
    url: "/v1/user/login_by_vc",
    method: "post",
    data: params,
  });
}

// 发送验证码
export function apiSendSms(params: sendParams) {
  return httpRequest({
    url: "/v1/sms/send",
    method: "post",
    data: params,
  });
}

// ​更改用户手机号码
export function apiUpdatePhone(id: string, params: phoneCodeParams) {
  return httpRequest({
    url: `/v1/user/${id}/telephone`,
    method: "put",
    data: params,
  });
}

// ​更改用户密码
export function apiUpdatePassword(id: string, params: pwdParams) {
  return httpRequest({
    url: `/v1/user/${id}/password`,
    method: "put",
    data: params,
  });
}

// 设置用户名
export function apiUpdateUser(id: string, params: userParams) {
  return httpRequest({
    url: `/v1/user/${id}​`,
    method: "put",
    data: params,
  });
}

// ​获取用户信息
export function apiGetUser() {
  return httpRequest({
    url: '/v1/user',
    method: "get",
  });
}