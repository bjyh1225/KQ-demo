/**
 * import {sortUtil} from '@/utils/sortUtil.js'
 * 对象数组组合排序工具函数(可支持升降序混排)
 * @param {Array<Object>} sortSource 需要排序的数组，类型必须是对象数组
 * @param {Array} sortParamsList 排序字段规则
 * 类型必须是一维数组['field1','field2']或者对象数组{filed:"",type:"asc/desc"}
 * @param {String} type 排序是方式，值必须是asc或者desc，默认是asc。
 * 如果是组合排序则不需要此字段
 */
export function sortUtil(sortSource,sortParamsList,type='asc'){
  if(!(sortSource instanceof Array)){
    console.error("排序数据源需传入数组类型")
    return false;
  }
  if(!(sortParamsList instanceof Array)){
    console.error("排序字段需传入数组类型")
    return false;
  }
  if(sortParamsList.length==0){
    console.error("需传入排序字段")
    return false;
  }
  var sortType="";
  if(typeof sortParamsList[0]=='string'){
    sortType="string";
  }
  else if(typeof sortParamsList[0]=='object'){
    sortType="object";
  }
  else{
    console.error("排序字段必须是字符串数组或者对象数组");
    return false;
  }
  try{
    sortSource.sort(
      compare(sortParamsList,type,0,sortType)
    ) 
  }
  catch(e){
    console.error(e);
  }
}

function compare(sortParamsList,type,index,sortType){
  return function(p,n){
    var prev,next;
    if(p&&n&&typeof p==='object'&&!(p instanceof Array)&&typeof n==='object'&&!(n instanceof Array)){
      if((sortType=='string'&&sortParamsList[index])||(sortType=='object'&&sortParamsList[index].field)){
        if(sortType=='object'){
          prev=p[sortParamsList[index].field];
          next=n[sortParamsList[index].field];
          type=sortParamsList[index].type;
        }
        else{
          prev=p[sortParamsList[index]];
          next=n[sortParamsList[index]];
        }
        if(prev===next){
          if(sortParamsList[index+1]){
            return compare(sortParamsList, type,index + 1,sortType)(p, n);
          } 
          else{
            return 0;
          }
        }
        if(typeof prev === typeof next){//类型相同
          if (type == "asc") {
            return prev < next ? -1 : 1;
          } else {
            return prev < next ? 1 : -1;
          }
        }
        else{//类型不同
          //转成数字比较
          if(!isNaN(Number(prev))&&!isNaN(Number(next))){
            prev=Number(prev);
            next=Number(next);
            if (type == "asc") {
              return prev < next ? -1 : 1;
            } else {
              return prev < next ? 1 : -1;
            }
          }
          //直接比较
          if (type == "asc") {
            return prev < next ? -1 : 1;
          } else {
            return prev < next ? 1 : -1;
          }
        }
      }
    }
  }
}