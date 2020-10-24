/**
 * search elements by css selectors | 通过css选择器查找HTML元素
 * @param {string} selectors css selectors | css选择器
 * @param {CSS_Query_MINI} parentQuery parent query result,allow undefined | 父级查询器,允许为空
 * @param {number} index query from parent item index, allow undefined | 从父级某个索引位置的子元素继续查询,允许为空
 */
function CSS_Query_MINI(selectors, parentQuery, index) {
    var PUBLIC = this;
    PUBLIC.selectors = selectors;
    PUBLIC.parentQuery = parentQuery;
    if (!parentQuery) {
        var arr = document.querySelectorAll(selectors);
        this.pushItemsOfArray(arr);
    } else {
        if (index === undefined) {
            var n = parentQuery.length;
            for (var i = 0; i < n; i++) {
                var arr = parentQuery[i].querySelectorAll(selectors);
                this.pushItemsOfArray(arr);
            }
        } else {
            if (index < parentQuery.length) {
                var arr = parentQuery[index].querySelectorAll(selectors);
                this.pushItemsOfArray(arr);
            }
        }

    }
}

CSS_Query_MINI.prototype = [];
/**
 * add array to this array | 用于将检索到的元素集合加入本集合
 * @param {Array} arr array of queried | 检索到的元素集合
 */
CSS_Query_MINI.prototype.pushItemsOfArray = function (arr) {
    this.push.apply(this, arr);
    return this;
}
/**
 * set property of value for each item | 对集合内元素的value属性进行赋值
 * @param {string} newValue new value to set | 需要设置的新的value值
 */
CSS_Query_MINI.prototype.val = function (newValue) {
    var n = this.length;
    for (var i = 0; i < n; i++) {
        this[i].value = newValue;
    }
    return this;
}
/**
 * set value of css property with key for each item | 对集合内所有元素的指定key的样式名设置value值
 * @param {string} key css style property name | 样式属性名
 * @param {string | number} value css style property value | 样式属性值 
 */
CSS_Query_MINI.prototype.css = function (key, value) {
    var n = this.length;
    for (var i = 0; i < n; i++) {
        this[i].style[key] = value;
    }
    return this;
}
/**
 * click() each item | 对集合内每个元素执行click()方法
 */
CSS_Query_MINI.prototype.click = function () {
    var n = this.length;
    for (var i = 0; i < n; i++) {
        this[i].click();
    }
    return this;
}
/**
 * 对集合内每个元素的子元素进行css selectors匹配,并返回查找到的集合
 * @param {string} selectors 
 * @return {CSS_Query_MINI} return new array searched | 返回查找到的集合
 */
CSS_Query_MINI.prototype.find = function (selectors) {
    return new CSS_Query_MINI(selectors, this);
}
/**
 * search childrens by css selectors from this item of index in array 
 * | 在当前集合的某个元素中进行匹配查找
 * @param {number} index index of this array for child css selector, start by 0
 * | 在当前集合中指定查找子元素的元素索引,从0开始
 * @param {string} selectors css selectors
 * @return {CSS_Query_MINI} return new array searched | 返回新找到的集合
 */
CSS_Query_MINI.prototype.findAt = function (index, selectors) {
    return new CSS_Query_MINI(selectors, this, index);
}
/**
 * attach callback function for each item 
 * | 逐个对每个集合内的对象触发callback方法
 * @param {(index:number, HTMLElement)} callback function | 要回调的方法
 */
CSS_Query_MINI.prototype.each = function (callback) {
    var n = this.length;
    var itemResult = false;
    for (var i = 0; i < n; i++) {
        itemResult = callback.apply(this, [i, this[i]]);
        if (itemResult === false) {
            break;
        }
    }
    return this;
}
/**
 * print warn text to console when size of array is 0 | 若集合内元素数量为0,则在控制台以警告的方式打印输出warnText
 * @param {*} warnText | 需要提示的文本 
 */
CSS_Query_MINI.prototype.emptyWarn = function (warnText) {
    var n = this.length;
    if (0 == n && console && console.warn) {
        console.warn('匹配规则集结果为空:' + this.selectors + ', ' + warnText);
    }
    return this;
}
/**
 * search elements by css selectors | 查找与css查询器相匹配的元素集合
 * @param  {string} selectors css selectors | css查询器
 * @return {CSS_Query_MINI} elements
 */
CSS_Query_MINI.$css = function (selectors) {
    return new CSS_Query_MINI(selectors);
}

/**
 * search elements by css selectors | 查找与css查询器相匹配的元素集合
 * @param  {string} selectors css selectors | css查询器
 * @return {CSS_Query_MINI} elements
 */
if (undefined != window) window.$css = CSS_Query_MINI.$css;
/**
 * search elements by css selectors | 查找与css查询器相匹配的元素集合
 * @param  {string} selectors css selectors | css查询器
 * @return {CSS_Query_MINI} elements
 */
var $css = CSS_Query_MINI.$css;