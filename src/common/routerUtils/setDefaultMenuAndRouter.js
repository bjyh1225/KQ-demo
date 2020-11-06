import {getDefaultMenu} from 'common/routerUtils/menuFun.js'
import {setRouter} from 'common/routerUtils/router.js'
export function setDefaultMenuAndRouter(_this){
  var menuResult = getDefaultMenu();
  var menuInfo=menuResult.menuGroup;
  var routerInfo=menuResult.routerTree;
  var functionAuthority=menuResult.functionAuthorityGroup;
  var tabPagesConfig=menuResult.tabPagesConfigGroup;
  sessionStorage.setItem('menus',JSON.stringify(menuInfo));
  _this.$store.dispatch('menu/setMenus', menuInfo);
  sessionStorage.setItem('routers',JSON.stringify(routerInfo));
  _this.$store.dispatch('menu/setRouters', routerInfo);
  sessionStorage.setItem('functionAuthority',JSON.stringify(functionAuthority));
  _this.$store.dispatch('menu/setFunctionAuthority', functionAuthority);
  sessionStorage.setItem('tabPagesConfig',JSON.stringify(tabPagesConfig));
  _this.$store.dispatch('menu/setTabPagesConfig', tabPagesConfig);
  setRouter(_this.$router,routerInfo);
}