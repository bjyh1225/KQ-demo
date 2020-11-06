/*组件列表配置 */
const modulesFiles = require.context('@/project/', true, /visualizationComponentsConfig\.js$/);
const modules={};
modulesFiles.keys().forEach(item=>{
  var value=modulesFiles(item).default;
  Object.assign(modules,value);
})
export default modules;