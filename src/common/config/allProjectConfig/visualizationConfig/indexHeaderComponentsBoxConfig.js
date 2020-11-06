/*首页头部配置，特点不允许删除或拖动 */
import {sortUtil} from '@/utils/sortUtil.js'
const modulesFiles = require.context('@/project/', true, /visualizationIndexHeaderComponentsConfig\.js$/);
const modules={};
var modulesList=[];
modulesFiles.keys().forEach(item=>{
  var value=modulesFiles(item).default;
  modulesList.push(value);
})
sortUtil(modulesList,['weight'],'desc');
if(modulesList.length>0){
  modules.IndexHeader=modulesList[0].component;
}
else{
  modules.IndexHeader=() => import('portal/independentModules/visualization/components/IndexHeader');
}
export default modules;