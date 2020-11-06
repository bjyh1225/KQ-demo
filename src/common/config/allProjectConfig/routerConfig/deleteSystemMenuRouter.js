/*覆盖portal中默认的路由，其中name属性不能覆盖 */
import {sortUtil} from '@/utils/sortUtil.js'
const modulesFiles = require.context('@/project/', true, /deleteMenuRouter\.js$/);
var modules=[];
var modulesList=[];
modulesFiles.keys().forEach(item=>{
  var value=modulesFiles(item).default;
  modulesList.push(value);
})
sortUtil(modulesList,['weight'],'desc');
if(modulesList.length>0){
  //portal作为base
  if(process.env.VUE_APP_SRC=='src/project/portal'){//取非独立的top1
    modulesList.some(item=>{
      if(item.scope!="independentRouter"&&item.deleteMenuRouter){
        modules=item.deleteMenuRouter;
        return true;
      }
      else{
        return false;
      }
    })
  }
  else{//根据SRC进行匹配后的top1
    modulesList.some(item=>{
      if(item.scope=="independentRouter"&&process.env.VUE_APP_SRC==item.scopeSRC&&item.deleteMenuRouter){
        modules=item.deleteMenuRouter;
        return true;
      }
      else{
        return false;
      }
    })
  }
}
export default modules;