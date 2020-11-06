/* eslint-disable */
/**
 * resolve拦截器,portal提供拦截器会作为默认拦截器
 */
import {jwtLoginHandle} from 'common/loginHandle/loginHandle.js'
import {MessageBox} from 'element-ui';
import {dialogLoginTask,normalLoginTask} from 'common/loginHandle/loginTask.js'
import {statusCode} from 'common/statusCode/statusCode.js'
import {resetAllUserAndMenuRouter} from 'common/loginHandle/resetUtil.js'
import {setDefaultMenuAndRouter} from 'common/routerUtils/setDefaultMenuAndRouter.js'
import {convertDateUtils} from 'common/convertDateUtils/convertDateUtils.js'

export function resolve(res,useHandleList){
  let commonParamsObj={errorStatus:false};
  const handleList=["resolveJwtHandle","resolveStatusErrorHandle","resolveResetUserHandle","resovleConvertDateHandle"];
  handleList.forEach(func=>{
    if(useHandleList&&Array.isArray(useHandleList)){
      if(useHandleList.indexOf(func)>-1){
        eval(`${func}(res,commonParamsObj)`);
      }
    }
    else{
      eval(`${func}(res,commonParamsObj)`);
    }
  })
  return commonParamsObj.errorStatus;
}

function resolveJwtHandle(res){
  let jwtConfig=window.portal_config.ENABLE_JWT||false;//是否使用jwt
  if(jwtConfig){
    var jwt = res.headers.jwt || '';
    if(jwt){
      sessionStorage.setItem('jwt', jwt);
    }
    //写入登录信息
    if(JSON.stringify(vm.$store.getters.userInfo)=='{}'&&res.headers.lgnuinfo){
      let lgnuinfo=JSON.parse(res.headers.lgnuinfo);
      jwtLoginHandle(vm,lgnuinfo.data);
    }
  }
}

function resolveStatusErrorHandle(res,commonParamsObj){
  if(res.data && res.data.status && res.data.status != 200){
    let customizeConfig=res.config.customizeConfig;
    //状态码逻辑覆盖机制
    if(customizeConfig&&customizeConfig.coverStatusCode){
      Object.keys(customizeConfig.coverStatusCode).forEach(key=>{
        Object.keys(customizeConfig.coverStatusCode[key]).forEach(ckey=>{
          statusCode[key][ckey]=customizeConfig.coverStatusCode[key][ckey];
        })
      })
    }
    //全局状态码统一拦截逻辑
    let code=res.data.status;
    if(statusCode[code]&&statusCode[code].needAlertMessage&&statusCode[code].tips){
      vm.$message({
        message:vm.$t(statusCode[code].tips),
        type:statusCode[code].messageType||'error'
      });
    }
    if (res.data.status === 401&&customizeConfig.loginType!='dialog') {
      normalLoginTask(vm);
    }
    if(res.data.status === 401&&customizeConfig.loginType=='dialog'){
      dialogLoginTask(vm);
    }
    if(res.data.status === 400){
      MessageBox('该账号已经在另一台机器上登录，您被迫下线！', '提示', {
        confirmButtonText: '确定'
      }).then(()=>{
        normalLoginTask(vm);
      })
    }
    if (res.data.status === 404) {
      vm.$router.push({
        path: '/404'
      });
    }
    if (res.data.status === 504){
      vm.$message({
        message:'接口错误',
        type: "error"
      });
    }
    if (res.data.status === 500){
      vm.$message({
        message:'接口错误',
        type: "error"
      });
    }
    commonParamsObj.errorStatus=true;
  }
}

function resolveResetUserHandle(res){
  if(JSON.stringify(vm.$store.getters.userInfo)!="{}"&&!sessionStorage.getItem('userInfo')){
    //重置登录和菜单信息，用于缓存清除这种情况
    resetAllUserAndMenuRouter(vm);
    setDefaultMenuAndRouter(vm);
  }
}

function resovleConvertDateHandle(res){
  if(res.data&&res.data.data){
    convertDateUtils(res.data.data);
  }
}