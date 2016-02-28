(function (root, factory) {
    if (typeof define === 'function' && define.amd) {  //for AMD && CMD
        define(factory);
    } else if (typeof exports === 'object') {  //for CommonJS
        module.exports = factory;
    } else {         //for root
        root.honoka = factory();
    }
})(this, function () {


    "use strict";


/* honokajs main */

// Base function.
var honoka = {};


// Version.
honoka.VERSION = '0.1.1';



/**
 * Created by honoka on 16/2/27.
 * ajax辅助库
 */
/**
 * 以 get 方式发送请求
 * @param {string} url  请求链接
 * @param {Object} options 配置项
 * 配置项内容：
 * {boolean} async true异步方式，false 同步方式
 * {function} succ 请求成功后的回调函数
 * {function} fail 请求失败后的回调函数
 */
honoka.get = function (url, options) {
    honoka.send(url, "GET", options);
};
/**
 * 以 get 方式读取数据
 * @param {string} url  请求链接
 * @param {Object} options 配置项
 * 配置项内容：
 * {boolean} async true异步方式，false 同步方式
 * {function} succ 请求成功后的回调函数
 * {function} fail 请求失败后的回调函数
 */
honoka.load = function (url, options) {
    honoka.send(url, "GET", options);
};
/**
 * 以 post 方式发送请求
 * @param {string} url  请求链接
 * @param {Object} options 配置项
 * 配置项内容：
 * {Object} data 请求参数
 * {boolean} async true异步方式，false 同步方式
 * {function} succ 请求成功后的回调函数
 * {function} fail 请求失败后的回调函数
 */
honoka.post = function (url, options) {
    honoka.send(url, "POST", options);
};
/**
 * 发送 ajax 请求
 * @param {string} url 请求链接
 * @param {string} method 请求方式
 * @param {object} options 选项
 */
honoka.send = function (url, method, options) {
    var data = options.data || {}; //请求参数
    var async = options.async || true; //同步或者异步，默认异步
    var succCallback = options.succ; //成功时的回调方法
    var failCallback = options.fail; //失败时的回调方法
    var request = honoka.getAjaxObj();
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
            }
            else if (request.status === 400 || request.status === 404 || request.status === 500) {
                failCallback()
            }
        };
    }
};
/**
 * 获得 XHR 对象
 * @returns {XMLHttpRequest} XHR 对象
 */
honoka.getAjaxObj = function () {
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        return new XMLHttpRequest();
    } else { // code for IE6, IE5
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
};

/**
 * Created by honoka on 16/2/27.
 * Dom操作辅助类
 */

/**
 * 将新元素插入目标元素前面
 * @param {Dom Object} newElement
 * @param {Dom Object} targetElement
 */
