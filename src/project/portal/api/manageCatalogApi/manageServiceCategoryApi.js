import { get, post } from 'common/config/server/server.js';

const manageServiceCategoryApi = {
  getServiceCategory(config) {
    return post('/api/cos3-portal-manager/kqservice/select/getServiceCategory', {}, config);
  },
  deleteServiceCategory(params, config) {
    return get('/api/cos3-portal-manager/kqservice/delete/deleteServiceCategory', params, config);
  },
  selectServiceCategoryById(params, config) {
    return get('/api/cos3-portal-manager/kqservice/select/selectServiceCategoryById', params, config);
  },
  saveServiceCategory(params, config) {
    return post('/api/cos3-portal-manager/kqservice/save/saveServiceCategory', params, config);
  },
  checkTypeName(params, config) {
    return post('/api/cos3-portal-manager/kqservice/select/getKqKqServiceCategoryOnly', params, config || { loadingText: vm.$t('common.checking') });
  },
  //分类拖动整体保存
  saveServiceCategoryAll(params, config) {
    return post('/api/cos3-portal-manager/kqservice/save/saveServiceCategoryAll', params, config);
  },
}

export default manageServiceCategoryApi;