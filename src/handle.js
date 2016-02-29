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
 };
 /**
  * 是否是正则表达式类型
  * @method isRegExp
  * @param  {RegExp}  reg 被判断正则表达式
  * @return {Boolean}  true 是正则表达式类型
  * @author honoka
  */
 honoka.isRegExp = function (reg) {
     return Object.prototype.toString.call(reg) == "[object RegExp]";
 };
 /**
  * 是否是字符串类型
  * @method isString
  * @param  {string}  str 被判断字符串
  * @return {Boolean}  true 是字符串类型
  * @author honoka
  */
 honoka.isString = function (str) {
     return Object.prototype.toString.call(str) == "[object String]";
 };
 /**
  * 是否是数值类型
  * @method isNumber
  * @param  {number}  num 被判断数值
  * @return {Boolean}  true 是数值类型
  * @author honoka
  */
 honoka.isNumber = function (num) {
     return Object.prototype.toString.call(num) == "[object Number]";
 };
 /**
  * 是否是布尔类型
  * @method isBoolean
  * @param  {boolean}  bol 被判断布尔
  * @return {Boolean}  true 是布尔类型
  * @author honoka
  */
 honoka.isBoolean = function (bol) {
     return Object.prototype.toString.call(bol) == "[object Boolean]";
 };
 /**
  * 是否是对象
  * @method isObject
  * @param  {Object}  obj 被判断对象
  * @return {Boolean}  true 是对象
  * @author honoka
  */
 honoka.isObject = function (obj) {
     return Object.prototype.toString.call(obj) == "[object Object]";
 };
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
};
