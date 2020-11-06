import {get,post,put,del} from 'common/config/server/server.js';

const serverManageApi = {        
  //查询服务目录
  getServiceCatalogue (params,config){    
    return get('/serverManager/server-manager/UserManager/services/list',params,config);  
  },
  //创建目录
  createFolder(params,config){    
    return post('/serverManager/server-manager/UserManager/services/folder',params,config);  
  },
  //修改服务目录
  updateServiceFolder(params,config){    
    return put('/serverManager/server-manager/UserManager/services/folder',params,config);  
  },
  //查询服务列表（未登录）
  listServiceByFolder(params,config){    
    return get('/serverManager/server-manager/UserManager/services/listByFolder',params,config);  
  },
  //查询服务列表（登录）
  listServiceByUserFolder(params,config){    
    return get('/serverManager/server-manager/UserManager/services/listByUserFolder',params,config);  
  },
  //删除目录
  deleteFolder(params,config){    
    return del('/serverManager/server-manager/UserManager/services/folder',params,config);  
  },
  //启动服务
  openServer(params,config){    
    return post('/serverManager/server-manager/UserManager/services/ops/start',params,config);  
  },
  //停止服务
  stopServer(params,config){    
    return post('/serverManager/server-manager/UserManager/services/ops/stop',params,config);  
  },
  //删除服务
  deleteServer(params,config){    
    return post('/serverManager/server-manager/UserManager/services/ops/delete',params,config);  
  },
  //查询服务的详细信息
  queryServiceInfo(params,config){    
    return get('/serverManager/server-manager/UserManager/services/queryserviceinfo',params,config);  
  },
  //修改服务验证
  editAuth(params,config){    
    return get('/serverManager/server-manager/UserManager/services/edit/auth',params,config);  
  },
  //保存服务信息
  saveServiceinfo(params,config){    
    return put('/serverManager/server-manager/UserManager/services/saveServiceinfo',params,config);  
  },
  //发布服务
  createService(params,config){    
    return post('/serverManager/server-manager/UserManager/services/createservice',params,config);  
  },
  //保存访问量
  saveHits(params,config){    
    return post('/serverManager/server-manager/UserManager/services/hits',params,config);  
  },
  //查询网关节点
  getClusterNodes(params,config){    
    return get('/serverManager/server-manager/UserManager/services/nodes/info',params,config);  
  },
  //开始缓存
  startCacheProcess(params,config){    
    return post('/serverManager/server-manager/UserManager/services/cache/start',params,config);  
  },
  //停止缓存
  stopCacheProcess(params,config){    
    return post('/serverManager/server-manager/UserManager/services/cache/stop',params,config);  
  },
  //查询缓存状态
  queryCacheStatus(params,config){
    return get('/serverManager/server-manager/UserManager/services/cachestatus',params,config); 
  },
  //导出比例尺
  downloadScaleFile(params,config){    
    return post('/serverManager/server-manager/UserManager/scaleFile/export',params,config);  
  },
  //导入比例尺
  uploadScaleFile(params,config){    
    return post('/serverManager/server-manager/UserManager/scaleFile/upload',params,config);  
  },
  //获取服务节点列表
  getServiceNodeList(params,config){
    return get('/serverManager/server-manager/UserManager/services/details/nodes',params,config); 
  },
  //通过服务名发布服务
  createServiceByName(params,config){    
    return post('/serverManager/server-manager/UserManager/services/createservice/name',params,config);  
  },
  //检查服务名是否存在
  checkServiceNameExist(params,config){
    return get('/serverManager/server-manager/UserManager/services/servicename/is-exist',params,config); 
  },
  //获取服务实例的信息(包括IP 端口等)
  getServerNodeInfo(params,config){
    return get('/serverManager/server-manager/UserManager/services/nodes/info',params,config); 
  },
  //测试mongodb的连接
  testMongodbConnect(params,config){
    return get('/serverManager/server-manager/UserManager/services/mongodb/connect-test',params,config); 
  },
  //给角色授予服务的操作权限
  mappingSave(params,config){    
    return post('/serverManager/server-manager/UserManager/services/mappingSave',params,config);  
  },
  //服务授权-缓存数据
  getCacheData(params,config){
    return get('/serverManager/server-manager/UserManager/services/juris/cache-data',params,config); 
  },
  //根据多个角色id获取服务权限列表
  getJurisdictionListByRoles(params,config){
    return get('/serverManager/server-manager/UserManager/services/jurisdictionListByRoles',params,config); 
  },
  //获取当前用户对当前服务拥有的授权权限
  getJurisdictionByService(params,config){
    return get('/serverManager/server-manager/UserManager/services/serverMapping',params,config); 
  }
}

export default serverManageApi;