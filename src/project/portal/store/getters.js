const getters = {
  username: state => state.user.username,
  userInfo: state => state.user.userInfo,
  headImg: state => state.user.headImg,
  isLogin:state=>state.user.isLogin,
  themeCode:state => state.theme.themeCode,
  routers:state=>state.menu.routers,
  menus:state=>state.menu.menus,
  functionAuthority:state=>state.menu.functionAuthority,
  tabPagesConfig:state=>state.menu.tabPagesConfig,
  activeMenuStatus:state=>state.menu.activeMenuStatus,
  language:state=>state.language.language,
  messageNum:state=>state.message.messageNum,
  messageAction:state=>state.message.messageAction,
  visualizationComponents:state=>state.visualization.visualizationComponents,
  visualizationHeadInfo:state=>state.visualization.visualizationHeadInfo,
  commonTimeStamp:state=>state.common.commonTimeStamp,
  commonEventObject:state=>state.common.commonEventObject,
  commonParams:state=>state.common.commonParams,
  commonEventType:state=>state.common.commonEventType,
  commonSource:state=>state.common.commonSource,
  homePageHeaderHeight:state=>state.homepage.homePageHeaderHeight
}
export default getters