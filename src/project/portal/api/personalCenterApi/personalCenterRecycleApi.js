import { post, get } from 'common/config/server/server.js';

const personalCenterRecycleApi = {
  getRecyclebinCategoryList(params, config) {
    return get('/api/cos3-portal-manager/recyclebin/select/getRecyclebinCategoryList', params, config);
  },
  getRecyclebinDataList(params, config) {
    return get('/api/cos3-portal-manager/recyclebin/select/getRecyclebinDataList', params, config);
  },
  resourceReduction(params, config) {
    return post('/api/cos3-portal-manager/recyclebin/save/resourceReduction', params, config);
  },
  deleteResourceReduction(params, config) {
    return post('/api/cos3-portal-manager/recyclebin/delete/resourceReduction', params, config);
  }
}
export default personalCenterRecycleApi;
