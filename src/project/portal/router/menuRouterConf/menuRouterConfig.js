/*动态路由，不限于本项目使用且受权限控制 */
import * as manageMenu from './dynamicRouter/manageMenu.js'
import * as serviceCenterMenu from './dynamicRouter/serviceCenterMenu.js'
import * as baseMenu from './dynamicRouter/baseMenu.js'
import * as personalCenterMenu from './dynamicRouter/personalCenterMenu.js'
import * as portalStatisticsMenu from './dynamicRouter/portalStatisticsMenu.js'
import * as groupMenu from './dynamicRouter/groupMenu.js'
import * as siteManageMenu from './dynamicRouter/siteManageMenu.js'
import * as appMenu from './dynamicRouter/appMenu.js'
import * as sceneMenu from './dynamicRouter/sceneMenu.js'
import * as mapBuilderMenu from './dynamicRouter/mapBuilderMenu.js'
import * as dashBoardMenu from './dynamicRouter/dashBoardMenu.js'

export default {
  ...manageMenu,
  ...serviceCenterMenu,
  ...baseMenu,
  ...personalCenterMenu,
  ...portalStatisticsMenu,
  ...groupMenu,
  ...siteManageMenu,
  ...appMenu,
  ...sceneMenu,
  ...mapBuilderMenu,
  ...dashBoardMenu
}

