import {resetUserInfo,resetMenuAndRouter} from 'common/loginHandle/resetUtil.js'
export function logoutHandle(_this,success,fail){
  _this.$api.loginApi
  .logout({ loadingText:"正在退出"})
  .then(res => {
    if (res.data.status == 200) {
      resetUserInfo(_this);
      resetMenuAndRouter(_this);
      location.href =_this.currentBaseUrl||'/';
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