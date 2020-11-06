const dashBoard = {
  name: "dashBoard",
  path: "/dashBoard",
  component: "dashBoard",
  defaultDisplay: true,
  isIndexMenu: true,
  menuName: 'navMenu.bigScreen',//大屏
  sortNo: 5,
  meta: {
    "indexMenuActive": "/dashBoard"
  }
}

const dashBoardBuilder = {
  parent: "dashBoard",
  name: "dashBoardBuilder",
  path: "/dashBoardBuilder",
  defaultDisplay: true,
  component: "dashBoardBuilder",
  menuPath: "/dashBoardBuilder",
  menuName: 'navMenu.bigScreen',//地图大屏
  sortNo: 1,
  routerParentNode: "root",
  meta: {
    "indexMenuActive": "/dashBoardBuilder"
  }
}
// const dashBoard = {
//   name: "dashBoard",
//   path: "/dashboard",
//   component: "dashBoard",
//   isIndexMenu: true,
//   menuName: 'navMenu.bigScreen',//地图大屏
//   routerParentNode: "root",
//   sortNo: 3,
//   meta: {
//     "requireAuth": true,
//     "indexMenuActive": "/dashBoard"
//   }
// }
export {
  dashBoard,
  dashBoardBuilder
}