import httpRequest from "@/request";

// 列表查询
export function apiStorageList(parentId: string) {
    return httpRequest({
        url: `/v1/storage?parentId=${parentId}`,
        method: "get",
    });
}

// 删除
export function apiDelStorage(ids: [string]) {
    return httpRequest({
        url: `/v1/storage?ids=${ids}`,
        method: "delete",
    });
}

// 上传
export function apiUploadStorage(params:any) {
    return httpRequest({
        url: `/v1/storage/upload`,
        method: "post",
        data: params
    });
}

// 下载
export function apiDownloadStorage(id: string) {
    return httpRequest({
        url: `/v1/storage/download?id=${id}`,
        method: "post",
    });
}