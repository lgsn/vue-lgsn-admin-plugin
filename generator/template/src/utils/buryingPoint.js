window.buringPoint = ((win, options) => {
    const BASE_URL = options.baseUrl || '';
    const APP_CODE = '98e32d4028fc971aebbedbda669d512b';
    // const APP_CODE = '111';
    // const BASE_URL = options.baseUrl || 'https://ppvuv.damoshopn.com';
    const projetName = options.projectName;
    const debug = options.debug || false;

    const getUserAgent = () => {
        const ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) === 'micromessenger') {
            return 'weixin';
        }
        if (ua.match(/it_appua/i) === 'it_appua') {
            return 'it_appua';
        }
        if (ua.match(/QQ/i) === 'qq') {
            return 'qq';
        }
        return '';
    };
    const getOsFrom = () => {
        const u = navigator.userAgent;
        const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf('iPhone') > -1; // ios终端

        return isiOS ? 2 : 1;
    };

    win.appBackEvent = () => { // 客户端调用本地方法
        const osFrom = getOsFrom();
        const agent = getUserAgent();
        const params = JSON.stringify({
            jump: 'SR_Event_Back',
            param: '',
            callBack: ''
        });
        if (agent === 'it_appua') {
            if (osFrom === 1) {
              // eslint-disable-next-line no-undef
              android.openNative(params);
            } else {
                window.webkit.messageHandlers.openNative.postMessage(params);
            }
        }
    };
    const getUrlParams = () => {
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
        return params;
    };
    const logger = () => {
        if (debug) {
      console.log(...arguments); // eslint-disable-line
        }
    };

    win.dataModel = {
        project: projetName
    };
    // base64解码
    win.b64DecodeUnicode = str => decodeURIComponent(atob(str).split('').map(c => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));

    const browserInfo = (() => {
    // 权重：系统 + 系统版本 > 平台 > 内核 + 载体 + 内核版本 + 载体版本 > 外壳 + 外壳版本
        const ua = navigator.userAgent.toLowerCase();
        const testUa = regexp => regexp.test(ua);
        const testVs = regexp => (`${ua.match(regexp)}`).replace(/[^0-9|_.]/ig, '').replace(/_/ig, '.');
        // 系统
        let system = '';
        if (testUa(/windows|win32|win64|wow32|wow64/ig)) {
            system = 'windows'; // windows系统
        } else if (testUa(/macintosh|macintel/ig)) {
            system = 'osx'; // osx系统
        } else if (testUa(/x11/ig)) {
            system = 'linux'; // linux系统
        } else if (testUa(/android|adr/ig)) {
            system = 'android'; // android系统
        } else if (testUa(/ios|iphone|ipad|ipod|iwatch/ig)) {
            system = 'ios'; // ios系统
        }
        // 系统版本
        let systemVs = '';
        if (system === 'windows') {
            if (testUa(/windows nt 5.0|windows 2000/ig)) {
                systemVs = '2000';
            } else if (testUa(/windows nt 5.1|windows xp/ig)) {
                systemVs = 'xp';
            } else if (testUa(/windows nt 5.2|windows 2003/ig)) {
                systemVs = '2003';
            } else if (testUa(/windows nt 6.0|windows vista/ig)) {
                systemVs = 'vista';
            } else if (testUa(/windows nt 6.1|windows 7/ig)) {
                systemVs = '7';
            } else if (testUa(/windows nt 6.2|windows 8/ig)) {
                systemVs = '8';
            } else if (testUa(/windows nt 6.3|windows 8.1/ig)) {
                systemVs = '8.1';
            } else if (testUa(/windows nt 10.0|windows 10/ig)) {
                systemVs = '10';
            }
        } else if (system === 'osx') {
            systemVs = testVs(/os x [\d._]+/ig);
        } else if (system === 'android') {
            systemVs = testVs(/android [\d._]+/ig);
        } else if (system === 'ios') {
            systemVs = testVs(/os [\d._]+/ig);
        }
        // 平台
        let platform = '';
        if (system === 'windows' || system === 'osx' || system === 'linux') {
            platform = 'desktop'; // 桌面端
        } else if (system === 'android' || system === 'ios' || testUa(/mobile/ig)) {
            platform = 'mobile'; // 移动端
        }
        // 内核和载体
        let engine = '';
        let browser = '';
        if (testUa(/applewebkit/ig) && testUa(/safari/ig)) {
            engine = 'webkit'; // webkit内核
            if (testUa(/edge/ig)) {
                browser = 'edge'; // edge浏览器
            } else if (testUa(/opr/ig)) {
                browser = 'opera'; // opera浏览器
            } else if (testUa(/chrome/ig)) {
                browser = 'chrome'; // chrome浏览器
            } else {
                browser = 'safari'; // safari浏览器
            }
        } else if (testUa(/gecko/ig) && testUa(/firefox/ig)) {
            engine = 'gecko'; // gecko内核
            browser = 'firefox'; // firefox浏览器
        } else if (testUa(/presto/ig)) {
            engine = 'presto'; // presto内核
            browser = 'opera'; // opera浏览器
        } else if (testUa(/trident|compatible|msie/ig)) {
            engine = 'trident'; // trident内核
            browser = 'iexplore'; // iexplore浏览器
        }
        // 内核版本
        let engineVs = '';
        if (engine === 'webkit') {
            engineVs = testVs(/applewebkit\/[\d.]+/ig);
        } else if (engine === 'gecko') {
            engineVs = testVs(/gecko\/[\d.]+/ig);
        } else if (engine === 'presto') {
            engineVs = testVs(/presto\/[\d.]+/ig);
        } else if (engine === 'trident') {
            engineVs = testVs(/trident\/[\d.]+/ig);
        }
        // 载体版本
        let browserVs = '';
        if (browser === 'chrome') {
            browserVs = testVs(/chrome\/[\d.]+/ig);
        } else if (browser === 'safari') {
            browserVs = testVs(/version\/[\d.]+/ig);
        } else if (browser === 'firefox') {
            browserVs = testVs(/firefox\/[\d.]+/ig);
        } else if (browser === 'opera') {
            browserVs = testVs(/opr\/[\d.]+/ig);
        } else if (browser === 'iexplore') {
            browserVs = testVs(/(msie [\d.]+)|(rv:[\d.]+)/ig);
        } else if (browser === 'edge') {
            browserVs = testVs(/edge\/[\d.]+/ig);
        }
        // 外壳和外壳版本
        let shell = '';
        let shellVs = '';
        if (testUa(/micromessenger/ig)) {
            shell = 'wechat'; // 微信浏览器
            shellVs = testVs(/micromessenger\/[\d.]+/ig);
        } else if (testUa(/qqbrowser/ig)) {
            shell = 'qq'; // QQ浏览器
            shellVs = testVs(/qqbrowser\/[\d.]+/ig);
        } else if (testUa(/ubrowser/ig)) {
            shell = 'uc'; // UC浏览器
            shellVs = testVs(/ubrowser\/[\d.]+/ig);
        } else if (testUa(/2345explorer/ig)) {
            shell = '2345'; // 2345浏览器
            shellVs = testVs(/2345explorer\/[\d.]+/ig);
        } else if (testUa(/metasr/ig)) {
            shell = 'sougou'; // 搜狗浏览器
        } else if (testUa(/lbbrowser/ig)) {
            shell = 'liebao'; // 猎豹浏览器
        } else if (testUa(/maxthon/ig)) {
            shell = 'maxthon'; // 遨游浏览器
            shellVs = testVs(/maxthon\/[\d.]+/ig);
        } else if (testUa(/bidubrowser/ig)) {
            shell = 'baidu'; // 百度浏览器
            shellVs = testVs(/bidubrowser [\d.]+/ig);
        }
        return Object.assign({
            engine, // [webkit, gecko, presto, trident]
            engineVs,
            platform, // [desktop, mobile]
            browser, // [chrome, safari, firefox, opera, iexplore, edge]
            browserVs,
            system, // [windows, osx, linux, android, ios]
            systemVs
        }, shell === 'none' ? {} : {
            shell, // [wechat, qq, uc, 2345, sougou, liebao, maxthon, baidu]
            shellVs
        });
    })();
    const setData = (key, value) => {
        try {
            localStorage.setItem[key] = value;
        } catch (e) {
            const date = new Date();
            // 失效时间设置10年
            document.cookie = `${key}=${value};expires=${date.setTime(date.getTime() + 10 * 365 * 24 * 60 * 60 * 1000)}`;
        }
    };

    function init() {
        win.getConfigFromApp = (result) => { // 客户端主动调用本方法
            logger('log: getConfigFromApp invoked', result);
            if (typeof result === 'string') {
                win.dataModel = result ? Object.assign(win.dataModel, JSON.parse(result)) : win.dataModel;
            } else {
                win.dataModel = Object.assign(win.dataModel, result || {});
            }
            win.getConfigFromAppCallback();
            // if (win.dataModel.channel) {
            //     win.dataModel.channel += '_h5';
            // }
            // this.analyze('onload');
        };
        // const cachedUserId = localStorage.getItem('userId') || getCookie('userId'); // 前端缓存的 userId
        const userId = win.dataModel.userId || ''; // 客户端获取的 userId
        if (userId) {
            setData('userId', userId);
        } else {
            // win.dataModel.userId = cachedUserId || uuid;
            // if (!cachedUserId) {
            //     setData('userId', uuid);
            // }
        }
        // this.analyze('onload');

    // 不建议全埋点，各自业务根据需要自行埋点
    // win.onbeforeunload = function() { this.analyze('onbeforeunload'); }
    // win.onpopstate = function() { this.analyze('onpopstate'); }
    // win.onhashchange = function() { this.analyze('onhashchange'); }
    }
    init();

    return {
        qs(data) {
            let params = '';
      for (const key in data) { // eslint-disable-line
                params += `${key}=${data[key]}&`;
            }
            return params.slice(0, -1);
        },

        isEmptyObject(obj) {
      for (const key in obj) { // eslint-disable-line
                return false;
            }
            return true;
        },
        ajax(opts) {
            const method = opts.method ? opts.method.toUpperCase() : 'GET';
            const url = opts.url.startsWith('http') ? opts.url : (BASE_URL + opts.url);
            const data = opts.data || {};
            const isAsync = opts.isAsync || true;
            const success = opts.success || null;
            // eslint-disable-next-line no-undef
            const xhr = win.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    if (success) {
                        success(xhr.responseText);
                    }
                }
            };
            if (method === 'GET') {
                xhr.open(method, `${url}?${this.qs(data)}`, isAsync);
                xhr.send(null);
            } else if (method === 'POST') {
                const time = new Date().getTime();
                xhr.open(method, url, isAsync);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('systemData', JSON.stringify({
                    appCode: APP_CODE,
                    timestamp: time,
                    reqId: '11',
                    appVersion: '1.0.0',
                    osType: '',
                    osVersion: browserInfo.systemVs || '',
                    deviceType: '',
                    deviceId: '',
                    netType: '',
                    wifiName: '',
                    appLanguage: 'English',
                    clientIp: '',
                    region: '',
                    channelCode: getUrlParams().channel || '',
                    token: '',
                    authCode: ''
                }));
                xhr.send(JSON.stringify(data));
            }
        },

        analyze(eventKey, extra) {
            if (!eventKey) return;
            const model = win.dataModel;
            const params = {
                eventType: eventKey || '', // 事件类型 p 页面 c 事件
                pageCode: extra.pageCode || '', // 页面事件编码
                pageDataId: extra.pageDataId || '', // 页面事件数据ID
                clickCode: extra.clickCode || '', // 点击事件编码
                clickDataId: extra.clickDataId || '', // 点击事件数据ID
                clickOtherId: extra.clickOtherId || '', // 点击事件其他相关数据ID
                clickModelId: extra.clickOtherId || '', // 点击事件所属模块数据ID
                userId: model.userId || '',
                deviceId: model.deviceId || '',
                pageUrl: decodeURIComponent(win.location.href),
                appChannel: model.channel || '',
                appKey: model.appKey || 'loanUnion',
                appVersion: model.appVersion || '',
                clientTime: new Date().getTime() || '',
                netType: model.netType || '',
                wifi: model.wifiName || '',
                screen: `${win.screen.width}x${win.screen.height}`,
                os: model.osType || browserInfo.system || 'h5',
                osVersion: model.osVersion || browserInfo.systemVs,
                mfrs: model.mfrs || '',
                model: model.deviceType || '', // 设备型号
                longitude: model.longitude || '', // 经度
                latitude: model.latitude || '', // 纬度
                sdk: 'js',
                regChannel: getUrlParams().channel || ''
            };
      for (const key in params) { // eslint-disable-line
                const item = params[key];
                if (item === '' || item === null || item === undefined) { // 过滤掉空值
                    delete params[key];
                }
            }
            logger('log: before request.');
            this.ajax({
                url: '/api/point/log',
                method: 'POST',
                data: params,
                success(res) {
                    logger('log: request finished.', res);
                }
            });
        }
    };

})(window, window.analysisOptions);
