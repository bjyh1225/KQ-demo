import {post,get} from 'common/config/server/server.js';

const managePermission = {        
  getPermissionByPage (params,config) {    
    return get('/api/cos3-portal-manager/permission/select/getPermissionByPage',params,config);
  },
  save(params,config){
    return post('/api/cos3-portal-manager/permission/add/save',params,config);
  },
  deleteById(params,config){
    return post('/api/cos3-portal-manager/permission/delete/batchDeleteByIds',params,config);
  },
  getPermissionByIds(params,config){
    return get('/api/cos3-portal-manager/permission/select/getPermissionByIds',params,config);
  },
  validateCode(params,config){
    return get('/api/cos3-portal-manager/permission/select/validateCode',params,config||{loadingText:vm.$t('common.checking')});
  }
}

export default managePermission;