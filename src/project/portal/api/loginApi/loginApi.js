import {post} from 'common/config/server/server.js';

const loginApi = {        
  login (params,config) {    
    return post('/api/login',params,config);  
  },
  logout(config){
    return post('/api/logout',{},config); 
  }
}

export default loginApi;