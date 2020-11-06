import { get, post } from 'common/config/server/server.js';

const manageSceneCategoryApi = {
  //验证服务分类是否唯一
  checkTypeName(params, config) {
    return post('/api/cos3-portal-manager/sceneService/select/getKqsceneServiceCategoryOnly', params, config || { loadingText: vm.$t('common.checking') });
  },
  //获取服务分类列表
  getServiceCategory(config) {
    return post('/api/cos3-portal-manager/sceneService/select/getServiceCategory', {}, config);
  },
  //获取当前服务分类信息
  selectServiceCategoryById(params, config) {
    return get('/api/cos3-portal-manager/sceneService/select/selectServiceCategoryById', params, config);
  },
  //删除服务分类
  deleteServiceCategory(params, config) {
    return get('/api/cos3-portal-manager/sceneService/delete/deleteServiceCategory', params, config);
  },
  //添加服务分类
  saveServiceCategory(params, config) {
    return post('/api/cos3-portal-manager/sceneService/save/saveServiceCategory', params, config);
  },
  // POST 分类拖动整体保存
  saveServiceCategoryAll(params, config) {
    return post('/api/cos3-portal-manager/sceneService/save/saveServiceCategoryAll', params, config);
  },
}

export default manageSceneCategoryApi;