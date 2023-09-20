// 后端接口
import httpRequest from "@/request";

// 密码登录：/v1​/user​/login
// ​更改用户手机号码：/v1​/user​/{id}​/telephone
// ​更改用户密码：/v1​/user​/{id}​/password
// 设置用户名：​/v1​/user​/{id}
// ​获取用户信息：/v1​/user​/{id}

// 获取验证码：​/v1​/sms​/send
interface smsParams {
  // 目前版本只有国内+86
  countryCallCoding: string,
  telephoneNumber: string
}
export function apiSMS(params: smsParams) {
  return httpRequest({
    url: "/v1/sms/send",
    method: "post",
    data: params,
  });
}

// ​验证码登录：/v1​/user​/login_by_vc
interface smsLoginParams extends smsParams {
  validateCode: string
}
export function apiSMSLogin(params: smsLoginParams) {
  return httpRequest({
    url: "/v1/user/login_by_vc",
    method: "post",
    data: params,
  });
}