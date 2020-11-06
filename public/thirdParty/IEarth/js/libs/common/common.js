/**
 * common short summary.
 * common libs. 通用函数
 *
 * @author liuyimeng
 * date 2018/4/27 上午 11:56
 */
define(function () {

    'use strict';

    /**
     * The common function libs.
     * 通用的函数库
     *
     * @exports Common
     *
     */
    var Common = {
        /**
         * Get request param of browser location by name.
         * 通过名称获取浏览器地址栏的请求参数.
         * @param {string}name param's name 参数名称
         * @returns {string|undefined} param's value, undefined is null. 参数值,undefined表示无此参数
         */
        getLocationRequestParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)
                return unescape(r[2]);
            return undefined;
        },

        /**
         * Get Element's absolute position.
         * 获取元素的绝对位置.
         * @param {HTML DOMElement}element DOM元素
         * @returns {JSON} The element position. 元素位置 {left:10,top:10}
         */
        getElementAbsolutePosition: function (element) {
            var actualLeft = element.offsetLeft;
            var current = element.offsetParent;
            while (current !== null) {
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
            var actualTop = element.offsetTop;
            var current2 = element.offsetParent;
            while (current2 !== null) {
                actualTop += current2.offsetTop;
                current2 = current2.offsetParent;
            }
            return {
                top: actualTop,
                left: actualLeft
            };
        },
        /**
         * 替换掉字符串的前后空格
         * @param str
         * @returns {string}
         */
        trim: function (str) {
            if (typeof str == 'string')
                return str.replace(/^\s+|\s+$/gm, '');
            return str;
        },
        /**
         * 弧度转度
         * @param radian
         * @returns {number}
         */
        radian2Degree: function (radian) {
            var degree = radian / Math.PI * 180;
            return degree;
        },
        /**
         * 度转弧度
         * @param degree
         * @returns {number}
         */
        degree2Radian: function (degree) {
            var radian = degree / 180 * Math.PI;
            return radian;
        },
        /**
         * 度转换成度分秒的方式
         * @param degree
         */
        degree2DuFenMiao: function (degree) {
            var degree2 = Math.abs(degree);
            var du = parseInt(degree);
            var fenFull = (degree2 - Math.abs(du)) * 60;
            var fen = parseInt(fenFull);
            var miaoFull = (fenFull - fen) * 60;
            var miao = miaoFull.toFixed(2);
            var text = du + ' ° ' + this.toDouble(fen) + ' ′ ' + this.toDouble(miao) + ' ″';
            return {
                degree: du,
                minute: fen,
                second: miao,
                text: text
            };
        },

        /**
         * 数据转换成两位数
         * @param a
         * @returns {*}
         */
        toDouble: function (a) {
            if (a < 10)
                return '0' + a;
            else
                return a;
        },

        /**
         * 生成唯一的guid串
         * @returns {string}
         */
        newGuid: function () {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            return (S4() + "-" + S4() + "-" + S4() + "-" + S4());
        },
        /**
         * 时间戳转时间
         * @param timestamp 时间戳 毫秒
         * @returns {string} 时间,格式：YYYY-MM-DD hh-mm-ss
         */
        timestampToTime: function (timestamp) {
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() + ' ';
            var h = date.getHours() + ':';
            var m = date.getMinutes() + ':';
            var s = date.getSeconds();
            return Y + M + D + h + m + s;
        },
        /**
         * 数组去重，object类型保留
         * @param  {Array} target
         * @returs {Array} 去重后的数组
         */
        unique: function (target) {
            var obj = {},
                arr = [],
                len = target.length;
            for (var i = 0; i < len; i++) {
                var tp = typeof target[i];
                if (target[i] != null && tp == 'object' && !(target[i] instanceof Array)) {
                    arr.push(target[i]);
                    continue;
                }
                var key = target[i];
                //区分 number 和 string
                if (tp == 'number') {
                    key = key + '__self_number__';
                } else if (tp == 'string') {
                    key = key + '__self_string__';
                }
                if (!obj[key]) {
                    obj[key] = 'abc';
                    arr.push(target[i]);
                }
            }
            return arr;
        },

        /**
         * 对象的克隆、浅拷贝
         * @param  {object} obj
         * @returs {object} 浅拷贝后的对象
         */
        clone: function (obj, target) {
            var target = target || {};
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    target[prop] = obj[prop];
                }
            }
            return target;
        },

        /**
         * 对象的深克隆、深拷贝
         * @param  {object} obj
         * @returs {object} 浅拷贝后的对象
         */
        deepClone: function (obj, target) {
            var target = target || {};
            //借助object.toString方法返回原型类型
            var strCall = Object.prototype.toString,
                arrStr = '[object Array]';
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    if (obj[prop] != null && typeof obj[prop] == 'object') {
                        target[prop] = (strCall.call(obj[prop]) == arrStr) ? [] : {};
                        this.deepClone(obj[prop], target[prop]);
                    } else {
                        target[prop] = obj[prop];
                    }
                }
            }
            return target;
        },
        /**
         * 变量类型
         * @param  {varian} target
         * @returs {String} 类型
         */
        myTypeOf: function (target) {
            var types = {
                '[object String]': 'string-object',
                '[object Number]': 'number-object',
                '[object Boolean]': 'boolean-object',
                '[object Array]': 'array'
            };
            //借助object.toString方法返回原型类型
            var strCall = Object.prototype.toString;
            var tp = typeof target;
            if (target == null) {
                return 'null';
            } else if (typeof target == 'object') {
                var temp = strCall.call(target);
                return types[temp];
            }

            return tp;
        }
    };

    return Common;
});