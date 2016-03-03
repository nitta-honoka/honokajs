/**
 * 使用 karam 配合 jasmine 测试
 * @author honoka
 */
"use strict";

describe("测试数据操作类", function () {
    var ho = new Ho();
    var array = [];
    var func = function () {};
    var obj = {};
    var num = 1;
    var str = 'a';
    var reg = /ab/g;
    var bool = true;
    var date = new Date();
    it("测试数组判断方法", function () {
        expect(ho.isArray(array)).toBe(true);
        expect(ho.isArray(obj)).toBe(false);
    });
    it("测试函数判断方法", function () {
        expect(ho.isFunction(func)).toBe(true);
        expect(ho.isFunction(obj)).toBe(false);
    });
    it("测试对象判断方法", function () {
        expect(ho.isObject(obj)).toBe(true);
        expect(ho.isObject(func)).toBe(false);
    });
    it("测试数值判断方法", function () {
        expect(ho.isNumber(num)).toBe(true);
        expect(ho.isNumber(obj)).toBe(false);
    });
    it("测试字符串判断方法", function () {
        expect(ho.isString(str)).toBe(true);
        expect(ho.isString(obj)).toBe(false);
    });
    it("测试正则表达式判断方法", function () {
        expect(ho.isRegExp(reg)).toBe(true);
        expect(ho.isRegExp(obj)).toBe(false);
    });
    it("测试布尔判断方法", function () {
        expect(ho.isBoolean(bool)).toBe(true);
        expect(ho.isBoolean(obj)).toBe(false);
    });
    it("测试日期判断方法", function () {
        expect(ho.isDate(date)).toBe(true);
        expect(ho.isDate(obj)).toBe(false);
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
        var copyObj = ho.cloneObject(abObj);
        srcObj.a = 2;
        srcObj.b.b1[0] = "Hello";
        expect(abObj.a).toBe(2);
        expect(abObj.b.b1[0]).toBe("Hello");
        expect(copyObj.a).toBe(1);
        expect(copyObj.b.b1[0]).toBe("hello");
        var strObj = new String("a");
        var strObjCopy = ho.cloneObject(strObj);
        strObj = new String("b");
        expect(strObj.valueOf()).toBe("b");
        expect(strObjCopy.valueOf()).toBe("a");
        var boolObj = new Boolean(true);
        var boolObjCopy = ho.cloneObject(boolObj);
        boolObj = new Boolean(false);
        expect(boolObj.valueOf()).toBe(false);
        expect(boolObjCopy.valueOf()).toBe(true);
    });
    it("测试数组去重", function () {
        var numArr = [3, 3, 5, 6, 2, 3];
        var strArr = ['a', 'b', 'c', 'a', 'b', 'd'];
        var mixArr = [3, 5, 3, 1, '3', '1', '6', '1'];
        var errorArr = {};
        expect(ho.uniqArray(numArr)).toEqual([3, 5, 6, 2]);
        expect(ho.uniqArray(strArr)).toEqual(['a', 'b', 'c', 'd']);
        expect(ho.uniqArray(mixArr)).toEqual([3, 5, 1, '3', '1', '6']);
    });
    it("测试字符串去空格", function () {
        var trimStr = '  ab  ';
        expect(ho.stringTrim(trimStr)).toEqual('ab');
    });
    it("测试遍历执行函数", function () {
        var eachArr = [2, 4, 6, 8, 10];
        var resArr = [];
        ho.eachArr(eachArr, function (item) {
            resArr.push(item * 2);
        });
        expect(resArr).toEqual([4, 8, 12, 16, 20]);
    });
    it("测试获取对象第一层元素数量", function () {
        var testObj = {
            a: 1,
            b: 2,
            c: {
                c1: 3,
                c2: 4
            }
        };
        expect(ho.getObjectLength(testObj)).toEqual(3);
    });
});

