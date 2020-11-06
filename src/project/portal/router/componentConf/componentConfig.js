const index = () => import("pages/Index/IndexContent");
const service = () => import("pages/ServiceCenter/Service");
const serviceMap = () => import("pages/ServiceCenter/ServiceMap");
const serviceFunction = () => import("pages/ServiceCenter/ServiceFunction");
const serviceScene = () => import("pages/ServiceCenter/ServiceScene");
const serviceData = () => import("pages/ServiceCenter/ServiceData");
const serviceFile = () => import("pages/ServiceCenter/ServiceFile");
const serviceDatacenter = () => import("pages/ServiceCenter/ServiceDatacenter");
const manage = () =>
  import(/* webpackChunkName: "manage" */ "pages/Manage/Manage");
const manageOrg = () =>
  import(/* webpackChunkName: "manage" */ "pages/Manage/ManageOrg");
const personalCenter = () => import("pages/PersonalCenter/PersonalCenter");
const personalCenterResource = () =>
  import("pages/PersonalCenter/PersonalCenterResource");
const errorBuild = () => import("pages/Error/ErrorBuild");
const manageCatalog = () =>
  import(/* webpackChunkName: "manage" */ "pages/Manage/ManageCatalog");
const test = () => import("pages/Test/Test");
const personalCenterCollection = () =>
  import("pages/PersonalCenter/PersonalCenterCollection");
const manageBasicConfiguration = () =>
  import("pages/Manage/ManageBasicConfiguration/");
const manageServiceMonitoring = () =>
  import("pages/Manage/ManageServiceMonitoring/");
const personalCenterRecycleBin = () =>
  import("pages/PersonalCenter/PersonalCenterRecycleBin");
const personalInformation = () =>
  import("pages/PersonalCenter/PersonalCenterInformation");
const myMessage = () => import("pages/PersonalCenter/PersonalCenterMessage");
const visualization = () =>
  import("portal/independentModules/visualization/Visualization");
const portalStatistics = () =>
  import("portal/independentModules/portalStatistics/PortalStatistics");
const portalOverview = () =>
  import(
    "portal/independentModules/portalStatistics/components/PortalOverview"
  );
const portalMapAccess = () =>
  import(
    "portal/independentModules/portalStatistics/components/PortalMapAccess"
  );
const userStatistics = () =>
  import(
    "portal/independentModules/portalStatistics/components/UserStatistics"
  );
const portalFunctionAccess = () =>
  import(
    "portal/independentModules/portalStatistics/components/PortalFunctionAccess"
  );
const portalDataAccess = () =>
  import(
    "portal/independentModules/portalStatistics/components/PortalDataAccess"
  );
const portalAppAccess = () =>
  import(
    "portal/independentModules/portalStatistics/components/PortalAppAccess"
  );
const portalFileDownloadAccess = () =>
  import(
    "portal/independentModules/portalStatistics/components/PortalFileDownloadAccess"
  );
const portalKEYAccess = () =>
  import(
    "portal/independentModules/portalStatistics/components/PortalKEYAccess"
  );
const portalTotalResources = () =>
  import(
    "portal/independentModules/portalStatistics/components/PortalTotalResources"
  );
const portalNewResources = () =>
  import(
    "portal/independentModules/portalStatistics/components/PortalNewResources"
  );
const portalLatestResources = () =>
  import(
    "portal/independentModules/portalStatistics/components/PortalLatestResources"
  );
const portalHottestResource = () =>
  import(
    "portal/independentModules/portalStatistics/components/PortalHottestResource"
  );
const userTotalStatistics = () =>
  import(
    "portal/independentModules/portalStatistics/components/UserTotalStatistics"
  );
const manageSiteConfiguration = () =>
  import("pages/Manage/ManageSiteConfiguration/");
const manageLog = () => import("pages/Manage/ManageLog/");
const webAppBuilder = () => import("app/webAppBuilder/ExternalIntegrationApp");
const app = () => import("pages/App/App");
const manageServer = () => import("pages/Manage/ManageServers");
const personalVerify = () =>
  import("pages/PersonalCenter/PersonalCenterVerify");
const personalApply = () => import("pages/PersonalCenter/PersonalCenterApply");
const myDepartment = () =>
  import("pages/PersonalCenter/PersonalCenterDepartment");
const dashBoard = () => import("pages/DashBoard/DashBoard");
const dashBoardBuilder = () => import("pages/DashBoard/DashBoardBuilder");
const mapBuilder = () => import("pages/MapBuilder/MapBuilder");
const mapDrafting = () => import("pages/MapBuilder/MapDrafting");
const manageParamsConfig = () =>
  import("pages/Manage/ManageParamsConfiguration");
