/*
defaultDisplay：菜单是否默认展示（未登录状态）
isHomePage：菜单是否是首页
isIndexMenu：菜单是否在首页菜单展示
routerParentNode：路由的父节点，默认值是'/'，如果是root，则挂在与"/"路径平级
sortNo:菜单排序（在同一层级排)
path:路由路径，在无菜单路径时候path默认为菜单路径(指vue-router中的path)
menuPath:菜单路由路径(指菜单点击时，全路径)
permissionParent[Boolean]:根据父权限，来判定自己是否有权限（主要用于只挂路由，不挂菜单的情况）
indexMenuNoChild[Boolean]:显示在首页，但是没有子菜单
afterLoginDefaultDisplay:登录之后默认显示
defaultFirstRedirect:默认取第一个子菜单的路由进行重定向
permissionNoIgnore:在授权时候不忽略的菜单（即使菜单设置了默认显示，登录后默认显示，主要用于下面部分子菜单需要授权，部分默认显示）
externalLinksRouter[Boolean]:外链路由，true/false，true表示是外链路由（外链路由，不配component，只用配path）
*/
const indexOnline = {
  name: "indexOnline",
  path: "/index",
  component: "portalOnlineIndexContent",
  defaultDisplay: true,//默认展示的菜单
  isHomePage: true,
  isIndexMenu: true,
  menuName: 'navMenu.homePage',//首页
  sortNo: 1,
  meta: {
    "indexMenuActive": "/index",
    "isHomePage":true
  }
}

export {
  indexOnline
}