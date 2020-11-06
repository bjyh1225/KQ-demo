import { get, post } from 'common/config/server/server.js';

const webSceneBuilderApi = {
  //获取场景分类列表
  getSceneAppCategory(params, config) {
    return get('/api/cos3-portal-manager/scene/select/getSceneAppCategory', params, config);
  },
  //场景列表  
  getSceneAppList(params, config) {
    return get('/api/cos3-portal-manager/scene/select/getSceneAppList', params, config);
  },
  //获取当前场景分类信息
  selectAppCategoryById(params, config) {
    return get('/api/cos3-portal-manager/scene/select/getSceneCategoryById', params, config);
  },
  //删除场景分类
  deleteSceneAppCategory(params, config) {
    return post('/api/cos3-portal-manager/scene/delete/deleteSceneAppCategory', params, config);
  },
  //添加场景分类
  saveSceneAppCategory(params, config) {
    return post('/api/cos3-portal-manager/scene/save/saveSceneAppCategory', params, config);
  },
  //验证场景分类是否唯一
  getSceneAppCategoryOnly(params, config) {
    return post('/api/cos3-portal-manager/scene/select/getSceneAppCategoryOnly', params, config);
  },
  //置顶场景
  saveSceneAppTop(params, config) {
    return post('/api/cos3-portal-manager/scene/add/saveSceneAppTop', params, config);
  },
  //取消置顶场景
  deleteSceneAppTop(params, config) {
    return post('/api/cos3-portal-manager/scene/delete/deleteSceneAppTop', params, config);
  },
  //新增场景
  saveSceneAppService(params, config) {
    return post('/api/cos3-portal-manager/scene/add/saveSceneAppService', params, config);
  },
  //删除场景
  deleteSceneApp(params, config) {
    return post('/api/cos3-portal-manager/scene/delete/deleteSceneApp', params, config);
  },
  //获取场景详情
  getSceneAppDetails(params, config) {
    return post('/api/cos3-portal-manager/scene/select/getSceneAppDetails', params, config);
  },
  //获取当前拥有的场景资源权限
  getScenebuilderPermissions(params, config) {
    return get('/api/cos3-portal-manager/scene/select/getScenebuilderPermissions', params, config);
  },
  //000根据id查询场景
  selectById(params, config) {
    return get('/api/cos3-portal-manager/scene/get/selectById', params, config);
  },
  //我注册的场景列表
  getListService(params, config) {
    return get('/api/cos3-portal-manager/scene/select/getListService', params, config);
  },
  //获取当前场景的共享信息
  selectPermissionById(params, config) {
    return get('/api/cos3-portal-manager/scene/select/selectPermissionById', params, config);
  },
  //获取当前场景共享给的人
  selectPermissionByUser(params, config) {
    return get('/api/cos3-portal-manager/scene/select/selectPermissionByUser', params, config);
  },
  //注册场景隐藏
  getSceneAppHide(params, config) {
    return get('/api/cos3-portal-manager/scene/update/getSceneAppHide', params, config);
  },
  //注册场景显示
  getSceneAppShow(params, config) {
    return get('/api/cos3-portal-manager/scene/update/getSceneAppShow', params, config);
  },
  // 分类拖动整体保存
  saveServiceCategoryAll(params, config) {
    return post('/api/cos3-portal-manager/scene/save/saveServiceCategoryAll', params, config);
  },
}
export default webSceneBuilderApi;