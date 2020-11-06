//import {getswiperList} from 'portal/components/common/uploadClipping/uploadClippingConfig/uploadClippingConfig.js'
//import {getDefaultImg} from 'portal/components/common/uploadClipping/uploadClippingConfig/uploadClippingConfig.js'
import { defaultThumbnailConfig } from "@/systemConfig/defaultThumbnailConfig/defaultThumbnailConfig.js";
// const swiperList = {
//     'function': [
//         { id: 1, imgUrl: "/config/imageConfig/function/functionService/functionService1.png" },
//         { id: 2, imgUrl: "/config/imageConfig/function/functionService/functionService2.png" },
//         { id: 3, imgUrl: "/config/imageConfig/function/functionService/functionService3.png" }
//     ],
//     'map': [
//         { id: 1, imgUrl: "/config/imageConfig/function/mapService/mapService1.png" },
//         { id: 2, imgUrl: "/config/imageConfig/function/mapService/mapService2.png" },
//         { id: 3, imgUrl: "/config/imageConfig/function/mapService/mapService3.png" },
//         { id: 4, imgUrl: "/config/imageConfig/function/mapService/mapService4.png" }
//     ],
//     'scene': [
//         { id: 1, imgUrl: "/config/imageConfig/function/threeDimensional/threeDimensional1.png" },
//         { id: 2, imgUrl: "/config/imageConfig/function/threeDimensional/threeDimensional2.png" },
//         { id: 3, imgUrl: "/config/imageConfig/function/threeDimensional/threeDimensional3.png" },
//         { id: 4, imgUrl: "/config/imageConfig/function/threeDimensional/threeDimensional4.png" },
//         { id: 5, imgUrl: "/config/imageConfig/function/threeDimensional/threeDimensional5.png" }
//     ],
//     'file': [
//         { id: 1, imgUrl: "/config/imageConfig/function/file/compress.png" },
//         { id: 2, imgUrl: "/config/imageConfig/function/file/excel.png" },
//         { id: 3, imgUrl: "/config/imageConfig/function/file/image.png" },
//         { id: 4, imgUrl: "/config/imageConfig/function/file/pdf.png" },
//         { id: 5, imgUrl: "/config/imageConfig/function/file/ppt.png" },
//         { id: 6, imgUrl: "/config/imageConfig/function/file/video.png" },
//         { id: 7, imgUrl: "/config/imageConfig/function/file/word.png" },
//         { id: 8, imgUrl: "/config/imageConfig/function/file/folder.png" },

