import httpRequest from "@/request";

// 获取s3的用户
export function apiS3User() {
  return httpRequest({
    url: `/v1/s3user`,
    method: "get"
  });
}