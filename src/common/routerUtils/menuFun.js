/* eslint-disable */
import menu from 'common/config/allProjectConfig/allProjectMenuRouter.js'
import coverSystemMenuRouter from 'common/config/allProjectConfig/routerConfig/coverSystemMenuRouter.js'
import deleteSystemMenuRouter from 'common/config/allProjectConfig/routerConfig/deleteSystemMenuRouter.js'
import component from 'common/config/allProjectConfig/allProjectComponents.js'
import { getTree } from '@/utils/getTree.js'
import {traversal} from '@/utils/traversal.js'
import {sortUtil} from '@/utils/sortUtil.js'
import {deepClone} from '@/utils/deepClone.js'
import {isPc} from 'common/plugin/mobileOrPc.js'
//获取全部配置菜单，默认取common下面的allProjectMenuRouter.js，如果需要配置全部，需绑定至全局变量
function getAllConfigMenu(){
  if(window.allConfigMenu){
    return deepClone(window.allConfigMenu);
  }
  else{
    return deepClone(menu);
  }
}

//获取默认展示菜单
function getDefaultMenu() {
  //路由数据
  var routerList = filterMenu(function(item){
    //默认展示、非外部链接路由、非不挂载路由
    if (item.defaultDisplay&&!item.externalLinksRouter&&!item.noMountRoute){
      return getRouterInfo(item);
    }
    else{
      return false;
    }
  });
  //菜单数据
  var menuList = filterMenu(function(item){
    //默认展示、非不挂载菜单
    if (item.defaultDisplay&&!item.noMountMenu) {
      return getMenuInfo(item);
    }
    else {
      return false;
    }
  });
  var routerTree = getTreeList(routerList, true);
  var menuTree = getTreeList(menuList, true);
  var menuGroup = getMenuGroup(menuTree);
  var functionAuthorityGroup=getFunctionAuthorityGroup(menuList);
  var tabPagesConfigGroup=getTabPagesConfigGroup(menuList);
  var rootRouter=[];
  traversal(routerTree,'children',function(current,parent,rootRouter){
    //删除挂载在根节点的路由
    if(current.routerParentNode=='root'&&parent!="root"){
      rootRouter.push(current);
      for(var i=parent.children.length-1;i>=0;i--){
        if(current.name==parent.children[i].name){
          parent.children.splice(i,1);
        }
      }
    }
    //修改重定向内容
    if(current.defaultFirstRedirect&&current.children&&current.children.length>0){
      //判断是否存在重定向子路由
      let existStatus=current.children.some(childrenRouter=>{
        if(childrenRouter.path){
          let index=current.redirect.lastIndexOf(childrenRouter.path);
          if(index<0){
            return false;
          }
          else{
            if((index+childrenRouter.path.length)==current.redirect.length){
              return true;
            }
            else{
              return false;
            }
          }
        }
        else{
          return false;
        }
      })
      if(!existStatus){
        for(var j=0;j<current.children.length;j++){
          if(current.children[j].path&&current.children[j].routerParentNode!='root'){
            if(current.children[j].path.indexOf("/")==0){
              current.redirect=current.path+current.children[j].path;
            }
            else{
              current.redirect=current.path+"/"+current.children[j].path;
            }
            break;
          }
        }
      }
    }
  },null,rootRouter);
  routerTree=routerTree.concat(rootRouter);
  return {
    routerTree,
    menuTree,
    menuGroup,
    functionAuthorityGroup,
    tabPagesConfigGroup
  }
}

//根据权限获取菜单
/**
 * 
 * @param {function} routerFilter 路由过滤规则
 * @param {function} menuFilter 菜单过滤规则
 * @param {object} params 参数
 */
