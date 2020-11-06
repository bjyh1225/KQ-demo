import { get, post } from 'common/config/server/server.js';

const manageDataCategoryApi = {
    // 获取服务分类列表      
    getServiceCategory(config) {
        return post('/api/cos3-portal-manager/dataService/select/getServiceCategory', {}, config);
    },
    // 删除服务分类
    deleteServiceCategory(params, config) {
        return get('/api/cos3-portal-manager/dataService/delete/deleteServiceCategory', params, config);
    },
    // 获取当前服务分类信息
    selectServiceCategoryById(params, config) {
        return get('/api/cos3-portal-manager/dataService/select/selectServiceCategoryById', params, config);
    },
    // 添加服务分类
    saveServiceCategory(params, config) {
        return post('/api/cos3-portal-manager/dataService/save/saveServiceCategory', params, config);
    },
    // 验证服务分类是否唯一
    checkTypeName(params, config) {
        return post('/api/cos3-portal-manager/dataService/select/getDataServiceCategoryOnly', params, config || { loadingText: vm.$t('common.checking') });
    },
    //分类拖动整体保存
    saveServiceCategoryAll(params, config) {
        return post('/api/cos3-portal-manager/dataService/save/saveServiceCategoryAll', params, config);
    },
}

export default manageDataCategoryApi;