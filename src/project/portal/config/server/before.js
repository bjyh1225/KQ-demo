/* eslint-disable */
/**
 * before拦截器,portal提供拦截器会作为默认拦截器
 */
import qs from 'qs';
export function before(config,useHandleList){
  let commonParamsObj={};
  const handleList=["beforeJwtHandle","beforeCustomizeHandle","paramsFarmatHandle"];
  handleList.forEach(func=>{
    if(useHandleList&&Array.isArray(useHandleList)){
      if(useHandleList.indexOf(func)>-1){
        eval(`${func}(config,commonParamsObj)`);
      }
    }
    else{
      eval(`${func}(config,commonParamsObj)`);
    }
  })
}

function beforeJwtHandle(config){
  let jwtConfig=window.portal_config.ENABLE_JWT||false;//是否使用jwt
  if(jwtConfig){
    let jwt = sessionStorage.getItem('jwt') || '';
    config.headers.jwt_auth = jwt;
    config.headers.getJwt=true;
    if(config.data){
      config.data.jwt_auth = jwt;
    }
    if(config.params){
      config.params.jwt_auth = jwt;
    }
  }
}

function beforeCustomizeHandle(config,commonParamsObj){
  if(config.customizeConfig){
    //自定义请求头类型
    if(config.customizeConfig.contentType){
      config.headers["Content-Type"]=config.customizeConfig.contentType;
      commonParamsObj.noQs=true;
    }
    //自定义超时时间
    if(config.customizeConfig.timeout){
      config.timeout=config.customizeConfig.timeout;
    }
    //做旧版本代码兼容性处理
    if(config.customizeConfig.__LOGINTYPE=='dialog'){
      config.customizeConfig.loginType="dialog";
    }
    //做旧版本代码兼容性处理
    if(config.customizeConfig.__NO_INTERCEPT){
      config.customizeConfig.noIntercept=true;
    }
  }
}

function paramsFarmatHandle(config,commonParamsObj){
  if ((config.method == 'post'||config.method == 'put')&&!commonParamsObj.noQs) {
    config.data = qs.stringify(config.data);
  }
}