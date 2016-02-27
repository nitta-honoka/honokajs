/**
 * Created by honoka on 16/2/27.
 * Dom操作辅助类
 */

/**
 * 将新元素插入目标元素前面
 * @param {Dom Object} newElement
 * @param {Dom Object} targetElement
 */
honoka.insertAfter = function (newElement, targetElement) {
    //将目标元素的 parentNode 值（即父节点）保存到变量中
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        //判断目标元素是不是 parent 的最后一个子元素，若是，就用 appendChild 方法把新元素加到 parent 上，刚好被插入到目标元素后面
        parent.appendChild(newElement);
    } else {
        //如果不是，就把新元素插入到目标元素和目标元素的下一个兄弟元素之间
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
};
/**
 * 得到指定元素节点的下一个节点
 * @param node 指定节点
 * @returns
 */
honoka.getNextElement = function (node) {
    if (node.nodeName == 1) {
        //当 nodeName 等于 1 时为元素节点
        return node;
    }
    if (node.nextSibling) {
        //当元素节点下个节点存在时，递归寻找下一个元素节点
        return getNextElement(node.nextSibling);
    }
    return null;
};
/**
 * 为指定元素增加 class 值
 * @param {Dom Object} element 指定元素对象
 * @param {string} value class值
 */
honoka.addClass = function (element, value) {
    if (!element.className) {
        //当元素没有 class 时，直接赋值
        element.className = value;
    } else {
        //如果元素已有 class，追加一个新的 class 在后面
        element = element.className;
        element += " ";
        element += value;
        element.className = newClassName;
    }
};
/**
 * 动态加载 JavaScript 文件，生成 DOM - <script type="text/javascript" src=url></script>
 *  注意：不保证文件加载顺序，需要顺序请嵌套加载
 * @param  {[string]}   url     JavaScript 文件路径
 * @param  {Function} callback  加载完成的回调方法
 */
honoka.loadScript = function (url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) { //for IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //for other browsers
        script.onload = function () {
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
};
