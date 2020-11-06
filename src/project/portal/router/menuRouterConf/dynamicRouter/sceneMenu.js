const scene = {
  name: "scene",
  path: "/scene",
  component: "scene",
  isIndexMenu: true,
  defaultDisplay: true,
  menuName: 'navMenu.Scene',//场景
  sortNo: 4,
  meta: {
    "indexMenuActive": "/scene"
  }
}

const sceneBuilder = {
  parent: "scene",
  name: "sceneBuilder",
  path: "/sceneBuilder",
  component: "sceneBuilder",
  defaultDisplay: true,
  menuPath: "/sceneBuilder",
  menuName: 'navMenu.Scene',//场景定制
  sortNo: 1,
  routerParentNode: "root",
  meta: {
    "indexMenuActive": "/sceneBuilder"
  }
}

export {
  scene,
  sceneBuilder
}