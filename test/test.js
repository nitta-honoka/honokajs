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
    });
    it("测试获取对象第一层元素数量", function() {
        var testObj = {
            a: 1,
            b: 2,
            c: {
                c1: 3,
                c2: 4
            }
        };
        expect(honoka.getObjectLength(testObj)).toEqual(3);
    });
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

describe("正则表达式验证辅助类", function () {
    it("验证邮箱地址", function() {
        var email = "abcddd@163.com";
        var errorEmail = "abc@163@qq.com";
        expect(honoka.isEmail(email)).toBeTruthy();
        expect(honoka.isEmail(errorEmail)).toBeFalsy();
    });
    it("验证数值字符串，并在长度范围内", function() {
        var numStr = "829283928";
        var errorNumStr = "920918sss";
        var overNum = "953982937582739";
        var lowNum = "123";
        expect(honoka.isDigit(numStr, 3, 9)).toBeTruthy();
        expect(honoka.isDigit(errorNumStr, 3, 9)).toBeFalsy();
        expect(honoka.isDigit(overNum, 3, 9)).toBeFalsy();
        expect(honoka.isDigit(lowNum, 4, 9)).toBeFalsy();
    });
    it("验证注册名", function() {
        var regStr = "_andjb-ab";
        var errorStr = "ajfen@ab";
        var overStr = "jdfnslfen-sfjelnf";
        var lowStr = "jfdkd";
        expect(honoka.isRegisterName(regStr, 1, 8)).toBeTruthy();
        expect(honoka.isRegisterName(errorStr, 1, 8)).toBeFalsy();
        expect(honoka.isRegisterName(overStr, 1, 8)).toBeFalsy();
        expect(honoka.isRegisterName(lowStr, 6, 8)).toBeFalsy();
    });
    it("验证用户姓名", function() {
        var regEngStr = "john·li";
        var regZhStr = "王叔叔";
        var errName = "john@ad";
        var overName = "jfdkd djfklejfsln";
        var lowName = "jfd";
        expect(honoka.isTrueName(regEngStr, 1, 8)).toBeTruthy();
        expect(honoka.isTrueName(regZhStr, 1, 8)).toBeTruthy();
        expect(honoka.isTrueName(errName, 1, 8)).toBeFalsy();
        expect(honoka.isTrueName(overName, 1, 8)).toBeFalsy();
        expect(honoka.isTrueName(lowName, 5, 8)).toBeFalsy();
    });
    it("验证密码", function() {
        var regPwd = "_ak-21@123";
        var errPwd = "_ak<21.123";
        var errZhPwd = "abdf王jlej";
        var overPwd = "jdfnslfen-sfjelnf";
        var lowPwd = "jfdkd";
        expect(honoka.isPasswd(regPwd, 1, 10)).toBeTruthy();
        expect(honoka.isPasswd(errPwd, 1, 10)).toBeFalsy();
        expect(honoka.isPasswd(errZhPwd, 1, 10)).toBeFalsy();
        expect(honoka.isPasswd(overPwd, 1, 10)).toBeFalsy();
        expect(honoka.isPasswd(lowPwd, 6, 10)).toBeFalsy();
    });
    it("验证电话号码", function() {
        var tel_01 = "021-2123456";
        var tel_02 = "(021)2123456";
        var tel_03 = "021 2123456";
        var errorTel = "355 2123456";
        var overTel = "021 212345667898";
        var lowTel = "021 22";
        expect(honoka.isTel(tel_01)).toBeTruthy();
        expect(honoka.isTel(tel_02)).toBeTruthy();
        expect(honoka.isTel(tel_03)).toBeTruthy();
        expect(honoka.isTel(errorTel)).toBeFalsy();
        expect(honoka.isTel(overTel)).toBeFalsy();
        expect(honoka.isTel(lowTel)).toBeFalsy();
    });
    it("验证手机号码", function() {
        var mobile = "13908882135";
        var extraMobile = "+86-13908882135";
        var errMob = "34508882135";
        var overMob = "13223241243124";
        var lowMob = "132";
        expect(honoka.isMobile(mobile)).toBeTruthy();
        expect(honoka.isMobile(extraMobile)).toBeTruthy();
        expect(honoka.isMobile(errMob)).toBeFalsy();
        expect(honoka.isMobile(overMob)).toBeFalsy();
        expect(honoka.isMobile(lowMob)).toBeFalsy();
    });
    it("验证 IP 地址", function() {
        var ip = "192.11.23.5";
        var errIp_01 = "277.11.23.5";
        var errIp_02 = "192.11.23.5.5";
        var errIp_03 = "192.11.23";
        var errIp_04 = "192-11-23-5";
        expect(honoka.isIP(ip)).toBeTruthy();
        expect(honoka.isIP(errIp_01)).toBeFalsy();
        expect(honoka.isIP(errIp_02)).toBeFalsy();
        expect(honoka.isIP(errIp_03)).toBeFalsy();
        expect(honoka.isIP(errIp_04)).toBeFalsy();
    });
    it("验证身份证号码", function() {
        var idCode = "51300111111111111#";
        var errIdCode = "5130011111111111111111";
        expect(honoka.isIDCard(idCode)).toBeTruthy();
        expect(honoka.isIDCard(errIdCode)).toBeFalsy();
    });
});
