(function () {
        "use strict";


/* honokajs main */

//建立 root 对象，在浏览器环境中是 'window'
//在服务端环境中是 'global'
//或者在一些虚拟环境中是 this
//为了 'WebWorker' 的支持使用 'self' 替换 'window'
var root = typeof self == 'object' && self.self === self && self ||
    typeof global == 'object' && global.global === global && global ||
    this;

//构造函数
var Ho = function (obj) {
    if (obj instanceof Ho) {
        return obj;
    }
    if (!(this instanceof Ho)) {
        return new Ho(obj);
    }
    this._wrapped = obj;
};

//添加 CommonJS 语法支持
//如果在浏览器中，将 'Ho' 作为全局对象加入
//'nodeType' 用来确保 'module' 和 'exports' 不是一个 HTML 元素
if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
        exports = module.exports = Ho;
    }
    exports.Ho = Ho;
} else {
    root.Ho = Ho;
}

//添加 AMD 与 CMD 支持
if (typeof define == 'function' && define.amd) {
    define('honoka', [], function () {
        return Ho;
    });
}
// Version.
Ho.VERSION = '0.1.6';


/**
 * Created by honoka on 16/2/27.
 * Dom操作辅助类
 */
/**
 * 将新元素插入目标元素前面
 * @method insertAfter
 * @param {Object} newElement 需要插入的新元素
 * @param {Object} targetElement 目标元素
 * @author honoka
 */
