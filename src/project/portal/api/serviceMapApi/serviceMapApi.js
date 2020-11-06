import { post, get } from 'common/config/server/server.js';

const serviceMapApi = {
    getListService(params, config) {
        return get('/api/cos3-portal-manager/kqservice/select/getListService', params, config);
    },
    saveKqServiceTop(params, config) {
        return post('/api/cos3-portal-manager/kqservice/add/saveKqServiceTop', params, config);
    },
    deleteKqServiceTop(params, config) {
        return post('/api/cos3-portal-manager/kqservice/delete/deleteKqServiceTop', params, config);
    },
    getServiceCategory(params, config) {
        return post('/api/cos3-portal-manager/kqservice/select/getServiceCategory', params, config);
    },
    getServiceDetails(params, config) {
        return post('/api/cos3-portal-manager/kqservice/select/getServiceDetails', params, config);
    },
    //申请资源
    auditResource(params, config) {
        return post('/api/cos3-portal-manager/audit/save/auditResource', params, config);
    },
    // 获取当前拥有的地图资源权限
    getServicePermissions(params, config) {
        return get('/api/cos3-portal-manager/kqservice/select/getServicePermissions', params, config);
    },
    //获取我能看到关键字
    getMyKeyWord(params, config) {
        return get('/api/cos3-portal-manager/kqservice/select/getMyKeyWord', params, config);
    },
    //根据服务地址获取当前服务状态
    getServiceState(params, config) {
        return get('/api/cos3-portal-manager/kqservice/select/getServiceState', params, config);
    },
}
export default serviceMapApi;