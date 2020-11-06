import { get, post } from 'common/config/server/server.js';

const webDashBoardBuilderApi = {
    //获取大屏分类列表
    getBigbuilderCategoryList(params, config) {
        return get('/api/cos3-portal-manager/bigbuilder/select/getBigbuilderCategoryList', params, config);
    },
    //获取当前大屏分类信息
    selectBigbuilderCategoryById(params, config) {
        return get('/api/cos3-portal-manager/bigbuilder/select/selectBigbuilderCategoryById', params, config);
    },
    //删除大屏分类
    deleteServiceCategory(params, config) {
        return post('/api/cos3-portal-manager/bigbuilder/delete/deleteServiceCategory', params, config);
    },
    //新增大屏分类
    saveBigbuilderCategory(params, config) {
        return post('/api/cos3-portal-manager/bigbuilder/add/saveBigbuilderCategory', params, config);
    },
    //验证大屏分类是否唯一
    getBigbuilderCategoryOnly(params, config) {
        return get('/api/cos3-portal-manager/bigbuilder/select/getBigbuilderCategoryOnly', params, config);
    },
    //获取当前拥有的功能资源权限
    getBigbuilderPermissions(params, config) {
        return get('/api/cos3-portal-manager/bigbuilder/select/getBigbuilderPermissions', params, config);
    },
    // POST 分类拖动整体保存
    saveServiceCategoryAll(params, config) {
        return post('/api/cos3-portal-manager/bigbuilder/save/saveServiceCategoryAll', params, config);
    },
    // 删除大屏
    deleteBigbuilder(params, config) {
        return post('/api/cos3-portal-manager/bigbuilder/delete/deleteBigbuilder', params, config);
    },
}
export default webDashBoardBuilderApi;