/**
 * 监控菜单配置
 */
const serverMgrMonitor={
  name:"serverMgrMonitor",
  defaultDisplay:true,
  isIndexMenu: true,
  menuName:"监控",
  sortNo: 7,
  path:"/monitor",
  component:"serverManagerSecurity",
  meta: {
    indexMenuActive: "/monitor"
  },
  redirect: "/monitor/hardware",
  defaultFirstRedirect:true
}

const serverMgrHardwarePerformance={
  name:"serverMgrHardwarePerformance",
  parent:"serverMgrMonitor",
  sortNo:1,
  path:"hardware",
  menuPath:"/monitor/hardware",
  defaultDisplay:true,
  menuName:"硬件服务器",
  component:"serverManagerSecurity"
}

const serverMgrGisServerPerformance={
  name:"serverMgrGisServerPerformance",
  parent:"serverMgrMonitor",
  sortNo:2,
  path:"gisServer",
  menuPath:"/monitor/gisServer",
  defaultDisplay:true,
  menuName:"GIS服务器",
  component:"serverManagerSecurity"
}

const serverMgrGisClusterServerPerformance={
  name:"serverMgrGisClusterServerPerformance",
  parent:"serverMgrMonitor",
  sortNo:3,
  path:"gisClusterServer",
  menuPath:"/monitor/gisClusterServer",
  defaultDisplay:true,
  menuName:"GIS服务器集群",
  component:"serverManagerSecurity"
}

const serverMgrEmailInfo={
  name:"serverMgrEmailInfo",
  parent:"serverMgrMonitor",
  sortNo:3,
  path:"email",
  menuPath:"/monitor/email",
  defaultDisplay:true,
  menuName:"邮件通知",
  component:"serverManagerSecurity"
}

export {
  serverMgrMonitor,
  serverMgrHardwarePerformance,
  serverMgrGisServerPerformance,
  serverMgrGisClusterServerPerformance,
  serverMgrEmailInfo
}