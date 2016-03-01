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
 * 验证是否全是数值，且小于指定长度
 * @method isNumLength
 * @param  {string}    numStr    被判断的数值字符串
 * @param  {number}    length 指定的最大长度
 * @return {Boolean}  true 该字符串全是数值，且在指定长度范围内
 * @author honoka
 */
honoka.isNumLength = function (numStr, length) {
    var _numReg = new RegExp("^[0-9]{1," + length + "}$", "g");
    if (!_numReg.test(numStr)) {
        return false;
    } else {
        return true;
    }
};
