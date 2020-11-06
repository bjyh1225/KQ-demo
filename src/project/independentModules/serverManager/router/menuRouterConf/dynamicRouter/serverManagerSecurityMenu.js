/**
 * 安全菜单配置
 */
const serverMgrSecurity={
  name:"serverMgrSecurity",
  defaultDisplay:true,
  isIndexMenu: true,
  menuName:"安全",
  sortNo: 6,
  path:"/security",
  component:"serverManagerSecurity",
  meta: {
    indexMenuActive: "/security"
  }
}

export {
  serverMgrSecurity
}