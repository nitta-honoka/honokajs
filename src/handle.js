/**
 * Created by honoka on 16/2/28.
 * 数据操作辅助类
 */
/**
 * 是否是数组类型
 * @param {Array} arr 判断数组
 * @retrun Boolean true 是数组类型
 */
Ho.prototype.isArray = function (arr) {
    //当页面存在多个全局作用域时，使用 instanceof 判断不同作用域的引用类型会造成混乱
    //故调用 Object 原生方法 toString 判断
    return Object.prototype.toString.call(arr) == "[object Array]";
};
/**
 * 是否是函数类型
 * @param {Function} fn 被判断函数
 * @retrun Boolean true 是函数类型
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
            result ++;
        }
    }
    return result;
};
