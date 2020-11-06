import {get,post} from 'common/config/server/server.js';

const groupApi = {  
  //新增群组
  save(params,config){
    return post('/api/cos3-portal-manager/personnelGroup/add/save', params,config);
  },
  //删除系统群组
  delById(params,config){
    return post('/api/cos3-portal-manager/personnelGroup/delete/delById', params,config);
  },
  //获取群组全部信息
  getGroupInfosByGroupIds(params,config){
    return get('/api/cos3-portal-manager/personnelGroup/select/getGroupInfosByGroupIds', params,config);
  },
  //分页查询群组列表
  getGroupListByPage(params,config){
    return get('/api/cos3-portal-manager/personnelGroup/select/getGroupListByPage', params,config);
  },
  //根据主键ID得到单个对象
  getOneById(params,config){
    return get('/api/cos3-portal-manager/personnelGroup/select/getOneById', params,config);
  },
  //删除群组资源
	deleltGroupByResource(params,config){
		return post('/api/cos3-portal-manager/personnelGroupResource/delete/deleltGroupByResource', params,config);
	},
	//新增群组资源
	savaGroupByResource(params,config){
		return post('/api/cos3-portal-manager/personnelGroupResource/save/savaGroupByResource', params,config);
  },
  //我的未添加群组的资源
  selectResourceNotGroup(params,config){
    return get('/api/cos3-portal-manager/personnelGroupResource/select/selectResourceNotGroup',params,config);
  },
	//分页查询群组资源列表
	getGroupResourceListByPage(params,config){
		return get('/api/cos3-portal-manager/personnelGroupResource/select/getGroupResourceListByPage', params,config);
	},
  //验证群组名称是否唯一
  validateGroupName(params,config){
    return get('/api/cos3-portal-manager/personnelGroup/select/validateGroupName',params,config);
  },
  //申请加入到群组
  apply2Group(params,config){
    return post('/api/cos3-portal-manager/personnelGroup/add/apply2Group',params,config);
  },
  //审核群组中的申请成员
  audit2Group(params,config){
    return post('/api/cos3-portal-manager/personnelGroup/add/audit2Group',params,config);
  },
  //邀请用户到群组
  inviteUser2Group(params,config){
    return post('/api/cos3-portal-manager/personnelGroup/add/inviteUser2Group',params,config);
  },
  //获取审核用户列表
  getApplyUserList(params,config){
    return get('/api/cos3-portal-manager/personnelGroup/select/getApplyUserList',params,config);
  },
  //查询邀请人员列表分页
  getInviteUserPageList(params,config){
    return get('/api/cos3-portal-manager/personnelGroup/select/getInviteUserPageList',params,config);
  },
  //从群组中踢出用户
  kickOutOfGroup(params,config){
    return post('/api/cos3-portal-manager/personnelGroup/delete/kickOutOfGroup',params,config);
  }
}

export default groupApi;