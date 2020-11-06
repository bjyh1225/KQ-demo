import { post, get } from 'common/config/server/server.js';

const serviceFileCenApi = {
    // //我注册的文件列表  GET /fileResource/select/getFileList
    getFileList(params, config) {
        return get('/api/cos3-portal-manager/fileResource/select/getFileList', params, config);
    },
    // //置顶 
    saveFileTop(params, config) {
        return post('/api/cos3-portal-manager/fileResource/add/saveFileTop', params, config);
    },
    // //取消置顶 
    deleteFileTop(params, config) {
        return post('/api/cos3-portal-manager/fileResource/delete/deleteFileTop', params, config);
    },
    // //获取应用分类列表 GET /fileResource/select/getFileCategory
    getFileCategory(params, config) {
        return get('/api/cos3-portal-manager/fileResource/select/getFileCategory', params, config);
    },
    // 获取文件详情  单/多文件  
    getFileDetails(params, config) {
        return post('/api/cos3-portal-manager/fileResource/select/getFileDetails', params, config);
    },
    //查询文件集及详情   文件夹
    getFolderDatails(params, config) {
        return get('/api/cos3-portal-manager/fileResource/select/getFolderDatails', params, config);
    },
    //收藏文件
    saveFileCollection(params, config) {
        return post('/api/cos3-portal-manager/fileCollection/add/saveFileCollection', params, config);
    },
    //取消收藏文件
    deleteFileCollection(params, config) {
        return post('/api/cos3-portal-manager/fileCollection/delete/deleteFileCollection', params, config);
    },
    //获取当前拥有的功能资源权限
    getFileServicePermissions(params, config) {
        return get('/api/cos3-portal-manager/fileResource/select/getFileServicePermissions', params, config);
    },
    //文件关键字列表
    getFileKwList(params, config) {
        return get('/api/cos3-portal-manager/fileResource/select/getFileKwList', params, config);
    }
}
export default serviceFileCenApi;