function getPermissionMenu(routerFilter,menuFilter,params){
  var routerList = filterMenu(function (item) {
    let routerCheckStatus=routerFilter(item,params);
    if(routerCheckStatus){
      return getRouterInfo(item);
    }
    else{
      return false;
    }
  });
  var menuList = filterMenu(function (item) {
    let menuCheckStatus=menuFilter(item,params);
    if(menuCheckStatus){
      return getMenuInfo(item);
    }
    else{
      return false;
    }
  });
  var routerTree = getTreeList(routerList, true);
  var menuTree = getTreeList(menuList, true);
  var menuGroup = getMenuGroup(menuTree);
  var functionAuthorityGroup=getFunctionAuthorityGroup(menuList);
  var tabPagesConfigGroup=getTabPagesConfigGroup(menuList);
  var rootRouter=[];
  traversal(routerTree,'children',function(current,parent,rootRouter){
    //删除挂到根节点的路由
    if(current.routerParentNode=='root'&&parent!="root"){
      rootRouter.push(current);
      for(var i=parent.children.length-1;i>=0;i--){
        if(current.name==parent.children[i].name){
          parent.children.splice(i,1);
        }
      }
    }
    //修改重定向内容
    if(current.defaultFirstRedirect&&current.children&&current.children.length>0){
      //判断是否存在重定向子路由
      let existStatus=current.children.some(childrenRouter=>{
        if(childrenRouter.path){
          let index=current.redirect.lastIndexOf(childrenRouter.path);
          if(index<0){
            return false;
          }
          else{
            if((index+childrenRouter.path.length)==current.redirect.length){
              return true;
            }
            else{
              return false;
            }
          }
        }
        else{
          return false;
        }
      })
      if(!existStatus){
        for(var j=0;j<current.children.length;j++){
          if(current.children[j].path&&current.children[j].routerParentNode!='root'){
            if(current.children[j].path.indexOf("/")==0){
              current.redirect=current.path+current.children[j].path;
            }
            else{
              current.redirect=current.path+"/"+current.children[j].path;
            }
            break;
          }
        }
      }
    }
  },null,rootRouter);
  routerTree=routerTree.concat(rootRouter);
  return {
    routerTree,
    menuTree,
    menuGroup,
    functionAuthorityGroup,
    tabPagesConfigGroup
  }
}

//获取全部菜单
function getAllMenu($this) {
  var menuList = filterMenu(function (item) {
    if ((!item.defaultDisplay && !item.permissionParent&&!item.afterLoginDefaultDisplay&&!item.noMountMenu)||item.permissionNoIgnore) {
      let { name, path, menuPath, menuName, sortNo, parent,functionAuthority} = item;
      if (menuPath) {
        path = menuPath;
      }
      if(functionAuthority&&Array.isArray(functionAuthority)){
        functionAuthority.forEach(item=>{
          item.parentName=name;
          item.checked=true;
        })
      }
      return {
        value: name,
        disabled: false,
        label: this.$t(menuName),
        sortNo,
        parent,
        name,
        functionAuthority
      };
    }
    else {
      return false;
    }
  }.bind($this));
  var menuTree = getTreeList(menuList, true, false);
  return menuTree;
}

//过滤菜单
function filterMenu(rules) {
  var coverMenu=portal_config.COVER_MENU_ROUTER_CONFIG||{};
  var deleteMenu=portal_config.DELETE_PORTAL_DEFAULT_MENU_ROUTER_CONFIG||[];
  var addMenu=portal_config.ADD_MENU_ROUTER_CONFIG||{};
  var pcStatus=isPc();
  var forbidEdit={
    name:true
  };
  let allMenu=getAllConfigMenu();
  //添加新增菜单
  if(typeof addMenu==='object'&&!Array.isArray(addMenu)){
    allMenu=Object.assign(allMenu,addMenu); 
  }
  var result = [];
  for (var i in allMenu) {
    /**菜单路由覆盖机制 */
    //菜单的覆盖，通过index.js文件
    if(coverMenu&&typeof coverMenu==='object'&&coverMenu[i]){
      for(var key in coverMenu[i]){
        if(!forbidEdit[key]){
          allMenu[i][key]=coverMenu[i][key];
        }
      }
    }
    //菜单的覆盖，通过coverMenuRouter.js文件
    if(coverSystemMenuRouter&&typeof coverSystemMenuRouter==='object'&&coverSystemMenuRouter[i]){
      for(var key in coverSystemMenuRouter[i]){
        if(!forbidEdit[key]){
          allMenu[i][key]=coverSystemMenuRouter[i][key];
        }
      }
    }
    //如果key和name不一致，强行让key和name保持一致
    if(allMenu[i].name!=i){
      allMenu[i].name=i;
    }
    //特殊处理，覆盖默认的独立路由机制
    if(allMenu[i].coverDefaultIndependentRouter){
      allMenu[i].routerParentNode="root";
      allMenu[i].defaultDisplay=true;
    }
    /**删除菜单路由覆盖机制 */
    //删除菜单，通过index.js文件
    if(deleteMenu.indexOf(i)>-1||deleteMenu.indexOf(allMenu[i].parent)>-1||deleteMenu.indexOf(allMenu[i].permissionParent)>-1){
      continue;
    }
    //删除菜单，通过deleteMenuRouter.js文件
    if(deleteSystemMenuRouter.indexOf(i)>-1||deleteSystemMenuRouter.indexOf(allMenu[i].parent)>-1||deleteSystemMenuRouter.indexOf(allMenu[i].permissionParent)>-1){
      continue;
    }
    //移动端支持
    if(!pcStatus&&allMenu[i].mComponent){
      allMenu[i].component=allMenu[i].mComponent;
    }
    var r = rules(allMenu[i]);
    if (r) {
      result.push(r);
    }
  }
  return result;
}

