import { post, get } from "common/config/server/server.js";

const manageProxyServerApi = {
  //新增代理服务器
  saveProxyServer(params, config) {
    return post(
      "/api/cos3-portal-manager/theServer/add/saveProxyServer",
      params,
      config
    );
  },
  //逻辑删除代理服务器
  deleteProxyServiceId(params, config) {
    return get(
      "/api/cos3-portal-manager/theServer/delete/deleteProxyServiceId",
      params,
      config
    );
  },
  //代理服务器列表
  getListProxyServerData(params, config) {
    return get(
      "/api/cos3-portal-manager/theServer/select/getListProxyServerData",
      params,
      config
    );
  },
  //代理服务器列表无分页
  getListProxyServerDataNotPages(params, config) {
    return get(
      "/api/cos3-portal-manager/theServer/select/getListProxyServerDataNotPages",
      params,
      config
    );
  }
};

export default manageProxyServerApi;
