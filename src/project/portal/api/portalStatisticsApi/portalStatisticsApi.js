import { get, post } from 'common/config/server/server.js';

const portalStatisticsApi = {
  //获取当前用户数
  getOnlineUsersCount(params, config) {
    return get('/api/cos3-portal-manager/personnel/select/getOnlineUsersCount', params, config);
  },
  // 获取门户总览页面数据
  getStatistcsResourcesDataList(params, config) {
    return get('/api/cos3-portal-manager/Statistcs/select/getStatistcsResourcesDataList', params, config);
  },
  // GET /Statistcs/select/getDataServiceStatistcs获取数据服务在某个时间段访问次数统计数据
  getPortalDataServiceStatistcs(params, config) {
    return get('/api/cos3-portal-manager/Statistcs/select/getDataServiceStatistcs', params, config);
  },
  //获取地图在某个时间段访问次数统计数据
  getDataServiceStatistcs(params, config) {
    return get('/api/cos3-portal-manager/Statistcs/select/getMapServiceStatistcs', params, config);
  },
  //获取功能在某个时间段访问次数统计数据
  getDataFunctionServiceStatistcs(params, config) {
    return get('/api/cos3-portal-manager/Statistcs/select/getFunctionServiceStatistcs', params, config);
  },
  //获取应用在某个时间段访问次数统计数据
  getDataAppStatistcs(params, config) {
    return get('/api/cos3-portal-manager/Statistcs/select/getAppStatistcs', params, config);
  },
  //获取文件在某个时间段访问次数统计数据
  getDataFilesStatistcs(params, config) {
    return get('/api/cos3-portal-manager/Statistcs/select/getFilesStatistcs', params, config);
  },
  //查询我能看到的所有地图服务
  selectServiceAll(params, config) {
    return post('/api/cos3-portal-manager/kqservice/select/selectServiceAll', params, config);
  },
  //查询我能看到的所有功能服务
  selectFunctionServiceAll(params, config) {
    return post('/api/cos3-portal-manager/functionService/select/selectServiceAll', params, config);
  },
  //查询我能看到的所有app
  selectAppAll(params, config) {
    return post('/api/cos3-portal-manager/app/select/selectAppAll', params, config);
  },
  //查询我能看到的所有文件
  fileAll(params, config) {
    return post('/api/cos3-portal-manager/fileResource/select/selectServiceAll', params, config);
  },
  //查询我能看到的所有功能服务
  selectDataServiceAll(params, config) {
    return post('/api/cos3-portal-manager/dataService/select/selectServiceAll', params, config);
  },
  //获取新增资源数统计
  getSaveResourcesDataList(params, config) {
    return get('/api/cos3-portal-manager/Statistcs/select/getSaveResourcesDataList', params, config);
  },
  //获取最新资源统计
  getStatistcsResourceTime(params, config) {
    return get('/api/cos3-portal-manager/Statistcs/select/getStatistcsResourceTime', params, config);
  },
  //获取最热资源统计
  getStatistcsResourceHist(params, config) {
    return get('/api/cos3-portal-manager/Statistcs/select/getStatistcsResourceHist', params, config);
  },
  //获取资源总数统计
  getResourcesAllDataList(params, config) {
    return get('/api/cos3-portal-manager/Statistcs/select/getResourcesAllDataList', params, config);
  },
  //下载所有资源统计数据
  downloadResourcesListAll(params, config) {
    return get('/api/cos3-portal-manager/Statistcs/select/downloadResourcesListAll', params, config);
  },
  //下载新增资源统计数据
  downloadResourcesDataList(params, config) {
    return get('/api/cos3-portal-manager/Statistcs/select/downloadResourcesDataList', params, config);
  },
  //下载最热资源统计数据
  downloadResourcesListHist(params, config) {
    return get('/api/cos3-portal-manager/Statistcs/select/downloadResourcesListHist', params, config);
  },
  //下载最新资源统计数据
  downloadResourcesListTime(params, config) {
    return get('/api/cos3-portal-manager/Statistcs/select/downloadResourcesListTime', params, config);
  },
}
export default portalStatisticsApi;
