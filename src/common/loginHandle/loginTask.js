//引用路径 import {dialogLoginTask,normalLoginTask} from 'common/loginHandle/loginTask.js'
import {resetAllUserAndMenuRouter} from 'common/loginHandle/resetUtil.js'
import {setDefaultMenuAndRouter} from 'common/routerUtils/setDefaultMenuAndRouter.js'
/**
 * 
 * @param {Object} _this 当前vue对象
 * @param {Boolean} isSetDefaultMenuRouter 是否设置默认的菜单和路由
 * @param {Boolean} isKeepCurrentUserStatus 是否保持当前用户状态
 */
export function dialogLoginTask(_this,isSetDefaultMenuRouter,isKeepCurrentUserStatus){
  if(!isKeepCurrentUserStatus){
    resetAllUserAndMenuRouter(_this);
  }
  if(isSetDefaultMenuRouter&&!isKeepCurrentUserStatus){
    setDefaultMenuAndRouter(_this);
  }
  _this.$store.dispatch('common/setEventInfo',{
    commonTimeStamp:new Date().getTime(),
    commonEventType:"goToLogin",
    commonSource:"server",
    commonParams:{}
  });
}

export function normalLoginTask(_this,isKeepCurrentUserStatus){
  if(!isKeepCurrentUserStatus){
    resetAllUserAndMenuRouter(_this);
  }
  _this.$router.push({path: '/login'});
}