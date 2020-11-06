var defaultData= [
  {
    title: "visualization.BuiltinComponents",
    name: "builtIn",
    icon: "el-icon-portal-ziyuan2",
    desc: "visualization.DragTheComponentYouNeed",
    componentChild: [
      // {
      //   text: "visualization.Carousel",//轮播
      //   componentName: "IndexBanner",
      //   ghostArea: `
      //   <div style="padding:10px 2%;border:3px solid red;">
      //     <div style="outline: 1px dashed #000;height:100px;"></div>
      //   </div>`,
      //   propertySetComponentName: "IndexBannerSet",
      //   defaultParams: [
      //     { key: "defaultDelImg", value: [], type: "propsConf" },
      //     { key: "imgList", value: [], type: "propsConf" }
      //   ]
      // },
      {
        text: "visualization.HotServices",//热门服务
        name:"HotServices",
        componentName: "HotServices",
        ghostArea: `
        <div style="padding:10px 2%;border:3px solid red;">
          <div style="outline: 1px dashed #000;height:100px;"></div>
        </div>`,
        propertySetComponentName: "HotServicesSet",
        defaultParams: [
          { key: "servicesNumber", value: "4", type: "propsConf" }
        ]
      },
      {
        text: "visualization.LatestServices",//最新服务
        componentName: "LatestServices",
        ghostArea: `
        <div style="padding:10px 2%;border:3px solid red;">
          <div style="outline: 1px dashed #000;height:100px;"></div>
        </div>`,
        propertySetComponentName: "LatestServicesSet",
        defaultParams: [
          { key: "servicesNumber", value: "4", type: "propsConf" }
        ]
      },
      {
        text: "应用构建",//应用构建
        name:"AppBuild",
        componentName: "AppBuild",
        ghostArea: `
        <div style="padding:10px 2%;border:3px solid red;">
          <div style="outline: 1px dashed #000;height:100px;"></div>
        </div>`,
        propertySetComponentName: "defaultSet"
      },
      {
        text: "KQGIS开发",//KQGIS开发
        name:"KqgisDevlop",
        componentName: "KqgisDevlop",
        ghostArea: `
        <div style="padding:10px 2%;border:3px solid red;">
          <div style="outline: 1px dashed #000;height:100px;"></div>
        </div>`,
        propertySetComponentName: "defaultSet"
      },
      {
        text: "visualization.VersionInfo",//版权信息
        componentName: "IndexCopyrightFooter",
        ghostArea: `
        <div style="padding:10px 2%;border:3px solid red;">
          <div style="outline: 1px dashed #000;height:100px;"></div>
        </div>`,
        propertySetComponentName: "CopyRightSet",
        defaultParams: [
          { key: "copyRightText", value: "Copyright © 2019 苍穹数码技术股份有限公司 All rights reserved", type: "propsConf" }
        ]
      }
    ]
  },
  {
    title: "visualization.LayoutComponents",
    name: "layout",
    icon: "el-icon-portal-zujian",
    desc: "visualization.HereYouCanSetLayouHere",
    componentChild: [{
      text: "visualization.OneColumnLayout",//一栏布局
      html: `<span class='layout-one'>24</span>`,
      componentName: "BaseLayout",
      colConf: [24],
      componentsList: [],
      ghostArea: `
        <div style="padding:10px 2%;border:3px solid red;">
          <div style="outline: 1px dashed #000;height:100px;"></div>
        </div>`,
      propertySetComponentName: "defaultSet"
    },
    {
      text: "visualization.TwoColumnLayout",//两栏布局
      html: `<span class='layout-two'>12</span><span class='layout-two'>12</span>`,
      componentName: "BaseLayout",
      colConf: [12, 12],
      componentsList: [],
      ghostArea: `
        <div style="padding:10px 2%;border:3px solid red;overflow:hidden;">
          <div style="outline: 1px dashed #000;height:100px;float:left;width:50%;"></div>
          <div style="outline: 1px dashed #000;height:100px;float:left;width:50%;"></div>
        </div>`,
      propertySetComponentName: "defaultSet"
    },
    {
      text: "visualization.ThreeColumnLayout",//三栏布局
      html: `<span class='layout-three'>8</span><span class='layout-three'>8</span><span class='layout-three'>8</span>`,
      componentName: "BaseLayout",
      colConf: [8, 8, 8],
      componentsList: [],
      ghostArea: `
        <div style="padding:10px 2%;border:3px solid red;overflow:hidden;">
          <div style="outline: 1px dashed #000;height:100px;float:left;width:33.33%;"></div>
          <div style="outline: 1px dashed #000;height:100px;float:left;width:33.33%;"></div>
          <div style="outline: 1px dashed #000;height:100px;float:left;width:33.33%;"></div>
        </div>`,
      propertySetComponentName: "defaultSet"
    },
    {
      text: "visualization.CustomLayout",//自定义布局
      name: "CustomizeLayout",
      noDrag: true,
      componentRender: "CustomizeLayout",
      componentName: "BaseLayout",
      componentRenderInfoKey: "layoutValue",
      colConf: [],
      componentsList: [],
      ghostArea: `
        <div style="padding:10px 2%;border:3px solid red;">
          <div style="outline: 1px dashed #000;height:100px;"></div>
        </div>`,
      propertySetComponentName: "defaultSet"
    }
    ]
  }
  // {
  //   title: "visualization.CustomComponents",
  //   name: "base",
  //   icon: "el-icon-portal-zujianku",
  //   desc: "visualization.YouCanCustomizeComponentsHere",
  //   componentChild: [{
  //     text: "visualization.Custom",//自定义
  //     componentName: "Customize",
  //     ghostArea: `
  //       <div style="padding:10px 2%;border:3px solid red;">
  //         <div style="outline: 1px dashed #000;height:100px;"></div>
  //       </div>`,
  //     propertySetComponentName: "defaultSet"
  //   }
  //   ]
  // }
]

import otherComponentBox from 'common/config/allProjectConfig/visualizationConfig/componentsBoxConfig.js'
import coverDefaultComponentBox from 'common/config/allProjectConfig/visualizationConfig/coverComponentsBoxConfig.js';
if(coverDefaultComponentBox.length>0){
  defaultData=coverDefaultComponentBox;
}
var tempOtherData=[];
otherComponentBox.forEach(box=>{
  var item=JSON.parse(JSON.stringify(box));
  var itemPushStatus=false;
  defaultData.forEach(defaultBox=>{
    if(item.parentName==defaultBox.name){
      defaultBox.componentChild.push(item);
      itemPushStatus=true;
    }
  })
  if(!itemPushStatus){
    tempOtherData.push(item);
  }
  // if(item.parentName=='builtIn'){
  //   defaultData[0].componentChild.push(item);
  // }
  // else if(item.parentName=='layout'){
  //   defaultData[1].componentChild.push(item);
  // }
  // else if(item.parentName=='base'){
  //   // defaultData[2].componentChild.push(item);
  // }
  // else{
  //   defaultData.push(item)
  // }
})
defaultData=defaultData.concat(tempOtherData);
export default defaultData;