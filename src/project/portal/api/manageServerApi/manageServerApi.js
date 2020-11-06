import { post, get } from 'common/config/server/server.js';

const manageServerApi = {
  saveServer(params, config) {
    return post('/api/cos3-portal-manager/theServer/add/saveServer', params, config);
  },
  deleteServiceId(params, config) {
    return get('/api/cos3-portal-manager/theServer/delete/deleteServiceId', params, config);
  },
  getListServerData(params, config) {
    return get('/api/cos3-portal-manager/theServer/select/getListServerData', params, config);
  },
  getServerById(params, config) {
    return get('/api/cos3-portal-manager/theServer/select/getServerById', params, config);
  },
  getTypeAllListOnly(params, config) {
    return get('/api/cos3-portal-manager/theServer/select/getTypeAllListOnly', params, config || { loadingText: vm.$t('common.checking') });
  },
  getListServerDataNotPage(params, config) {
    return get('/api/cos3-portal-manager/theServer/select/getListServerDataNotPage', params, config);
  },
  // 服务器无分页列表
  getListServerDataNotPages(params, config) {
    return get('/api/cos3-portal-manager/theServer/select/getListServerDataNotPages', params, config);
  },
  //获取微服务服务器数据
  getServerManagerData(params, config) {
    return get('/api/cos3-portal-manager/theServer/select/getServerManagerData', params, config);
  },
  //微服务邮件信息保存
  savaEmailData(params, config) {
    return post('/api/cos3-portal-manager/theServer/add/savaEmailData', params, config);
  },
  //获取serverManagerGis服务日志
  getLogGisService(params, config) {
    return get('/api/cos3-portal-manager/theServer/select/getLogGisService', params, config);
  },
  // GET 获取serverManager代理服务日志
  getLogProxyService(params, config) {
    return get('/api/cos3-portal-manager/theServer/select/getLogProxyService', params, config);
  }
}

export default manageServerApi;