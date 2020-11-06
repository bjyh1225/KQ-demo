import {post} from 'common/config/server/server.js';

const personalCenterMyApplyApi = {
  //申请列表
  getMyApplyListData(params,config) {
    return post('/api/cos3-portal-manager/audit/select/getMyApplyListData',params,config);
  },
  //批量删除申请
  deleteAuditResource(params,config) {
    return post('/api/cos3-portal-manager/audit/delete/deleteAuditResource',params,config);
  }
}
export default personalCenterMyApplyApi;
