import { post, get } from 'common/config/server/server.js';

const serviceDatacenterApi = {
  // 数据列表
  getDataList(params, config) {
    return get('/api/cos3-portal-manager/data/select/getDataList', params, config);
  },
  // 置顶数据
  saveDataTop(params, config) {
    return post('/api/cos3-portal-manager/data/add/saveDataTop', params, config);
  },
  // 取消置顶数据 
  deleteDataTop(params, config) {
    return post('/api/cos3-portal-manager/data/delete/deleteDataTop', params, config);
  },
  // 获取数据分类列表
  getDataCategory(params, config) {
    return get('/api/cos3-portal-manager/data/select/getDataCategory', params, config);
  },
  // 获取数据详情
  getDataDetails(params, config) {
    return post('/api/cos3-portal-manager/data/select/getDataDetails', params, config);
  },
  //收藏文件
  saveDataCollection(params, config) {
    return post('/api/cos3-portal-manager/dataCollection/add/saveDataCollection', params, config);
  },
  //取消收藏文件
  deletedataCollection(params, config) {
    return post('/api/cos3-portal-manager/dataCollection/delete/deletedataCollection', params, config);
  },
  //获取当前拥有的数据资源权限
  getDataServicePermissions(params, config) {
    return get('/api/cos3-portal-manager/data/select/getDataServicePermissions', params, config);
  },
  //数据关键字列表
  getDataKwList(params, config) {
    return get('/api/cos3-portal-manager/data/select/getDataKwList', params, config);
  }
}
export default serviceDatacenterApi;