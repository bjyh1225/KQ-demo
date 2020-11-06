const siteManage = {
  name: "siteManage",
  path: "sitemanage",
  menuPath: "/manage/sitemanage",
  parent: "manage",
  isIndexMenu: true,
  component: "manage",
  menuName: 'navMenu.SiteManagement', //站点管理
  sortNo: 1,
  meta: {
    "requireAuth": true,
    "indexMenuActive": "/manage/sitemanage"
  },
  redirect: "/manage/sitemanage/organization",
  defaultFirstRedirect: true
}

const organization = {
  parent: "siteManage",
  name: 'organization',
  path: 'organization',
  menuPath: "/manage/sitemanage/organization",
  // component: "manageOrg",
  component: 'tabPagesContainer',
  tabPagesConfig: [{
    name: "manageUser",
    menuName: 'management.userManagement', //用户管理
    component: "manageUserTab",
    sortNo: 1
  }, {
    name: "managePermission",
    menuName: 'management.permissionManagement',
    component: "managePermissionTab",
    sortNo: 2
  }, {
    name: "manageRole",
    menuName: 'management.roleManagement',
    component: "manageRoleTab",
    sortNo: 3
  }, {
    name: "manageOrganization",
    menuName: 'management.organizationManagement',
    component: "manageOrganizationTab",
    sortNo: 4
  }],
  menuName: "navMenu.organization", //组织
  sortNo: 1,
  meta: {
    "requireAuth": true,
    "indexMenuActive": "/manage/sitemanage",
    "childMenuActive": "/manage/sitemanage/organization"
  }
}

const catalog = {
  parent: "siteManage",
  name: 'catalog',
  path: 'catalog',
  menuPath: "/manage/sitemanage/catalog",
  // component: "manageCatalog",
  component: 'tabPagesContainer',
  tabPagesConfig: [{
      name: "manageMapServiceCategory",
      menuName: 'management.categoriesOfMapServices', //地图目录
      component: "manageMapServiceCategoryTab",
      sortNo: 1
    }, {
      name: "manageDataCategory",
      menuName: 'myCenter.Dataservicecategory',
      component: "manageDataCategoryTab",
      sortNo: 2
    }, {
      name: "manageFunctionServiceCategory",
      menuName: 'management.categoriesOfFunctionServices',
      component: "manageFunctionServiceCategoryTab",
      sortNo: 3
    }, {
      name: "manageThreeDServices",
      menuName: 'management.ThreeDServiceCategory',
      component: "manageThreeDServicesTab",
      sortNo: 4
    }, {
      name: "manageDatacenterCategory",
      menuName: 'management.Datacategory',
      component: "manageDatacenterCategoryTab",
      sortNo: 5
    },
    {
      name: "manageFileCategory",
      menuName: 'management.MyFileCategory',
      component: "manageFileCategoryTab",
      sortNo: 6
    }, {
      name: "manageMapDraftingCategory",
      menuName: 'myCenter.Mappingcategory',
      component: "manageMapDraftingCategoryTab",
      sortNo: 7
    }, {
      name: "manageSceneCategory",
      menuName: 'myCenter.Scenecategory',
      component: "manageSceneCategoryTab",
      sortNo: 8
    }, {
      name: "manageDashBoardCategory",
      menuName: 'myCenter.Bigscreencategory',
      component: "manageDashBoardCategoryTab",
      sortNo: 9
    }, {
      name: "manageAppCategory",
      menuName: 'management.AppsCenterCategory',
      component: "manageAppCategoryTab",
      sortNo: 10
    }
  ],
  menuName: "navMenu.directoryConfiguration", //目录配置
  sortNo: 2,
  meta: {
    "requireAuth": true,
    "indexMenuActive": "/manage/sitemanage",
    "childMenuActive": "/manage/sitemanage/catalog"
  }
}

const basicConfiguration = {
  parent: "siteManage",
  name: 'basicConfiguration',
  path: 'config',
  menuPath: "/manage/sitemanage/config",
  component: "manageBasicConfiguration",
  tabPagesConfig: [{
      name: "manageDataDictionary",
      menuName: 'management.dataDictionary',
      component: "manageDataDictionaryTab",
      sortNo: 1
    }, {
      name: "manageWhiteList",
      menuName: 'management.WhiteListConfiguration',
      component: "manageWhiteListTab",
      sortNo: 2
    }, {
      name: "manageResourceType",
      menuName: 'management.ResourceCategories', //资源分类
      component: "manageResourceTypeTab",
      sortNo: 3
    },
    {
      name: "manageCustomerManagement",
      menuName: 'management.TenantManagement',
      component: 'manageCustomerManagementTab',
      sortNo: 4

    }
  ],
  menuName: "navMenu.basicConfig", //安全配置
  sortNo: 4,
  meta: {
    "requireAuth": true,
    "indexMenuActive": "/manage/sitemanage",
    "childMenuActive": "/manage/sitemanage/config"
  }
}

