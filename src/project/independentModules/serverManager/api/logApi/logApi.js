import {
  get,
} from 'common/config/server/server.js'


const logApi = {
  //查询ext-proxy日志
  searchextlog(params, config) {
    return get('/serverManager/monitor/v1/elk/ext-proxy/log', params, config);
  },

  //获取服务日志
  getaccesslog(params, config) {
    return get('/serverManager/monitor/v1/elk/access-log', params, config);
  },
  //获取系统日志
  getsystemlog(params, config) {
    return get('/serverManager/monitor/v1/elk/system-log', params, config);
  },

  //导出日志
  exportlog(params, config) {
    return get('/serverManager/monitor/v1/elk/excel', params, config);
  },
}

export default logApi;