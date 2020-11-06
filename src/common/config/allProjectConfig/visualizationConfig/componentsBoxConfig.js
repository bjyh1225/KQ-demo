/*组件工具箱配置 */
const modulesFiles = require.context('@/project/', true, /visualizationComponentsBoxConfig\.js$/);
var modules=[];
modulesFiles.keys().forEach(item=>{
  var value=modulesFiles(item).default;
  modules=modules.concat(value);
})
export default modules;