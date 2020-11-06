import { get, post } from 'common/config/server/server.js';

const manageFileCategoryApi = {
    //获取文件分类列表
    getFileCategory(config) {
        return get('/api/cos3-portal-manager/fileResource/select/getFileCategory', {}, config);
    },
    //获取当前文件分类信息
    selectFileCategoryById(params, config) {
        return get('/api/cos3-portal-manager/fileResource/select/selectFileCategoryById', params, config);
    },
    //删除文件分类
    deleteFileCategory(params, config) {
        return post('/api/cos3-portal-manager/fileResource/delete/deleteFileCategory', params, config);
    },
    //添加文件分类  POST /fileResource/save/saveFileCategory
    saveFileCategory(params, config) {
        return post('/api/cos3-portal-manager/fileResource/save/saveFileCategory', params, config);
    },
    //验证文件分类是否唯一
    checkTypeName(params, config) {
        return post('/api/cos3-portal-manager/fileResource/select/getFileCategoryOnly', params, config || { loadingText: vm.$t('common.checking') });
    },
    //分类拖动整体保存
    saveServiceCategoryAll(params, config) {
        return post('/api/cos3-portal-manager/fileResource/save/saveServiceCategoryAll', params, config);
    },
}

export default manageFileCategoryApi;