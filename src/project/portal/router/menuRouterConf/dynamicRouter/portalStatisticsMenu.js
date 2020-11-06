const portalStatistics = {
  parent: "siteManage",
  name: "portalStatistics",
  path: "/portalStatistics",
  component: "portalStatistics",
  routerParentNode: 'root',
  menuName: 'portalStatistics.PortalStatistics',
  indexMenuNoChild: true,
  sortNo: 7,
  meta: {
    "indexMenuActive": "/portalStatistics",
    "title": "portalStatistics.PortalStatistics",
    "needI18N": false
  },
  redirect: "/portalOverview"
}

const portalOverview = {
  name: "portalOverview",
  path: "/portalOverview",
  component: "portalOverview",
  parent: 'portalStatistics',
  permissionParent: 'portalStatistics',
  sortNo: 1,
  meta: {
    "indexMenuActive": "/portalOverview"
  }
}

const portalTotalResources = {
  name: "portalTotalResources",
  path: "/portalTotalResources",
  component: "portalTotalResources",
  parent: 'portalStatistics',
  permissionParent: 'portalStatistics',
  sortNo: 2,
  meta: {
    "indexMenuActive": "/portalTotalResources"
  }
}

const portalNewResources = {
  name: "portalNewResources",
  path: "/portalNewResources",
  component: "portalNewResources",
  parent: 'portalStatistics',
  permissionParent: 'portalStatistics',
  sortNo: 3,
  meta: {
    "indexMenuActive": "/portalNewResources"
  }
}

const portalLatestResources = {
  name: "portalLatestResources",
  path: "/portalLatestResources",
  component: "portalLatestResources",
  parent: 'portalStatistics',
  permissionParent: 'portalStatistics',
  sortNo: 4,
  meta: {
    "indexMenuActive": "/portalLatestResources"
  }
}

const portalHottestResource = {
  name: "portalHottestResource",
  path: "/portalHottestResource",
  component: "portalHottestResource",
  parent: 'portalStatistics',
  permissionParent: 'portalStatistics',
  sortNo: 5,
  meta: {
    "indexMenuActive": "/portalHottestResource"
  }
}

const portalMapAccess = {
  name: "portalMapAccess",
  path: "/portalMapAccess",
  component: "portalMapAccess",
  parent: 'portalStatistics',
  permissionParent: 'portalStatistics',
  sortNo: 6,
  meta: {
    "indexMenuActive": "/portalMapAccess"
  }
}

const portalDataAccess = {
  name: "portalDataAccess",
  path: "/portalDataAccess",
  component: "portalDataAccess",
  parent: 'portalStatistics',
  permissionParent: 'portalStatistics',
  sortNo: 7,
  meta: {
    "indexMenuActive": "/portalDataAccess"
  }
}

const portalFunctionAccess = {
  name: "portalFunctionAccess",
  path: "/portalFunctionAccess",
  component: "portalFunctionAccess",
  parent: 'portalStatistics',
  permissionParent: 'portalStatistics',
  sortNo: 8,
  meta: {
    "indexMenuActive": "/portalFunctionAccess"
  }
}

const portalAppAccess = {
  name: "portalAppAccess",
  path: "/portalAppAccess",
  component: "portalAppAccess",
  parent: 'portalStatistics',
  permissionParent: 'portalStatistics',
  sortNo: 9,
  meta: {
    "indexMenuActive": "/portalAppAccess"
  }
}

const portalFileDownloadAccess = {
  name: "portalFileDownloadAccess",
  path: "/portalFileDownloadAccess",
  component: "portalFileDownloadAccess",
  parent: 'portalStatistics',
  permissionParent: 'portalStatistics',
  sortNo: 10,
  meta: {
    "indexMenuActive": "/portalFileDownloadAccess"
  }
}

const userStatistics = {
  name: "userStatistics",
  path: "/userStatistics",
  component: "userStatistics",
  parent: 'portalStatistics',
  permissionParent: 'portalStatistics',
  sortNo: 11,
  meta: {
    "indexMenuActive": "/userStatistics"
  }
}

const portalKEYAccess = {
  name: "portalKEYAccess",
  path: "/portalKEYAccess",
  component: "portalKEYAccess",
  parent: 'portalStatistics',
  permissionParent: 'portalStatistics',
  sortNo: 12,
  meta: {
    "indexMenuActive": "/portalKEYAccess"
  }
}

const userTotalStatistics = {
  name: "userTotalStatistics",
  path: "/userTotalStatistics",
  component: "userTotalStatistics",
  parent: 'portalStatistics',
  permissionParent: 'portalStatistics',
  sortNo: 13,
  meta: {
    "indexMenuActive": "/userTotalStatistics"
  }
}

export {
  portalStatistics,
  portalOverview,
  portalMapAccess,
  userStatistics,
  portalFunctionAccess,
  portalDataAccess,
  portalFileDownloadAccess,
  portalAppAccess,
  portalKEYAccess,
  portalTotalResources,
  portalNewResources,
  portalLatestResources,
  portalHottestResource,
  userTotalStatistics
}