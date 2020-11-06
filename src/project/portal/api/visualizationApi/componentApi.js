import {post} from 'common/config/server/server.js';

const componentApi = {
  //最热服务
  selectServiceByHist(params, config) {
    return post('/api/cos3-portal-manager/kqservice/select/selectServiceByHist', params, config);
  },
  //最新服务
  selectServiceByTime(params, config) {
    return post('/api/cos3-portal-manager/kqservice/select/selectServiceByTime', params, config);
  }
}
export default componentApi;
