import { post, get } from 'common/config/server/server.js';


const manageCustomerManagementApi = {
  /*租户管理-API*/
  //删除租户数据
  deleteCustomer(params, config) {
    return get('/api/cos3-portal-manager/customer/deleteCustomer', params, config);
  },
  //根据主键ID获取单笔租户信息
  getCustomerById(params, config) {
    return get('/api/cos3-portal-manager/customer/getCustomerById', params, config);
  },
  //分页查询租户列表信息
  getCustomerList(params, config) {
    return get('/api/cos3-portal-manager/customer/getCustomerList', params, config);
  },
  //校验租户标识是否已存在
  isUniqueCustomerCode(params, config) {
    return get('/api/cos3-portal-manager/customer/isUniqueCustomerCode', params, config);
  },
  //保存租户数据
  saveCustomer(params, config) {
    return post('/api/cos3-portal-manager/customer/saveCustomer', params, config);
  },
  //测试连接
  testCustomerConn(params, config) {
    return post('/api/cos3-portal-manager/customer/testCustomerConn', params, config);
  }
}

export default manageCustomerManagementApi;