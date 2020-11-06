import { post, get } from 'common/config/server/server.js';

const manageRole = {
  getRolesByPage(params, config) {
    return get('/api/cos3-portal-manager/role/select/getRolesByPage', params, config);
  },
  save(params, config) {
    return post('/api/cos3-portal-manager/role/add/save', params, config);
  },
  deleteById(params, config) {
    return post('/api/cos3-portal-manager/role/delete/batchDeleteByIds', params, config);
  },
  getRolesByIds(params, config) {
    return get('/api/cos3-portal-manager/role/select/getRolesByIds', params, config);
  },
  validateCode(params, config) {
    return get('/api/cos3-portal-manager/role/select/validateCode', params, config || {loadingText:vm.$t('common.checking')});
  },
  getAllPermission(params, config) {
    return get('/api/cos3-portal-manager/permission/select/getAllPermission', params, config);
  },
  saveRolePermissionByIds(params, config) {
    return post('/api/cos3-portal-manager/role/connectd/saveRolePermissionByIds', params, config);
  },
  getHasNoConnectPerson(params, config) {
    return post('/api/cos3-portal-manager/role/connectd/getHasNoConnectPerson', params, config);
  },
  getHasConnectPerson(params, config) {
    return post('/api/cos3-portal-manager/role/connectd/getHasConnectPerson', params, config);
  },
  saveRolePersonnel(params, config) {
    return post('/api/cos3-portal-manager/role/connectd/saveRolePersonnel', params, config);
  },
  getHasConnectPermission(params, config) {
    return get('/api/cos3-portal-manager/role/connectd/getHasConnectPermission', params, config);
  }
}

export default manageRole;