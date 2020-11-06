//serverManager中的登录处理
export function getRememberPassword(loginInfo){
  var username = localStorage.getItem("username");
  var password = localStorage.getItem("password");
  if (username) {
    loginInfo.username = username;
    loginInfo.password = password;
    loginInfo.remember = true;
  }
}

export function loginHandle(_this,loginInfo,success,fail){
  setRememberPassword(loginInfo);
  var data = loginInfo;
  _this.$api.loginApi
    .login(data, { loadingText:"登录中"})
    .then(res => {
      //权限
      let data=res.data.data;
      let userInfo=data.loginUser;
      userInfo.loginName=userInfo.username;
      userInfo.username=userInfo.name;
      //保存登录信息
      saveLoginInfo(userInfo,_this);
      //成功回调
      if(success&&typeof success==='function'){
        success(res);
      }
    })
    .catch(error => {
      //失败回调
      if(fail&&typeof fail==='function'){
        fail(error);
      }
    });
}

function setRememberPassword(loginInfo){
  if (loginInfo.remember) {
    localStorage.setItem("username", loginInfo.username);
    localStorage.setItem("password", loginInfo.password);
  } else {
    localStorage.setItem("username", "");
    localStorage.setItem("password", "");
  }
}

function saveLoginInfo(loginInfo,_this){
  sessionStorage.setItem("username",loginInfo.username);
  sessionStorage.setItem("userInfo",JSON.stringify(loginInfo));
  _this.$store.dispatch("user/login", loginInfo);
}