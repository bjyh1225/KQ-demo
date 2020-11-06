const serverManagerIndex={
  name:"serverManagerIndex",
  path:"/index",
  component:"serverManagerIndexContent",
  defaultDisplay: true,
  isHomePage: true,
  isIndexMenu: true,
  menuName:"首页",
  sortNo: 1,
  meta: {
    indexMenuActive: "/index",
    isHomePage:true
  }
}

const serverManagerCluster={
  name:"serverManagerCluster",
  path:"/cluster",
  defaultDisplay: true,
  isIndexMenu: true,
  menuName:"集群管理",
  component:"serverManagerCluster",
  sortNo: 3,
  meta: {
    indexMenuActive: "/cluster"
  }
}

const serverManagerOnlineExample={
  name:"serverManagerOnlineExample",
  defaultDisplay: true,
  isIndexMenu: true,
  menuName:"在线示例",
  sortNo: 4,
  path:"http://27.17.43.14:9469/dist/examples/leaflet/examples.html#kService",
  externalLinksRouter:true
}

const serverManagerOnlineManual={
  name:"serverManagerOnlineManual",
  defaultDisplay: true,
  isIndexMenu: true,
  menuName:"在线手册",
  sortNo: 5,
  path:"http://27.17.43.14:9469/dist/docs/leaflet/index.html",
  externalLinksRouter:true
}

const serverManagerList={
  name:"serverManagerList",
  defaultDisplay: true,
  isIndexMenu: true,
  menuName:"服务管理",
  sortNo: 2,
  path:"/servermanage",
  component:"serverManagerList",
  meta: {
    indexMenuActive: "/servermanage"
  }
}

const dataManage={
  name:"dataManage",
  defaultDisplay: true,
  isIndexMenu: true,
  menuName:"数据管理",
  sortNo: 2,
  path:"/dataManage",
  component:"serverManagerDataManage",
  meta: {
    indexMenuActive: "/dataManage"
  }
}

export { 
  serverManagerIndex,
  // serverManagerOnlineExample,
  // serverManagerOnlineManual,
  serverManagerList,
  serverManagerCluster,
  dataManage
};
