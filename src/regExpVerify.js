/**
 * 正则表达式验证辅助类
 */
/**
 * 验证邮箱地址
 * @method isEmail
 * @param  {string}  email 邮箱字符串
 * @return {Boolean} true 是正确格式的邮箱地址
 * @author honoka
 */
honoka.isEmail = function (email) {
    var _emailReg = /^[a-z0-9A-Z_-]+@[a-z0-9A-Z_-]+\.[a-z0-9A-Z_\-\.]+$/ig;
    if (_emailReg.test(email)) {
        return true;
    } else {
        return false;
    }
};
/**
 * 验证是否全是数值，且在一个指定的长度范围内
 * @method isNumLength
 * @param  {string}    numStr    被判断的数值字符串
 * @param  {number}    lowwer 指定的最小长度
 * @param  {number}    upper 指定的最大长度
 * @return {Boolean}  true 该字符串全是数值，且在指定长度范围内
 * @author honoka
 */
honoka.isDigit = function (numStr, lowwer, upper) {
    var _numReg = new RegExp("^[0-9]{" + lowwer + "," + upper + "}$", "g");
    if (!_numReg.test(numStr)) {
        return false;
    } else {
        return true;
    }
};
/**
 * 验证登录名，仅以英文字符或 _ 开头，包含英文字符、数字及"-_" 两种字符，并且在指定的长度范围内
 * @method isRegisterName
 * @param  {string}       regStr    被验证的字符串
 * @param  {number}       lowwer 最小指定长度
 * @param  {number}       upper  最大指定长度
 * @return {Boolean}  true  字符串符合验证条件
 * @author honoka
 */
honoka.isRegisterName = function (regStr, lowwer, upper) {
    var _regRegister = new RegExp("^[a-zA-Z_]{1}[a-zA-Z0-9_\-]{" + (lowwer - 1) + "," + upper + "}$", "ig");
    if (_regRegister.test(regStr)) {
        return true;
    } else {
        return false;
    }
};
/**
 * 验证用户姓名，仅能包含英文字符、中文字符、空格或者“·”，且在指定长度范围内
 * @method isTrueName
 * @param  {string}   name    被判断的字符
 * @param  {number}   lowwer 最小指定长度
 * @param  {number}   upper  最大指定长度
 * @return {Boolean}  true 符合验证条件
 * @author honoka
 */
honoka.isTrueName = function (name, lowwer, upper) {
    var _regTrueName = new RegExp("^[a-zA-Z\u4e00-\u9fa5\·\s]{" + lowwer + "," + upper + "}$", "ig");
    if (_regTrueName.test(name)) {
        return true;
    } else {
        return false;
    }
};
/**
 * 验证密码，仅能包含英文字符、数值、"_-@"三种字符，并在指定长度范围内
 * @method isPasswd
 * @param  {string}  passwd 被判断的密码
 * @param  {number}  lowwer 最小指定长度
 * @param  {number}  upper  最大指定长度
 * @return {Boolean}  true 符合验证条件
 * @author honoka
 */
honoka.isPasswd = function (passwd, lowwer, upper) {
    var _regPasswd = new RegExp("^[a-z0-9A-Z@_\-]{" + lowwer + "," + upper + "}$", "ig");
    if (_regPasswd.test(passwd)) {
        return true;
    } else {
        return false;
    }
};
/**
 * 验证中国大陆电话号码或传真，匹配 0xx-xxxxxxx、(0xx)xxxxxxxx、0xx xxxxxxx 等各种形式
 * @method isTel
 * @param  {string}  tel 被验证电话
 * @return {Boolean} true 符合验证条件
 * @author honoka
 */
honoka.isTel = function (tel) {
    var _regTel = /^\(?0\d{2}[) \-]?\d{7}$/g;
    if (_regTel.test(tel)) {
        return true;
    } else {
        return false;
    }
};
/**
 * 验证中国大陆手机号码，可选格式+86-xxxxxxxxxxx\+86xxxxxxxxxxx\+86 xxxxxxxxxxx\xxxxxxxxxxx，号码须以运营商号段开头
 * @method isMobile
 * @param  {string}  mobNum 被验证手机号
 * @return {Boolean} true 符合验证条件
 * @author honoka
 */
honoka.isMobile = function (mobNum) {
    var _regMob = /(^(\+86)?[\- ]?(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$/g;
    if (_regMob.test(mobNum)) {
        return true;
    } else {
        return false;
    }
};
/**
 * 验证 IP 地址，必须为标准 255 内的数值
 * @method isIP
 * @param  {string}  ip 被验证 IP 地址
 * @return {Boolean} true 符合验证条件
 * @author honoka
 */
honoka.isIP = function (ip) {
    var _regIP = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/g;
    if (_regIP.test(ip)) {
        return true;
    } else {
        return false;
    }
};
/**
 * 验证身份证号码，15 位或 18 位
 * @method isIDCard
 * @param  {string}  idCode 被验证身份证号码
 * @return {Boolean} true 符合验证条件
 * @author honoka
 */
honoka.isIDCard = function (idCode) {
    var _regID = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x|#)$)/g;
    if (_regID.test(idCode)) {
        return true;
    } else {
        return false;
    }
};
