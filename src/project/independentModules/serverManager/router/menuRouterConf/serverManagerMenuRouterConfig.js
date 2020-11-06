import * as indexMenu from './dynamicRouter/indexMenu.js'
import * as securityMenu from './dynamicRouter/serverManagerSecurityMenu.js'
import * as monitorMenu from './dynamicRouter/serverManagerMonitorMenu.js'
import * as logMenu from './dynamicRouter/serverManagerLogMenu.js'
export default {
  ...indexMenu,
  ...securityMenu,
  ...monitorMenu,
  ...logMenu
}