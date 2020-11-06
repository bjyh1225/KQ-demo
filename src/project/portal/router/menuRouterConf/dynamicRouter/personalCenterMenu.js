const personalCenter = {
  parent: "manage",
  name: "personalCenter",
  path: "/manage/personalcenter",
  component: "personalCenter",
  isIndexMenu: true,
  afterLoginDefaultDisplay: true,
  menuName: 'navMenu.personalCenter',//个人中心
  sortNo: 6,
  meta: {
    "indexMenuActive": "/manage/personalcenter",
    "requireAuth": true
  },
  redirect: "/manage/personalcenter/resource",
  defaultFirstRedirect: true
}

const personalCenterResource = {
  parent: "personalCenter",
  name: "personalCenterResource",
  path: "resource",
  menuPath: "/manage/personalcenter/resource",
  // component: "personalCenterResource",
  component: 'tabPagesContainer',
  tabPagesConfig: [{
    name: "mapService",
    menuName: 'service.mapServices', //地图服务
    component: "personalCenterServiceTab",
    sortNo: 1
  }, {
    name: "dataService",
    menuName: 'portalStatistics.DataService',
    component: "personalDataServiceTab",
    sortNo: 2
  }, {
    name: "functionService",
    menuName: 'service.functionServices',
    component: "personalFunctionServiceTab",
    sortNo: 3
  }, {
    name: "sceneService",
    menuName: 'service.scene',
    component: "personalSceneServiceTab",
    sortNo: 4
  }, {
    name: "data",
    menuName: 'myCenter.Mydatas',
    component: "personalDatacenterServiceTab",
    sortNo: 5
  }, {
    name: "file",
    menuName: 'myCenter.MyFiles',
    component: "personalFileServiceTab",
    sortNo: 6
  }
  ],
  menuName: "myCenter.MyResources",//我的资源
  afterLoginDefaultDisplay: true,
  sortNo: 1,
  meta: {
    "indexMenuActive": "/manage/personalcenter",
    "requireAuth": true,
    "childMenuActive": "/manage/personalcenter/resource"
  }
}

const myDepartment = {
  parent: "personalCenter",
  name: "myDepartment",
  path: "mydepartment",
  menuPath: "/manage/personalcenter/mydepartment",
  component: "myDepartment",
  menuName: "management.myDepartment",//我的部门
  customValidationRule: function (currentConfigInfo, loginData, beforeStatus) {
    if (loginData.userinfo && loginData.userinfo.isLeader) {
      return true;
    }
    else {
      return false;
    }
  },
  sortNo: 2,
  meta: {
    "indexMenuActive": "/manage/personalcenter",
    "requireAuth": true,
    "childMenuActive": "/manage/personalcenter/mydepartment"
  }
}

const personalCenterCollection = {
  parent: "personalCenter",
  name: "personalCenterCollection",
  path: "collection",
  menuPath: "/manage/personalcenter/collection",
  component: "personalCenterCollection",
  menuName: "myCenter.MyFavorite",//我的收藏
  afterLoginDefaultDisplay: true,
  sortNo: 5,
  meta: {
    "indexMenuActive": "/manage/personalcenter",
    "requireAuth": true,
    "childMenuActive": "/manage/personalcenter/collection"
  }
}

const personalCenterRecycleBin = {
  parent: "personalCenter",
  name: "personalCenterRecycleBin",
  path: "recyclebin",
  menuPath: "/manage/personalcenter/recyclebin",
  component: "personalCenterRecycleBin",
  menuName: "myCenter.RecycleBin",//回收站
  afterLoginDefaultDisplay: true,
  sortNo: 6,
  meta: {
    "indexMenuActive": "/manage/personalcenter",
    "requireAuth": true,
    "childMenuActive": "/manage/personalcenter/recyclebin"
  }
}

const myMessage = {
  parent: "personalCenter",
  name: "personalCenterMessage",
  path: "message",
  menuPath: "/manage/personalcenter/message",
  component: "myMessage",
  menuName: "navMenu.myMessage",//我的消息
  afterLoginDefaultDisplay: true,
  sortNo: 7,
  meta: {
    "indexMenuActive": "/manage/personalcenter",
    "requireAuth": true,
    "childMenuActive": "/manage/personalcenter/message"
  }
}

const personalInformation = {
  parent: "personalCenter",
  name: "personalInformation",
  path: "information",
  menuPath: "/manage/personalcenter/information",
  component: "personalInformation",
  menuName: "myCenter.PersonalInformation",//个人信息
  afterLoginDefaultDisplay: true,
  sortNo: 8,
  meta: {
    "indexMenuActive": "/manage/personalcenter",
    "requireAuth": true,
    "childMenuActive": "/manage/personalcenter/information"
  }
}

const personalVerify = {
  parent: "personalCenter",
  name: "personalVerify",
  path: "myverify",
  menuPath: "/manage/personalcenter/myverify",
  component: "personalVerify",
  menuName: "management.MyReviews",//我的审核
  afterLoginDefaultDisplay: true,
  sortNo: 3,
  meta: {
    "indexMenuActive": "/manage/personalcenter",
    "requireAuth": true,
    "childMenuActive": "/manage/personalcenter/myverify"
  }
}

const personalApply = {
  parent: "personalCenter",
  name: "personalApply",
  path: "myapply",
  menuPath: "/manage/personalcenter/myapply",
  component: "personalApply",
  menuName: "management.MyApplications",//我的申请
  afterLoginDefaultDisplay: true,
  sortNo: 4,
  meta: {
    "indexMenuActive": "/manage/personalcenter",
    "requireAuth": true,
    "childMenuActive": "/manage/personalcenter/myapply"
  }
}



export {
  personalCenter,
  personalCenterResource,
  personalCenterCollection,
  myMessage,
  personalInformation,
  personalCenterRecycleBin,
  personalVerify,
  personalApply,
  myDepartment
}