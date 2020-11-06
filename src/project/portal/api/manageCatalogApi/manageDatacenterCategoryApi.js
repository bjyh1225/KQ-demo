import { get, post } from 'common/config/server/server.js';

const manageDatacenterCategoryApi = {
  // 获取数据分类列表
  getDataCategory(config) {
    return get('/api/cos3-portal-manager/data/select/getDataCategory', {}, config);
  },
  // 获取当前数据分类信息
  selectDataCategoryById(params, config) {
    return get('/api/cos3-portal-manager/data/select/selectDataCategoryById', params, config);
  },
  //删除数据分类
  deleteDataCategory(params, config) {
    return post('/api/cos3-portal-manager/data/delete/deleteDataCategory', params, config);
  },
  //添加数据分类
  saveDataCategory(params, config) {
    return post('/api/cos3-portal-manager/data/save/saveDataCategory', params, config);
  },
  //验证数据分类是否唯一
  checkTypeName(params, config) {
    return post('/api/cos3-portal-manager/data/select/getDataCategoryOnly', params, config || { loadingText: vm.$t('common.checking') });
  },
  // POST 分类拖动整体保存
  saveServiceCategoryAll(params, config) {
    return post('/api/cos3-portal-manager/data/save/saveServiceCategoryAll', params, config);
  },
}

export default manageDatacenterCategoryApi;