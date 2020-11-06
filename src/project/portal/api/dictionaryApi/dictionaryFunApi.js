import {get,post} from 'common/config/server/server.js';

const dictionaryFunApi = {       
  getListByType(params,config) {    
    return get('/api/cos3-portal-manager/dictionary/select/getListByType',params,config);  
  },
  saveDicData(params,config){
    return post('/api/cos3-portal-manager/dictionary/add/saveDicData',params,config);  
  },
  removeDictionary(params,config){
    return post('/api/cos3-portal-manager/dictionary/delete/delDictionaryById',params,config);  
  },
  getDicById(params,config){
    return get('/api/cos3-portal-manager/dictionary/select/getDicById',params,config);
  },
  validparmkey(params,config){
    return get('/api/cos3-portal-manager/dictionary/select/validparmkey',params,config||{loadingText:vm.$t('common.checking')});   
  },
  getDicItemListByDicKey(params,config){
    return get('/api/cos3-portal-manager/dictionary/select/getDicItemListByDicKey',params,config);  
  },
  batchDelDicItem(params,config){
    return post('/api/cos3-portal-manager/dictionary/delete/batchDelDicItem',params,config);  
  },
  saveDicItem(params,config){
    return post('/api/cos3-portal-manager/dictionary/add/saveDicItem',params,config);  
  },
  validaDictionaryItemValue(params,config){
    return get('/api/cos3-portal-manager/dictionary/select/validaDictionaryItemValue',params,config||{loadingText:vm.$t('common.checking')});  
  }
}

export default dictionaryFunApi;