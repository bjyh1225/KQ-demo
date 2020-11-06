/* eslint-disable */
/**
  * objectArrayDifferences 对象数组差异对比
 * 引用路径 import {objectArrayDifferences} from '@/utils/differences.js'
 * @param {Array} oldArray 原始数组
 * @param {Array} newArray 新数组
 * @param {Object} rules 差异对比规则 addRules新增差异规则，modifyRules修改差异规则，deleteRules删除差异规则
 * @param {Function} callback 回调函数：四个周期回调add,modify,delete,complete
 * 返回值
 * {
    addArray:[],//新增数据
    modifyArray:[],//修改数据
    deleteArray:[]//删除数据
  }
 */
export function objectArrayDifferences(oldArray=[],newArray=[],rules={},callback){
  if(!oldArray||!newArray){
    return false;
  }
  var copyOldArray=JSON.parse(JSON.stringify(oldArray));
  var copyNewArray=JSON.parse(JSON.stringify(newArray));
  var result={
    addArray:[],
    modifyArray:[],
    deleteArray:[]
  };
  if(rules.addRules){//筛选新增数据
    if(typeof rules.addRules==='function'){//规则是函数，不做处理
      result.addArray=rules.addRules(copyOldArray,copyNewArray);
    }
    if(typeof rules.addRules==="object"&&!(rules.addRules instanceof Array)){//规则是对象,则判断两个字段均不一致为新增
      result.addArray=copyNewArray.filter(newItem=>{
        return copyOldArray.every(oldItem=>{
          var count=0;
          for(var i in rules.addRules){
            if(oldItem[i]==newItem[rules.addRules[i]]){
              count++;
            }
          }
          if(count==0){//无相同
            return true;
          }
          else{
            return false;
          }
        })
      })
    }
    if(typeof rules.addRules==="string"){//规则是字符串，判断此字段为空则是新增
      result.addArray=copyNewArray.filter(newItem=>!newItem[rules.addRules]);
    }
    if(typeof rules.addRules==="object"&&rules.addRules instanceof Array){//规则是数组，判断此数组每个字段均为空则是新增
      result.addArray=copyNewArray.filter(newItem=>{
        return rules.addRules.every(ruleField=>!newItem[ruleField]);
      });
    }
    if(callback&&typeof callback==='function'){//完成新增筛选后的回调
      callback('add',result,copyOldArray,copyNewArray);
    }
  }
  if(rules.modifyRules){//筛选修改数据，需传入唯一确定新旧数组记录关联的规则
    if(typeof rules.modifyRules==='function'){//规则是函数，不做处理
      result.modifyArray=rules.modifyRules(copyOldArray,copyNewArray);
    }
    if(typeof rules.modifyRules==="object"&&!(rules.modifyRules instanceof Array)){//规则是对象,通过此对象唯一确定新旧数组记录关联
      result.modifyArray=copyNewArray.filter(newItem=>{
        return copyOldArray.some(oldItem=>{
          var count=0;
          for(var i in rules.modifyRules){
            if(oldItem[i]!=newItem[rules.modifyRules[i]]){
              count++;
            }
          }
          if(count==0){
            return !(JSON.stringify(newItem)==JSON.stringify(oldItem));
          }
          else{
            return false;
          }
        })
      })
    }
    if(typeof rules.modifyRules==="string"){//规则是字符串，唯一确定新旧数组记录关联
      result.modifyArray=copyNewArray.filter(newItem=>{
        return copyOldArray.some(oldItem=>{
          if(newItem[rules.modifyRules]==oldItem[rules.modifyRules]){
            return !(JSON.stringify(newItem)==JSON.stringify(oldItem));
          }
          else{
            return false;
          }
        })
      });
    }
    if(typeof rules.modifyRules==="object"&&rules.modifyRules instanceof Array){//规则是数组，唯一确定新旧数组记录关联
      result.modifyArray=copyNewArray.filter(newItem=>{
        return copyOldArray.some(oldItem=>{
          if(rules.modifyRules.every(ruleField=>newItem[ruleField]==oldItem[ruleField])){
            return !(JSON.stringify(newItem)==JSON.stringify(oldItem));
          }
          else{
            return false;
          }
        })
      });
    }
    if(callback&&typeof callback==='function'){//完成修改筛选后的回调
      callback('modify',result,copyOldArray,copyNewArray);
    }
  }
  if(rules.deleteRules){//筛选删除数据，需传入唯一确定新旧数组记录关联
    if(typeof rules.deleteRules==='function'){//规则是函数，不做处理
      result.deleteArray=rules.deleteRules(copyOldArray,copyNewArray);
    }
    if(typeof rules.deleteRules==="object"&&!(rules.deleteRules instanceof Array)){//规则是对象,通过此对象唯一确定新旧数组记录关联
      result.deleteArray=copyOldArray.filter(oldItem=>{
        return !copyNewArray.some(newItem=>{
          var count=0;
          for(var i in rules.deleteRules){
            if(oldItem[i]!=newItem[rules.deleteRules[i]]){
              count++;
            }
          }
          if(count==0){
            return true;
          }
          else{
            return false;
          }
        })
      })
    }
    if(typeof rules.deleteRules==="string"){//规则是字符串，唯一确定新旧数组记录关联
      result.deleteArray=copyOldArray.filter(oldItem=>{
        return !copyNewArray.some(newItem=>{
          return newItem[rules.deleteRules]==oldItem[rules.deleteRules];
        })
      })
    }
    if(typeof rules.deleteRules==="object"&&rules.deleteRules instanceof Array){//规则是数组，唯一确定新旧数组记录关联
      result.deleteArray=copyOldArray.filter(oldItem=>{
        return !copyNewArray.some(newItem=>{
          return rules.deleteRules.every(ruleField=>newItem[ruleField]==oldItem[ruleField]);
        })
      })
    }
    if(callback&&typeof callback==='function'){//完成删除筛选后的回调
      callback('delete',result,copyOldArray,copyNewArray);
    }
  }
  //完成操作
  if(callback&&typeof callback==='function'){//全部完成后的回调
    callback('complete',result,copyOldArray,copyNewArray);
  }
  return result;
}