const serviceMonitoring = {
  parent: "siteManage",
  name: 'serviceMonitoring',
  path: 'serviceMonitoring',
  menuPath: "/manage/sitemanage/serviceMonitoring",
  // component: "manageServiceMonitoring",
  component: 'tabPagesContainer',
  tabPagesConfig: [{
    name: "manageGisServerClusterMonitoring",
    menuName: 'visualization.GISservercluster', //GIS服务集群
    component: "manageGisServerClusterMonitoringTab",
    sortNo: 1
  }, {
    name: "manageHardwareServerMonitoring",
    menuName: 'visualization.Hardwareserver',
    component: "manageHardwareServerMonitoringTab",
    sortNo: 2
  }, {
    name: "manageGisServerMonitoring",
    menuName: 'visualization.GISserver',
    component: "manageGisServerMonitoringTab",
    sortNo: 3
  }, {
    name: "manageMapServiceMonitoring",
    menuName: 'management.MapServiceMonitor',
    component: "manageMapServiceMonitoringTab",
    sortNo: 4
  }, {
    name: "manageFunctionalServiceMonitoring",
    menuName: 'visualization.Functionservicemonitoring',
    component: "manageFunctionalServiceMonitoringTab",
    sortNo: 5
  }, {
    name: "manageEmailNotification",
    menuName: 'visualization.Emailnotification',
    component: "manageEmailNotificationTab",
    sortNo: 6
  }],
  menuName: "navMenu.ServiceMonitoring", //服务监控
  sortNo: 5,
  meta: {
    "requireAuth": true,
    "indexMenuActive": "/manage/sitemanage",
    "childMenuActive": "/manage/sitemanage/serviceMonitoring"
  }
}

const manageSiteConfiguration = {
  parent: "siteManage",
  name: 'manageSiteConfiguration',
  path: 'siteconfig',
  menuPath: "/manage/sitemanage/siteconfig",
  // component: "manageSiteConfiguration",
  component: 'tabPagesContainer',
  tabPagesConfig: [{
    name: "manageDepartmentConfig",
    menuName: 'management.DepartmentConfiguration', //部门管理
    component: "manageDepartmentConfigTab",
    sortNo: 1
  }, {
    name: "visualizationConfig",
    menuName: 'myCenter.Homepagecustom',
    component: "visualizationConfigTab",
    sortNo: 2
  }, {
    name: "manageBigScreenConfig",
    menuName: 'management.BigScreenConfiguration',
    component: "manageBigScreenConfigTab",
    sortNo: 3
  }],
  menuName: "navMenu.siteConfig", //站点配置
  sortNo: 6,
  meta: {
    "requireAuth": true,
    "indexMenuActive": "/manage/sitemanage",
    "childMenuActive": "/manage/sitemanage/siteconfig"
  }
}

//可视化
const visualization = {
  name: 'visualization',
  path: '/visualization',
  component: "visualization",
  sortNo: 1,
  routerParentNode: "root",
  permissionParent: "manageSiteConfiguration",
  meta: {
    "requireAuth": true
  }
}

//系统日志
const manageLog = {
  parent: "siteManage",
  name: 'manageLog',
  path: 'log',
  menuPath: "/manage/sitemanage/log",
  // component: "manageLog",
  component: 'tabPagesContainer',
  tabPagesConfig: [{
    name: "manageOperationLog",
    menuName: 'management.OperationLog', //操作日志
    component: "manageOperationLogTab",
    sortNo: 1
  }, {
    name: "manageMapServiceLog",
    menuName: 'management.MapServiceLog',
    component: "manageMapServiceLogTab",
    sortNo: 2
  }, {
    name: "manageFunctionServiceLog",
    menuName: 'management.FunctionSserviceLog',
    component: "manageFunctionServiceLogTab",
    sortNo: 3
  }],
  menuName: "navMenu.log", //系统日志
  sortNo: 8,
  meta: {
    "requireAuth": true,
    "indexMenuActive": "/manage/sitemanage",
    "childMenuActive": "/manage/sitemanage/log"
  }
}

//服务器管理
const manageServer = {
  parent: "siteManage",
  name: 'manageServer',
  path: 'manageserver',
  menuPath: "/manage/sitemanage/manageserver",
  // component: "manageServer",
  component: 'tabPagesContainer',
  tabPagesConfig: [{
    name: "manageServer",
    menuName: 'management.ServerManager', //服务器管理
    component: "manageServerTab",
    sortNo: 1
  }],
  menuName: "management.ServerManager", //服务器管理
  sortNo: 9,
  meta: {
    "requireAuth": true,
    "indexMenuActive": "/manage/sitemanage",
    "childMenuActive": "/manage/sitemanage/manageserver"
  }
}

//参数管理
const manageParamsConfig = {
  parent: "siteManage",
  name: 'manageParamsConfig',
  path: 'manageparams',
  menuPath: "/manage/sitemanage/manageparams",
  // component: "manageParamsConfig",
  component: 'tabPagesContainer',
  tabPagesConfig: [{
    name: "manageParamsConfig",
    menuName: 'management.parameterManager', //参数管理
    component: "manageParamsConfigTab",
    sortNo: 1
  }],
  menuName: "management.parameterManager", //参数管理
  sortNo: 10,
  meta: {
    "requireAuth": true,
    "indexMenuActive": "/manage/sitemanage",
    "childMenuActive": "/manage/sitemanage/manageparams"
  }
}

export {
  siteManage,
  organization,
  catalog,
  basicConfiguration,
  visualization,
  manageSiteConfiguration,
  serviceMonitoring,
  manageLog,
  manageServer,
  manageParamsConfig
}