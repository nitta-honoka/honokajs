/**
 * Created by honoka on 16/2/27.
 * ajax辅助库
 */
/**
 * 以 get 方式发送请求
 * @method get
 * @param {string} url  请求链接
 * @param {Object} options 配置项
 * 配置项内容：
 * {boolean} async true异步方式，false 同步方式
 * {function} succ 请求成功后的回调函数
 * {function} fail 请求失败后的回调函数
 * @author honoka
 */
Ho.prototype.get = function (url, options) {
    send(url, "GET", options);
};
/**
 * 以 get 方式读取数据
 * @method load
 * @param {string} url  请求链接
 * @param {Object} options 配置项
 * 配置项内容：
 * {boolean} async true异步方式，false 同步方式
 * {function} succ 请求成功后的回调函数
 * {function} fail 请求失败后的回调函数
 * @author honoka
 */
Ho.prototype.load = function (url, options) {
    send(url, "GET", options);
};
/**
 * 以 post 方式发送请求
 * @method post
 * @param {string} url  请求链接
 * @param {Object} options 配置项
 * 配置项内容：
 * {Object} data 请求参数
 * {boolean} async true异步方式，false 同步方式
 * {function} succ 请求成功后的回调函数
 * {function} fail 请求失败后的回调函数
 * @author honoka
 */
Ho.prototype.post = function (url, options) {
    send(url, "POST", options);
};
/**
 * 发送 ajax 请求
 * @param {string} url 请求链接
 * @param {string} metHod 请求方式
 * @param {object} options 选项
 */
function send(url, method, options) {
    var data = options.data || {}; //请求参数
    var async = options.async || true; //同步或者异步，默认异步
    var succCallback = options.succ; //成功时的回调方法
    var failCallback = options.fail; //失败时的回调方法
    var request = getAjaxObj();
    request.open(method, url, async);
    if (data instanceof Object) {
        data = JSON.stringify(data);
        request.setRequestHeader('Content-Type', 'application/json');
    }
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    request.send(data);
    if (succCallback instanceof Function) {
        request.onreadystatechange = function () {
            if (request.readyState === 4 && (request.status === 200)) {
                succCallback(request.responseText);
            } else if (request.status === 400 || request.status === 404 || request.status === 500) {
                failCallback();
            }
        };
    }
}
/**
 * 获得 XHR 对象
 * @returns {XMLHttpRequest} XHR 对象
 */
function getAjaxObj() {
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        return new XMLHttpRequest();
    } else { // code for IE6, IE5
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}
