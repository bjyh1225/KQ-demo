import {get,post,del} from 'common/config/server/server.js';

const dataManageApi={
  //新增、编辑数据目录
  saveCategory (params,config){    
    return post('/serverManager/server-manager/UserManager/category/data',params,config);
  },
  //删除数据目录
  deleteCategory (params,config){
    return del('/serverManager/server-manager/UserManager/category/data',params,config);
  },
  //根据id获取当前数据分类信息
  getCategoryById(params,config){
    return get('/serverManager/server-manager/UserManager/category/data/findById',params,config);
  },
  //查询数据目录列表
  getCategoryList(params,config){
    return get('/serverManager/server-manager/UserManager/category/data/list',params,config);
  },
  //目录拖拽保存
  saveDragCategory (params,config){    
    return post('/serverManager/server-manager/UserManager/category/data/drag-save',params,config);
  }
}

export default dataManageApi;