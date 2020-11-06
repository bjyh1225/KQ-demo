import { post, get } from 'common/config/server/server.js';

const personalSceneServiceApi = {
  //获取当前服务的共享信息
  selectPermissionById(params, config) {
    return post('/api/cos3-portal-manager/sceneService/select/selectPermissionById', params, config);
  },
  //我注册的服务列表
  getserviceListByMe(params, config) {
    return get('/api/cos3-portal-manager/sceneService/select/getserviceListByMe', params, config);
  },
  //获取服务分类列表
  getServiceCategory(params, config) {
    return post('/api/cos3-portal-manager/sceneService/select/getServiceCategory', params, config);
  },
  //我注册的服务显示
  getMeServiceShow(params, config) {
    return post('/api/cos3-portal-manager/sceneService/update/getMeServiceShow', params, config);
  },
  //我注册的服务隐藏
  getMeServiceHide(params, config) {
    return post('/api/cos3-portal-manager/sceneService/update/getMeServiceHide', params, config);
  },
  //删除
  deletesceneService(params, config) {
    return post('/api/cos3-portal-manager/sceneService/delete/deletesceneService', params, config);
  },
  //新增服务
  savesceneService(params, config) {
    return post('/api/cos3-portal-manager/sceneService/add/savesceneService', params, config);
  },
  //验证3D服务是否重复
  getTypeAllListOnly(params, config) {
    return post('/api/cos3-portal-manager/sceneService/select/getTypeAllListOnly', params, config);
  },
}
export default personalSceneServiceApi;
