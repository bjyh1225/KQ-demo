import { post, get } from 'common/config/server/server.js';

const serviceDataApi = {
    //获取服务分类列表
    getServiceCategory(params, config) {
        return post('/api/cos3-portal-manager/dataService/select/getServiceCategory', params, config);
    },
    // 数据服务列表
    getListService(params, config) {
        return get('/api/cos3-portal-manager/dataService/select/getListService', params, config);
    },
    //置顶
    saveDataServiceTop(params, config) {
        return post('/api/cos3-portal-manager/dataService/add/saveDataServiceTop', params, config);
    },
    //取消置顶
    deleteDataServiceTop(params, config) {
        return post('/api/cos3-portal-manager/dataService/delete/deleteDataServiceTop', params, config);
    },
    //获取当前服务详情
    getServiceDetails(params, config) {
        return post('/api/cos3-portal-manager/dataService/select/getServiceDetails', params, config);
    },
    // 收藏数据服务
    saveDataServiceCollection(params, config) {
        return post('/api/cos3-portal-manager/serviceCollection/add/saveDataServiceCollection', params, config);
    },
    // 取消数据服务收藏
    deleteDataServiceCollection(params, config) {
        return post('/api/cos3-portal-manager/serviceCollection/delete/deleteDataServiceCollection', params, config);
    },
    //获取当前拥有的数据资源权限
    getDataServicePermissions(params, config) {
        return get('/api/cos3-portal-manager/dataService/select/getDataServicePermissions', params, config);
    },
    //获取我能看到关键字
    getMyKeyWord(params, config) {
        return get('/api/cos3-portal-manager/dataService/select/getMyKeyWord', params, config);
    }
}
export default serviceDataApi;