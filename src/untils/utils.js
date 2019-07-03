import message from 'antd';
import base64 from 'base-64';
var md5 = require('md5');
export function toQuery(obj) {
    let query = '';
    for (let key in obj) {
        query = query ? query + '&' : '?';
        query = query + encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
    }
    return query;
};

export function getTokenHeader(header) {
    let _header = Object.assign({}, header);
    if (!!localStorage.token) {
        _header['Authorization'] = `${localStorage.token}`;
    }
    return _header;
};

export function fillStore(redux, nextState, components) {
    return Promise.all(components.map(async Component => {
        Component = Component && Component.WrappedComponent || Component;

        if (!Component || !Component.fillStore) {
            return;
        }

        await Component.fillStore(redux, nextState);
    }));
};
export function add0(m) {
    return m < 10 ? '0' + m : m;
};
export function timeFormat(time) {
    var time = new Date(parseInt(time) * 1000);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
};
export function timeEasyFormat(time) {
    var time = new Date(parseInt(time) * 1000);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    return y + '-' + add0(m) + '-' + add0(d);
};
export function timePointFormat(time) {
    var time = new Date(parseInt(time) * 1000);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    return y + '.' + add0(m) + '.' + add0(d);
};
export function timePointMinFormat(time) {
    var time = new Date(parseInt(time) * 1000);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    return y + '.' + add0(m) + '.' + add0(d) +'-' + add0(h) +':' +add0(mm);
};
export function timeToMs(time){
    var ms=Date.parse(time.slice(0,4)+"/"+time.slice(5,7)+"/"+time.slice(8,10));
    return ms;
};

export function dateToTimestamp(date) {
    return parseInt(Date.parse(date) / 1000);
}

// 通用错误处理 用于处理所有后端接口返回的错误  后端约定所有成功返回  code中包含SUCCESS
export function handleError(res, callback) {

    if (res.code.indexOf('SUCCESS') !== -1) {
        callback(res);
    } else {
        message.error(`~_~ 抱歉后台报错：${res.code}`);
        throw Error('后台报错');
    }
};


export function encodePS(password) {
    password = md5(password);
    return password;
};