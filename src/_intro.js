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
