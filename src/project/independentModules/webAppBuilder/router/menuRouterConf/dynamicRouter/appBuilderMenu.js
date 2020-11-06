/*
defaultDisplay：菜单是否默认展示（未登录状态）
isHomePage：菜单是否是首页
isIndexMenu：菜单是否在首页菜单展示
routerParentNode：路由的父节点，默认值是'/'，如果是root，则挂在与"/"路径平级
path:路由路径，在无菜单路径时候path默认为菜单路径
menuPath:菜单路由路径
permissionParent:根据父权限，来判定自己是否有权限
indexMenuNoChild:显示在首页，但是没有子菜单
afterLoginDefaultDisplay:登录之后默认显示
*/
const appBuilderMenu = {
  name: "appBuilderMenu",
  path: "/appmenu",
  component: "manageServer",
  defaultDisplay: true,
  sortNo: 9
}

export {
  appBuilderMenu
}