/**
 * 引用路径 import {sliceFileUpload} from '@/utils/sliceFileUpload.js'
 *config[Object],配置项
 *{
  id[string||Array]:触发文件上传元素的id,
  autoStart[Boolean]:true/false,为true表示选择完文件自动上传
  uploadParams[Object]:初始化时的参数
  eventListener[Object]:事件监听，该封装内做了一些默认的处理，但还有一些未作处理,key值需要是plupload官方监听名称
 } 
 返回值：
 {
  uploadInstance:uploader的实例
  start():全部开始
  stop():全部停止
  cancelFileUpload(id):单个文件取消上传
  pauseFileUpload(id):单个文件暂停上传
  pauseFileUpload(id):单个文件继续上传
  deleteAllFile():删除全部文件
  destroy():销毁实例
  setOptions(options[Object]):设置多个属性//会覆盖原始的
  addOptions(options[Object]):新增属性//不会覆盖原始的
  （注意：以上方法操作均是操作plupload内部内容，自己的业务逻辑需要自己控制）
 }
 */

import plupload from "plupload";
import {deepClone} from '@/utils/deepClone.js'
const defaultParams={
  chunk_size: "1mb",
  url : '/api/cos3-portal-manager/sliceFile/sliceFileUploadToCommon'
};
let routerChangeTime=null;
let sliceFileUploadTask={};

class SliceFileUploadInstance{
  constructor(instance,config){
    this.uploadInstance=instance;
    this.uploadConfig=config;
    this.tempRemove=[];
  }
  start(){
    this.uploadInstance.start();
  }
  stop(){
    this.uploadInstance.stop();
  }
  cancelFileUpload(id){
    let file=this.uploadInstance.getFile(id);
    this.uploadInstance.removeFile(file);
  }
  pauseFileUpload(id){
    this.uploadInstance.stop();
    let file=this.uploadInstance.getFile(id);
    file.tempSource=file.getNative();
    this.tempRemove.push(file);
    this.uploadInstance.removeFile(file);
    this.uploadInstance.start();
  }
  continueFileUpload(id){
    this.uploadInstance.stop();
    let file=null;
    this.tempRemove.forEach(item=>{
      if(item.id==id){
        file=item;
      }
    })
    if(file){
      this.uploadInstance.addFile(file.tempSource,file.name);
    }
    this.uploadInstance.start();
  }
  deleteAllFile(){
    this.uploadInstance.stop();
    this.uploadInstance.files.forEach(item=>{
      this.cancelFileUpload(item.id);
    })
  }
  destroy(){
    sliceFileUploadTask[this.uploadConfig.id]=null;
    this.uploadInstance.destroy();
  }
  setOptions(options){
    this.uploadInstance.setOption(options);
  }
  addOptions(options){
    Object.keys(options).forEach(key=>{
      this.uploadInstance.setOption(key,options[key]);
    })
  }
}

export function sliceFileUpload(config={}){
  if(!config.id){
    console.error("进行文件切片上传，必须传入触发id")
    return false;
  }
  if(typeof config.id==='string'){
    let instance=createSliceFileUploadInstance(config);
    return instance;
  }
  else if(Array.isArray(config.id)){
    let instances={};
    config.id.forEach(item=>{
      let configCopy=deepClone(config);
      configCopy.id=item;
      instances[item]=createSliceFileUploadInstance(configCopy);
    })
    return instances;
  }
  else{
    console.error("传入的触发id，仅支持字符串或数组形式");
    return false;
  }
}

function createSliceFileUploadInstance(config){
  let uploadInstance;
  //路由改变进行重置
  if(routerChangeTime!=window.portalRouterInfo.routerChangeTime){
    routerChangeTime=window.portalRouterInfo.routerChangeTime;
    sliceFileUploadTask={}
  }
  if(!sliceFileUploadTask[config.id]){
    let defaultConfig;
    if(config.uploadParams){
      defaultConfig=Object.assign(defaultParams,config.uploadParams);
    }
    else{
      defaultConfig=defaultParams;
    }
    uploadInstance=new plupload.Uploader({
      browse_button :config.id,
      ...defaultConfig  
    });
    uploadInstance.init();
    const defaultEventListener=['FilesAdded','Error'];
    const allEventListener=[
      'Init',
      'PostInit',
      'OptionChanged',
      'Refresh',
      'StateChanged',
      'UploadFile',
      'BeforeUpload',
      'QueueChanged',
      'UploadProgress',
      'FilesRemoved',
      'FileFiltered',
      'FilesAdded',
      'FileUploaded',
      'ChunkUploaded',
      'UploadComplete',
      'Error',
      'Destroy'
    ];
    if(!config.eventListener){
      config.eventListener={};
    }
    //进行监听绑定
    allEventListener.forEach(item=>{
      if(config.eventListener[item]&&defaultEventListener.indexOf(item)<0&&typeof config.eventListener[item]==='function'){
        uploadInstance.bind(item,config.eventListener[item])
      }
    })
    //绑定进队列
    uploadInstance.bind("FilesAdded",function(uploader, file){
      if(config.eventListener.FilesAdded){
        config.eventListener.FilesAdded(uploader, file);
      }
      if(config.autoStart){
        uploader.start();
      }
    });
    //上传失败
    uploadInstance.bind("Error",function(uploader,errObject){
      if(config.eventListener.Error){
        config.eventListener.Error(uploader,errObject);
      }
      else{
        let errorMsg=config.errorMsg||"上传失败";
        //eslint-disable-next-line
        vm.$message({
          message:errorMsg,
          type: "error"
        });
      }
    });
    sliceFileUploadTask[config.id]=new SliceFileUploadInstance(uploadInstance,config);
    if(!config.regsiterStatus||config.regsiterStatus!='init'){
      setTimeout(function(){
        document.getElementById(config.id).click();
      })
    }
  }
  else{
    let defaultConfig;
    if(config.uploadParams){
      defaultConfig=Object.assign(defaultParams,config.uploadParams);
    }
    else{
      defaultConfig=defaultParams;
    }
    sliceFileUploadTask[config.id].uploadInstance.setOption(defaultConfig);
  }
  return sliceFileUploadTask[config.id];
}