/*覆盖portal中默认的组件工具箱配置 */
import {sortUtil} from '@/utils/sortUtil.js'
const modulesFiles = require.context('@/project/', true, /visualizationCoverComponentsBoxConfig\.js$/);
var modules=[];
var modulesList=[];
modulesFiles.keys().forEach(item=>{
  var value=modulesFiles(item).default;
  modulesList.push(value);
})
sortUtil(modulesList,['weight'],'desc');
if(modulesList.length>0){
  modules=modulesList[0].componentsBoxConfig;
}
export default modules;