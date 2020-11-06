/**
 * name:菜单名，必须
 * label:菜单显示名，必须
 * displayComponentsName:详情的组件名称，如果type是document则是必须
 * parent:父菜单显示名
 * type:类型，值为[document,folder],默认值是document
 * sortNo:排序号
 * desc:备注信息
 * needLogin:是否需要登录才能看，true(需要登录)，false(无需登录)默认值是false
 * children:子菜单信息，必须是数组。支持直接描述子菜单信息，也支持通过parent由系统去寻找
 * isHomePage:true/false，默认是false
 */

const indexMenu = {
  name: "indexMenu",
  label: "首页",
  type: "document",
  sortNo: 1,
  needLogin: false,
  isHomePage: true,
  desc: "首页",
  displayComponentsName: "HomePage"
}

const whatsNew = {
  name: "whatsNew",
  label: "What's New",
  type: "document",
  sortNo: 2,
  needLogin: false,
  desc: "What's New",
  displayComponentsName: "WhatsNew"
}

const productDescription = {
  name: "productDescription",
  label: "产品介绍",
  type: "folder",
  sortNo: 3,
  needLogin: false,
  desc: "产品介绍",
  displayComponentsName: "Test"
}

const portalInKQGIS = {
  name: "portalInKQGIS",
  label: "KQGIS Portal在KQGIS中的位置",
  type: "document",
  parent: "productDescription",
  sortNo: 1,
  needLogin: false,
  desc: "KQGIS Portal在KQGIS中的位置",
  displayComponentsName: "PortalInKqgis"
}

const portalInclude = {
  name: "portalInclude",
  label: "KQGIS Portal包含什么",
  type: "document",
  parent: "productDescription",
  sortNo: 2,
  needLogin: false,
  desc: "KQGIS Portal包含什么",
  displayComponentsName: "PortalInclude"
}

const userPermission = {
  name: "userPermission",
  label: "用户的权限",
  type: "document",
  parent: "productDescription",
  sortNo: 3,
  needLogin: false,
  desc: "用户的权限",
  displayComponentsName: "UserPermission"
}

const installationAndDeployment = {
  name: "installationAndDeployment",
  label: "安装部署",
  type: "folder",
  sortNo: 4,
  needLogin: false,
  desc: "安装部署",
}

const installationAndDeploymentDesc = {
  name: "installationAndDeploymentDesc",
  parent: "installationAndDeployment",
  label: "部署说明",
  type: "document",
  sortNo: 1,
  needLogin: false,
  desc: "部署说明",
  displayComponentsName: "InstallationAndDeployment"
}

const quickStart = {
  name: "quickStart",
  label: "快速入门",
  type: "document",
  sortNo: 5,
  needLogin: false,
  desc: "快速入门",
  displayComponentsName: "QuickStart"
}

const resourcesAndSharing = {
  name: "resourcesAndSharing",
  label: "关于资源与共享",
  type: "document",
  sortNo: 6,
  needLogin: false,
  desc: "关于资源与共享",
  displayComponentsName: "ResourcesAndSharing"
}

// const onlineMappingAndSharing={
//   name:"onlineMappingAndSharing",
//   label:"在线制图与共享",
//   type:"document",
//   sortNo:6,
//   needLogin:false,
//   desc:"在线制图与共享",
//   displayComponentsName:"Test"
// }

const developMyOwnPortal = {
  name: "developMyOwnPortal",
  label: "开发与扩展指南",
  type: "folder",
  sortNo: 6,
  needLogin: false,
  desc: "开发与扩展指南",
  displayComponentsName: "Test"
}

const developmentEnvironmentPreparation = {
  name: "developmentEnvironmentPreparation",
  label: "开发环境准备",
  type: "document",
  sortNo: 1,
  needLogin: false,
  parent: "developMyOwnPortal",
  desc: "开发环境准备",
  displayComponentsName: "DevelopmentEnvironmentPreparation"
}

const serverDevelopmentExtension = {
  name: "serverDevelopmentExtension",
  label: "KQGIS Portal服务端开发扩展",
  type: "document",
  sortNo: 2,
  needLogin: false,
  parent: "developMyOwnPortal",
  desc: "KQGIS Portal服务端开发扩展",
  displayComponentsName: "ServerDevelopmentExtension"
}

const webDevelopmentExtension = {
  name: "webDevelopmentExtension",
  label: "KQGIS Portal前端开发扩展",
  type: "document",
  sortNo: 3,
  needLogin: false,
  parent: "developMyOwnPortal",
  desc: "KQGIS Portal前端开发扩展",
  displayComponentsName: "WebDevelopmentExtension"
}

const updataLog = {
  name: "updataLog",
  label: "更新日志",
  type: "document",
  sortNo: 4,
  needLogin: false,
  parent: "developMyOwnPortal",
  desc: "更新日志",
  displayComponentsName: "UpdataLog"
}

const appendix = {
  name: "appendix",
  label: "附录",
  type: "document",
  sortNo: 6,
  needLogin: false,
  desc: "附录",
  displayComponentsName: "Appendix"
}

const getLicense = {
  name: "getLicense",
  label: "获取许可",
  parent: "installationAndDeployment",
  type: "document",
  sortNo: 2,
  needLogin: false,
  desc: "获取许可",
  displayComponentsName: "GetLicense"
}

export default [
  indexMenu,
  whatsNew,
  productDescription,
  installationAndDeployment,
  quickStart,
  resourcesAndSharing,
  developMyOwnPortal,
  appendix,
  portalInKQGIS,
  portalInclude,
  userPermission,
  developmentEnvironmentPreparation,
  serverDevelopmentExtension,
  webDevelopmentExtension,
  installationAndDeploymentDesc,
  getLicense,
  updataLog
]