import { get, post } from 'common/config/server/server.js';

const webAppBuilderApi = {
  //打开列表      
  selectEditApps(params, config) {
    return get('/api/cos3-portal-manager/appbuilder/select/selectEditApps', params, config);
  },
  //查询服务目录
  getServiceCategory(config) {
    return post('/api/cos3-portal-manager/kqservice/select/getServiceCategory', {}, config);
  },
  //根据目录查询服务列表
  getListService(params, config) {
    return get('/api/cos3-portal-manager/kqservice/select/getListServiceApp', params, config);
  },
  //应用页面OGC服务列表
  getListServiceOGC(params, config) {
    return get('/api/cos3-portal-manager/kqservice/select/getListServiceAppOGC', params, config);
  },
  //根据服务地址获取图层
  getLayers(params, config) {
    return get('/api/cos3-portal-manager/appbuilder/get/getLayerData', params, config);
  },
  //保存应用
  saveApp(params, config) {
    return post('/api/cos3-portal-manager/app/add/saveAppService', params, config);
  },
  //打开一个应用
  selectById(params, config) {
    return get('/api/cos3-portal-manager/app/get/selectById', params, config);
  },
  //根据服务ID查询详情
  getServiceDetails(params, config) {
    return post('/api/cos3-portal-manager/kqservice/select/getServiceDetails', params, config);
  },
  //应用下载
  downloadById(params, config) {
    return get('/api/cos3-portal-manager/app/get/downloadById', params, config);
  },
  //获取当前应用的共享信息 
  selectPermissionById(params, config) {
    return get('/api/cos3-portal-manager/app/select/selectPermissionById', params, config);
  },
  //获取融合图层的子图层
  selectAllLayerData(params, config) {
    return get('/api/cos3-portal-manager/app/select/selectAllLayerData', params, config);
  },
  //获取单个图层的字段信息
  selectLayerData(params, config) {
    return get('/api/cos3-portal-manager/app/select/selectLayerData', params, config);
  },
  //根据用户id查询应用配置信息
  getByUserId(params, config) {
    return get('/api/cos3-portal-manager/app/get/getByUserId', params, config);
  }
}

export default webAppBuilderApi;