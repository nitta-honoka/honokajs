/**
 * 数学操作辅助类
 */
 /**
  * 得到元素都为数值型的数组最大值
  * @method getMaxOfArr
  * @param  {Array}    arr 被判断数组
  * @return {number}   最大值
  * @author honoka
  */
 Ho.prototype.getMaxOfArr = function (arr) {
     var result = Math.max.apply(Math, arr);
     if (result) {
         return result;
     } else {
         throw new Error("请输入仅包含数值的数组");
     }
 };
 /**
  * 得到元素都为数值型的数组最小值
  * @method getMinOfArr
  * @param  {Array}    arr 被判断数组
  * @return {number}   最小值
  * @author honoka
  */
 Ho.prototype.getMinOfArr = function (arr) {
     var result = Math.min.apply(Math, arr);
     if (result) {
         return result;
     } else {
         throw new Error("请输入仅包含数值的数组");
     }
 };
/**
 * 随机生成一个范围内的数值
 * @method getRandomNum
 * @param  {[number]}     lower 最小取值
 * @param  {[number]}     upper 最大取值
 * @return {[number]}     lower 到 upper 之间的一个随机数
 * @author honoka
 */
Ho.prototype.getRandomNum = function (lower, upper) {
    var choices = upper - lower + 1;
    return Math.floor(Math.random() * choices + lower);
};
