/*组件的属性设置组件配置 */
const modulesFiles = require.context('@/project/', true, /visualizationPropertySetConfig\.js$/);
const modules={};
modulesFiles.keys().forEach(item=>{
  var value=modulesFiles(item).default;
  Object.assign(modules,value);
})
export default modules;