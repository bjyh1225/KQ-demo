import { get, post } from 'common/config/server/server.js';

const webMapBuilderApi = {
    //获取制图分类列表
    getMapbuilderCategoryList(params, config) {
        return get('/api/cos3-portal-manager/mapbuilder/select/getMapbuilderCategoryList', params, config);
    },
    //删除制图分类
    deleteServiceCategory(params, config) {
        return post('/api/cos3-portal-manager/mapbuilder/delete/deleteServiceCategory', params, config);
    },
    //获取当前制图分类信息
    selectMapbuilderCategoryById(params, config) {
        return get('/api/cos3-portal-manager/mapbuilder/select/selectMapbuilderCategoryById', params, config);
    },
    //新增制图分类
    saveMapbuilderCategory(params, config) {
        return post('/api/cos3-portal-manager/mapbuilder/add/saveMapbuilderCategory', params, config);
    },
    //验证制图分类是否唯一
    getMapbuilderCategoryOnly(params, config) {
        return get('/api/cos3-portal-manager/mapbuilder/select/getMapbuilderCategoryOnly', params, config);
    },
    //制图列表
    getListMapbuilder(params, config) {
        return get('/api/cos3-portal-manager/mapbuilder/select/getListMapbuilder', params, config);
    },
    //修改制图
    updataMapbuilder(params, config) {
        return post('/api/cos3-portal-manager/mapbuilder/updata/updataMapbuilder', params, config);
    },
    //获取当前制图详情
    getMapbuilderDetails(params, config) {
        return post('/api/cos3-portal-manager/mapbuilder/select/getMapbuilderDetails', params, config);
    },
    //置顶制图
    saveMapbuilderTop(params, config) {
        return post('/api/cos3-portal-manager/mapbuilder/add/saveMapbuilderTop', params, config);
    },
    //取消置顶制图
    deleteMapbuilderTop(params, config) {
        return post('/api/cos3-portal-manager/mapbuilder/delete/deleteMapbuilderTop', params, config);
    },
    //删除制图
    deleteMapbuilder(params, config) {
        return post('/api/cos3-portal-manager/mapbuilder/delete/deleteMapbuilder', params, config);
    },
    //获取当前制图的共享信息
    selectPermissionById(params, config) {
        return get('/api/cos3-portal-manager/mapbuilder/select/selectPermissionById', params, config);
    },
    //根据id获取当前制图的信息
    selectAppByID(params, config) {
        return get('/api/cos3-portal-manager/mapbuilder/get/selectById', params, config);
    },
    //获取当前拥有的功能资源权限
    getMapbuilderPermissions(params, config) {
        return get('/api/cos3-portal-manager/mapbuilder/select/getMapbuilderPermissions', params, config);
    },
    // 分类拖动整体保存
    saveServiceCategoryAll(params, config) {
        return post('/api/cos3-portal-manager/mapbuilder/save/saveServiceCategoryAll', params, config);
    },
    //注册制图隐藏
    getMapbuilderHide(params, config) {
        return post('/api/cos3-portal-manager/mapbuilder/update/getMapbuilderHide', params, config);
    },
    //注册制图显示
    getMapbuilderShow(params, config) {
        return post('/api/cos3-portal-manager/mapbuilder/update/getMapbuilderShow', params, config);
    },
}
export default webMapBuilderApi;