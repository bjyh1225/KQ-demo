const path = require('path');
const fs = require("fs");
const result={};
const filePath="src/systemConfig/defaultThumbnailConfig/defaultThumbnailConfig.js";
const task=[
  {
    key:"function",
    pre:"/config/imageConfig/function/functionService/",
    path:"public/config/imageConfig/function/functionService/"
  },
  {
    key:"map",
    pre:"/config/imageConfig/function/mapService/",
    path:"public/config/imageConfig/function/mapService/"
  },
  {
    key:"scene",
    pre:"/config/imageConfig/function/threeDimensional/",
    path:"public/config/imageConfig/function/threeDimensional/"
  },
  {
    key:"file",
    pre:"/config/imageConfig/function/file/",
    path:"public/config/imageConfig/function/file/"
  },
  {
    key:"app",
    pre:"/config/imageConfig/function/app/",
    path:"public/config/imageConfig/function/app/"
  },
  {
    key:"datacenter",
    pre:"/config/imageConfig/function/data/",
    path:"public/config/imageConfig/function/data/"
  },
  {
    key:"data",
    pre:"/config/imageConfig/function/dataService/",
    path:"public/config/imageConfig/function/dataService/"
  }
]
function resolve(dir){
  return path.join(__dirname,dir);
}

function createFile(){
  let wait=task.some(item=>{
    if(!item.status){
      return true;
    }
    else{
      return false;
    }
  })
  if(!wait){
    fs.writeFile(resolve(filePath), `export const defaultThumbnailConfig=${JSON.stringify(result)}`, function(err) {
      if(err) {
        return console.log(err);
      }
    });
  }
}

function getFile(info){
  let pathAll=resolve(info.path);
  fs.readdir(pathAll,function(err,files){
    if(err) {
      return console.log(err);
    }
    (function iterator(i){
      if(i == files.length) {
        task.some(item=>{
          if(item.key==info.key){
            item.status=true;
            return true;
          }
        })
        createFile();
        return true;
      }
      fs.stat(path.join(pathAll,files[i]),function(err, data){  
        if(err) {
          return console.log(err);
        } 
        if(data.isFile()){   
          if(!result[info.key]){
            result[info.key]=[];
          }            
          result[info.key].push({
            id:i,
            imgUrl:info.pre+files[i]
          });
        }
        iterator(i+1);
       });   
    })(0);
  })
}

function createThumbnailConfig(){
  task.forEach(item=>{
    getFile(item);
  })
}

createThumbnailConfig();