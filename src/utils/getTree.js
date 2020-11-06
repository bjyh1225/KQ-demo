/**
 * getTree 生成树算法
 * 引用路径 import {getTree} from '@/utils/getTree.js'
 * @param {Array} source -需要生成树的原数组
 * @param {String} id -用作比较的字段名，默认值id
 * @param {String} parentId -用作比较的父字段名，默认值parentId
 * @param {String} children -子节点挂载名,默认值children
 * @param {function} isRootRules -自定义根节点判断规则，默认规则parentId为空或0或undefined或未找到父节点
 * @param {function} childrenHandle -自定义子节点处理函数，比如处理排序问题
 * @param {Boolean} isNullChild -如果子节点为空，是否需要拼一个空[]进父节点中
 * @param {Boolean} isAddContact -是直接替换父节点的children值，还是进行push，默认是直接替换
 */

function deepClone(source){
  const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
  for (let keys in source) { // 遍历目标
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') { // 如果值是对象，就递归一下
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      } else { // 如果不是，就直接赋值
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}

export function getTree(source,id="id",parentId="parentId",children="children",isRootRules,childrenHandle,isNullChild=false,isAddContact=false){
  // let cloneData = JSON.parse(JSON.stringify(source));
  let cloneData = deepClone(source);
  let parentIdMap={};
  source.forEach(item=>{
    parentIdMap[item[id]]=item;
  })
  return cloneData.filter(father=>{  
    let branchArr = cloneData.filter(child=> father[id] == child[parentId]);
    if(childrenHandle){
      childrenHandle(branchArr,father,parentIdMap);
    }
    //选择增加入父节点的方式
    if(isAddContact){//push
      if(branchArr.length>0){
        if(father[children]&&father[children] instanceof Array){
          father[children]=father[children].concat(branchArr);
        }
        else{
          father[children]=branchArr;
        }
      }
      else{
        if(isNullChild){
          if(!father[children]||!(father[children] instanceof Array)){
            father[children]=[];
          }
        }
      }
    }
    else{//直接替换
      branchArr.length>0 ? father[children]=branchArr :isNullChild?father[children]=[]:''; 
    }
    //根节点判断
    if(isRootRules){
      return isRootRules(father);
    }
    else{
      return !father[parentId]||!parentIdMap[father[parentId]];
    }
  });
}