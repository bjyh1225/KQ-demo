/* eslint-disable */
import {normalLoginTask} from 'common/loginHandle/loginTask.js'
export function resolve(res){
  let code = res.data.code;
  if (code === 200) {
    return false;
  }
  else{
    if (code == 511) {
      MessageBox('您的登录已超时，请重新登录。', '提示', {
        confirmButtonText: '确定'
      }).then(()=>{
        normalLoginTask(vm);
      }).catch(()=>{
        normalLoginTask(vm);
      })
    }
    else if(code ===401){
      normalLoginTask(vm);
    }
    else{
      if (res.data.msg) {
        vm.$message({
          message:res.data.msg,
          type: "error"
        });
      } else {
        vm.$message({
          message:"接口错误",
          type: "error"
        });
      }
    }
    return true;
  }
}