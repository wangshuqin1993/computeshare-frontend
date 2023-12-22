import httpRequest from "@/request";

// 获取桶中的存储列表
// bucketName: 桶名
// prefix：文件夹的名字
export function apiGetBucketList(bucketName: string, prefix: string) {
  return httpRequest({
    url: `/v1/s3bucket/${bucketName}/objects?prefix=${prefix}`,
    method: "get",
  });
}

// 创建桶
export function apiCreateBucket(params: createBucket) {
  return httpRequest({
    url: `/v1/s3bucket`,
    method: "post",
    data: params,
  });
}
interface createBucket {
  bucketName: string //桶名
}

// 获取桶列表
export function apiBucketList() {
  return httpRequest({
    url: `/v1/s3bucket`,
    method: "get",
  });
}

// 上传文件到s3
export function apiUploadFileToS3(bucketName: string, params: uploadS3) {
  return httpRequest({
    url: `/v1/storage/${bucketName}/objects/upload`,
    method: "post",
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
interface uploadS3 {
  prefix?: string, //prefix：文件夹的名字
  file: any,
}

// 从s3下载文件
export function apiDownloadFileFromS3(bucketName: string, key: string) {
  return httpRequest({
    url: `/v1/storage/${bucketName}/objects/download?key=${key}`,
    method: "get",
    responseType: 'blob', // 重点，responseType设置为 blob
  });
}

// 从s3删除文件
export function apiDeleteFileFromS3(bucketName: string, key: string) {
  return httpRequest({
    url: `/v1/storage/${bucketName}/objects/delete?key=${key}`,
    method: "delete",
  });
}

// 从s3删除文件夹
// export function apiDeleteFolderFromS3(bucketName:string, key:string) {
//     return httpRequest({
//         url: `/v1/storage/${bucketName}/objects/delete?key=${key}`,
//         method: "delete",
//     });
// }

// 清除桶
export function apiClearBucket(bucketName: string) {
  return httpRequest({
    url: `/v1/s3bucket/${bucketName}/empty`,
    method: "delete",
  });
}

// 删除桶
export function apiDeleteBucket(bucketName: string) {
  return httpRequest({
    url: `/v1/s3bucket/${bucketName}`,
    method: "delete",
  });
}

// S3创建文件夹
export function apiS3CreateFolder(bucketName: string, params: s3Folder) {
  return httpRequest({
    url: `/v1/storage/${bucketName}/mkdir`,
    method: "post",
    data: params,
  });
}
interface s3Folder {
  dirName: string, // 文件夹名称
}

// 删除文件夹
export function apiDeleteDir(bucketName: string, params:deleteDirParams) {
  return httpRequest({
    url: `/v1/storage/${bucketName}/mkdir`,
    method: "delete",
    data: params
  });
}
interface deleteDirParams{
  dirName: string
}