const modulesFiles = require.context('@/project/', true, /apiConfig\.js$/);
const modules={};
modulesFiles.keys().forEach(item=>{
  var value=modulesFiles(item).default;
  Object.assign(modules,value);
})
export default modules;
