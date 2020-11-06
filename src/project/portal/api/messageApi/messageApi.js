import { post, get } from 'common/config/server/server.js';

const messageApi = {
  noticeMsgByPost(params, config) {//发送消息通知
    return post('/api/cos3-portal-manager/msg/noticeMsgByPost', params, config);
  },
  sendMsgToGroup(params, config) {//发送消息给一组人
    return post('/api/cos3-portal-manager/msg/sendMsgToGroup', params, config);
  },
  sendMsgToPersonnel(params, config) {//发送消息给个人
    return post('/api/cos3-portal-manager/msg/sendMsgToPersonnel', params, config);
  }
}
export default messageApi;
