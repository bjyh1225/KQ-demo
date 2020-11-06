import {get,post} from 'common/config/server/server.js';

const visualizationApi = {
  //保存
  saveSysParamConfigure(params, config) {
    return post('/api/cos3-portal-manager/paramConfigure/add/saveSysParamConfigure', params, config);
  },
  //获取
  getSysParamConfigureByKey(params, config) {
    return get('/api/cos3-portal-manager/paramConfigure/select/getSysParamConfigureByKey', params, config);
  }
}
export default visualizationApi;
