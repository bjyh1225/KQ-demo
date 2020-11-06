import { post, get } from 'common/config/server/server.js';

const manageWhiteListApi = {
  getAntPatternsList(params, config) { // 分页查询请求列表信息
    return get('/api/cos3-portal-manager/antPatterns/select/getAntPatternsList', params, config);
  },
  removeAntPatterns(params, config) { // 删除白名单数据
    return get('/api/cos3-portal-manager/antPatterns/delete/removeAntPatterns', params, config);
  },
  isUniqueAntPatterns(params, config) { // 验证白名单是否已存在
    return get('/api/cos3-portal-manager/antPatterns/select/isUniqueAntPatterns', params, config);
  },
  save(params, config) { // 保存白名单数据 
    return post('/api/cos3-portal-manager/antPatterns/add/save', params, config);
  },
  updateAllowStatus(params, config) { // 修改白名单状态
    return get('/api/cos3-portal-manager/antPatterns/update/updateAllowStatus', params, config);
  },
}

export default manageWhiteListApi;