//处理路由单条数据
function getRouterInfo(info){
  const fields=[
    'name',
    'path',
    'component',
    'meta',
    'parent',
    'redirect',
    'routerParentNode',
    'defaultFirstRedirect',
    'sortNo',
    'coverDefaultIndependentRouter',
    'coverDefaultIndependentRouterName'
  ];
  let resultInfo={};
  for(const values of fields){
    resultInfo[values]=info[values];
  }
  //特殊处理，通过routerParentNode指定挂载路由的位置
  if(info.routerParentNode=='/'){
    resultInfo.parent=null;
  }
  if(info.routerParentNode&&info.routerParentNode!='root'&&info.routerParentNode!='/'){
    resultInfo.parent=info.routerParentNode;
  }
  //特殊处理，将当前路由的菜单路径或者路径存入meta
  if(!resultInfo.meta){
    resultInfo.meta={};
  }
  resultInfo.meta.currentMenuPath=info.menuPath?info.menuPath:info.path;
  return resultInfo;
}

//处理菜单单条数据
function getMenuInfo(info){
  const fields=[
    'name',
    'path',
    'menuPath',
    'menuName',
    'sortNo',
    'isIndexMenu',
    'parent',
    'indexMenuNoChild',
    'externalLinksRouter',
    'functionAuthority',
    'tabPagesConfig'
  ];
  let resultInfo={};
  for(const values of fields){
    resultInfo[values]=info[values];
  }
  if(resultInfo.menuPath){
    resultInfo.path=resultInfo.menuPath;
  }
  return resultInfo;
}

//获取树状结构
function getTreeList(menuList, isSort = false, isNullChild = true) {
  var data = getTree(menuList, 'name', 'parent', 'children', function (father) {
    if (!father.parent||father.parent=='root') {
      return true;
    }
    else {
      return false;
    }
  }, function (childArr) {
    if (isSort) {
      childArr.sort(function (p, n) {
        return p.sortNo - n.sortNo;
      })
    }
  }, isNullChild);
  if (isSort) {
    data.sort(function (p, n) {
      return p.sortNo - n.sortNo;
    });
  }
  return data;
}

//获取菜单分组
function getMenuGroup(menuTree) {
  var menuGroup = {
    "indexMenu": [],
  };
  traversal(menuTree,'children',function(current,parent,menuGroup){
    //有子菜单形成分组
    if(current.children&&current.children.length>0){
      menuGroup[current.path]=current;
    }
    //首先菜单
    if(current.isIndexMenu&&parent=='root'){
      if (current.children.length > 0 && current.children[0].isIndexMenu) {
        menuGroup.indexMenu.push(current);
      }
      else {
        let { path, menuName, sortNo,externalLinksRouter } = current;
        menuGroup.indexMenu.push({ path, menuName, sortNo,externalLinksRouter});
      }
    }
  },null,menuGroup);
  sortUtil(menuGroup.indexMenu,['sortNo'],'asc');
  return menuGroup;
}

//获取按钮权限分组
function getFunctionAuthorityGroup(menuList){
  let functionAuthorityGroup={};
  menuList.forEach(item=>{
    if(item.functionAuthority){
      functionAuthorityGroup[item.path]=item.functionAuthority;
    }
  })
  return functionAuthorityGroup;
}

//获取页签页面配置分组
function getTabPagesConfigGroup(menuList){
  let tabPagesConfigGroup={};
  menuList.forEach(item=>{
    if(item.tabPagesConfig){
      sortUtil(item.tabPagesConfig,['sortNo'],'asc');
      tabPagesConfigGroup[item.path]=item.tabPagesConfig;
    }
  })
  return tabPagesConfigGroup;
}
//设置组件
function setComponent(router, loop) {
  loop++;
  if (loop > 4) {
    return;
  }
  router.forEach(function (item) {
    if (item.component) {
      item.component = component[item.component];
    }
    if (item.children.length > 0) {
      setComponent(item.children, loop);
    }
  })
}

export {
  getDefaultMenu,
  getPermissionMenu,
  setComponent,
  getAllMenu
}


