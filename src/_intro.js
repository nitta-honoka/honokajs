(function (root, factory) {
    if (typeof define === 'function' && define.amd) {  //for amd
        define(factory);
    } else if (typeof exports === 'object') {  //for cmd
        module.exports = factory;
    } else {         //for no amd && cmd
        root.honoka = factory();
    }
})(this, function () {


    "use strict";
