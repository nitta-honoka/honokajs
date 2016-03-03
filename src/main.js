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