honoka.insertAfter = function (newElement, targetElement) {
    //将目标元素的 parentNode 值（即父节点）保存到变量中
    var parent = targetElement.parentNode;
    if (parent.lastChild === targetElement) {
        //判断目标元素是不是 parent 的最后一个子元素，若是，就用 appendChild 方法把新元素加到 parent 上，刚好被插入到目标元素后面
        parent.appendChild(newElement);
    } else {
        //如果不是，就把新元素插入到目标元素和目标元素的下一个兄弟元素之间
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
};
/**
 * 得到指定元素节点的下一个节点
 * @param node 指定节点
 * @returns
 */
honoka.getNextElement = function (node) {
    if (node.nodeName == 1) {
        //当 nodeName 等于 1 时为元素节点
        return node;
    }
    if (node.nextSibling) {
        //当元素节点下个节点存在时，递归寻找下一个元素节点
        return getNextElement(node.nextSibling);
    }
    return null;
};
/**
 * 为指定元素增加 class 值
 * @param {Dom Object} element 指定元素对象
 * @param {string} value class值
 */
honoka.addClass = function (element, value) {
    if (!element.className) {
        //当元素没有 class 时，直接赋值
        element.className = value;
    } else {
        //如果元素已有 class，追加一个新的 class 在后面
        element = element.className;
        element += " ";
        element += value;
        element.className = newClassName;
    }
};
/**
 * 动态加载 JavaScript 文件，生成 DOM - <script type="text/javascript" src=url></script>
 *  注意：不保证文件加载顺序，需要顺序请嵌套加载
 * @param  {[string]}   url     JavaScript 文件路径
 * @param  {Function} callback  加载完成的回调方法
 */
honoka.loadScript = function (url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) { //for IE
        script.onreadystatechange = function () {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //for other browsers
        script.onload = function () {
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
};


/**
 * Created by honoka on 16/2/28.
 * 数据操作辅助类
 */
 /**
  * 是否是数组类型
  * @param {Array} arr 判断数组
  * @retrun Boolean true 是数组类型
  */
 honoka.isArray = function (arr) {
     //当页面存在多个全局作用域时，使用 instanceof 判断不同作用域的引用类型会造成混乱
     //故调用 Object 原生方法 toString 判断
     return Object.prototype.toString.call(arr) == "[object Array]";
 };
 /**
  * 是否是函数类型
  * @param {Function} fn 被判断函数
  * @retrun Boolean true 是函数类型
  */
 honoka.isFunction = function (fn) {
     return Object.prototype.toString.call(fn) == "[object Function]";
 };
 /**
  * 是否是日期类型
  * @method isDate
  * @param  {Date}  date 被判断日期
  * @return {Boolean}  true 是日期类型
  * @author honoka
  */
 honoka.isDate = function (date) {
     return Object.prototype.toString.call(date) == "[object Date]";
 }
 /**
  * 是否是正则表达式类型
  * @method isRegExp
  * @param  {RegExp}  reg 被判断正则表达式
  * @return {Boolean}  true 是正则表达式类型
  * @author honoka
  */
 honoka.isRegExp = function (reg) {
     return Object.prototype.toString.call(reg) == "[object RegExp]";
 }
 /**
  * 是否是字符串类型
  * @method isString
  * @param  {string}  str 被判断字符串
  * @return {Boolean}  true 是字符串类型
  * @author honoka
  */
 honoka.isString = function (str) {
     return Object.prototype.toString.call(str) == "[object String]";
 }
 /**
  * 是否是数值类型
  * @method isNumber
  * @param  {number}  num 被判断数值
  * @return {Boolean}  true 是数值类型
  * @author honoka
  */
 honoka.isNumber = function (num) {
     return Object.prototype.toString.call(num) == "[object Number]";
 }
 /**
  * 是否是布尔类型
  * @method isBoolean
  * @param  {boolean}  bol 被判断布尔
  * @return {Boolean}  true 是布尔类型
  * @author honoka
  */
 honoka.isBoolean = function (bol) {
     return Object.prototype.toString.call(bol) == "[object Boolean]";
 }
 /**
  * 是否是对象
  * @method isObject
  * @param  {Object}  obj 被判断对象
  * @return {Boolean}  true 是对象
  * @author honoka
  */
 honoka.isObject = function (obj) {
     return Object.prototype.toString.call(obj) == "[object Object]";
 }
/**
 * 深度复制对象，即产生一个新的对象而不是只复制引用，不复制函数
 * @method cloneObject
 * @param  {Object}    src 任何被复制的对象
 * @return {Object} result 产生的新对象
 * @author honoka
 */
honoka.cloneObject = function (src) {
    //如果是基本类型值
    if (src == null || (typeof src != "object")) {
        var result = src;
        return result;
    } else if (honoka.isArray(src)) { //如果是数组类型
        var  result = [];
        for (var i = 0; i < src.length; i++) {
            result[i] = honoka.cloneObject(src[i]);
        }
        return result;
    } else if (honoka.isDate(src)) {
        var result = new Date();
        result.setTime(src.getTime());
        return result;
    } else if (honoka.isObject(src)) {
        var result = {};
        for (var attr in src) {
            if (src.hasOwnProperty(attr)) {
                result[attr] = honoka.cloneObject(src[attr]);
            }
        }
        return result;
    } else if (honoka.isRegExp(src)) {
        var flags = "";
        flags += src.global ? "g" : "";
        flags += src.multiline? "m" : "";
        flags += src.ignoreCase ? "i" : "";
        return new RegExp(src.source, flags);
    }
}


/**
 * Created by honoka on 16/2/27.
 * 事件辅助类
 */

/**
 * 将函数绑定到 onload 事件上
 * @param {function} func 需绑定的函数
 */
honoka.addLoadEvent = function (func) {
    //把现有的 window.onload 事件处理函数的值存入变量
    var oldOnload = window.onload;
    if (typeof window.onload != "function") {
        //如果这个处理函数还没有绑定任何函数，就像平时那样添加新函数
        window.onload = func;
    } else {
        //如果处理函数已经绑定了一些函数，就把新函数添加到末尾
        window.onload = function () {
            oldOnload();
            func();
        }
    }
};


    return honoka;

});