//     ],
//     'app': [
//         { id: 1, imgUrl: "/config/imageConfig/function/app/app1.png" },
//         { id: 2, imgUrl: "/config/imageConfig/function/app/app2.png" },
//         { id: 3, imgUrl: "/config/imageConfig/function/app/app3.png" },
//         { id: 4, imgUrl: "/config/imageConfig/function/app/app4.png" }
//     ],
//     'mapDrafting': [
//         { id: 1, imgUrl: "/config/imageConfig/function/mapService/mapService1.png" },
//         { id: 2, imgUrl: "/config/imageConfig/function/mapService/mapService2.png" },
//         { id: 3, imgUrl: "/config/imageConfig/function/mapService/mapService3.png" },
//         { id: 4, imgUrl: "/config/imageConfig/function/mapService/mapService4.png" }
//     ],
//     'datacenter': [
//         { id: 1, imgUrl: "/config/imageConfig/function/data/data1.png" },
//         { id: 2, imgUrl: "/config/imageConfig/function/data/data2.png" },
//         { id: 3, imgUrl: "/config/imageConfig/function/data/data3.png" }
//     ],
//     'data': [
//         { id: 1, imgUrl: "/config/imageConfig/function/dataService/dataService1.png" },
//         { id: 2, imgUrl: "/config/imageConfig/function/dataService/dataService2.png" },
//         { id: 3, imgUrl: "/config/imageConfig/function/dataService/dataService3.png" }
//     ],
// }
// const defaultImg = {
//     'mapService': [
//         { id: 1, imgUrl: "/config/imageConfig/function/mapService/mapService1.png" },
//         { id: 2, imgUrl: "/config/imageConfig/function/mapService/mapService2.png" },
//         { id: 3, imgUrl: "/config/imageConfig/function/mapService/mapService3.png" },
//         { id: 4, imgUrl: "/config/imageConfig/function/mapService/mapService4.png" }
//     ],
//     'dataService': [
//         { id: 1, imgUrl: "/config/imageConfig/function/dataService/dataService1.png" },
//         { id: 2, imgUrl: "/config/imageConfig/function/dataService/dataService2.png" },
//         { id: 3, imgUrl: "/config/imageConfig/function/dataService/dataService3.png" }
//     ],
//     'functionService': [
//         { id: 1, imgUrl: "/config/imageConfig/function/functionService/functionService1.png" },
//         { id: 2, imgUrl: "/config/imageConfig/function/functionService/functionService2.png" },
//         { id: 3, imgUrl: "/config/imageConfig/function/functionService/functionService3.png" }
//     ],
//     'sceneService': [
//         { id: 1, imgUrl: "/config/imageConfig/function/threeDimensional/threeDimensional1.png" },
//         { id: 2, imgUrl: "/config/imageConfig/function/threeDimensional/threeDimensional2.png" },
//         { id: 3, imgUrl: "/config/imageConfig/function/threeDimensional/threeDimensional3.png" },
//         { id: 4, imgUrl: "/config/imageConfig/function/threeDimensional/threeDimensional4.png" },
//         { id: 5, imgUrl: "/config/imageConfig/function/threeDimensional/threeDimensional5.png" }
//     ],
//     'fileService': [
//         {
//             type: ['jpg', 'png', 'jpeg', 'gif'],
//             imgUrl: "/config/imageConfig/function/file/image.png"
//         },
//         {
//             type: ['xls', 'xlsx'],
//             imgUrl: "/config/imageConfig/function/file/excel.png"
//         },
//         {
//             type: ['ppt', 'pptx'],
//             imgUrl: "/config/imageConfig/function/file/ppt.png"
//         },
//         {
//             type: ['doc', 'docx'],
//             imgUrl: "/config/imageConfig/function/file/word.png"
//         },
//         {
//             type: ['compress'],
//             imgUrl: "/config/imageConfig/function/file/compress.png"
//         },
//         {
//             type: ['mp4', 'avi', 'mov', 'mkv', 'flv', 'vmvb', 'scs'],
//             imgUrl: "/config/imageConfig/function/file/video.png"
//         }, {
//             type: ['folder'],
//             imgUrl: "/config/imageConfig/function/file/folder.png"
//         }, {
//             type: ['pdf'],
//             imgUrl: "/config/imageConfig/function/file/pdf.png"
//         }
//     ]
//     ,
//     'appbuilder': [
//         { id: 1, imgUrl: "/config/imageConfig/function/app/app1.png" },
//         { id: 2, imgUrl: "/config/imageConfig/function/app/app2.png" },
//         { id: 3, imgUrl: "/config/imageConfig/function/app/app3.png" },
//         { id: 4, imgUrl: "/config/imageConfig/function/app/app4.png" }
//     ],
//     'mapbuilder': [
//         { id: 1, imgUrl: "/config/imageConfig/function/mapService/mapService1.png" },
//         { id: 2, imgUrl: "/config/imageConfig/function/mapService/mapService2.png" },
//         { id: 3, imgUrl: "/config/imageConfig/function/mapService/mapService3.png" },
//         { id: 4, imgUrl: "/config/imageConfig/function/mapService/mapService4.png" }
//     ],
//     'data': [
//         { id: 1, imgUrl: "/config/imageConfig/function/data/data1.png" },
//         { id: 2, imgUrl: "/config/imageConfig/function/data/data2.png" },
//         { id: 3, imgUrl: "/config/imageConfig/function/data/data3.png" }
//     ]

