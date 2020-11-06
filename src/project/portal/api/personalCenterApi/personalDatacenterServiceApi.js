
import { post, get } from 'common/config/server/server.js';

const personalDatacenterServiceApi = {
  //我注册的数据列表
  getDataListByUser(params, config) {
    return get('/api/cos3-portal-manager/data/select/getDataListByUser', params, config);
  },
  //获取数据分类列表
  getDataCategory(params, config) {
    return get('/api/cos3-portal-manager/data/select/getDataCategory', params, config);
  },
  //注册数据隐藏
  getDataHide(params, config) {
    return get('/api/cos3-portal-manager/data/update/getDataHide', params, config);
  },
  //注册数据显示
  getDataShow(params, config) {
    return get('/api/cos3-portal-manager/data/update/getDataShow', params, config);
  },
  //删除数据
  deleteData(params, config) {
    return post('/api/cos3-portal-manager/data/delete/deleteData', params, config);
  },
  //新增数据
  saveData(params, config) {
    return post('/api/cos3-portal-manager/data/add/saveData', params, config);
  },
  //获取当前数据的共享信息
  selectPermissionById(params, config) {
    return get('/api/cos3-portal-manager/data/select/selectPermissionById', params, config);
  },
  // 获取数据分类列表
  // getDataCategory(params, config) {
  //   return get('/api/cos3-portal-manager/data/select/getDataCategory', params, config);
  // },
}
export default personalDatacenterServiceApi;
