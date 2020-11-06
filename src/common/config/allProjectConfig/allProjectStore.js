const modulesFiles = require.context('@/project/', true, /storeConfig\.js$/);
const modules={};
modulesFiles.keys().forEach(item=>{
  var value=modulesFiles(item).default;
  Object.assign(modules,value);
})

const gettersModulesFiles = require.context('@/project/', true, /getters\.js$/);
const getters={};
gettersModulesFiles.keys().forEach(item=>{
  var value=gettersModulesFiles(item).default;
  Object.assign(getters,value);
})

export default {
  modules,
  getters
}



