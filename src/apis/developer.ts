import httpRequest from "@/request";

// 验证验证码是否正确
export function apiVerifySmsCode(params:phoneCodeParams) {
  return httpRequest({
    url: `/v1/sms/code/verify`,
    method: "post",
    data: params
  });
}
interface phoneCodeParams {
  countryCallCoding: string,
  telephoneNumber: string,
  validateCode: string,
}

// 获取s3的用户
export function apiS3User() {
  return httpRequest({
    url: `/v1/s3user`,
    method: "get"
  });
}

// 创建S3密钥
export function apiCreateKey() {
    return httpRequest({
      url: `/v1/s3user/create/key`,
      method: "post",
      data:{}
    });
  }

// 查看s3密钥
export function apiGetKey(id:string, params:phoneCodeParams) {
  return httpRequest({
    url: `/v1/s3user/${id}?countryCallCoding=${encodeURIComponent(params.countryCallCoding)}&telephoneNumber=${params.telephoneNumber}&validateCode=${params.validateCode}`,
    method: "get",
  });
}

// 删除s3密钥
export function apiDelKey(id:string, params:phoneCodeParams) {
  return httpRequest({
    url: `/v1/s3user/${id}?countryCallCoding=${encodeURIComponent(params.countryCallCoding)}&telephoneNumber=${params.telephoneNumber}&validateCode=${params.validateCode}`,
    method: "delete",
  });
}