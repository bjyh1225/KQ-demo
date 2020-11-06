/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import baseRouter from 'common/config/router/baseRouter.js'
import {getDefaultMenu} from 'common/routerUtils/menuFun.js'
import {Loading } from 'element-ui';
import {setRouter} from 'common/routerUtils/router.js'
var loading;

function startLoading(lock, text, target, background) {
  loading = Loading.service({
    lock: false,
    text: "Loading...",
    spinner:"el-icon-loading",
    target: target || 'document.body',
    background: 'rgba(244,243,243,0.6)'
  })
}

function endLoading() {
  if (loading) {
    loading.close();
  }
}
let baseUrl="/"
if(window.currentBaseUrl){
  baseUrl=window.currentBaseUrl;
}
if(process&&process.env&&process.env.VUE_APP_PACKAGE){
  baseUrl=process.env.VUE_APP_PACKAGE;
}

Vue.use(Router);
const router = new Router({
  mode:"history",
  base: baseUrl,
  scrollBehavior: () => ({
    y: 0
  }),
  routes: baseRouter
});

var loop=0;
router.beforeEach((to, from, next) => {
  if(!to.meta||(to.meta&&!to.meta.noLoading)){
    startLoading();
  }
  var userInfo=sessionStorage.getItem('userInfo');
  //登录状态保持
  if(!store.getters.username){
    if(userInfo){
      store.dispatch('user/login', JSON.parse(userInfo));
    }
  }
  else{
    if(!userInfo){
      store.dispatch('user/login', {});
    }
  }
  //路由和菜单状态同步
  var sessionRouterList=sessionStorage.getItem('routers');
  if(!sessionRouterList){
    store.dispatch('menu/setRouters',[]);
    store.dispatch('menu/setMenus',{});
  }
  //路由和菜单初始化
  if(store.getters.routers.length>0||loop>5){
    if (to.matched.length === 0) {
      next('/404');
    }
    //登录权限
    if (to.meta.requireAuth) {
      if (store.getters.username) {
        next();
      }
      else if (sessionStorage.getItem('username')) {
        next();
      }
      else {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    }
    //随路由更改title
    if (!to.meta && !to.meta.title) {
      document.title = to.meta.title;
    }
    else{
      if(window.portal_config&&window.portal_config.DOCUMENT_TITLE){
        document.title =window.portal_config.DOCUMENT_TITLE;
      }
      else{
        document.title ="KQGIS Portal";
      }
    }
    //改变菜单是否自选中的状态
    store.dispatch('menu/setActiveMenuStatus', false);
    next();
  }
  else{
    var menuList=sessionStorage.getItem('menus');
    var routerList=sessionStorage.getItem('routers');
    var functionAuthority=sessionStorage.getItem('functionAuthority');
    var tabPagesConfig=sessionStorage.getItem('tabPagesConfig');
    if(routerList){
      store.dispatch('menu/setRouters', JSON.parse(routerList));
      store.dispatch('menu/setMenus', JSON.parse(menuList));
      store.dispatch('menu/setFunctionAuthority', JSON.parse(functionAuthority));
      store.dispatch('menu/setTabPagesConfig', JSON.parse(tabPagesConfig));
      // routerGo(to, next,JSON.parse(routerList));
      setRouter(router,JSON.parse(routerList));
      next({...to, replace: true});
    }
    else{
      loop++;
      var menuResult = getDefaultMenu();
      var menuInfo=menuResult.menuGroup;
      var routerInfo=menuResult.routerTree;
      var functionAuthority=menuResult.functionAuthorityGroup;
      var tabPagesConfig=menuResult.tabPagesConfigGroup;
      sessionStorage.setItem('menus',JSON.stringify(menuInfo));
      store.dispatch('menu/setMenus', menuInfo);
      sessionStorage.setItem('routers',JSON.stringify(routerInfo));
      store.dispatch('menu/setRouters', routerInfo);
      sessionStorage.setItem('functionAuthority',JSON.stringify(functionAuthority));
      store.dispatch('menu/setFunctionAuthority', functionAuthority);
      sessionStorage.setItem('tabPagesConfig',JSON.stringify(tabPagesConfig));
      store.dispatch('menu/setTabPagesConfig', tabPagesConfig);
      // routerGo(to, next,routerInfo);    
      setRouter(router,routerInfo);
      next({...to, replace: true});
    }
  }
});

//动态添加
// function routerGo(to, next,asynRouters) {
//   setComponent(asynRouters,0);
//   asynRouters.forEach(function(item){
//     router.options.routes[0].children.push(item);
//   })
//   router.addRoutes(router.options.routes);
//   next({...to, replace: true});
// }

router.afterEach(() => {
  endLoading();
  //路由信息
  if(!window.portalRouterInfo){
    window.portalRouterInfo={};
  }
  window.portalRouterInfo.routerChangeTime=new Date();
  //国际化设置
  if(!store.getters.language){
    var language=sessionStorage.getItem('language');
    if(!language){
      if(vm.$i18n.locale){
        language=vm.$i18n.locale;
      }
      else{
        language="chinese";
      }
    }
    store.dispatch('language/setLanguage',language);
    vm.$i18n.locale=language;
  }
})

export default router

