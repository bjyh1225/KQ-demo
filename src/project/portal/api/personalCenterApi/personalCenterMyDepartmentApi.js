import { get } from 'common/config/server/server.js';

const personalCenterMyDepartmentApi = {
  // 通过用户ID获取组织机构及下属机构
  getOrgListByPersonnelId(params, config) {
    return get('/api/cos3-portal-manager/org/select/getOrgListByPersonnelId', params, config);
  },
  //资源列表
  getdepartmentResourceList(params, config) {
    return get('/api/cos3-portal-manager/departmentResource/select/getdepartmentResourceList', params, config);
  },
  // 部门管理-资源审核列表
  getdepartmentAuditResourceList(params, config) {
    return get('/api/cos3-portal-manager/departmentResource/select/getdepartmentAuditResourceList', params, config);
  },
}
export default personalCenterMyDepartmentApi;