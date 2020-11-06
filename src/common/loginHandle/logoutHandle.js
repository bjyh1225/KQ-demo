
/**
 * 引用路径：import {logoutHandle} from "common/loginHandle/logoutHandle.js";
 * @param {*} _this 调用时当前的this
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 */
import {resetUserInfo,resetMenuAndRouter} from './resetUtil.js'
export function logoutHandle(_this,success,fail){
  _this.$api.loginApi
  .logout({ loadingText: _this.$t("myCenter.Loggingout") })
  .then(res => {
    if (res.data.status == 200) {
      resetUserInfo(_this);
      resetMenuAndRouter(_this);
      location.href =_this.currentBaseUrl;
      if(success&&typeof success==='function'){
        success(res);
      }
    }
    else{
      if(fail&&typeof fail==='function'){
        fail(res.data);
      }
    }
  })
  .catch((error) => {
    if(fail&&typeof fail==='function'){
      fail(error);
    }
  });
}