/* eslint-disable */
/**
 * reject拦截器,portal提供拦截器会作为默认拦截器
 */
import {MessageBox} from 'element-ui';
import {dialogLoginTask,normalLoginTask} from 'common/loginHandle/loginTask.js'
import {statusCode} from 'common/statusCode/statusCode.js'

export function reject(error){
  const { response } = error;
  if (response) {
    let customizeConfig=response.config.customizeConfig;
    //状态码逻辑覆盖机制
    if(customizeConfig&&customizeConfig.coverStatusCode){
      Object.keys(customizeConfig.coverStatusCode).forEach(key=>{
        Object.keys(customizeConfig.coverStatusCode[key]).forEach(ckey=>{
          statusCode[key][ckey]=customizeConfig.coverStatusCode[key][ckey];
        })
      })
    }
    //全局状态码统一拦截逻辑
    let code=response.status;
    if(statusCode[code]&&statusCode[code].needAlertMessage&&statusCode[code].tips){
      vm.$message({
        message:vm.$t(statusCode[code].tips),
        type:statusCode[code].messageType||'error'
      });
    }
    if (response.status === 401&&response.headers&&response.headers.lgntype!='dialog') {
      normalLoginTask(vm);
    }
    if(response.status === 401&&response.headers&&response.headers.lgntype=='dialog'){
      dialogLoginTask(vm);
    }
    if(response.status === 400){
      MessageBox('该账号已经在另一台机器上登录，您被迫下线！', '提示', {
        confirmButtonText: '确定'
      }).then(()=>{
        normalLoginTask(vm);
      }).catch(()=>{
        normalLoginTask(vm);
      })
    }
    if (response.status === 404) {
      vm.$router.push({
        path: '/404'
      });
    }
    if (response.status === 500) {
      vm.$message({
        message:'服务器错误',
        type: "error"
      });
    }
    if (response.status === 900) {
      vm.$router.push({path:"/noAuthority"});
    }
  }
  else {
    if (error.message.includes("Network Error")) {
      vm.$message({
        message:'网络连接错误',
        type: "error"
      });
    }
    if (error.message.includes('timeout')) {   // 判断请求异常信息中是否含有超时timeout字符串
      vm.$message({
        message:'网络请求超时',
        type: "error"
      });
    }
  }
}