/**
 * guid short summary.
 *  Generate a unique identifier.
 *
 * @author liuyimeng
 * date 2018/4/27 上午 11:56
 */

define(function () {
    "use strict";
    var Guid = {
        S4: function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        },
        newGuid: function () {
            return (this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4());
        }
    }
    return Guid;
});
