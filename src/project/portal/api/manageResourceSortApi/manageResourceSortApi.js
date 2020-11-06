import { post, get } from 'common/config/server/server.js';

const manageResourceSortApi = {
  /*资源分类-API*/
  //新增资源分类
  saveResoureCategory(params, config) {
    return post('/api/cos3-portal-manager/resource/add/saveResoureCategory', params, config);
  },
  //删除分类
  delResoureCategory(params, config) {
    return post('/api/cos3-portal-manager/resource/delete/delResoureCategory', params, config);
  },
  //资源分类列表
  getResoureCategoryList(params, config) {
    return get('/api/cos3-portal-manager/resource/select/getResoureCategoryList', params, config);
  },
  //资源分类隐藏
  getResCategoryHide(params, config) {
    return get('/api/cos3-portal-manager/resource/update/getResCategoryHide', params, config);
  },
  //资源分类显示
  getResCategoryShow(params, config) {
    return get('/api/cos3-portal-manager/resource/update/getResCategoryShow', params, config);
  },
  //验证资源类别是否唯一
  validateResCategory(params, config) {
    return get('/api/cos3-portal-manager/resource/update/validateResCategory', params, config);
  },
  //根据id查询资源类别信息
  selectById(params, config) {
    return get('/api/cos3-portal-manager/resource/get/selectById', params, config);
  },
  //资源分类列表无分页
  getResoureCategoryListNotPage(params, config) {
    return get('/api/cos3-portal-manager/resource/select/getResoureCategoryListNotPage', params, config);
  },
}

export default manageResourceSortApi;