import { post, get } from 'common/config/server/server.js';

const personalCenterServiceApi = {
    saveKqService(params, config) {
        return post('/api/cos3-portal-manager/kqservice/add/saveKqService', params, config);
    },
    getserviceListByMe(params, config) {
        return get('/api/cos3-portal-manager/kqservice/select/getserviceListByMe', params, config);
    },
    saveKqServices(params, config) {
        return post('/api/cos3-portal-manager/kqservice/add/saveKqServices', params, config);
    },
    getServiceCategory(params, config) {
        return post('/api/cos3-portal-manager/kqservice/select/getServiceCategory', params, config);
    },
    getMeServiceShow(params, config) {
        return post('/api/cos3-portal-manager/kqservice/update/getMeServiceShow', params, config);
    },
    getMeServiceHide(params, config) {
        return post('/api/cos3-portal-manager/kqservice/update/getMeServiceHide', params, config);
    },
    deleteKqService(params, config) {
        return post('/api/cos3-portal-manager/kqservice/delete/deleteKqService', params, config);
    },
    getAuthTree(params, config) {
        return get('/api/cos3-portal-manager/authTree/select/getAuthTree', params, config);
    },
    selectPermissionById(params, config) { //获取当前服务的共享信息
        return post('/api/cos3-portal-manager/kqservice/select/selectPermissionById', params, config);
    },
    updatePermissionById(params, config) { //修改当前服务共享信息
        return post('/api/cos3-portal-manager/kqservice/update/updatePermissionById', params, config);
    },
    selectPermissionByUser(params, config) { //获取当前服务共享给的人
        return post('/api/cos3-portal-manager/kqservice/select/selectPermissionByUser', params, config);
    },
    getTypeAllListOnly(params, config) { //验证服务是否重复
        return post('/api/cos3-portal-manager/kqservice/select/getTypeAllListOnly', params, config);
    },
    //获取服务器上启动的服务
    getStartServiceList(params, config) { //验证服务是否重复
        return post('/api/cos3-portal-manager/kqservice/select/getStartServiceList', params, config);
    },
    //获取服务缩略图
    getServiceImg(params, config) {
        return get('/api/cos3-portal-manager/kqservice/select/getServiceImg', params, config);
    },
    //重新获取服务的信息
    getMapServiceDetails(params, config) {
        return get('/api/cos3-portal-manager/kqservice/select/getMapServiceDetails', params, config);
    },
    //我的服务启动
    getMyServiceStart(params, config) {
        return get('/api/cos3-portal-manager/kqservice/select/getMyServiceStart', params, config);
    },
    //我的服务停止
    getMyServiceStop(params, config) {
        return get('/api/cos3-portal-manager/kqservice/select/getMyServiceStop', params, config);
    },
    //根据服务地址获取当前服务状态
    getServiceState(params, config) {
        return get('/api/cos3-portal-manager/kqservice/select/getServiceState', params, config);
    },
}
export default personalCenterServiceApi;