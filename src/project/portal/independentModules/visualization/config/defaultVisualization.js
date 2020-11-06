import guid from 'portal/independentModules/visualization/util/guid.js'
import {sortUtil} from '@/utils/sortUtil.js'
const modulesFiles = require.context('@/project/', true, /visualizationIndexHeaderComponentsConfig\.js$/);
var modulesList=[];
modulesFiles.keys().forEach(item=>{
  var value=modulesFiles(item).default;
  modulesList.push(value);
})
sortUtil(modulesList,['weight'],'desc');
let config={
  id: guid(),
  imgListUrl: '',
  imgList: [],
  componentName: "IndexHeader",
  propertySetComponentName: "IndexHeaderSet",
  propsConf:{defaultDelImg:[],imgList:[]}
}

if(modulesList.length>0){
  if(modulesList[0].config){
    config=modulesList[0].config;
    config.id=guid();
  }
}
export const defaultHeader = config;

export const defaultComponents = [
  // { 
  // "text": "轮播", 
  // "componentName": "IndexBanner", 
  // "propertySetComponentName": "IndexBannerSet", 
  // "componentsList": [], 
  // "id": "9b5e34dc-3b52", 
  // "styleConf": {}, 
  // "propsConf": {
  //   "defaultDelImg":[],
  //   "imgList":[]
  // } 
  // }, 
  { 
  "text": "热门服务", 
  "componentName": "HotServices", 
  "propertySetComponentName": 
  "HotServicesSet", 
  "defaultParams": [
    { 
      "key": "servicesNumber", 
      "value": "4", "type": "propsConf" 
    }], 
  "componentsList": [], 
  "id": "ecda6660-2375", 
  "styleConf": {}, 
  "propsConf": { "servicesNumber": "4" } 
}, 
{ 
  "text": "最新服务", 
  "componentName": "LatestServices", 
  "propertySetComponentName": "LatestServicesSet", 
  "defaultParams": [{ "key": "servicesNumber", "value": "4", "type": "propsConf" }], 
  "componentsList": [], 
  "id": "05dc8f89-3032", 
  "styleConf": {}, 
  "propsConf": { "servicesNumber": "4" } 
}, 
{ 
  "text": "版权信息", 
  "componentName": "IndexCopyrightFooter", 
  "propertySetComponentName": "defaultSet", 
  "componentsList": [], 
  "id": "fdfabd66-a43a", 
  "styleConf": {}, 
  "propsConf": {
    "copyRightText":"Copyright © 2020 苍穹数码技术股份有限公司 All rights reserved"
  } 
}];