import httpRequest from "@/request";

// 任务列表：​/v1​/compute-power​/script​/list
interface listParams {
  page: number,
  size: number,
}
export function apiScriptList(params: listParams) {
  return httpRequest({
    url: `/v1/compute-power/script/list?page=${params.page}&size=${params.size}`,
    method: "get",
  });
}

// 查单个任务详情：/v1/compute-power/script/info/${id}
export function apiGetScriptById(id: string) {
  return httpRequest({
    url: `/v1/compute-power/script/info/${id}`,
    method: "get",
  });
}

// 上传脚本：​ /v1/compute-power/upload
export function apiUploadScript(file: any) {
  return httpRequest({
    url: `/v1/compute-power/upload/script`,
    method: "post",
    data: file,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

// 执行脚本：/v1/compute-power/python
// id: 执行脚本的id
interface executeParams {
  id:number
}
export function apiExecuteScript(params: executeParams) {
  return httpRequest({
    url: `/v1/compute-power/python`,
    method: "post",
    data: params
  });
}

// 取消执行： /v1/compute-power/python/cancel
export function apiCancelExecuteScript(params: executeParams) {
  return httpRequest({
    url: `/v1/compute-power/python/cancel`,
    method: "post",
    data: params
  });
}

// 下载结果： /v1/compute-power/download
export function apiDownloadScript(params: executeParams) {
  return httpRequest({
    url: `/v1/compute-power/download`,
    method: "post",
    data: params
  });
}