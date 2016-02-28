/**
 * 使用 karam 配合 jasmine 测试
 * @author honoka
 */
"use strict";

describe("测试数据操作类", function () {
    var array = [];
    var func = function () {};
    var obj = {};
    var num = 1;
    var str = 'a';
    var reg = /ab/g;
    var bool = true;
    var date = new Date();
    it("测试数组判断方法", function () {
        expect(honoka.isArray(array)).toBe(true);
        expect(honoka.isArray(obj)).toBe(false);
    });
    it("测试函数判断方法", function () {
        expect(honoka.isFunction(func)).toBe(true);
        expect(honoka.isFunction(obj)).toBe(false);
    });
    it("测试对象判断方法", function () {
        expect(honoka.isObject(obj)).toBe(true);
        expect(honoka.isObject(func)).toBe(false);
    });
    it("测试数值判断方法", function () {
        expect(honoka.isNumber(num)).toBe(true);
        expect(honoka.isNumber(obj)).toBe(false);
    });
    it("测试字符串判断方法", function () {
        expect(honoka.isString(str)).toBe(true);
        expect(honoka.isString(obj)).toBe(false);
    });
    it("测试正则表达式判断方法", function () {
        expect(honoka.isRegExp(reg)).toBe(true);
        expect(honoka.isRegExp(obj)).toBe(false);
    });
    it("测试布尔判断方法", function () {
        expect(honoka.isBoolean(bool)).toBe(true);
        expect(honoka.isBoolean(obj)).toBe(false);
    });
    it("测试日期判断方法", function () {
        expect(honoka.isDate(date)).toBe(true);
        expect(honoka.isDate(obj)).toBe(false);
    });
    it("测试深度复制对象方法", function () {
        var srcObj = {
            a: 1,
            b: {
                b1: ["hello", "hi"],
                b2: "JavaScript"
            }
        };
        var abObj = srcObj;
        var copyObj = honoka.cloneObject(abObj);
        srcObj.a = 2;
        srcObj.b.b1[0] = "Hello";
        expect(abObj.a).toBe(2);
        expect(abObj.b.b1[0]).toBe("Hello");
        expect(copyObj.a).toBe(1);
        expect(copyObj.b.b1[0]).toBe("hello");
    });
});
