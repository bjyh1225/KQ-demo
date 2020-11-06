import menuList from '../config/menuConfig.js'
import {getTree} from '@/utils/getTree.js'
import {traversal} from '@/utils/traversal.js'
export function getMenu(loginStatus,noTree){
  if(loginStatus){//已登录
    if(noTree){
      return menuList;
    }
    else{
      return getTree(menuList,'name','parent','children',null,function(arr,father){
        //补充parent字段
        arr.forEach(item=>{
          item.parent=father.name;
        })
        arr.sort(function (p, n) {
          return p.sortNo - n.sortNo;
        })
      },true,true).sort(function (p, n) {
        return p.sortNo - n.sortNo;
      })
    }
  }
  else{
    var data=[];
    traversal(getTree(menuList,'name','parent','children',null,function(arr,father){
      //补充parent字段
      arr.forEach(item=>{
        item.parent=father.name;
      })
    },true,true),'children',function(item,father,params){
      if(!item.needLogin&&(father=='root'||!father.needLogin)){
        if(father!='root'){
          item.parent=father.name;
        }
        params.push(item);
      }
    },null,data);
    if(noTree){
      return data;
    }
    else{
      return getTree(data,'name','parent','children',null,function(arr,father){
        //补充parent字段
        arr.forEach(item=>{
          item.parent=father.name;
        })
        arr.sort(function (p, n) {
          return p.sortNo - n.sortNo;
        })
      },true,false).sort(function (p, n) {
        return p.sortNo - n.sortNo;
      })
    }
  }
}

export function getHomePage(loginStatus){
  var homePage={};
  if(loginStatus){//已登录
    menuList.forEach(item=>{
      if(item.isHomePage){
        homePage=item;
      }
    })
    return homePage;
  }
  else{
    menuList.forEach(item=>{
      if(item.isHomePage&&!item.needLogin){
        homePage=item;
      }
    })
    return homePage; 
  }
}