const group = () => import("pages/Group/Group");
const manageCenter = () => import("pages/ManageCenter/ManageCenter");
const scene = () => import("pages/Scene/Scene");
const sceneBuilder = () => import("pages/Scene/SceneBuilder");
const routerContainer = () => import("pages/RouterContainer/RouterContainer");
const tabPagesContainer = () => import("pages/TabPagesContainer/TabPagesContainer");
const personalCenterServiceTab = () => import("components/personalCenterService/PersonalCenterService");
const personalFunctionServiceTab = () => import("components/personalFunctionService/PersonalFunctionService");
const personalSceneServiceTab = () => import("components/personalSceneService/PersonalSceneService");
const personalDataServiceTab = () => import("components/personalDataService/PersonalDataService");
const personalFileServiceTab = () => import("components/personalFileService/PersonalFileService");
const personalDatacenterServiceTab = () => import("components/personalDatacenterService/PersonalDatacenterService");
const manageUserTab = () => import("components/manageUser/ManageUser");
const manageRoleTab = () => import("components/manageRole/ManageRole");
const managePermissionTab = () => import("components/managePermission/ManagePermission");
const manageOrganizationTab = () => import("components/manageOrganization/ManageOrganization");
const manageMapServiceCategoryTab = () => import("components/manageMapServiceCategory/ManageMapServiceCategory");
const manageFunctionServiceCategoryTab = () => import("components/manageFunctionServiceCategory/ManageFunctionServiceCategory");
const manageThreeDServicesTab = () => import("components/manageThreeDServices/ManageThreeDServices");
const manageDataCategoryTab = () => import("components/manageDataCategory/ManageDataCategory");
const manageFileCategoryTab = () => import("components/manageFileCategory/ManageFileCategory");
const manageDatacenterCategoryTab = () => import("components/manageDatacenterCategory/ManageDatacenterCategory");
const manageAppCategoryTab = () => import("components/manageAppCategory/ManageAppCategory");
const manageMapDraftingCategoryTab = () => import("components/manageMapDraftingCategory/ManageMapDraftingCategory");
const manageSceneCategoryTab = () => import("components/manageSceneCategory/ManageSceneCategory");
const manageDashBoardCategoryTab = () => import("components/manageDashBoardCategory/ManageDashBoardCategory");
const manageHardwareServerMonitoringTab = () => import("components/manageHardwareServerMonitoring/ManageHardwareServerMonitoring");
const manageGisServerMonitoringTab = () => import("components/manageGisServerMonitoring/ManageGisServerMonitoring");
const manageGisServerClusterMonitoringTab = () => import("components/manageGisServerClusterMonitoring/ManageGisServerClusterMonitoring");
const manageEmailNotificationTab = () => import("components/manageEmailNotification/ManageEmailNotification");
const manageFunctionalServiceMonitoringTab = () => import("components/manageFunctionalServiceMonitoring/ManageFunctionalServiceMonitoring");
const manageMapServiceMonitoringTab = () => import("components/manageMapServiceMonitoring/ManageMapServiceMonitoring");
const manageBigScreenConfigTab = () => import("components/manageBigScreenConfig/ManageBigScreenConfig");
const manageDepartmentConfigTab = () => import("components/manageDepartmentConfig/ManageDepartmentConfig");
const visualizationConfigTab = () => import("components/visualizationConfig/VisualizationConfig");
const manageOperationLogTab = () => import("components/manageOperationLog/ManageOperationLog");
const manageMapServiceLogTab = () => import("components/manageOperationLog/ManageMapServiceLog");
const manageFunctionServiceLogTab = () => import("components/manageOperationLog/ManageFunctionServiceLog");
const manageServerTab = () => import("components/manageServer/ManageServer");
const manageParamsConfigTab = () => import("components/manageParamsConfig/ManageParamsConfig");
const manageDataDictionaryTab = () => import("components/manageDataDictionary/ManageDataDictionary");
const manageWhiteListTab = () => import("components/manageWhiteList/ManageWhiteList");
const manageResourceTypeTab = () => import("components/manageResourceType/ManageResourceType");
const manageCustomerManagementTab = () => import("components/manageCustomerManagement/ManageCustomerManagement");



export default {
  index,
  service,
  serviceMap,
  serviceFunction,
  serviceScene,
  serviceData,
  serviceFile,
  serviceDatacenter,
  manage,
  manageOrg,
  personalCenter,
  personalCenterResource,
  errorBuild,
  manageCatalog,
  test,
  personalCenterCollection,
  manageBasicConfiguration,
  manageServiceMonitoring,
  personalCenterRecycleBin,
  personalInformation,
  myMessage,
  visualization,
  portalStatistics,
  portalOverview,
  portalMapAccess,
  userStatistics,
  portalFunctionAccess,
  portalDataAccess,
  portalAppAccess,
  portalFileDownloadAccess,
  portalKEYAccess,
  portalTotalResources,
  portalNewResources,
  portalLatestResources,
  portalHottestResource,
  userTotalStatistics,
  manageSiteConfiguration,
  manageLog,
  webAppBuilder,
  app,
  manageServer,
  personalVerify,
  personalApply,
  myDepartment,
  dashBoard,
  mapBuilder,
  manageParamsConfig,
  group,
  manageCenter,
  scene,
  sceneBuilder,
  mapDrafting,
  dashBoardBuilder,
  routerContainer,
  tabPagesContainer,
  personalCenterServiceTab,
  personalFunctionServiceTab,
  personalSceneServiceTab,
  personalDataServiceTab,
  personalFileServiceTab,
  personalDatacenterServiceTab,
  manageUserTab,
  manageRoleTab,
  managePermissionTab,
  manageOrganizationTab,
  manageMapServiceCategoryTab,
  manageFunctionServiceCategoryTab,
  manageThreeDServicesTab,
  manageDataCategoryTab,
  manageFileCategoryTab,
  manageDatacenterCategoryTab,
  manageAppCategoryTab,
  manageMapDraftingCategoryTab,
  manageSceneCategoryTab,
  manageDashBoardCategoryTab,
  manageHardwareServerMonitoringTab,
  manageGisServerMonitoringTab,
  manageGisServerClusterMonitoringTab,
  manageEmailNotificationTab,
  manageFunctionalServiceMonitoringTab,
  manageMapServiceMonitoringTab,
  manageBigScreenConfigTab,
  manageDepartmentConfigTab,
  visualizationConfigTab,
  manageOperationLogTab,
  manageMapServiceLogTab,
  manageFunctionServiceLogTab,
  manageServerTab,
  manageParamsConfigTab,
  manageDataDictionaryTab,
  manageWhiteListTab,
  manageResourceTypeTab,
  manageCustomerManagementTab
};
