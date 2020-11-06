import { post, get } from 'common/config/server/server.js';

const personalFunctionServiceApi = {
  getserviceListByMe(params, config) {
    return get('/api/cos3-portal-manager/functionService/select/getserviceListByMe', params, config);
  },
  getFSCategory(params, config) {
    return post('/api/cos3-portal-manager/functionService/select/getFSCategory', params, config);
  },
  getMeServiceShow(params, config) {
    return post('/api/cos3-portal-manager/functionService/update/getMeServiceShow', params, config);
  },
  deleteFunctionService(params, config) {
    return post('/api/cos3-portal-manager/functionService/delete/deleteFunctionService', params, config);
  },
  getMeServiceHide(params, config) {
    return post('/api/cos3-portal-manager/functionService/update/getMeServiceHide', params, config);
  },
  saveFunctionServices(params, config) {
    return post('/api/cos3-portal-manager/functionService/add/saveFunctionServices', params, config);
  },
  selectPermissionById(params, config) { //获取当前服务的共享信息
    return post('/api/cos3-portal-manager/functionService/select/selectPermissionById', params, config);
  },
  //验证服务是否重复
  getServiceUrlOnly(params, config) { //获取当前服务的共享信息
    return post('/api/cos3-portal-manager/functionService/select/getServiceUrlOnly', params, config);
  },
}
export default personalFunctionServiceApi;
