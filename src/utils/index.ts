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

// 这次的token cookie 配置要求
// cookie name:  token
// expires： 有效期 1天（24小时）
// domain:  . + 当前域名， 比如当前域名为'computeshare.newtouch.com' , 此次domain 配置为： '.computeshare.newtouch.com'
export const cookieUtil = {
  /*设置cookie*/
  set:function(name, value, expires, domain){
    let cookie = name + "=" + value;
    let expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + expires);
    cookie += "; expires=" + expiresDate.toUTCString();
    if(domain){
        cookie += "; domain=" + domain;
    }
    document.cookie = cookie;
    // debugger
  },

  /*获取cookie*/
  get:function(name){
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