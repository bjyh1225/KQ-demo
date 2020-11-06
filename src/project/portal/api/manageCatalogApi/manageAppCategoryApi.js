import { get, post } from 'common/config/server/server.js';

const manageAppCategoryApi = {
  //获取应用分类列表
  getAppCategory(config) {
    return get('/api/cos3-portal-manager/app/select/getAppCategory', {}, config);
  },
  //获取当前应用分类信息
  selectAppCategoryById(params, config) {
    return get('/api/cos3-portal-manager/app/select/selectAppCategoryById', params, config);
  },
  //删除应用分类 
  deleteAppCategory(params, config) {
    return post('/api/cos3-portal-manager/app/delete/deleteAppCategory', params, config);
  },
  //添加应用分类  
  saveAppCategory(params, config) {
    return post('/api/cos3-portal-manager/app/save/saveAppCategory', params, config);
  },
  //验证应用分类是否唯一 
  checkTypeName(params, config) {
    return post('/api/cos3-portal-manager/app/select/getAppCategoryOnly', params, config || { loadingText: vm.$t('common.checking') });
  },
  // 分类拖动整体保存
  saveServiceCategoryAll(params, config) {
    return post('/api/cos3-portal-manager/app/save/saveServiceCategoryAll', params, config);
  },
}

export default manageAppCategoryApi;