import {post} from 'common/config/server/server.js';

const loginApi = {        
  login (params,config){    
    return post('/serverManager/server-manager/UserManager/ajaxLogin',params,config);  
  },
  logout (config){    
    return post('/serverManager/server-manager/UserManager/logout',{},config);  
  }
}

export default loginApi;