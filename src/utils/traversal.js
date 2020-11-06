/**
 * import {traversal} from '@/utils/traversal.js'
 * 遍历树结构
 * data:需要遍历的树结构,
 * childField:子节点字段名,
 * callback:回调函数，(item当前节点,parent父节点,callbackParmas回调需要的参数)
 * callbackParmas:回调函数需要传入的参数，
 * times:最大循环层数
 */
export function traversal(data,childField,callback,parentData,callbackParmas,loop=0,times=50){
  if(typeof data!="object"||!(data instanceof Array)){
    return false;
  }
  if(loop>times){
    return;
  }
  loop=loop+1;
  data.forEach((item,ix)=>{
    if(!parentData){
      callback(item,'root',callbackParmas,ix);
    }
    else{
      callback(item,parentData,callbackParmas,ix);
    }
    if(item[childField]&&item[childField].length>0){
      traversal(item[childField],childField,callback,item,callbackParmas,loop,times);
    }
  })
}