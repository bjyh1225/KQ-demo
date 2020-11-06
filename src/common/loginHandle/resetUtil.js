//引用路径：import {} from 'common/loginHandle/resetUtil.js'
//重置用户信息
export function resetUserInfo(_this){
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("userInfo");
  sessionStorage.removeItem("jwt");
  _this.$store.dispatch("user/login", {});
}

//重置菜单和路由
export function resetMenuAndRouter(_this){
  sessionStorage.removeItem("menus");
  sessionStorage.removeItem("routers");
  _this.$store.dispatch("menu/setRouters", []);
  _this.$store.dispatch("menu/setMenus", []);
}

//重置所有的菜单和用户
export function resetAllUserAndMenuRouter(_this){
  resetUserInfo(_this);
  resetMenuAndRouter(_this);
}
