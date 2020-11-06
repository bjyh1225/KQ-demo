/**
 * 日志菜单配置
 */
const serverMgrLog={
  name:"serverMgrLog",
  defaultDisplay:true,
  isIndexMenu: true,
  menuName:"日志",
  sortNo: 8,
  path:"/log",
  component:"serverManagerCommonMenuRouter",
  meta: {
    indexMenuActive: "/log"
  },
  redirect: "/log/systemLog",
  defaultFirstRedirect:true
}

const serverMgrSystemLog={
  name:"serverMgrSystemLog",
  parent:"serverMgrLog",
  sortNo:1,
  path:"systemLog",
  menuPath:"/log/systemLog",
  defaultDisplay:true,
  menuName:"系统日志",
  component:"serverManagerSystemLog",
  meta: {
    indexMenuActive: "/log"
  }
}

const serverMgrServiceLog={
  name:"serverMgrServiceLog",
  parent:"serverMgrLog",
  sortNo:2,
  path:"serviceLog",
  menuPath:"/log/serviceLog",
  defaultDisplay:true,
  menuName:"服务日志",
  component:"serverManagerServiceLog",
  meta: {
    indexMenuActive: "/log"
  }
}

const serverMgrFunctionServiceLog={
  name:"serverMgrFunctionServiceLog",
  parent:"serverMgrLog",
  sortNo:2,
  path:"functionServiceLog",
  menuPath:"/log/functionServiceLog",
  defaultDisplay:true,
  menuName:"功能服务日志",
  component:"serverManagerFunctionServiceLog",
  meta: {
    indexMenuActive: "/log"
  }
}

export {
  serverMgrLog,
  serverMgrSystemLog,
  serverMgrServiceLog,
  serverMgrFunctionServiceLog
}