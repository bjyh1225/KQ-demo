import {get,post} from 'common/config/server/server.js';

const personalCenterMyMessageApi = {
  //删除全部已读消
  removeHasReadMsgByPersonnelId(config) {
    return get('/api/cos3-portal-manager/message/delete/removeHasReadMsgByPersonnelId', {}, config);
  },
  //删除一条消息
  removeMessageById(params, config) {
    return get('/api/cos3-portal-manager/message/delete/removeMessageById', params, config);
  },
  //获取未读消息列表
  getUnReadMessageList(params, config) {
    return get('/api/cos3-portal-manager/message/select/getUnReadMessageList', params, config||{loadingText:vm.$t('common.checking')});
  },
  //标记全部消息为已读
  batchModifyMessageHasRead(config) {
    return get('/api/cos3-portal-manager/message/update/batchModifyMessageHasRead',{},config);
  },
  //更新已读状态
  modifyMessageHasRead(params, config) {
    return post('/api/cos3-portal-manager/message/update/modifyMessageHasRead', params, config||{loadingText:vm.$t('common.checking')});
  },
  //发送消息
  noticeMsgByPost(params, config){
    return post('/api/cos3-portal-manager/msg/noticeMsgByPost', params, config);
  },
  //获取消息
  getAllHistoryMessage(params, config) {
    return get('/api/cos3-portal-manager/message/select/getAllHistoryMessage', params, config);
  },
  //获取消息配置信息
  getMsgInfo(params,config){
    return get('/api/cos3-portal-manager/msg/get/getMsgInfo',params,config);
  }
}
export default personalCenterMyMessageApi;
