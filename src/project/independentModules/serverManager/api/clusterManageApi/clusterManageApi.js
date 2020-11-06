import { post, get, put } from 'common/config/server/server.js';

const clusterManageApi = {
  getNodes(params, config) {
    //查询节点    
    return get('/serverManager/server-manager/UserManager/services/nodes/info', params, config);
  },
  registerNode(params, config) {
    //注册节点    
    return post('/serverManager/server-manager/UserManager/services/nodes/register', params, config);
  },
  deleteNode(params, config) {
    //删除节点    
    return get('/serverManager/server-manager/UserManager/services/nodes/deregister', params, config);
  },
  getServerNodeInfo(params, config) {
    //获取服务实例的信息(包括IP 端口等)    
    return get('/serverManager/server-manager/UserManager/services/nodes/info', params, config);
  },
  getLbruleList(params, config) {
    //获取所有负载均衡策略   
    return get('/serverManager/server-manager/UserManager/lbrule/list', params, config);
  },
  modifyLbrule(params, config) {
    //修改负载均衡策略   
    return put('/serverManager/server-manager/UserManager/lbrule/modify', params, config);
  },
  getLbrule(params, config) {
    //获取当前的负载均衡策略   
    return get('/serverManager/server-manager/UserManager/lbrule/get', params, config);
  }
}

export default clusterManageApi;