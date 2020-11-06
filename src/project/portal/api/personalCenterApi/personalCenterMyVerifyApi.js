import {post} from 'common/config/server/server.js';

const personalCenterMyVerifyApi = {
  //审核列表
  getMyAuditListData(params,config) {
    return post('/api/cos3-portal-manager/audit/select/getMyAuditListData',params,config);
  },
  //批量审核
  getMyAuditList(params,config) {
    return post('/api/cos3-portal-manager/audit/select/getMyAuditList',params,config);
  }
}
export default personalCenterMyVerifyApi;
