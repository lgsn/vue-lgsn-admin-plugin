import axios from 'axios';

// 获取当前页面的URL 对其带的参数进行处理
function getUrlPara(para) {
    const paraArr = decodeURIComponent(window.location.search).substring(1).split('&');
    for (let i = 0; i < paraArr.length; i += 1) {
        const arr = paraArr[i].split('=');
        if (arr[0] === para) {
            return arr[1];
        }
    }
    return '';
}

// 地址栏参数
function getUrlParams() {
    const search = decodeURIComponent(`?${window.location.href.split('?')[1]}`); // 获取location的search属性，保存在search中
    const params = {}; // 创建空对象params
    if (search !== '') {
        // 如果search不是空字符串
        search
            .slice(1)
            .split('&')
            .forEach(
                // ?username=zhangdong&pwd=123456;//search去开头?，按&切割为数组，forEach
                (val) => {
                    const arr = val.split('='); // 将当前元素值按=切割，保存在arr中
                    // eslint-disable-next-line prefer-destructuring
                    params[arr[0]] = arr[1]; // 向params中添加一个元素,属性名为arr[0],值为arr[1]
                }
            );
    }
    return params || '';
}

// 判断手机系统，1为android，2为ios
function getOsFrom() {
    const u = navigator.userAgent;
    // let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf("Linux") > -1; //android终端
    const isiOS = (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) || u.indexOf('iPhone') > -1; // ios终端
    if (isiOS) { // 返回2是ios
        return 2;
    } // 返回1是android
    return 1;

}

// 判断userAgent
function userAgent() {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) === 'micromessenger') {
        return 'weixin';
    } if (ua.match(/it_appua/i) === 'it_appua') {
        return 'it_appua';
    } if (ua.match(/QQ/i) === 'qq') {
        return 'qq';
    }
    return '';

}

// msg提示信息
let flag = true;
function alertMsg(txt, recalculate) {
    if (flag) {
        flag = false;
        const maskWrap = document.createElement('div');
        const wrap = document.createElement('div');
        maskWrap.className = 'alertMaskWrap1';
        wrap.className = 'alertMask';
        if (recalculate && ['INPUT', 'TEXTAREA'].indexOf(document.activeElement.tagName) >= 0) {
            const { clientHeight, scrollTop } = document.body;
            const currentClientHeight = clientHeight - scrollTop;
            wrap.style.top = `${currentClientHeight}px`;
            wrap.style.transform = `translate(-50%, 0)`;
        }
        wrap.innerText = txt;
        maskWrap.appendChild(wrap);
        document.body.appendChild(maskWrap);
        wrap.className = 'alertMask alertMaskIn';
        setTimeout(() => {
            wrap.className = 'alertMask alertMaskOut';
            setTimeout(() => {
                maskWrap.remove();
            }, 1500);
            flag = true;
        }, 1500);
    }
}
// msg提示信息
let flag1 = true;
function alertMsg1(txt) {
    if (flag1) {
        flag1 = false;
        const maskWrap = document.createElement('div');
        const wrap = document.createElement('div');
        maskWrap.className = 'alertMaskWrap';
        wrap.className = 'alertMask';
        wrap.style.bottom = `100px`;
        wrap.style.top = 'auto';
        wrap.style.transform = `translate(-50%, 0)`;
        wrap.innerText = txt;
        maskWrap.appendChild(wrap);
        document.body.appendChild(maskWrap);
        wrap.className = 'alertMask alertMaskIn';
        setTimeout(() => {
            wrap.className = 'alertMask alertMaskOut';
            setTimeout(() => {
                maskWrap.remove();
            }, 1500);
            flag1 = true;
        }, 1500);
    }
}

// 下载app
function downloadApp(osFrom) {
    if (+osFrom === 1) { // Android
        // const iframe = document.createElement('iframe');
        // iframe.src = window.androidLink;
        // iframe.style.display = 'none';
        // document.body.appendChild(iframe);
        window.location.href = window.androidLink;
    } else if (+osFrom === 2) { // IOS
        window.location.href = window.androidLink;
        // window.location.href = window.iosLink;
    }
}

// 获取下载app地址
function downloadUrl(channel) {
    axios({
        url: '/api/h5/channel/getChannelShortLink/v1',
        method: 'post',
        data: {
            channelCode: channel || '',
            language: 'English'
        }
    }).then(response => response.data).then((json) => {
        if (json.code === '000') {
            window.androidLink = json.data.channelShortLink;
            // window.iosLink = json.data.IOS;
        } else {
            alertMsg(json.msg);
        }
    });
}
// 调用原生方法
function nativeAppFun(str, dataStr, method) {
    const osFrom = getOsFrom();
    // const agent = userAgent();
    const jsonStr = JSON.stringify({
        jump: str,
        param: !dataStr ? '' : JSON.stringify(dataStr),
        callBack: method || ''
    });
    if (osFrom === 1) {
      // eslint-disable-next-line no-undef
      android.openNative(jsonStr);
    } else if (osFrom === 2) {
        window.webkit.messageHandlers.openNative.postMessage(jsonStr);
    } else if (!!dataStr && dataStr.url) { // 端外
        window.location.href = dataStr.url;
    }
}
// 动态内容盒子高度
// boxName 节点的名称 size 减去的高度
function boxHeight(boxName, size) {
    const clientHeight = document.documentElement.clientHeight - size;
    const trackElem = document.getElementsByClassName(boxName);
    if (trackElem.length) {
        trackElem[0].style.minHeight = `${clientHeight}px`;
    }
}
// 节流函数
// 触发时立马执行
function throttle(func, wait) {
    let lastTime = 0;
    return () => {
        const nowTime = +new Date();
        if (nowTime - lastTime > wait) {
            func.apply(this, arguments); // eslint-disable-line
            lastTime = nowTime;
        }
    };
}
// 时间戳格式 yyymmddhhmmss

function changedate() {
    const d = new Date();
    const datetime = `${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}`;
    return datetime;
}
// 设置localStorage
function setStorage(key, value) {
    if (!key) {
        throw Error('The storage key must be required.');
    }
    localStorage.setItem(key, value ? JSON.stringify(value) : '');
}
// 获取localStorage
function getStorage(key) {
    if (!key) {
        throw Error('The storage key must be required.');
    }
    const result = localStorage.getItem(key);
    try {
        return JSON.parse(result);
    } catch (e) {
        return result;
    }
}
export {
    getUrlPara,
    getUrlParams,
    alertMsg,
    alertMsg1,
    getOsFrom,
    userAgent,
    downloadApp,
    downloadUrl,
    nativeAppFun,
    boxHeight,
    throttle,
    changedate,
    setStorage,
    getStorage
};
