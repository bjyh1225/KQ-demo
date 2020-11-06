import { post, get } from 'common/config/server/server.js';

const personalDataServiceApi = {
    //获取当前服务的共享信息
    selectPermissionById(params, config) {
        return post('/api/cos3-portal-manager/dataService/select/selectPermissionById', params, config);
    },
    //我注册的服务列表
    getserviceListByMe(params, config) {
        return get('/api/cos3-portal-manager/dataService/select/getserviceListByMe', params, config);
    },
    //获取服务分类列表
    getServiceCategory(params, config) {
        return post('/api/cos3-portal-manager/dataService/select/getServiceCategory', params, config);
    },
    //我注册的服务显示
    getMeServiceShow(params, config) {
        return post('/api/cos3-portal-manager/dataService/update/getMeServiceShow', params, config);
    },
    //我注册的服务隐藏
    getMeServiceHide(params, config) {
        return post('/api/cos3-portal-manager/dataService/update/getMeServiceHide', params, config);
    },
    //删除
    deleteDataService(params, config) {
        return post('/api/cos3-portal-manager/dataService/delete/deleteDataService', params, config);
    },
    //新增服务
    saveDataService(params, config) {
        return post('/api/cos3-portal-manager/dataService/add/saveDataService', params, config);
    },
    // 验证数据服务是否重复
    getTypeAllListOnly(params, config) {
        return post('/api/cos3-portal-manager/dataService/select/getTypeAllListOnly', params, config);
    },
}
export default personalDataServiceApi;