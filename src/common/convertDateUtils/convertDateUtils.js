import {dateFormat} from '@/utils/dateUtils.js'
export function convertDateUtils(data){
  const keys=['C_CREATE_TIME','C_UPDATE_TIME','C_TIME','COLLECTION_TIME','C_AUDIT_TIME','TOP_TIME','CONLLECTIONTIME'];
  if(typeof data=='object'&&!Array.isArray(data)){
    for(let value of keys){
      if(data[value]){
        data[value]=dateFormat("YYYY-mm-dd HH:MM:SS",data[value]);
      }
    }
  }
  else if(typeof data=='object'&&Array.isArray(data)){
    data.forEach(item=>{
      for(let value of keys){
        if(item[value]){
          item[value]=dateFormat("YYYY-mm-dd HH:MM:SS",item[value]);
        }
      }
    })
  }
  if(data.rows&&Array.isArray(data.rows)){
    data.rows.forEach(item=>{
      for(let value of keys){
        if(item[value]){
          item[value]=dateFormat("YYYY-mm-dd HH:MM:SS",item[value]);
        }
      }
    })
  }
}