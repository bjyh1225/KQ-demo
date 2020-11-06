/*
key和name需要保持一致，不一致系统会处理成一致
component:路由挂载的组件
mComponent:移动设备挂载的组件
defaultDisplay：菜单是否默认展示（未登录状态）
isHomePage：菜单是否是首页
isIndexMenu：菜单是否在首页菜单展示
routerParentNode：路由的父节点，默认值是'/'，如果是root，则挂在与"/"路径平级
sortNo:菜单排序（在同一层级排)
path:路由路径，在无菜单路径时候path默认为菜单路径(指vue-router中的path)
menuPath:菜单路由路径(指菜单点击时，全路径)
menuName：菜单显示名称
permissionParent[Boolean]:根据父权限，来判定自己是否有权限（主要用于只挂路由，不挂菜单的情况）
indexMenuNoChild[Boolean]:显示在首页，但是没有子菜单
afterLoginDefaultDisplay:登录之后默认显示
defaultFirstRedirect:默认取第一个子菜单的路由进行重定向
permissionNoIgnore:在授权时候不忽略的菜单（即使菜单设置了默认显示，登录后默认显示，主要用于下面部分子菜单需要授权，部分默认显示）
externalLinksRouter[Boolean]:外链路由，true/false，true表示是外链路由（外链路由，不配component，只用配path）,不挂路由，只挂菜单
noMountRoute[Boolean]:不挂载路由，true/false，true表示不挂载路由
noMountMenu[Boolean]:不挂载菜单，true/false，true表示不挂载菜单
customValidationRule[function]:自定义效验规则，调用时会传入三个参数（当前配置信息，登录信息，当前效验状态），返回值必须是boolean值
coverDefaultIndependentRouter[Boolean]:覆盖默认的独立路由，true/false（临时方案）
coverDefaultIndependentRouterName[Boolean]：覆盖默认的独立路由的name（临时方案）
tabPagesConfig[Array]:tab页签中页面配置如（组织下的用户管理、权限管理等）,配置了此
属性，component属性可以配置为portal提供的通用页签容器tabPagesContainer
tabPagesConfig配置示例如下：
[
  {
    name[String，必填]:"xxx",//页签唯一name，不能重复，需要是英文
    menuName[String，必填]:"用户管理",//页签显示的标题名字，支持国际化
    component[String，必填]:"xxx",//当前页签挂载的组件
    sortNo[Number，必填]:1,//页签的排序，asc排，1为最前面
  }
]
functionAuthority[Array]:功能权限配置
[
{
  name[String，必填]:"xxx",//权限唯一的name，不能重复，需要是英文,
  label[String，必填]:"xxx",//权限显示的名称
}
]
*/
const index = {
  name: "index",
  path: "/index",
  component: "index",
  defaultDisplay: true, //默认展示的菜单
  isHomePage: true,
  isIndexMenu: true,
  menuName: "navMenu.homePage", //首页
  sortNo: 1,
  meta: {
    indexMenuActive: "/index",
    isHomePage: true
  }
};

export { 
  index
};
