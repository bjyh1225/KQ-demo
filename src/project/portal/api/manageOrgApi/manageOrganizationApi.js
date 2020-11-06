import {post,get} from 'common/config/server/server.js';

const manageOrganizationApi = {        
  getDepByNameAndDimension(params,config){
    return get('/api/cos3-portal-manager/org/select/getDepByNameAndDimension',params,config);  
  },
  save(params,config){
    return post('/api/cos3-portal-manager/org/add/save',params,config);  
  },
  validateCode(params,config){
    return get('/api/cos3-portal-manager/org/select/isExitOrgCode',params,config||{loadingText:vm.$t('common.checking')});  
  },
  delOrgById(params,config){
    return get('/api/cos3-portal-manager/org/delete/delOrgById',params,config);  
  },
  //根据组织机构获取职位
  getPositionPageByOrgId(params,config){
    return get('/api/cos3-portal-manager/positionManage/select/getPositionPageByOrgId',params,config);  
  },
  //组织机构和职位关联
  orgConnectPost(params,config){
    return post('/api/cos3-portal-manager/positionManage/connectd/orgConnectPost',params,config);  
  },
  //根据组织机构获取全部职位
  getPositionListByOrgId(params,config){
    return get('/api/cos3-portal-manager/positionManage/select/getPositionListByOrgId',params,config);  
  },
  //批量删除职位
  deletePositionInfoByIds(params,config){
    return post('/api/cos3-portal-manager/positionManage/delete/deletePositionInfoByIds',params,config);  
  },
  //修改排序
  modifyPositionSort(params,config){
    return post('/api/cos3-portal-manager/positionManage/update/modifyPositionSort',params,config);  
  }
}

export default manageOrganizationApi;