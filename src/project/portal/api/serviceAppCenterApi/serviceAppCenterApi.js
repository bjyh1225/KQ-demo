import { post, get } from 'common/config/server/server.js';

const serviceAppCenterApi = {
    //我注册的应用列表
    getAppList(params, config) {
        return get('/api/cos3-portal-manager/app/select/getAppList', params, config);
    },
    //置顶 
    saveAppTop(params, config) {
        return post('/api/cos3-portal-manager/app/add/saveAppTop', params, config);
    },
    //取消置顶
    deleteAppTop(params, config) {
        return post('/api/cos3-portal-manager/app/delete/deleteAppTop', params, config);
    },
    //获取应用分类列表
    getAppCategory(params, config) {
        return get('/api/cos3-portal-manager/app/select/getAppCategory', params, config);
    },
    //获取应用详情
    getAppDetails(params, config) {
        return post('/api/cos3-portal-manager/app/select/getAppDetails', params, config);
    },
    //收藏应用
    saveAppCollection(params, config) {
        return post('/api/cos3-portal-manager/appCollection/add/saveAppCollection', params, config);
    },
    //取消收藏应用
    deleteAppCollection(params, config) {
        return post('/api/cos3-portal-manager/appCollection/delete/deleteAppCollection', params, config);
    },
    //获取当前拥有的应用资源权限
    getAppServicePermissions(params, config) {
        return get('/api/cos3-portal-manager/app/select/getAppServicePermissions', params, config);
    },
    //应用关键字列表
    getAppKwList(params, config) {
        return get('/api/cos3-portal-manager/app/select/getAppKwList', params, config);
    },
    //注册应用隐藏
    getAppHide(params, config) {
        return get('/api/cos3-portal-manager/app/update/getAppHide', params, config);
    },
    // 注册应用显示
    getAppShow(params, config) {
        return get('/api/cos3-portal-manager/app/update/getAppShow', params, config);
    },
}
export default serviceAppCenterApi;