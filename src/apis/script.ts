import httpRequest from "@/request";

// 任务列表：​/v1​/compute-power​/script​/list
export function apiScriptList() {
    return httpRequest({
        url: '/v1/compute-power/script/list',
        method: "get",
    });
}

// 查单个任务详情：/v1/compute-power/script/info/${id}
export function apiGetScriptById(id:string) {
    return httpRequest({
        url: `/v1/compute-power/script/info/${id}`,
        method: "get",
    });
}

// 上传脚本：​ /v1/compute-power/upload
export function apiUploadScript(params:any) {
    return httpRequest({
        url: `/v1/compute-power/upload`,
        method: "post",
        data: params
    });
}

// 执行脚本：/v1/compute-power/python
export function apiExecuteScript(params:any) {
    return httpRequest({
        url: `/v1/compute-power/python`,
        method: "post",
        data: params
    });
}

// 取消执行： /v1/compute-power/python/cancel
export function apiCancelExecuteScript(params:any) {
    return httpRequest({
        url: `/v1/compute-power/python/cancel`,
        method: "post",
        data: params
    });
}

// 下载结果： /v1/compute-power/download
export function apiDownloadScript(params:any) {
    return httpRequest({
        url: `/v1/compute-power/download`,
        method: "post",
        data: params
    });
}