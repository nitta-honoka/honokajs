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
