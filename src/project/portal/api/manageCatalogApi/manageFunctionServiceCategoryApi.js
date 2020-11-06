import { get, post } from 'common/config/server/server.js';

const manageFunctionServiceCategoryApi = {
  getServiceCategory(config) {
    return post('/api/cos3-portal-manager/functionService/select/getFSCategory', {}, config);
  },
  deleteServiceCategory(params, config) {
    return get('/api/cos3-portal-manager/functionService/delete/deleteServiceCategory', params, config);
  },
  selectServiceCategoryById(params, config) {
    return get('/api/cos3-portal-manager/functionService/select/selectServiceCategoryById', params, config);
  },
  saveServiceCategory(params, config) {
    return post('/api/cos3-portal-manager/functionService/save/saveServiceCategory', params, config);
  },
  checkTypeName(params, config) {
    return post('/api/cos3-portal-manager/functionService/select/getFSCategoryOnly', params, config || { loadingText: vm.$t('common.checking') });
  },
  //分类拖动整体保存
  saveServiceCategoryAll(params, config) {
    return post('/api/cos3-portal-manager/functionService/save/saveServiceCategoryAll', params, config);
  },
}

export default manageFunctionServiceCategoryApi;