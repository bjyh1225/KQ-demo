/* eslint-disable */
import {normalLoginTask} from 'common/loginHandle/loginTask.js'
export function reject(error){
  const { response } = error;
  if(response){
    if (response.data.code === 511) {
      MessageBox('您的登录已超时，请重新登录。', '提示', {
        confirmButtonText: '确定'
      }).then(()=>{
        normalLoginTask(vm);
      }).catch(()=>{
        normalLoginTask(vm);
      })
    }
    else if(response.data.code ===401){
      normalLoginTask(vm);
    }
    else{
      if (response.data.msg) {
        vm.$message({
          message:response.data.msg,
          type: "error"
        });
      } else {
        vm.$message({
          message:"接口错误",
          type: "error"
        });
      }
    }
  }
  else{
    if (error.message.includes("Network Error")) {
      vm.$message({
        message:'网络连接错误',
        type: "error"
      });
    }
    if (error.message.includes('timeout')) {
      vm.$message({
        message:'网络请求超时',
        type: "error"
      });
    }
  }
}