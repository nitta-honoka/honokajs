/**
 * 使用 karam 配合 jasmine 测试
 * @authonokar honoka
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
        var strObj = new String("a");
        var strObjCopy = honoka.cloneObject(strObj);
        strObj = new String("b");
        expect(strObj.valueOf()).toBe("b");
        expect(strObjCopy.valueOf()).toBe("a");
        var boolObj = new Boolean(true);
        var boolObjCopy = honoka.cloneObject(boolObj);
        boolObj = new Boolean(false);
        expect(boolObj.valueOf()).toBe(false);
        expect(boolObjCopy.valueOf()).toBe(true);
    });
    it("测试数组去重", function () {
        var numArr = [3, 3, 5, 6, 2, 3];
        var strArr = ['a', 'b', 'c', 'a', 'b', 'd'];
        var mixArr = [3, 5, 3, 1, '3', '1', '6', '1'];
        var errorArr = {};
        expect(honoka.uniqArray(numArr)).toEqual([3, 5, 6, 2]);
        expect(honoka.uniqArray(strArr)).toEqual(['a', 'b', 'c', 'd']);
        expect(honoka.uniqArray(mixArr)).toEqual([3, 5, 1, '3', '1', '6']);
    });
    it("测试字符串去空格", function () {
        var trimStr = '  ab  ';
        expect(honoka.stringTrim(trimStr)).toEqual('ab');
    });
    it("测试遍历执行函数", function () {
        var eachArr = [2, 4, 6, 8, 10];
        var resArr = [];
        honoka.eachArr(eachArr, function (item) {
            resArr.push(item * 2);
        });
        expect(resArr).toEqual([4, 8, 12, 16, 20]);
    })
});

describe("数学辅助类", function () {
    it("生成一个范围内的随机数", function () {
        expect(honoka.getRandomNum(2, 3000)).toBeLessThan(3000);
        expect(honoka.getRandomNum(2, 3000)).toBeGreaterThan(2);
        expect(honoka.getRandomNum(4, 5)).not.toBeLessThan(4);
    });
    it("测试判断数组最大最小值", function () {
        var maxAndMinArr = [4, 5, 1, 3, 2];
        var errorArr = ['a', 5, 1, 3, 2];
        expect(honoka.getMaxOfArr(maxAndMinArr)).toEqual(5);
        expect(honoka.getMinOfArr(maxAndMinArr)).toEqual(1);
    });
});
