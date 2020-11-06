import {post,get} from 'common/config/server/server.js';

const manageOperationLogApi = {        
  getLogsList(params,config){
    return get('/api/cos3-portal-manager/logs/select/getLogsList',params,config);  
  }
}

export default manageOperationLogApi;