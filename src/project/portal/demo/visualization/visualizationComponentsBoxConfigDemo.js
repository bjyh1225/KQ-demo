/**
 * 首页定制组件箱配置
 * 在各项目中配置visualizationComponentsBoxConfig.js文件，export default []，必须是数组
 * portal内置三大分类，内置组件（builtIn），布局组件（layout），自定义组件/基础组件（base）
 * 如果想加到portal内置三大分类中需要parentName=builtIn/layout/base，没有添加parentName则会被添加到新的大类
 * title：大类的显示标题
 * name：大类关联parentName的名称
 * icon：大类的图标
 * desc：大类的说明文字
 * componentChild：子组件列表
 * text：子组件显示名字
 * html：子组件显示的html，text和html只会显示一个
 * componentName：子组件的组件名
 * ghostArea：拖动时占位的影子区域
 * propertySetComponentName：属性设置的组件名字
 * defaultParams：默认参数数组，如{ key: "defaultDelImg", value: [], type: "propsConf" }，type值固定为propsConf或者styleConf
 */
//下面注释是示例
// export default [
//   {
//     parentName:"builtIn",
//     text: "我的测试",//热门服务
//     componentName: "Test",
//     ghostArea: `
//     <div style="padding:10px 2%;border:3px solid red;">
//       <div style="outline: 1px dashed #000;height:100px;"></div>
//     </div>`,
//     propertySetComponentName: "Test",
//     defaultParams: [
//       { key: "servicesNumber", value: "4", type: "propsConf" }
//     ]
//   },
//   {
//     title: "测试新东西",
//     name: "newthing",
//     icon: "el-icon-portal-ziyuan2",
//     desc: "visualization.DragTheComponentYouNeed",
//     componentChild: [
//       {
//         text: "visualization.Carousel",//轮播
//         componentName: "IndexBanner",
//         ghostArea: `
//         <div style="padding:10px 2%;border:3px solid red;">
//           <div style="outline: 1px dashed #000;height:100px;"></div>
//         </div>`,
//         propertySetComponentName: "IndexBannerSet",
//         defaultParams: [
//           { key: "defaultDelImg", value: [], type: "propsConf" },
//           { key: "imgList", value: [], type: "propsConf" }
//         ]
//       },
//       {
//         text: "visualization.HotServices",//热门服务
//         componentName: "HotServices",
//         ghostArea: `
//         <div style="padding:10px 2%;border:3px solid red;">
//           <div style="outline: 1px dashed #000;height:100px;"></div>
//         </div>`,
//         propertySetComponentName: "HotServicesSet",
//         defaultParams: [
//           { key: "servicesNumber", value: "4", type: "propsConf" }
//         ]
//       },
//       {
//         text: "visualization.LatestServices",//最新服务
//         componentName: "LatestServices",
//         ghostArea: `
//         <div style="padding:10px 2%;border:3px solid red;">
//           <div style="outline: 1px dashed #000;height:100px;"></div>
//         </div>`,
//         propertySetComponentName: "LatestServicesSet",
//         defaultParams: [
//           { key: "servicesNumber", value: "4", type: "propsConf" }
//         ]
//       },
//       {
//         text: "visualization.VersionInfo",//版权信息
//         componentName: "IndexCopyrightFooter",
//         ghostArea: `
//         <div style="padding:10px 2%;border:3px solid red;">
//           <div style="outline: 1px dashed #000;height:100px;"></div>
//         </div>`,
//         propertySetComponentName: "defaultSet"
//       }
//     ]
//   }
// ]