import {setComponent} from 'common/routerUtils/menuFun.js'
import baseConfigRouter from 'common/config/router/baseRouter.js'
import coverSystemMenuRouter from 'common/config/allProjectConfig/routerConfig/coverSystemMenuRouter.js'
import Router from 'vue-router'
import {traversal} from '@/utils/traversal.js'
import { getTree } from '@/utils/getTree.js'
import component from 'common/config/allProjectConfig/allProjectComponents.js'

const config={
  mode: "history",
  base: window.currentBaseUrl,
  scrollBehavior: () => ({
    y: 0
  }),
  routes:[]
}

function getBaseRouter(){
  let forbidEdit={
    name:true
  };
  if(coverSystemMenuRouter){
    baseConfigRouter.forEach(item=>{
      if(coverSystemMenuRouter[item.name]&&item.name){
        Object.keys(coverSystemMenuRouter[item.name]).forEach(key=>{
          if(!forbidEdit[key]){
            if(key!="component"){
              item[key]=coverSystemMenuRouter[item.name][key];
            }
            else{
              if(component[coverSystemMenuRouter[item.name][key]]){
                item[key]=component[coverSystemMenuRouter[item.name][key]]
              }
            }
          }
        })
      }
    })
  }
  if(window.portal_config&&window.portal_config.COVER_MENU_ROUTER_CONFIG){
    let cover=window.portal_config.COVER_MENU_ROUTER_CONFIG;
    baseConfigRouter.forEach(item=>{
      if(cover[item.name]&&item.name){
        Object.keys(cover[item.name]).forEach(key=>{
          if(!forbidEdit[key]){
            if(key!="component"){
              item[key]=cover[item.name][key];
            }
            else{
              if(component[cover[item.name][key]]){
                item[key]=component[cover[item.name][key]]
              }
            }
          }
        })
      }
    })
  }
  return baseConfigRouter;
}

export function createRouter(){
  const newRouter=new Router(config);
  return newRouter;
}

export function resetRouter(router){
  const newRouter=createRouter();
  router.matcher = newRouter.matcher;
}

export function setRouter(router,routerList){
  resetRouter(router);
  setComponent(routerList,0);
  router.options.routes=[];
  let baseRouter=getBaseRouter();
  baseRouter.forEach(function(item){
    router.options.routes.push(item);
  })
  var rootRouter=[];
  traversal(routerList,'children',(item)=>{
    if(item.routerParentNode=="root"){
      //覆盖默认的独立根路由
      if(item.coverDefaultIndependentRouter&&item.coverDefaultIndependentRouterName){
        router.options.routes.forEach(ritem=>{
          if(ritem.name==item.coverDefaultIndependentRouterName){
            ritem.component=item.component;
            ritem.meta=item.meta;
          }
        })
      }
      else{
        rootRouter.push(item);
      }
    }
  });
  var rootRouterList=getTree(rootRouter, 'name', 'parent', 'children', function (father) {
    if (!father.parent||father.routerParentNode=="root") {
      return true;
    }
    else {
      return false;
    }
  }, function (childArr) {
    childArr.sort(function (p, n) {
      return p.sortNo - n.sortNo;
    })
  }, false);
  routerList.forEach(function(item){
    if(item.routerParentNode!='root'){
      item.children=item.children.filter(citem=>{
        return citem.routerParentNode!='root';
      })
      router.options.routes[0].children.push(item);
    }
  })
  router.options.routes=router.options.routes.concat(rootRouterList);
  router.addRoutes(router.options.routes);
}