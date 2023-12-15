import { message } from 'ant-design-vue'
// 公共回调
// 下载 str:下载的内容  name:下载文件的名称  format:下载文件的格式
export const downloadRequest = (str: string, name: string) => {
  var elink = document.createElement('a');
  elink.download = name;
  elink.style.display = 'none';
  var blob = new Blob([str], { type: 'application/x-msdownload' });
  elink.href = URL.createObjectURL(blob);
  document.body.appendChild(elink);
  elink.click();
  document.body.removeChild(elink);
}

// 将文件转换成流
export function convertToBlob(info: any): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const file = info;
    const reader = new FileReader();

    reader.onload = () => {
      const blob = new Blob([reader.result as ArrayBuffer]);
      console.log('blob', blob)
      resolve(blob);
    };
    reader.onerror = () => {
      reject(new Error('Failed to convert File to Blob'));
    };

    reader.readAsArrayBuffer(file.originFileObj as File);
  });
}

export function getfilesize(size) {//把字节转换成正常文件大小
  if (!size) return "";
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

// 复制文本
export const copyToClipboard = (text:string) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    message.success("copy success");
  }, function(err) {
    message.error("copy failed");
  });
}

export const fallbackCopyTextToClipboard = async(_items:string) => {
  // 存储传递过来的数据
  let OrderNumber = _items;
  // 创建一个input 元素
  // createElement() 方法通过指定名称创建一个元素
  let newInput = document.createElement("input");
  // 讲存储的数据赋值给input的value值
  newInput.value = OrderNumber;
  // appendChild() 方法向节点添加最后一个子节点。
  document.body.appendChild(newInput);
  // 选中input元素中的文本
  // select() 方法用于选择该元素中的文本。
  newInput.select();
  // 执行浏览器复制命令
  try {
    //  execCommand方法是执行一个对当前文档，当前选择或者给出范围的命令
    await document.execCommand('Copy') // 执行浏览器复制命令
    // 清空输入框
    newInput.remove();
    message.success("copy success");
  } catch {
    message.error("copy failed");
  }
}

// 获取 xx...xx 的格式
// str:传入的字符串
// start：取前几个字符
// end: 取后几个字符
export const getPonitStr = (str:string, start:number, end:number)=>{
  const len = start + end
  if(str.length > len){
    return str.slice(0,start)+"..."+str.slice(-end)
  }else{
    return str
  }
}