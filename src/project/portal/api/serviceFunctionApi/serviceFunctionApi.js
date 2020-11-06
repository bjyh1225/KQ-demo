import { post, get } from 'common/config/server/server.js';

const serviceFunctionApi = {
    getFSCategory(params, config) {
        return post('/api/cos3-portal-manager/functionService/select/getFSCategory', params, config);
    },
    getListfunctionService(params, config) {
        return get('/api/cos3-portal-manager/functionService/select/getListfunctionService', params, config);
    },
    saveFServiceTop(params, config) {
        return post('/api/cos3-portal-manager/functionService/add/saveFServiceTop', params, config);
    },
    deleteFServiceTop(params, config) {
        return post('/api/cos3-portal-manager/functionService/delete/deleteFServiceTop', params, config);
    },
    getFavoritesCategoryCodeKey(params, config) {
        return post('/api/cos3-portal-manager/favorites/select/getFavoritesCategoryCodeKey', params, config);
    },
    saveServiceCollection(params, config) {
        return post('/api/cos3-portal-manager/serviceCollection/add/saveServiceCollection', params, config);
    },
    deleteServiceCollection(params, config) {
        return post('/api/cos3-portal-manager/serviceCollection/delete/deleteServiceCollection', params, config);
    },
    getServiceDetails(params, config) {
        return post('/api/cos3-portal-manager/functionService/select/getServiceDetails', params, config);
    },
    //获取当前拥有的功能资源权限
    getFunctionServicePermissions(params, config) {
        return get('/api/cos3-portal-manager/functionService/select/getFunctionServicePermissions', params, config);
    },
    //获取我能看到关键字
    getMyKeyWord(params, config) {
        return get('/api/cos3-portal-manager/functionService/select/getMyKeyWord', params, config);
    }
}
export default serviceFunctionApi;