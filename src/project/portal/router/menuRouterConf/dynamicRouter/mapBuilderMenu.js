const mapDrafting = {
  name: "mapDrafting",
  path: "/mapDrafting",
  component: "mapDrafting",
  defaultDisplay: true,
  isIndexMenu: true,
  menuName: 'navMenu.mapBuilder',//制图
  sortNo: 3,
  meta: {
    "indexMenuActive": "/mapDrafting"
  }
}

const mapBuilder = {
  parent: "mapDrafting",
  name: "mapBuilder",
  path: "/mapbuilder",
  component: "mapBuilder",
  defaultDisplay: true,
  menuPath: "/mapbuilder",
  menuName: 'navMenu.mapBuilder',//地图制图
  sortNo: 1,
  routerParentNode: "root",
  meta: {
    "indexMenuActive": "/mapbuilder"
  }
}
export {
  mapDrafting,
  mapBuilder
}