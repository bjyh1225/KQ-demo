
const app = {
  name: "app",
  path: "/app",
  component: "app",
  defaultDisplay: true,
  isIndexMenu: true,
  menuName: 'navMenu.appCenter',//应用
  sortNo: 6,
  meta: {
    "indexMenuActive": "/app"
  }
}

const appCenter = {
  parent: "app",
  name: "webAppBuilder",
  path: "/appbuilder",
  defaultDisplay: true,
  component: "webAppBuilder",
  menuPath: "/appbuilder",
  menuName: 'navMenu.appCenter',//应用定制
  sortNo: 1,
  routerParentNode: "root",
  meta: {
    "indexMenuActive": "/appbuilder"
  }
}
export {
  app,
  appCenter
}