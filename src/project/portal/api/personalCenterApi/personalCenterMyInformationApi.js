import {get,post} from 'common/config/server/server.js';

const personalCenterMyInformationApi = {
  getAllInfoByPersonnelId(config) {
    return get('/api/cos3-portal-manager/personnel/select/getAllInfoByPersonnelId',{},config);
  },
  modifyPassword(params,config) {
    return post('/api/cos3-portal-manager/personnel/update/modifyPassword',params,config);
  },
  updatePersonnelInfo(params,config) {
    return post('/api/cos3-portal-manager/personnel/update/updatePersonnelInfo',params,config);
  },
  validatePassword(params,config) {
    return get('/api/cos3-portal-manager/personnel/add/validatePassword',params,config||{loadingText:vm.$t('common.checking')});
  }
  
}
export default personalCenterMyInformationApi;
