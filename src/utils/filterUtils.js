/**
 * filterTreeArrayByString 通过字符串过滤树状结构
 * 引用路径 import {filterTreeArrayByString} from '@/utils/filterUtils.js'
 * @param {Array} source -需过滤的数据
 * @param {String} filterString -需过滤的内容
 * @param {String} filterField -需过滤的字段
 * @param {String} children -定义子节点所在的字段名，默认值是children
 * @param {Boolean} isLike -是否模糊查询，默认值是true
 * @param {Boolean} isConcatParent -拼接变量是否拼接父层级结构，默认是true
 * @param {String} concatField -拼接变量后存放的变量名，默认是value，为了elementui控制使用，默认都会拼一个value
 * @param {function} filterHandle -个性过滤回调，返回值需要是true和false
 */
export function filterTreeArrayByString(source,filterString,filterField,children="children",isLike=true,isConcatParent=true,concatField="value",filterHandle){
  if(!source){
    return false;
  }
  let cloneData = JSON.parse(JSON.stringify(source));
  let result=[];
  filterTreeData(result,{},cloneData,filterString,filterField,children,isLike,isConcatParent,concatField,filterHandle);
  return result;
}

function filterTreeData(result,parent,source,filterString,filterField,children,isLike,isConcatParent,concatField,filterHandle){
  source.forEach(item=>{
    let status;
    //模糊搜索
    if(isLike){
      status=(item[filterField]==filterString||item[filterField].includes(filterString));
    }
    else{
      status=(item[filterField]==filterString);
    }
    //是否拼接父节点
    if(isConcatParent){
      if(parent[concatField]){
        item[concatField]=parent[concatField]+"/"+item[filterField];
      }
      else{
        if(parent[filterField]){
          item[concatField]=parent[filterField]+"/"+item[filterField];
        }
        else{
          item[concatField]=item[filterField];
        }
      }
    }
    else{
      item[concatField]=item[filterField];
    }
    //过滤判断
    if(filterHandle&&status){
      var rs=filterHandle(item,parent);
      if(typeof rs=='boolean'){
        status=rs;
      }
      else{
        status=false;
      }
    }
    if(status){
      result.push(item);
    }
    if(item[children]&&item[children].length>0){
      filterTreeData(result,item,item[children],filterString,filterField,children,isLike,isConcatParent,concatField,filterHandle);
    }
  })
}

/**
 * filterArrayByString 过滤一维数组
 * 引用路径 import {filterArrayByString} from '@/utils/filterUtils.js'
 * @param {Array} source -需过滤的数据
 * @param {String} filterString -需过滤的内容
 * @param {String} filterField -需过滤的字段
 * @param {Boolean} isLike -是否模糊查询，默认值true
 * @param {String} concatField -拼接变量后存放的变量名，默认是value，为了elementui控制使用，默认都会拼一个value
 */
export function filterArrayByString(source,filterString,filterField,isLike=true,concatField="value"){
  if(!source){
    return false;
  }
  let cloneData = JSON.parse(JSON.stringify(source));
  return cloneData.filter(item=>{
    item[concatField]=item[filterField];
    if(isLike){
      return item[filterField]==filterString||item[filterField].includes(filterString);
    }
    else{
      return item[filterField]==filterString;
    }
  })
}