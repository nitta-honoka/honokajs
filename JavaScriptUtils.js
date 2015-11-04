myUtils = function () {
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
            window.onload = function () {
                oldOnload();
                func();
            }
        }
    }

    /**
     * 得到 Ajax 对象
     *
     * @return {Object} Ajax 对象
     */
    function getAjaxObject() {
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            return new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
    }

    /**
     * 得到指定元素节点的下一个元素节点
     * @param node
     * @returns {*}
     */
    function getNextElement(node) {
        if (node.nodeName == 1) {
            //当 nodeName 等于 1 时为元素节点
            return node;
        }
        if (node.nextSibling) {
            //当元素节点下个节点存在时，递归寻找下一个元素节点
            return getNextElement(node.nextSibling);
        }
        return null;
    }

    /**
     * 为元素增加新 class
     * @param element 元素节点
     * @param value class 名
     */
    function addClass(element, value) {
        if (!element.className) {
            //当元素没有 class 时，直接赋值
            element.className = value;
        } else {
            //如果元素已有 class，追加一个新的 class 在后面
            newClassName = element.className;
            newClassName += " ";
            newClassName += value;
            element.className = newClassName;
        }
    }

    return {
        insertAfter: insertAfter,
        addLoadEvent: addLoadEvent,
        getAjaxObject: getAjaxObject,
        getNextElement: getNextElement,
        addClass: addClass
    }
}();
