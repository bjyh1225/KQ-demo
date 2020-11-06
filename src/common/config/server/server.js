/* eslint-disable */
import axios from 'axios';
import {Loading} from 'element-ui';
import defaultInterceptor from 'portal/config/server/portalServerInterceptor.js'
import serverInterceptorList from 'common/config/allProjectConfig/allProjectServerInterceptor.js'

window.loadingTask={};
window.loadingTaskSequence=[];
window.loadingInstance=null;
window.currentLoadingTask="";

function addLoadingTask(config,url){
  if(!window.loadingTask[url]){
    window.loadingTask[url]={config:config,status:'wait'};
    window.loadingTaskSequence.push({url:url,config:config});
  }
  startLoading(config,url);
}

function startLoading(config,url) {
  if(window.loadingInstance){
    return false;
  }
  window.currentLoadingTask=url;
  window.loadingTask[url].status='started';
  window.loadingInstance = Loading.service({
    lock: config.lock,
    text: config.text,
    target: config.target || 'document.body',
    background: config.background
  })
}

function endLoading(url) {
  if(!window.loadingTask[url]){
    return false;
  }
  let currentUrl=window.currentLoadingTask;
  let index;
  window.loadingTaskSequence.forEach((item,ix)=>{
    if(item.url==url){
      index=ix;
    }
  })
  if (window.loadingInstance&&url==currentUrl) {
    window.loadingInstance.close();
    window.loadingInstance=null;
    if(window.loadingTaskSequence[index+1]){
      let data=window.loadingTaskSequence[index+1];
      startLoading(data.config,data.url);
    }
  }
  window.loadingTaskSequence.splice(index,1);
  delete window.loadingTask[url];
}

var instance = axios.create({
  timeout: 1000 * 30
});

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
instance.interceptors.request.use(
  config => {
    let customizeConfig=config.customizeConfig;
    Object.keys(serverInterceptorList).forEach(key=>{
      if(serverInterceptorList[key].urlMatch){
        if(config.url.indexOf(key)==0&&!customizeConfig.interceptorName){
          customizeConfig.interceptorName=key;
        }
      }
    })
    if(customizeConfig.interceptorName&&serverInterceptorList[customizeConfig.interceptorName]){
      let interceptor=serverInterceptorList[customizeConfig.interceptorName];
      if(interceptor.before&&typeof interceptor.before==='function'){
        interceptor.before(config);
      }
      else{
        if(interceptor.beforeExtend&&typeof interceptor.beforeExtend==='function'){
          defaultInterceptor.before(config,interceptor.filterDefaultBefore);
          interceptor.beforeExtend(config);
        }
        else{
          if(interceptor.filterDefaultBefore&&Array.isArray(interceptor.filterDefaultBefore)){
            defaultInterceptor.before(config,interceptor.filterDefaultBefore);
          }
          else{
            defaultInterceptor.before(config);
          }
        }
      }
    }
    else{
      defaultInterceptor.before(config);
    }
    return config;
  },
  error => Promise.error(error)
);

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    endLoading(res.config.url);
    let customizeConfig=res.config.customizeConfig;
    if(!customizeConfig.noIntercept){
      let r;
      if(customizeConfig.interceptorName&&serverInterceptorList[customizeConfig.interceptorName]){
        let interceptor=serverInterceptorList[customizeConfig.interceptorName];
        if(interceptor.resolve&&typeof interceptor.resolve==='function'){
          r=interceptor.resolve(res);
        }
        else{
          if(interceptor.resolveExtend&&typeof interceptor.resolveExtend==='function'){
            r=defaultInterceptor.resolve(res,interceptor.filterDefaultResolve);
            r=interceptor.resolveExtend(res,r);
          }
          else{
            if(interceptor.filterDefaultResolve&&Array.isArray(interceptor.filterDefaultResolve)){
              r=defaultInterceptor.resolve(res,interceptor.filterDefaultResolve);
            }
            else{
              r=defaultInterceptor.resolve(res);
            }
          }
        }
      }
      else{
        r=defaultInterceptor.resolve(res);
      }
      if(r){
        return Promise.reject(res);
      }
      else{
        return Promise.resolve(res);
      }
    }
    else{
      return Promise.resolve(res);
    }
  },
  // 请求失败
  error => {
    endLoading(error.config.url);
    let customizeConfig=error.config.customizeConfig;
    if(!customizeConfig.noIntercept){
      if(customizeConfig.interceptorName&&serverInterceptorList[customizeConfig.interceptorName]){
        let interceptor=serverInterceptorList[customizeConfig.interceptorName];
        if(interceptor.reject&&typeof interceptor.reject==='function'){
          interceptor.reject(error);
        }
        else{
          if(interceptor.rejectExtend&&typeof interceptor.rejectExtend==='function'){
            defaultInterceptor.reject(error);
            interceptor.rejectExtend(error);
          }
          else{
            defaultInterceptor.reject(error);
          }
        }
      }
      else{
        defaultInterceptor.reject(error);
      }
      const { response } = error;
      if(response){
        return Promise.reject(response);
      }
      else{
        return Promise.reject(error);
      }
    }
    else{
      return Promise.reject(error);
    }
  }
);

//处理配置
function configHandle(config,url,params) {
  //遮罩层处理
  if (!config.noLoading) {
    var text = config.loadingText ? config.loadingText : 'Loading';
    var target = config.loadingTarget ? config.loadingTarget : '';
    var lock = config.loadingLock ? config.loadingLock : false;
    var background = config.loadingBackground ? config.loadingBackground : 'rgba(244,243,243,0.6)';
    addLoadingTask({
      text,
      lock,
      target,
      background
    },url);
  }
  //去除首尾空格
  if(!config.contentType&&!config.noTrim&&typeof params==='object'&&!Array.isArray(params)){
    Object.keys(params).forEach(key=>{
      if(typeof params[key]=='string'){
        params[key]=params[key].replace(/(^\s*)|(\s*$)/g, "");
      }
    })
  }
}

export function get(url, params, config={}) {
  configHandle(config,url,params);
  return new Promise((resolve, reject) => {
    instance.get(url, {
      params: params,
      customizeConfig:config
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
}

export function post(url, params, config={}) {
  configHandle(config,url,params);
  return new Promise((resolve, reject) => {
    instance.post(url, params,{customizeConfig:config})
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
}

export function put(url, params, config={}) {
  configHandle(config,url,params);
  return new Promise((resolve, reject) => {
    instance.put(url, params,{customizeConfig:config})
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
}

export function del(url, params, config={}) {
  configHandle(config,url,params);
  return new Promise((resolve, reject) => {
    instance.delete(url, {
      params: params,
      customizeConfig:config
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
}