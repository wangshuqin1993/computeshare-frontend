// 公共回调
// 下载 str:下载的内容  name:下载文件的名称  format:下载文件的格式
export const downloadRequest = (str:string,name:string)=>{
    const url = `data:,${str}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}`;
    a.click();
    a.remove();
  }

// 将文件转换成流
export function convertToBlob(info: any): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const file= info;
    const reader = new FileReader();

    reader.onload = () => {
      const blob = new Blob([reader.result as ArrayBuffer]);
      console.log('blob',blob)
      resolve(blob);
    };
    reader.onerror = () => {
      reject(new Error('Failed to convert File to Blob'));
    };

    reader.readAsArrayBuffer(file.originFileObj as File);
  });
}

export function getfilesize(size) {//把字节转换成正常文件大小
  if (!size)  return "";
  var num = 1024.00; //byte
  if (size < num)
      return size + "B";
  if (size < Math.pow(num, 2))
      return (size / num).toFixed(2) + "KB"; //kb
  if (size < Math.pow(num, 3))
      return (size / Math.pow(num, 2)).toFixed(2) + "MB"; //M
  if (size < Math.pow(num, 4))
      return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
  return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
}