describe("数学辅助类", function () {
    var ho = new Ho();
    it("生成一个范围内的随机数", function () {
        expect(ho.getRandomNum(2, 3000)).toBeLessThan(3000);
        expect(ho.getRandomNum(2, 3000)).toBeGreaterThan(2);
        expect(ho.getRandomNum(4, 5)).not.toBeLessThan(4);
    });
    it("测试判断数组最大最小值", function () {
        var maxAndMinArr = [4, 5, 1, 3, 2];
        var errorArr = ['a', 5, 1, 3, 2];
        expect(ho.getMaxOfArr(maxAndMinArr)).toEqual(5);
        expect(ho.getMinOfArr(maxAndMinArr)).toEqual(1);
    });
});
describe("正则表达式验证辅助类", function () {
    var ho = new Ho();
    it("验证邮箱地址", function () {
        var email = "abcddd@163.com";
        var errorEmail = "abc@163@qq.com";
        expect(ho.isEmail(email)).toBeTruthy();
        expect(ho.isEmail(errorEmail)).toBeFalsy();
    });
    it("验证数值字符串，并在长度范围内", function () {
        var numStr = "829283928";
        var errorNumStr = "920918sss";
        var overNum = "953982937582739";
        var lowNum = "123";
        expect(ho.isDigit(numStr, 3, 9)).toBeTruthy();
        expect(ho.isDigit(errorNumStr, 3, 9)).toBeFalsy();
        expect(ho.isDigit(overNum, 3, 9)).toBeFalsy();
        expect(ho.isDigit(lowNum, 4, 9)).toBeFalsy();
    });
    it("验证注册名", function () {
        var regStr = "_andjb-ab";
        var errorStr = "ajfen@ab";
        var overStr = "jdfnslfen-sfjelnf";
        var lowStr = "jfdkd";
        expect(ho.isRegisterName(regStr, 1, 8)).toBeTruthy();
        expect(ho.isRegisterName(errorStr, 1, 8)).toBeFalsy();
        expect(ho.isRegisterName(overStr, 1, 8)).toBeFalsy();
        expect(ho.isRegisterName(lowStr, 6, 8)).toBeFalsy();
    });
    it("验证用户姓名", function () {
        var regEngStr = "john·li";
        var regZhStr = "王叔叔";
        var errName = "john@ad";
        var overName = "jfdkd djfklejfsln";
        var lowName = "jfd";
        expect(ho.isTrueName(regEngStr, 1, 8)).toBeTruthy();
        expect(ho.isTrueName(regZhStr, 1, 8)).toBeTruthy();
        expect(ho.isTrueName(errName, 1, 8)).toBeFalsy();
        expect(ho.isTrueName(overName, 1, 8)).toBeFalsy();
        expect(ho.isTrueName(lowName, 5, 8)).toBeFalsy();
    });
    it("验证密码", function () {
        var regPwd = "_ak-21@123";
        var errPwd = "_ak<21.123";
        var errZhPwd = "abdf王jlej";
        var overPwd = "jdfnslfen-sfjelnf";
        var lowPwd = "jfdkd";
        expect(ho.isPasswd(regPwd, 1, 10)).toBeTruthy();
        expect(ho.isPasswd(errPwd, 1, 10)).toBeFalsy();
        expect(ho.isPasswd(errZhPwd, 1, 10)).toBeFalsy();
        expect(ho.isPasswd(overPwd, 1, 10)).toBeFalsy();
        expect(ho.isPasswd(lowPwd, 6, 10)).toBeFalsy();
    });
    it("验证电话号码", function () {
        var tel_01 = "021-2123456";
        var tel_02 = "(021)2123456";
        var tel_03 = "021 2123456";
        var errorTel = "355 2123456";
        var overTel = "021 212345667898";
        var lowTel = "021 22";
        expect(ho.isTel(tel_01)).toBeTruthy();
        expect(ho.isTel(tel_02)).toBeTruthy();
        expect(ho.isTel(tel_03)).toBeTruthy();
        expect(ho.isTel(errorTel)).toBeFalsy();
        expect(ho.isTel(overTel)).toBeFalsy();
        expect(ho.isTel(lowTel)).toBeFalsy();
    });
    it("验证手机号码", function () {
        var mobile = "13908882135";
        var extraMobile = "+86-13908882135";
        var errMob = "34508882135";
        var overMob = "13223241243124";
        var lowMob = "132";
        expect(ho.isMobile(mobile)).toBeTruthy();
        expect(ho.isMobile(extraMobile)).toBeTruthy();
        expect(ho.isMobile(errMob)).toBeFalsy();
        expect(ho.isMobile(overMob)).toBeFalsy();
        expect(ho.isMobile(lowMob)).toBeFalsy();
    });
    it("验证 IP 地址", function () {
        var ip = "192.11.23.5";
        var errIp_01 = "277.11.23.5";
        var errIp_02 = "192.11.23.5.5";
        var errIp_03 = "192.11.23";
        var errIp_04 = "192-11-23-5";
        expect(ho.isIP(ip)).toBeTruthy();
        expect(ho.isIP(errIp_01)).toBeFalsy();
        expect(ho.isIP(errIp_02)).toBeFalsy();
        expect(ho.isIP(errIp_03)).toBeFalsy();
        expect(ho.isIP(errIp_04)).toBeFalsy();
    });
    it("验证身份证号码", function () {
        var idCode = "51300111111111111#";
        var errIdCode = "5130011111111111111111";
        expect(ho.isIDCard(idCode)).toBeTruthy();
        expect(ho.isIDCard(errIdCode)).toBeFalsy();
    });
});
