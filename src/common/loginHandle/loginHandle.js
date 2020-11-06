import { getPermissionMenu } from "common/routerUtils/menuFun.js";
import {setRouter} from 'common/routerUtils/router.js'
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
    .login(data, { loadingText: _this.$t("myCenter.Loggingin") })
    .then(res => {
      //权限
      let data=res.data.data;
      let authoritiesList = JSON.parse(res.data.data.authorities);
      let authorities=[];
      if(Array.isArray(authoritiesList)){
        authoritiesList.forEach(item=>{
          try{
            authorities.push(JSON.parse(item));
          }
          catch(e){
            console.error("解析权限数据出错：",e);
          }
        })
      }
      let authoritiesResult=authoritiesHandle(authorities);
      authoritiesResult.userInfo=data;
      //生成路由
      var menuResult = getPermissionMenu(routerFilter,menuFilter,authoritiesResult);
      var menuInfo = menuResult.menuGroup;
      var routerInfo = menuResult.routerTree;
      var functionAuthority=menuResult.functionAuthorityGroup;
      var tabPagesConfig=menuResult.tabPagesConfigGroup;
      sessionStorage.setItem("menus", JSON.stringify(menuInfo));
      sessionStorage.setItem("routers", JSON.stringify(routerInfo));
      sessionStorage.setItem('functionAuthority',JSON.stringify(functionAuthority));
      sessionStorage.setItem('tabPagesConfig',JSON.stringify(tabPagesConfig));
      _this.$store.dispatch('menu/setFunctionAuthority', functionAuthority);
      _this.$store.dispatch('menu/setTabPagesConfig', tabPagesConfig);
      _this.$store.dispatch("menu/setRouters", []);
      _this.$store.dispatch("menu/setMenus", []);
      //保存登录信息
      saveLoginInfo(res.data.data.userinfo,_this);
      //切换主题
      var themecode = res.data.data.privateTheme;
      if (themecode) {
        localStorage.setItem("themecode", themecode);
        document.body.setAttribute("data-theme", themecode);
        _this.$store.dispatch("theme/setTheme", themecode);
      }
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

//jwt登录处理
export function jwtLoginHandle(_this,data){
  let authoritiesList = JSON.parse(data.authorities);
  let authorities=[];
  if(Array.isArray(authoritiesList)){
    authoritiesList.forEach(item=>{
      authorities.push(JSON.parse(item))
    })
  }
  let authoritiesResult=authoritiesHandle(authorities);
  authoritiesResult.userInfo=data;
  //生成路由
  var menuResult = getPermissionMenu(routerFilter,menuFilter,authoritiesResult);
  var menuInfo = menuResult.menuGroup;
  var routerInfo = menuResult.routerTree;
  var functionAuthority=menuResult.functionAuthorityGroup;
  var tabPagesConfig=menuResult.tabPagesConfigGroup;
  sessionStorage.setItem("menus", JSON.stringify(menuInfo));
  sessionStorage.setItem("routers", JSON.stringify(routerInfo));
  sessionStorage.setItem('functionAuthority',JSON.stringify(functionAuthority));
  sessionStorage.setItem('tabPagesConfig',JSON.stringify(tabPagesConfig));
  _this.$store.dispatch('menu/setFunctionAuthority', functionAuthority);
  _this.$store.dispatch('menu/setTabPagesConfig', tabPagesConfig);
  _this.$store.dispatch("menu/setRouters", []);
  _this.$store.dispatch("menu/setMenus", []);
  //生成路由
  _this.$store.dispatch('menu/setRouters', routerInfo);
  _this.$store.dispatch('menu/setMenus', menuInfo);
  setRouter(vm.$router,routerInfo);
  //保存登录信息
  data.userinfo.username=_this.Base64.decode(data.userinfo.username);
  saveLoginInfo(data.userinfo,_this);
  //切换主题
  var themecode = data.privateTheme;
  if (themecode) {
    localStorage.setItem("themecode", themecode);
    document.body.setAttribute("data-theme", themecode);
    _this.$store.dispatch("theme/setTheme", themecode);
  }
}

//权限合并处理
function authoritiesHandle(authorities){
  let menu=[];
  let functionAuthority={};
  authorities.forEach(item=>{
    if(item.menu){
      menu=menu.concat(item.menu)
    }
    if(item.functionAuthority){
      Object.keys(item.functionAuthority).forEach(key=>{
        if(functionAuthority[key]){
          functionAuthority[key]=functionAuthority[key].concat(item.functionAuthority[key]);
        }
        else{
          functionAuthority[key]=item.functionAuthority[key]
        }
      })
    }
  })
  let rmenu=new Set(menu);
  Object.keys(functionAuthority).forEach(key=>{
    functionAuthority[key]=new Set(functionAuthority[key]);
  })
  return {
    menu:rmenu,
    functionAuthority:functionAuthority
  }
}

//路由过滤
function routerFilter(item,params){
  let userInfo=params.userInfo;
  let menuPermission=params.menu;
  let status=false;
  if(userInfo.userinfo.loginName==='root'&&!item.externalLinksRouter&&!item.noMountRoute){
    status=true;
  }
  else{
    if ((Array.from(menuPermission).indexOf(item.name)>-1 || item.isHomePage || item.defaultDisplay||item.afterLoginDefaultDisplay||(item.permissionParent && Array.from(menuPermission).indexOf(item.permissionParent)>-1))&&!item.externalLinksRouter&&!item.noMountRoute) {
      status=true;
    }
  }
  //自定义效验规则
  if(item.customValidationRule&&typeof item.customValidationRule==='function'){
    let customResult=item.customValidationRule(item,userInfo,status);
    if(typeof customResult==='boolean'){
      status=customResult;
    }else{
      status=false;
    }
  }
  return status;
}

//菜单过滤
function menuFilter(item,params){
  let userInfo=params.userInfo;
  let menuPermission=params.menu;
  let functionAuthorityPermission=params.functionAuthority;
  let status=false;
  if(userInfo.userinfo.loginName==='root'&&!item.noMountMenu){
    status=true;
  }
  else{
    if ((Array.from(menuPermission).indexOf(item.name)>-1 || item.isHomePage || item.defaultDisplay||item.afterLoginDefaultDisplay)&&!item.noMountMenu) {
      status=true;
    }
  }
  //自定义效验规则
  if(item.customValidationRule&&typeof item.customValidationRule==='function'){
    let customResult=item.customValidationRule(item,userInfo,status);
    if(typeof customResult==='boolean'){
      status=customResult;
    }else{
      status=false;
    }
  }
  if(status&&item.functionAuthority&&functionAuthorityPermission[item.name]){
    for(let i=item.functionAuthority.length-1;i>=0;i--){
      if(Array.from(functionAuthorityPermission[item.name]).indexOf(item.functionAuthority[i].name)<0){
        item.functionAuthority.splice(i,1);
      }
    }
  }
  return status;
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
