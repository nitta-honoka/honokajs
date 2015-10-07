/**
 * 将新元素节点添加到目标元素节点的后面
 * @param newElement 新元素节点
 * @param targetElement 目标元素节点
 */
function insertAfter(newElement, targetElement) {
    //将目标元素的 parentNode 值（即父节点）保存到变量中
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        //判断目标元素是不是 parent 的最后一个子元素，若是，就用 appendChild 方法把新元素加到 parent 上，刚好被插入到目标元素后面
        parent.appendChild(newElement);
    } else {
        //如果不是，就把新元素插入到目标元素和目标元素的下一个兄弟元素之间
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}
/**
 * 将函数绑定到 onload 事件上，增加函数直接使用 addLoadEvent(funcName) 即可。
 * @param func 函数名
 */
function addLoadEvent(func) {
    //把现有的 window.onload 事件处理函数的值存入变量
    var oldOnload = window.onload;
    if (typeof window.onload != "function") {
        //如果这个处理函数还没有绑定任何函数，就像平时那样添加新函数
        window.onload = func;
    } else {
        //如果处理函数已经绑定了一些函数，就把新函数添加到末尾
        window.onload = function() {
            oldOnload();
            func();
        }
    }
}