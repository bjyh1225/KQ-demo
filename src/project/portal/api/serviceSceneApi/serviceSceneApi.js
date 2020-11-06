import { post, get } from 'common/config/server/server.js';

const serviceSceneApi = {
    //获取服务分类列表
    getServiceCategory(params, config) {
        return post('/api/cos3-portal-manager/sceneService/select/getServiceCategory', params, config);
    },
    // 3d服务列表
    getListService(params, config) {
        return get('/api/cos3-portal-manager/sceneService/select/getListService', params, config);
    },
    //置顶
    savesceneServiceTop(params, config) {
        return post('/api/cos3-portal-manager/sceneService/add/savesceneServiceTop', params, config);
    },
    //取消置顶
    deletesceneServiceTop(params, config) {
        return post('/api/cos3-portal-manager/sceneService/delete/deletesceneServiceTop', params, config);
    },
    //获取当前服务详情
    getServiceDetails(params, config) {
        return post('/api/cos3-portal-manager/sceneService/select/getServiceDetails', params, config);
    },
    //收藏
    saveSceneServiceCollection(params, config) {
        return post('/api/cos3-portal-manager/serviceCollection/add/saveSceneServiceCollection', params, config);
    },
    //取消收藏
    deleteSceneServiceCollection(params, config) {
        return post('/api/cos3-portal-manager/serviceCollection/delete/deleteSceneServiceCollection', params, config);
    },
    //获取当前拥有的3D资源权限
    getSceneServicePermissions(params, config) {
        return get('/api/cos3-portal-manager/sceneService/select/getSceneServicePermissions', params, config);
    },
    //获取我能看到关键字
    getMyKeyWord(params, config) {
        return get('/api/cos3-portal-manager/sceneService/select/getMyKeyWord', params, config);
    }
}
export default serviceSceneApi;