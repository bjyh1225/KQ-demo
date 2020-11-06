const service = {
    name: "service",
    path: "/service",
    component: "service",
    defaultDisplay: true,
    isIndexMenu: true,
    menuName: 'navMenu.serviceCenter', //服务中心
    sortNo: 2
}

const serviceMap = {
    parent: "service",
    name: 'serviceMap',
    path: 'map',
    menuPath: "/service/map",
    component: "serviceMap",
    defaultDisplay: true,
    isIndexMenu: true,
    menuName: 'navMenu.mapService', //地图服务
    sortNo: 1,
    meta: {
        "indexMenuActive": "/service/map"
    }
}

const serviceData = {
    parent: "service",
    name: 'serviceData',
    path: 'data',
    menuPath: "/service/data",
    component: "serviceData",
    defaultDisplay: true,
    isIndexMenu: true,
    menuName: 'navMenu.dataService', //数据服务
    sortNo: 2,
    meta: {
        "indexMenuActive": "/service/data"
    }
}

const serviceFunction = {
    parent: "service",
    name: 'serviceFunction',
    path: 'function',
    menuPath: "/service/function",
    component: "serviceFunction",
    defaultDisplay: true,
    isIndexMenu: true,
    menuName: 'navMenu.functionalService', //功能服务
    sortNo: 3,
    meta: {
        "indexMenuActive": "/service/function"
    }
}

const serviceScene = {
    parent: "service",
    name: 'serviceScene',
    path: 'scene',
    menuPath: "/service/scene",
    component: "serviceScene",
    defaultDisplay: true,
    isIndexMenu: true,
    menuName: 'navMenu.threeDServices', //三维服务
    sortNo: 4,
    meta: {
        "indexMenuActive": "/service/scene"
    }
}

const serviceDatacenter = {
    parent: "service",
    name: 'serviceDatacenter',
    path: 'datacenter',
    menuPath: "/service/datacenter",
    component: "serviceDatacenter",
    defaultDisplay: true,
    isIndexMenu: true,
    menuName: 'navMenu.Datacenter', //数据中心
    sortNo: 5,
    meta: {
        "indexMenuActive": "/service/datacenter"
    }
}

const serviceFile = {
    parent: "service",
    name: 'serviceFile',
    path: 'file',
    menuPath: "/service/file",
    component: "serviceFile",
    defaultDisplay: true,
    isIndexMenu: true,
    menuName: 'navMenu.file', //附件
    sortNo: 6,
    meta: {
        "indexMenuActive": "/service/file"
    }
}



export {
    service,
    serviceMap,
    serviceFunction,
    serviceScene,
    serviceData,
    serviceFile,
    serviceDatacenter
}