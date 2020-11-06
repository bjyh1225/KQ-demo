import {get} from 'common/config/server/server.js';
import dictionaryKey from './dictionaryKey';

const dictionaryApi = {  
  //获取组织机构维度      
  getOrgDimension (config) {    
    return get('/api/cos3-portal-manager/dictionary/select/getDemensionByDicKeyAndValue', {dicKey:dictionaryKey.org_dimension},config);  
  },
  //获取岗位信息
  getOrgPost(config){
    return get('/api/cos3-portal-manager/dictionary/select/getAllDicItemListByDicKey', {dicKey:dictionaryKey.org_post},config);  
  }
}

export default dictionaryApi;