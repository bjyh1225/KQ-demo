import {post,get} from 'common/config/server/server.js';

const manageParamsApi = {   
  //查询参数列表     
  getParamConfigure(params,config){
    return get('/api/cos3-portal-manager/paramConfigure/select/getParamConfigure',params,config);  
  },
  //删除参数
  deleteById(params,config){
    return post('/api/cos3-portal-manager/paramConfigure/select/deleteById',params,config);  
  },
  //更新参数状态
  updateStatus(params,config){
    return post('/api/cos3-portal-manager/paramConfigure/select/updateStatus',params,config);  
  },
  //查询配置状态
  getStatusByKey(params,config){
    return get('/api/cos3-portal-manager/paramConfigure/get/getStatusByKey',params,config);  
  }
}

export default manageParamsApi;