// }

const defaultImg = {
  mapService: defaultThumbnailConfig["map"],
  dataService: defaultThumbnailConfig["data"],
  functionService: defaultThumbnailConfig["function"],
  sceneService: defaultThumbnailConfig["scene"],
  fileService: defaultThumbnailConfig["file"],
  appbuilder: defaultThumbnailConfig["app"],
  mapbuilder: defaultThumbnailConfig["map"],
  data: defaultThumbnailConfig["datacenter"],
};
export function getswiperList(resource) {
  if (defaultThumbnailConfig[resource]) {
    return defaultThumbnailConfig[resource];
  } else {
    return defaultThumbnailConfig["map"];
  }
}
export function getDefaultImg(resourceType) {
  if (defaultImg[resourceType]) {
    return defaultImg[resourceType][0].imgUrl;
  } else {
    return defaultImg["mapService"][0].imgUrl;
  }
}
export function getFileDefaultImg(type) {
  let list = defaultThumbnailConfig["file"];
  let fileArray = [];
  list.forEach((fl) => {
    if (
      fl.imgUrl
        .substring(fl.imgUrl.lastIndexOf("/") + 1, fl.imgUrl.length)
        .indexOf("image") > -1
    ) {
      fileArray.push({
        type: ["jpg", "png", "jpeg", "gif"],
        imgUrl: fl.imgUrl,
      });
    } else if (
      fl.imgUrl
        .substring(fl.imgUrl.lastIndexOf("/") + 1, fl.imgUrl.length)
        .indexOf("excel") > -1
    ) {
      fileArray.push({ type: ["xls", "xlsx"], imgUrl: fl.imgUrl });
    } else if (
      fl.imgUrl
        .substring(fl.imgUrl.lastIndexOf("/") + 1, fl.imgUrl.length)
        .indexOf("ppt") > -1
    ) {
      fileArray.push({ type: ["ppt", "pptx"], imgUrl: fl.imgUrl });
    } else if (
      fl.imgUrl
        .substring(fl.imgUrl.lastIndexOf("/") + 1, fl.imgUrl.length)
        .indexOf("word") > -1
    ) {
      fileArray.push({ type: ["doc", "docx"], imgUrl: fl.imgUrl });
    } else if (
      fl.imgUrl
        .substring(fl.imgUrl.lastIndexOf("/") + 1, fl.imgUrl.length)
        .indexOf("compress") > -1
    ) {
      fileArray.push({ type: ["compress"], imgUrl: fl.imgUrl });
    } else if (
      fl.imgUrl
        .substring(fl.imgUrl.lastIndexOf("/") + 1, fl.imgUrl.length)
        .indexOf("video") > -1
    ) {
      fileArray.push({
        type: ["mp4", "avi", "mov", "mkv", "fl.imgUrlv", "vmvb", "scs"],
        imgUrl: fl.imgUrl,
      });
    } else if (
      fl.imgUrl
        .substring(fl.imgUrl.lastIndexOf("/") + 1, fl.imgUrl.length)
        .indexOf("folder") > -1
    ) {
      fileArray.push({ type: ["folder"], imgUrl: fl.imgUrl });
    } else if (
      fl.imgUrl
        .substring(fl.imgUrl.lastIndexOf("/") + 1, fl.imgUrl.length)
        .indexOf("pdf") > -1
    ) {
      fileArray.push({ type: ["pdf"], imgUrl: fl.imgUrl });
    } else {
      fileArray.push({ type: [], imgUrl: fl.imgUrl });
    }
  });
  let url = "";
  let status = fileArray.some((item) => {
    if (item.type.indexOf(type) > -1) {
      url = item.imgUrl;
      return true;
    } else {
      return false;
    }
  });
  if (!status) {
    url = defaultThumbnailConfig.file[0].imgUrl;
  }
  return url;
}
