import { post, get } from 'common/config/server/server.js';

const mapBuilderApi = {
    //根据taskId删除文件
    deleteFileById(params, config) {
        return get('/api/cos3-portal-manager/sliceData/deleteFileById', params, config);
    },
    //获取业务文件列表
    getFilesList(params, config) {
        return get('/api/cos3-portal-manager/sliceData/getDataList', params, config);
    },
    //上传字符串到新生成的文件中
    saveToFile(params, config) {
        return post('/api/cos3-portal-manager/sliceFile/saveToFile', params, config);
    },
    //上传切片文件，通过kendoUi上传控件
    sliceFileUpload() {
        return '/api/cos3-portal-manager/sliceData/sliceFileUpload';
    },
    sliceRootUrl() {
        return window.location.hostname + ':' + window.location.port
    },
    //获取数据服务分类列表
    getDataServiceCategory(params, config) {
        return post('/api/cos3-portal-manager/dataService/select/getServiceCategory', params, config);
    },
    // 数据服务列表
    getListDataService(params, config) {
        return get('/api/cos3-portal-manager/dataService/select/getListService', params, config);
    },
    //获取当前服务详情
    getDataServiceDetails(params, config) {
        return post('/api/cos3-portal-manager/dataService/select/getServiceDetails', params, config);
    },
    // 获取当前数据服务分类信息
    selectDataServiceCategoryById(params, config) {
        return get('/api/cos3-portal-manager/dataService/select/selectServiceCategoryById', params, config);
    },
    //获取当前数据服务的共享信息
    selectDataServicePermissionById(params, config) {
        return post('/api/cos3-portal-manager/dataService/select/selectPermissionById', params, config);
    },
    //我注册的数据服务列表
    getDataServiceListByMe(params, config) {
        return get('/api/cos3-portal-manager/dataService/select/getserviceListByMe', params, config);
    },
    // 获取当前服务共享给的人
    selectDataServicePermissionByUser(params, config) {
        return post('/api/cos3-portal-manager/dataService/select/selectPermissionByUser', params, config);
    },
    //我的所有数据服务列表
    getListServiceNoCLassify(params, config) {
        return get('/api/cos3-portal-manager/dataService/select/getListServiceNoCLassify', params, config);
    }
}
export default mapBuilderApi;