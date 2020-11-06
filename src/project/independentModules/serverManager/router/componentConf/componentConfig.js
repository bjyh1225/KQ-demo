const serverManagerIndex = () => import("app/serverManager/pages/Index/Index");
const serverManagerIndexContent = () => import("app/serverManager/pages/Index/IndexContent");
const serverManagerLogin = () => import("app/serverManager/pages/Login/Login");
const serverManagerCluster = () => import("app/serverManager/pages/ClusterManage/ClusterManagePage");
const serverManagerList = () => import("app/serverManager/pages/ServerManage/ServerManagePage");
const serverManagerSecurity=() => import("app/serverManager/pages/Security/Security");
const serverManagerCommonMenuRouter=() => import("app/serverManager/pages/CommonPage/CommonMenuRouter");
const serverManagerDataManage = () => import("app/serverManager/pages/DataManage/DataManage");
const serverManagerSystemLog = () => import("app/serverManager/pages/Log/SystemLogPage");
const serverManagerServiceLog = () => import("app/serverManager/pages/Log/ServiceLogPage");
const serverManagerFunctionServiceLog = () => import("app/serverManager/pages/Log/FunctionServiceLogPage");
export default {
  serverManagerIndex,
  serverManagerIndexContent,
  serverManagerLogin,
  serverManagerCluster,
  serverManagerList,
  serverManagerSecurity,
  serverManagerCommonMenuRouter,
  serverManagerDataManage,
  serverManagerSystemLog,
  serverManagerServiceLog,
  serverManagerFunctionServiceLog
};
