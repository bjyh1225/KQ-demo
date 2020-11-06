import { get, post } from 'common/config/server/server.js';

const manageUserApi = {
  getPageList(params, config) {
    return get('/api/cos3-portal-manager/personnel/select/getPageList', params, config);
  },
  //获取组织和职位数据
  getOrgAndPostList(params, config) {
    return get('/api/cos3-portal-manager/personnel/select/getOrgAndPostList', params, config);
  },
  save(params, config) {
    return post('/api/cos3-portal-manager/personnel/add/save', params, config);
  },
  //效验登录名
  validateLoginName(params, config) {
    return get('/api/cos3-portal-manager/personnel/add/validateLoginName', params, config || { loadingText: vm.$t('common.checking') });
  },
  //效验手机号
  validatePhone(params, config) {
    return get('/api/cos3-portal-manager/personnel/add/validatePhone', params, config || { loadingText: vm.$t('common.checking') });
  },
  //删除用户
  batchDelPersonnelByIds(params, config) {
    return get('/api/cos3-portal-manager/personnel/delete/batchDelPersonnelByIds', params, config);
  },
  getPersonnelById(params, config) {
    return get('/api/cos3-portal-manager/personnel/select/getPersonnelById', params, config);
  },
  updateStatus(params, config) {
    return get('/api/cos3-portal-manager/personnel/update/updateStatus', params, config);
  },
  //将人员移动至另一个组织机构
  movePersonnel(params, config) {
    return get('/api/cos3-portal-manager/personnel/move/movePersonnel', params, config);
  },
  //重置密码为系统默认
  resetPassword(params, config) {
    return get('/api/cos3-portal-manager/personnel/update/resetPassword', params, config);
  },
  //判断用户是否登录或登录过期
  getCurrentUserStatus(params, config) {
    return get('/api/cos3-portal-manager/personnel/select/getCurrentUserStatus', params, config);
  },
  //指定或取消机构领导任命
  updateOrgLeader(params, config) {
    return post('/api/cos3-portal-manager/personnel/update/updateOrgLeader', params, config);
  }
}

export default manageUserApi;