//获取最高级别的权限
/**
 * 获取最高级别权限
 * 引用路径 import {getTopPermission} from '@/utils/differences.js'
 * @param {Array} arr 需比较的数据，权限必须用1或0表示，1表示有该项权限，0表示没有
 * @param {Array} dimension 维度，比较权限数据的规则，比如根据某个人比较，如['用户id'，'部门Id'] 
 * @param {Array} permission 权限字段列表，如['权限1','权限2']
 * 特殊说明：每条记录需要传入__OPERATIONAL字段，字段取值范围{add,modify,delete,unchanged,last}
 * add表示新增
 * modify表示修改
 * delete表示删除
 * unchanged表示未更改
 * last表示修改之前的上次记录
 * 返回值说明：
 * __OPERATIONAL:表示最后选择数据的状态，值为{add,modify,delete,unchanged}
 * 如果__OPERATIONAL为修改，结果中会包含__ADDPERMISSION或者__DELETEPERMISSION
 */
export function getTopPermission(arr,dimension,permission){
  var cloneArray=JSON.parse(JSON.stringify(arr));
  var classify={};//分类后的数据
  var result=[];//结果数据
  cloneArray.forEach(item=>{
    var symbol="";
    dimension.forEach(dimensionItem=>{
      if(symbol){
        symbol=symbol+"-"+item[dimensionItem];
      }
      else{
        symbol=item[dimensionItem];
      }
    });
    //初始化操作
    if(!classify[symbol]){
      classify[symbol]=JSON.parse(JSON.stringify(item));
    }
    if(!item.__OPERATIONAL){
      item.__OPERATIONAL='unchanged';//默认赋值为为改变
    }
    if(!classify[symbol][item.__OPERATIONAL]){
      classify[symbol][item.__OPERATIONAL]={};
      classify[symbol][item.__OPERATIONAL].__OPERATIONAL=item.__OPERATIONAL;
    }
    permission.forEach(permissionItem=>{
      //判断权限项的值是否合规
      if(!item[permissionItem]||isNaN(item[permissionItem])){
        item[permissionItem]=0;
      }
      //所有权限项累加，本算法暂未用到该结果
      if(classify[symbol][item.__OPERATIONAL][permissionItem]){
        classify[symbol][item.__OPERATIONAL][permissionItem]=classify[symbol][item.__OPERATIONAL][permissionItem]+item[permissionItem];
      }
      else{
        classify[symbol][item.__OPERATIONAL][permissionItem]=item[permissionItem];
      }
      //单独权限项
      if(!classify[symbol][item.__OPERATIONAL]["__"+permissionItem]){
        classify[symbol][item.__OPERATIONAL]["__"+permissionItem]=item[permissionItem];
      }
      else{
        if(item[permissionItem]>0&&classify[symbol][item.__OPERATIONAL]["__"+permissionItem]==0){
          classify[symbol][item.__OPERATIONAL]["__"+permissionItem]=1;
        }
      }
    })
  })
  //权限获取
  for(var i in classify){
    //只有删除的数据
    if(classify[i].delete&&!classify[i].unchanged&&!classify[i].modify&&!classify[i].add){
      classify[i].__OPERATIONAL='delete';
      classify[i].__SUM=0;
      classify[i].beforeDelete__SUM=0;
      permission.forEach(permissionItem=>{
        classify[i][permissionItem]=0;
        classify[i]["beforeDelete_"+permissionItem]=classify[i].delete["__"+permissionItem];
        classify[i].__SUM=classify[i].__SUM+classify[i][permissionItem];
        classify[i].beforeDelete__SUM=classify[i].beforeDelete__SUM+classify[i]["beforeDelete_"+permissionItem];
      })
      result.push(classify[i]);
    }
    //只有新增的数据
    else if(classify[i].add&&!classify[i].unchanged&&!classify[i].modify&&!classify[i].delete){
      classify[i].__OPERATIONAL='add';
      classify[i].__SUM=0;
      permission.forEach(permissionItem=>{
        classify[i][permissionItem]=classify[i].add["__"+permissionItem];
        classify[i].__SUM=classify[i].__SUM+classify[i][permissionItem];
      })
      result.push(classify[i]);
    }
    //只有未更改的数据
    else if(classify[i].unchanged&&!classify[i].add&&!classify[i].modify&&!classify[i].delete){
      classify[i].__OPERATIONAL='unchanged';
      classify[i].__SUM=0;
      permission.forEach(permissionItem=>{
        classify[i][permissionItem]=classify[i].unchanged["__"+permissionItem];
        classify[i].__SUM=classify[i].__SUM+classify[i][permissionItem];
      })
      result.push(classify[i]);
    }
    else{
      var isEdit=false;//判断是否修改
      //以不变的数据为基准
      if(classify[i].unchanged){
        permission.forEach(permissionItem=>{
          classify[i][permissionItem]=classify[i].unchanged["__"+permissionItem];
        })
        //对比新增、删除、修改、修改上一次的数据
        if(classify[i].add){
          permission.forEach(permissionItem=>{
            if(classify[i].add["__"+permissionItem]>classify[i].unchanged["__"+permissionItem]){
              if(!classify[i].__ADDPERMISSION){
                classify[i].__ADDPERMISSION=[];
              }
              classify[i].__ADDPERMISSION.push(permissionItem);
            }
          })
        }
        if(classify[i].modify){
          permission.forEach(permissionItem=>{
            if(classify[i].modify["__"+permissionItem]>classify[i].unchanged["__"+permissionItem]){
              if(!classify[i].__ADDPERMISSION){
                classify[i].__ADDPERMISSION=[];
              }
              classify[i].__ADDPERMISSION.push(permissionItem);
            }
          })
        }
        if(classify[i].delete){
          permission.forEach(permissionItem=>{
            if(classify[i].delete["__"+permissionItem]>classify[i].unchanged["__"+permissionItem]){
              if(!classify[i].__DELETEPERMISSION){
                classify[i].__DELETEPERMISSION=[];
              }
              classify[i].__DELETEPERMISSION.push(permissionItem);
            }
          })
        }
        if(classify[i].last){
          permission.forEach(permissionItem=>{
            if(classify[i].last["__"+permissionItem]>classify[i].unchanged["__"+permissionItem]){
              if(!classify[i].__DELETEPERMISSION){
                classify[i].__DELETEPERMISSION=[];
              }
              classify[i].__DELETEPERMISSION.push(permissionItem);
            }
          })
        }
        //相互去重
        if(classify[i].__DELETEPERMISSION&&classify[i].__ADDPERMISSION){
          var cloneDELETEPERMISSION=JSON.parse(JSON.stringify(classify[i].__DELETEPERMISSION));
          var cloneADDPERMISSION=JSON.parse(JSON.stringify(classify[i].__ADDPERMISSION));
          classify[i].__DELETEPERMISSION=classify[i].__DELETEPERMISSION.filter(item=>!cloneADDPERMISSION.includes(item));
          classify[i].__ADDPERMISSION=classify[i].__ADDPERMISSION.filter(item=>!cloneDELETEPERMISSION.includes(item));
        }
        //用删除数据去重新增数据
        if(classify[i].__ADDPERMISSION){
          if(classify[i].delete){
            classify[i].__ADDPERMISSION=classify[i].__ADDPERMISSION.filter(item=>{
              if(classify[i].delete[item]&&classify[i].delete[item]>0){
                return false;
              }
              else{
                return true;
              }
            });
          }
        }
        if((!classify[i].__DELETEPERMISSION&&!classify[i].__ADDPERMISSION)||(classify[i].__DELETEPERMISSION&&classify[i].__ADDPERMISSION&&classify[i].__DELETEPERMISSION.length==0&&classify[i].__ADDPERMISSION.length==0)||(!classify[i].__DELETEPERMISSION&&classify[i].__ADDPERMISSION&&classify[i].__ADDPERMISSION.length==0)||(!classify[i].__ADDPERMISSION&&classify[i].__DELETEPERMISSION&&classify[i].__DELETEPERMISSION.length==0)){
          classify[i].__OPERATIONAL='unchange';
        }
        else{
          classify[i].__OPERATIONAL='modify';
        }
        //汇总最后权限
        if(classify[i].__DELETEPERMISSION){
          classify[i].__DELETEPERMISSION.forEach(deleteItem=>{
            if(classify[i][deleteItem]>0){
              classify[i][deleteItem]=0;
            }
          });
        }
        if(classify[i].__ADDPERMISSION){
          classify[i].__ADDPERMISSION.forEach(addItem=>{
            if(classify[i][addItem]==0){
              classify[i][addItem]=1;
            }
          });
        }
        //汇总最后权限和值
        classify[i].__SUM=0;
        permission.forEach(permissionItem=>{
          classify[i].__SUM=classify[i].__SUM+classify[i][permissionItem]
        })
        result.push(classify[i]);
      }
      //以修改的数据为基准
      if(!classify[i].unchanged&&classify[i].modify){
        permission.forEach(permissionItem=>{
          classify[i][permissionItem]=classify[i].modify["__"+permissionItem];
        })
        //只比较新增数据和删除数据和之前的数据
        if(classify[i].add){
          permission.forEach(permissionItem=>{
            if(classify[i].add["__"+permissionItem]>classify[i].modify["__"+permissionItem]){
              if(!classify[i].__ADDPERMISSION){
                classify[i].__ADDPERMISSION=[];
              }
              classify[i].__ADDPERMISSION.push(permissionItem);
            }
          })
        }
        if(classify[i].delete){
          permission.forEach(permissionItem=>{
            if(classify[i].delete["__"+permissionItem]>classify[i].modify["__"+permissionItem]){
              if(!classify[i].__DELETEPERMISSION){
                classify[i].__DELETEPERMISSION=[];
              }
              classify[i].__DELETEPERMISSION.push(permissionItem);
            }
          })
        }
        if(classify[i].last){
          permission.forEach(permissionItem=>{
            if(classify[i].last["__"+permissionItem]>classify[i].modify["__"+permissionItem]){
              if(!classify[i].__DELETEPERMISSION){
                classify[i].__DELETEPERMISSION=[];
              }
              classify[i].__DELETEPERMISSION.push(permissionItem);
            }
            if(classify[i].last["__"+permissionItem]<classify[i].modify["__"+permissionItem]){
              if(!classify[i].__ADDPERMISSION){
                classify[i].__ADDPERMISSION=[];
              }
              classify[i].__ADDPERMISSION.push(permissionItem);
            }
          })
        }
        //相互去重
        if(classify[i].__DELETEPERMISSION&&classify[i].__ADDPERMISSION){
          var cloneDELETEPERMISSION=JSON.parse(JSON.stringify(classify[i].__DELETEPERMISSION));
          var cloneADDPERMISSION=JSON.parse(JSON.stringify(classify[i].__ADDPERMISSION));
          classify[i].__DELETEPERMISSION=classify[i].__DELETEPERMISSION.filter(item=>!cloneADDPERMISSION.includes(item));
          classify[i].__ADDPERMISSION=classify[i].__ADDPERMISSION.filter(item=>!cloneDELETEPERMISSION.includes(item));
        }
        //用删除数据去重新增数据
        if(classify[i].__ADDPERMISSION){
          if(classify[i].delete){
            classify[i].__ADDPERMISSION=classify[i].__ADDPERMISSION.filter(item=>{
              if(classify[i].delete[item]&&classify[i].delete[item]>0){
                return false;
              }
              else{
                return true;
              }
            });
          }
        }
        if((!classify[i].__DELETEPERMISSION&&!classify[i].__ADDPERMISSION)||(classify[i].__DELETEPERMISSION&&classify[i].__ADDPERMISSION&&classify[i].__DELETEPERMISSION.length==0&&classify[i].__ADDPERMISSION.length==0)||(!classify[i].__DELETEPERMISSION&&classify[i].__ADDPERMISSION&&classify[i].__ADDPERMISSION.length==0)||(!classify[i].__ADDPERMISSION&&classify[i].__DELETEPERMISSION&&classify[i].__DELETEPERMISSION.length==0)){
          classify[i].__OPERATIONAL='unchange';
        }
        else{
          classify[i].__OPERATIONAL='modify';
        }
        //汇总最后权限
        if(classify[i].__DELETEPERMISSION){
          classify[i].__DELETEPERMISSION.forEach(deleteItem=>{
            if(classify[i][deleteItem]>0){
              classify[i][deleteItem]=0;
            }
          });
        }
        if(classify[i].__ADDPERMISSION){
          classify[i].__ADDPERMISSION.forEach(addItem=>{
            if(classify[i][addItem]==0){
              classify[i][addItem]=1;
            }
          });
        }
        //汇总最后权限和值
        classify[i].__SUM=0;
        permission.forEach(permissionItem=>{
          classify[i].__SUM=classify[i].__SUM+classify[i][permissionItem]
        })
        result.push(classify[i]);
      }
      //以新增的数据为基准
      if(!classify[i].unchanged&&!classify[i].modify&&classify[i].add){
        permission.forEach(permissionItem=>{
          classify[i][permissionItem]=classify[i].add["__"+permissionItem];
        })
        //只比较删除数据
        permission.forEach(permissionItem=>{
          if(classify[i].delete["__"+permissionItem]>classify[i].add["__"+permissionItem]){
            if(!classify[i].__DELETEPERMISSION){
              classify[i].__DELETEPERMISSION=[];
            }
            classify[i].__DELETEPERMISSION.push(permissionItem);
            isEdit=true;
          }
          if(classify[i].delete["__"+permissionItem]<classify[i].add["__"+permissionItem]){
            if(!classify[i].__ADDPERMISSION){
              classify[i].__ADDPERMISSION=[];
            }
            classify[i].__ADDPERMISSION.push(permissionItem);
            isEdit=true;
          }
        })
        if(isEdit){
          classify[i].__OPERATIONAL='modify';
        }
        else{
          classify[i].__OPERATIONAL='unchange';
        }
        //汇总最后权限
        if(classify[i].__DELETEPERMISSION){
          classify[i].__DELETEPERMISSION.forEach(deleteItem=>{
            if(classify[i][deleteItem]>0){
              classify[i][deleteItem]=0;
            }
          });
        }
        if(classify[i].__ADDPERMISSION){
          classify[i].__ADDPERMISSION.forEach(addItem=>{
            if(classify[i][addItem]==0){
              classify[i][addItem]=1;
            }
          });
        }
        //汇总最后权限和值
        classify[i].__SUM=0;
        permission.forEach(permissionItem=>{
          classify[i].__SUM=classify[i].__SUM+classify[i][permissionItem]
        })
        result.push(classify[i]);
      }
    }
  }
  return result;
}