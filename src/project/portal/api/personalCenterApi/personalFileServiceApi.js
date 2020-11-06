
import { post, get } from 'common/config/server/server.js';

const personalFileServiceApi = {
  //我注册的文件列表
  getFileListByUser(params, config) {
    return get('/api/cos3-portal-manager/fileResource/select/getFileListByUser', params, config);
  },
  //获取文件分类列表 GET /fileResource/select/getFileCategory
  getFileCategory(params, config) {
    return get('/api/cos3-portal-manager/fileResource/select/getFileCategory', params, config);
  },
  //隐藏 GET /fileResource/update/getFileHide
  getFileHide(params, config) {
    return get('/api/cos3-portal-manager/fileResource/update/getFileHide', params, config);
  },
  //显示 GET /fileResource/update/getFileShow
  getFileShow(params, config) {
    return get('/api/cos3-portal-manager/fileResource/update/getFileShow', params, config);
  },
  //删除 POST /fileResource/delete/deletefileResourceService
  deletefileResourceService(params, config) {
    return post('/api/cos3-portal-manager/fileResource/delete/deletefileResourceService', params, config);
  },
  //新增文件
  savefileResourceService(params, config) {
    return post('/api/cos3-portal-manager/fileResource/add/savefileResourceService', params, config);
  },
  //获取当前文件的共享信息
  selectPermissionById(params, config) {
    return get('/api/cos3-portal-manager/fileResource/select/selectPermissionById', params, config);
  },
  // //获取应用分类列表 GET /fileResource/select/getFileCategory
  // getFileCategory(params, config) {
  //   return get('/api/cos3-portal-manager/fileResource/select/getFileCategory', params, config);
  // },
}
export default personalFileServiceApi;
