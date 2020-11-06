/**
 * 覆盖Portal中配置的componentsBox默认配置
 * {
 *  componentsBoxConfig:[], //覆盖默认的配置
 *  weight:1 //权重
 * }
 */
//下面是示例代码
// export default {
//   componentsBoxConfig:[
//     {
//       title: "visualization.BuiltinComponents",
//       name: "builtIn",
//       icon: "el-icon-portal-ziyuan2",
//       desc: "visualization.DragTheComponentYouNeed",
//       componentChild: [
//         {
//           text: "visualization.Carousel",//轮播
//           componentName: "IndexBanner",
//           ghostArea: `
//           <div style="padding:10px 2%;border:3px solid red;">
//             <div style="outline: 1px dashed #000;height:100px;"></div>
//           </div>`,
//           propertySetComponentName: "IndexBannerSet",
//           defaultParams: [
//             { key: "defaultDelImg", value: [], type: "propsConf" },
//             { key: "imgList", value: [], type: "propsConf" }
//           ]
//         },
//         {
//           text: "visualization.HotServices",//热门服务
//           name:"HotServices",
//           componentName: "HotServices",
//           ghostArea: `
//           <div style="padding:10px 2%;border:3px solid red;">
//             <div style="outline: 1px dashed #000;height:100px;"></div>
//           </div>`,
//           propertySetComponentName: "HotServicesSet",
//           defaultParams: [
//             { key: "servicesNumber", value: "4", type: "propsConf" }
//           ]
//         }
//       ]
//     }],
//   weight:1
// }