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
  if (size == 0) return size;
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
export const copyToClipboard = (text: string, msg?: string) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function () {
    message.success(msg || "复制成功");
  }, function (err) {
    message.error("复制失败");
  });
}

export const fallbackCopyTextToClipboard = async (_items: string) => {
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
export const getPonitStr = (str: string, start: number, end: number) => {
  if (!str) return
  const len = start + end
  if (str.length > len) {
    return str.slice(0, start) + "..." + str.slice(-end)
  } else {
    return str
  }
}
// 数字千分位添加逗号
// value:需要格式化的数字
//fixedNum:小数点后面保留位数
export const formatAmount = (value: any, fixedNum = 2) => {
  if (!isNaN(parseFloat(value))) {
    value = parseFloat(value).toFixed(fixedNum); // 保留两位小数
    const parts = value.toString().split('.');
    parts[0] = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'); // 每三位数字之间添加逗号
    return parts.join('.');
  } else {
    return '';
  }
}

// 这次的token cookie 配置要求
// cookie name:  token
// expires： 有效期 1天（24小时）
// domain:  . + 当前域名， 比如当前域名为'computeshare.newtouch.com' , 此次domain 配置为： '.computeshare.newtouch.com'
export const cookieUtil = {
  /*设置cookie*/
  set: function (name, value, expires, domain) {
    let cookie = name + "=" + value;
    let expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + expires);
    cookie += "; expires=" + expiresDate.toUTCString();
    if (domain) {
      cookie += "; domain=" + domain;
    }
    document.cookie = cookie;
    // debugger
  },

  /*获取cookie*/
  get: function (name) {
    var cookieName = encodeURIComponent(name);
    /*正则表达式获取cookie*/
    var restr = "(^| )" + cookieName + "=([^;]*)(;|$)";
    var reg = new RegExp(restr);
    var cookieValue = document.cookie.match(reg)[2];
    /*字符串截取cookie*/
    /*
    var cookieStart = document.cookie.indexOf(cookieName + “=”);
    var cookieValue = null;
    if(cookieStart>-1){
        var cookieEnd = document.cookie.indexOf( ";" , cookieStart);
        if(cookieEnd == -1){
            cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart
          + cookieName.length, cookieEnd));
    }
    */
    return cookieValue;
  }
}