Ho.prototype.insertAfter = function (newElement, targetElement) {
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
 * @method getNextElement
 * @param {Object} node 指定节点
 * @return {Object} 下一个节点，若指定节点为最后一个，则返回null
 * @author honoka
 */
Ho.prototype.getNextElement = function (node) {
    if (node.nodeName == 1) {
        //当 nodeName 等于 1 时为元素节点
        return node;
    }
    if (node.nextSibling) {
        //当元素节点下个节点存在时，递归寻找下一个元素节点
        return this.getNextElement(node.nextSibling);
    }
    return null;
};
/**
 * 为指定元素增加 class 值
 * @method addClass
 * @param {Object} element 指定元素对象
 * @param {string} value class值
 * @author honoka
 */
Ho.prototype.addClass = function (element, value) {
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
 * @method loadScript
 * @param  {string}   url     JavaScript 文件路径
 * @param  {Function} callback  加载完成的回调方法
 * @author honoka
 */
Ho.prototype.loadScript = function (url, callback) {
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
 * @method isArray
 * @param {Array} arr 判断数组
 * @retrun Boolean true 是数组类型
 * @author honoka
 */
Ho.prototype.isArray = function (arr) {
    //当页面存在多个全局作用域时，使用 instanceof 判断不同作用域的引用类型会造成混乱
    //故调用 Object 原生方法 toString 判断
    return Object.prototype.toString.call(arr) == "[object Array]";
};
/**
 * 是否是函数类型
 * @method isFunction
 * @param {Function} fn 被判断函数
 * @retrun Boolean true 是函数类型
 * @author honoka
 */
Ho.prototype.isFunction = function (fn) {
    return Object.prototype.toString.call(fn) == "[object Function]";
};
/**
 * 是否是日期类型
 * @method isDate
 * @param  {Date}  date 被判断日期
 * @return {Boolean}  true 是日期类型
 * @author honoka
 */
Ho.prototype.isDate = function (date) {
    return Object.prototype.toString.call(date) == "[object Date]";
};
/**
 * 是否是正则表达式类型
 * @method isRegExp
 * @param  {RegExp}  reg 被判断正则表达式
 * @return {Boolean}  true 是正则表达式类型
 * @author honoka
 */
Ho.prototype.isRegExp = function (reg) {
    return Object.prototype.toString.call(reg) == "[object RegExp]";
};
/**
 * 是否是字符串类型
 * @method isString
 * @param  {string}  str 被判断字符串
 * @return {Boolean}  true 是字符串类型
 * @author honoka
 */
Ho.prototype.isString = function (str) {
    return Object.prototype.toString.call(str) == "[object String]";
};
/**
 * 是否是数值类型
 * @method isNumber
 * @param  {number}  num 被判断数值
 * @return {Boolean}  true 是数值类型
 * @author honoka
 */
Ho.prototype.isNumber = function (num) {
    return Object.prototype.toString.call(num) == "[object Number]";
};
/**
 * 是否是布尔类型
 * @method isBoolean
 * @param  {boolean}  bol 被判断布尔
 * @return {Boolean}  true 是布尔类型
 * @author honoka
 */
Ho.prototype.isBoolean = function (bol) {
    return Object.prototype.toString.call(bol) == "[object Boolean]";
};
/**
 * 是否是对象
 * @method isObject
 * @param  {Object}  obj 被判断对象
 * @return {Boolean}  true 是对象
 * @author honoka
 */
Ho.prototype.isObject = function (obj) {
    return Object.prototype.toString.call(obj) == "[object Object]";
};
/**
 * 深度复制对象，即产生一个新的对象而不是只复制引用，不复制函数
 * @method cloneObject
 * @param  {Object}    src 任何被复制的对象
 * @return {Object} result 产生的新对象
 * @author honoka
 */
Ho.prototype.cloneObject = function (src) {
    //如果是基本类型值
    if (src == null || (typeof src != "object")) {
        var result = src;
        return result;
    }
    //使用构造函数创建的基本类型的包装类
    else if (this.isString(src) && typeof src == "object") {
        return new String(src.valueOf());
    } else if (this.isNumber(src) && typeof src == "object") {
        return new Number(src.valueOf());
    } else if (this.isBoolean(src) && typeof src == "object") {
        return new Boolean(src.valueOf());
    } else if (this.isArray(src)) { //如果是数组类型
        var result = [];
        for (var i = 0; i < src.length; i++) {
            result[i] = this.cloneObject(src[i]);
        }
        return result;
    } else if (this.isDate(src)) {
        var result = new Date();
        result.setTime(src.getTime());
        return result;
    } else if (this.isObject(src)) {
        var result = {};
        for (var attr in src) {
            if (src.hasOwnProperty(attr)) {
                result[attr] = this.cloneObject(src[attr]);
            }
        }
        return result;
    } else if (this.isRegExp(src)) {
        var flags = "";
        flags += src.global ? "g" : "";
        flags += src.multiline ? "m" : "";
        flags += src.ignoreCase ? "i" : "";
        return new RegExp(src.source, flags);
    }
};
/**
 * 对数组进行去重操作
 * @method uniqArray
 * @param  {Array}  arr 被去重的字符串
 * @return {Array}      去重完毕的字符串
 * @author honoka
 */
Ho.prototype.uniqArray = function (arr) {
    var uniArr = [];
    var obj = {};
    var key;
    if (this.isArray(arr)) {
        for (var i = 0; i < arr.length; i++) {
            key = typeof (arr[i]) + "_" + arr[i];
            if (!obj[key]) {
                uniArr.push(arr[i]);
                obj[key] = true;
            }
        }
        return uniArr;
    } else {
        throw new Error("not an array!");
    }
};
/**
 * 遍历数组，对其中每个元素执行 fn 函数
 * @method eachArr
 * @param  {Array}  arr 被遍历的数组
 * @param  {Function} fn  执行函数，可以接收两个参数，arr[i] 与索引 i
 * @author honoka
 */
Ho.prototype.eachArr = function (arr, fn) {
    if (this.isArray(arr)) {
        for (var i = 0; i < arr.length; i++) {
            fn(arr[i], i);
        }
        return arr;
    }
};
/**
 * 去除字符串两端的多余空格或 tab
 * @method stringTrim
 * @param  {string}   str 被去除空格或 tab 的字符串
 * @return {string}  处理完毕的字符串
 * @author honoka
 */
Ho.prototype.stringTrim = function (str) {
    var trimReg = /^\s+|\s+$/g;
    var trimStr = str.replace(trimReg, '');
    return trimStr;
};
/**
 * 获取对象里面第一层元素的数量
 * @method getObjectLength
 * @param  {Object}        obj 被获取对象
 * @return {number}  数量值，整数
 * @author honoka
 */
Ho.prototype.getObjectLength = function (obj) {
    var result = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            result++;
        }
    }
    return result;
};
/**
 * 数组快速排序,数组元素必须为数值
 * @method quickSort
 * @param {Array} arr 被排序的数组
 * @returns {Array} 排序完毕的数组
 * @author honoka
 */
Ho.prototype.quickSort = function (arr) {
    if (this.isArray(arr)) {
        var length = arr.length;
        if (length <= 1) {
            return arr;
        }
        var num = Math.floor(length / 2);
        var numVal = arr.splice(num, 1);
        var left = [];
        var right = [];
        for (var i = 0; i < length - 1; i++) {
            if (arr[i] < numVal) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        return this.quickSort(left).concat(numVal, this.quickSort(right));
    } else {
        throw new Error('请传入数组参数');
    }
};


/**
 * Created by honoka on 16/2/27.
 * 事件辅助类
 */
/**
 * 将函数绑定到 onload 事件上
 * @method addLoadEvent
 * @param {function} func 需绑定的函数
 * @author honoka
 */
Ho.prototype.addLoadEvent = function (func) {
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
/**
 * 检测对象是否包含特性,用作浏览器特性检测
 * @method isHostMethod
 * @param {Object} obj 被检测的对象
 * @param {string} property 对象的某个特性
 * @return true 对象包含该特性
 * @author honoka
 */
Ho.prototype.isHostMethod = function (obj, property) {
    var t = typeof obj[property];
    return t == 'function'
                || (!!(t == 'object' && obj[property]))
                || t == 'unknown';
};


/**
 * 数学操作辅助类
 */
/**
 * 得到元素都为数值型的数组最大值
 * @method getMaxOfArr
 * @param  {Array}    arr 被判断数组
 * @return {number}   最大值
 * @author honoka
 */
Ho.prototype.getMaxOfArr = function (arr) {
    var result = Math.max.apply(Math, arr);
    if (result) {
        return result;
    } else {
        throw new Error("请输入仅包含数值的数组");
    }
};
/**
 * 得到元素都为数值型的数组最小值
 * @method getMinOfArr
 * @param  {Array}    arr 被判断数组
 * @return {number}   最小值
 * @author honoka
 */
Ho.prototype.getMinOfArr = function (arr) {
    var result = Math.min.apply(Math, arr);
    if (result) {
        return result;
    } else {
        throw new Error("请输入仅包含数值的数组");
    }
};
/**
 * 随机生成一个范围内的数值
 * @method getRandomNum
 * @param  {number}     lower 最小取值
 * @param  {number}     upper 最大取值
 * @return {number}     lower 到 upper 之间的一个随机数
 * @author honoka
 */
Ho.prototype.getRandomNum = function (lower, upper) {
    var choices = upper - lower + 1;
    return Math.floor(Math.random() * choices + lower);
};


/**
 * 正则表达式验证辅助类
 */
/**
 * 验证邮箱地址
 * @method isEmail
 * @param  {string}  email 邮箱字符串
 * @return {Boolean} true 是正确格式的邮箱地址
 * @author honoka
 */
Ho.prototype.isEmail = function (email) {
    var _emailReg = /^[a-z0-9A-Z_-]+@[a-z0-9A-Z_-]+\.[a-z0-9A-Z_\-\.]+$/ig;
    if (_emailReg.test(email)) {
        return true;
    } else {
        return false;
    }
};
/**
 * 验证是否全是数值，且在一个指定的长度范围内
 * @method isNumLength
 * @param  {string}    numStr    被判断的数值字符串
 * @param  {number}    lowwer 指定的最小长度
 * @param  {number}    upper 指定的最大长度
 * @return {Boolean}  true 该字符串全是数值，且在指定长度范围内
 * @author honoka
 */
Ho.prototype.isDigit = function (numStr, lowwer, upper) {
    var _numReg = new RegExp("^[0-9]{" + lowwer + "," + upper + "}$", "g");
    if (!_numReg.test(numStr)) {
        return false;
    } else {
        return true;
    }
};
/**
 * 验证登录名，仅以英文字符或 _ 开头，包含英文字符、数字及"-_" 两种字符，并且在指定的长度范围内
 * @method isRegisterName
 * @param  {string}       regStr    被验证的字符串
 * @param  {number}       lowwer 最小指定长度
 * @param  {number}       upper  最大指定长度
 * @return {Boolean}  true  字符串符合验证条件
 * @author honoka
 */
Ho.prototype.isRegisterName = function (regStr, lowwer, upper) {
    var _regRegister = new RegExp("^[a-zA-Z_]{1}[a-zA-Z0-9_\-]{" + (lowwer - 1) + "," + upper + "}$", "ig");
    if (_regRegister.test(regStr)) {
        return true;
    } else {
        return false;
    }
};
/**
 * 验证用户姓名，仅能包含英文字符、中文字符、空格或者“·”，且在指定长度范围内
 * @method isTrueName
 * @param  {string}   name    被判断的字符
 * @param  {number}   lowwer 最小指定长度
 * @param  {number}   upper  最大指定长度
 * @return {Boolean}  true 符合验证条件
 * @author honoka
 */
Ho.prototype.isTrueName = function (name, lowwer, upper) {
    var _regTrueName = new RegExp("^[a-zA-Z\u4e00-\u9fa5\·\s]{" + lowwer + "," + upper + "}$", "ig");
    if (_regTrueName.test(name)) {
        return true;
    } else {
        return false;
    }
};
/**
 * 验证密码，仅能包含英文字符、数值、"_-@"三种字符，并在指定长度范围内
 * @method isPasswd
 * @param  {string}  passwd 被判断的密码
 * @param  {number}  lowwer 最小指定长度
 * @param  {number}  upper  最大指定长度
 * @return {Boolean}  true 符合验证条件
 * @author honoka
 */
Ho.prototype.isPasswd = function (passwd, lowwer, upper) {
    var _regPasswd = new RegExp("^[a-z0-9A-Z@_\-]{" + lowwer + "," + upper + "}$", "ig");
    if (_regPasswd.test(passwd)) {
        return true;
    } else {
        return false;
    }
};
/**
 * 验证中国大陆电话号码或传真，匹配 0xx-xxxxxxx、(0xx)xxxxxxxx、0xx xxxxxxx 等各种形式
 * @method isTel
 * @param  {string}  tel 被验证电话
 * @return {Boolean} true 符合验证条件
 * @author honoka
 */
Ho.prototype.isTel = function (tel) {
    var _regTel = /^\(?0\d{2}[) \-]?\d{7}$/g;
    if (_regTel.test(tel)) {
        return true;
    } else {
        return false;
    }
};
/**
 * 验证中国大陆手机号码，可选格式+86-xxxxxxxxxxx\+86xxxxxxxxxxx\+86 xxxxxxxxxxx\xxxxxxxxxxx，号码须以运营商号段开头
 * @method isMobile
 * @param  {string}  mobNum 被验证手机号
 * @return {Boolean} true 符合验证条件
 * @author honoka
 */
Ho.prototype.isMobile = function (mobNum) {
    var _regMob = /(^(\+86)?[\- ]?(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$/g;
    if (_regMob.test(mobNum)) {
        return true;
    } else {
        return false;
    }
};
/**
 * 验证 IP 地址，必须为标准 255 内的数值
 * @method isIP
 * @param  {string}  ip 被验证 IP 地址
 * @return {Boolean} true 符合验证条件
 * @author honoka
 */
Ho.prototype.isIP = function (ip) {
    var _regIP = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/g;
    if (_regIP.test(ip)) {
        return true;
    } else {
        return false;
    }
};
/**
 * 验证身份证号码，15 位或 18 位
 * @method isIDCard
 * @param  {string}  idCode 被验证身份证号码
 * @return {Boolean} true 符合验证条件
 * @author honoka
 */
Ho.prototype.isIDCard = function (idCode) {
    var _regID = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x|#)$)/g;
    if (_regID.test(idCode)) {
        return true;
    } else {
        return false;
    }
};


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



}());
