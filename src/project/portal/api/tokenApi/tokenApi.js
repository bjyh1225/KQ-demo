import {get} from 'common/config/server/server.js';

const tokenApi = {
  //禁用Token
  disableToke(params,config){
    return get('/api/cos3-portal-manager/theServer/select/disableToke',params,config);
  },
  //启用Token
  enableToke(params,config){
    return get('/api/cos3-portal-manager/theServer/select/enableToke',params,config);
  },
  //申请Token
  getToke(params,config){
    return get('/api/cos3-portal-manager/theServer/select/getToke',params,config);
  },
  //查询Token
  tokeList(params,config){
    return get('/api/cos3-portal-manager/theServer/select/tokeList',params,config);
  }
}
export default tokenApi;
