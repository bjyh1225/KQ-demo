/**
 * group 分组
 * 引用路径 import {group} from '@/utils/group.js'
 * 调用方式 group(params);
 * params:{
 * source:需分组的数据，类型：必须数组
 * groupRules:分组规则，仅支持字符串或字符串数组
 * callback：回调函数
 * sep：多字段分组时候，使用的分隔符，默认是_
 * }
 */
export function group(params){
  var {source,groupRules,callback,sep}=params;
  if(!sep){
    sep="_"
  }
  if(!(source instanceof Array)){
    console.error('需传入数组');
    return false;
  }
  else{
    var cloneData=JSON.parse(JSON.stringify(source));
    var groupMap={};
    if(typeof groupRules==='string'){
      cloneData.forEach(item=>{
        if(!groupMap[item[groupRules]]){
          groupMap[item[groupRules]]=[];
          groupMap[item[groupRules]].push(item);
        }
        else{
          groupMap[item[groupRules]].push(item);
        }
      })
    }
    else if(typeof groupRules==='object'&&groupRules instanceof Array){
      cloneData.forEach(item=>{
        var groupkey="";
        groupRules.forEach(g=>{
          if(!groupkey){
            groupkey=groupkey+item[g];
          }
          else{
            groupkey=groupkey+sep+item[g];
          }
        })
        if(!groupMap[groupkey]){
          groupMap[groupkey]=[];
          groupMap[groupkey].push(item);
        }
        else{
          groupMap[groupkey].push(item);
        }
      })
    }
    else{
      console.error('暂不支持该分组规则的解析');
      return false;
    }
    if(callback&&typeof callback==='function'){
      callback(groupMap);
    }
    return groupMap;
  }
}