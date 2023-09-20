// 后端接口
import httpRequest from "@/request";

// ​更改用户手机号码
interface phoneCodeParams {
  countryCallCoding: string,
  telephoneNumber: string,
  validateCode: string,
}
export function apiUpdatePhone(params: phoneCodeParams) {
  return httpRequest({
    url: `/v1/user/telephone`,
    method: "put",
    data: params,
  });
}

// ​更改用户密码
interface pwdParams {
  oldPassword: string,
  newPassword: string,
}
export function apiUpdatePassword(params: pwdParams) {
  return httpRequest({
    url: `/v1/user/password`,
    method: "put",
    data: params,
  });
}

// 设置用户名
interface userParams {
  name: string,
  icon: string,
}
export function apiUpdateUser(params: userParams) {
  return httpRequest({
    url: '/v1/user',
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