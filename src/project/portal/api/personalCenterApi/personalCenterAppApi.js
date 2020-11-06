
import { post, get } from 'common/config/server/server.js';

const personalCenterAppApi = {
  getListService(params, config) {  //我注册的应用列表
    return get('/api/cos3-portal-manager/app/select/getListService', params, config);
  },
  getAppHide(params, config) {  //注册应用隐藏
    return get('/api/cos3-portal-manager/app/update/getAppHide', params, config);
  },
  getAppShow(params, config) {  //注册应用显示
    return get('/api/cos3-portal-manager/app/update/getAppShow', params, config);
  },
  deleteAppService(params, config) {  //注册应用删除
    return post('/api/cos3-portal-manager/app/delete/deleteAppService', params, config);
  },
  saveAppService(params, config) {  //新增应用 
    return post('/api/cos3-portal-manager/app/add/saveAppService', params, config);
  },
  selectPermissionById(params, config) {  //获取当前应用的共享信息 
    return get('/api/cos3-portal-manager/app/select/selectPermissionById', params, config);
  },
  //获取应用分类列表
  getAppCategory(params, config) {  //获取当前应用的共享信息 
    return get('/api/cos3-portal-manager/app/select/getAppCategory', params, config);
  },
  //GET /app/get/selectById根据id查询应用
  selectById(params, config) {  //获取当前应用的共享信息 
    return get('/api/cos3-portal-manager/app/get/selectById', params, config);
  },
}
export default personalCenterAppApi;
