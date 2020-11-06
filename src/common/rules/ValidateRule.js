//base
//调用execute方法执行，传入配置需是对象数组，每个对象必须包含name
//示例[{name:"requiredFieldValidator"}]
//关于扩展：子类实现的效验方法，必须在效验正确时，增长计数器。效验错误时，将工作流状态置位false
//基类提供的方法有
//requiredFieldValidator：效验字段必填，需要传入的参数：errorMsg(发生错误时输入的字符串)
//repeatValidator:字段重复性效验，需要传入的参数：errorMsg(发生错误时输入的字符串)，api(访问后台的api函数),params(api中传入的参数)
//fieldLengthValidator:字段长度效验,需要传入的参数：errorMsg(发生错误时输入的字符串)，maxFieldLength(最大的字段长度)
class ValidateRule{
  constructor(config={}){
    this.errorMsg=config.errorMsg||"error";//效验出错时错误信息,当其他报错信息为空时默认的取值
    this.rule=config.rule;//elementUI中传入的rule
    this.value=config.value;//elementUI中传入的value
    this.callback=config.callback;//elementUI中传入的callback
    this.validateWorkFlowStatus=true;//效验工作流状态,默认是true
    this.validateWorkFlowCount=0;//工作流执行计数
  }
  //效验字段必填
  requiredFieldValidator(validateConfig){
    let {errorMsg}=validateConfig;
    if(!this.value){
      this.validateWorkFlowStatus=false;
      return this.callback(new Error(errorMsg||this.errorMsg));
    }
    else{
      this.validateWorkFlowCount+=1;
    }
  }
  //字段重复性效验
  repeatValidator(validateConfig){
    let {api,params,errorMsg}=validateConfig;
    if(!api||typeof api!='function'){
      console.error("path not configured or is not a function");
      this.validateWorkFlowStatus=false;
      return this.callback(new Error("path not configured or is not a function"));
    }
    api(params).then(res => {
      if (!res.data.data) {
        this.validateWorkFlowStatus=false;
        return this.callback(new Error(errorMsg||this.errorMsg));
      }
      else{
        this.validateWorkFlowCount+=1;
      }
    })
    .catch(() => {
      this.validateWorkFlowStatus=false;
      return this.callback(new Error(this.errorMsg));
    });
  }
  //字段长度效验
  fieldLengthValidator(validateConfig){
    let {maxFieldLength,errorMsg}=validateConfig;
    if(typeof maxFieldLength!='number'){
      console.error("params is not a number");
      this.validateWorkFlowStatus=false;
      return this.callback(new Error("params is not a number"));
    }
    if(this.value.length>maxFieldLength){
      this.validateWorkFlowStatus=false;
      return this.callback(new Error(errorMsg||this.errorMsg));
    }
    else{
      this.validateWorkFlowCount+=1;
    }
  }
  //config必须包含name
  execute(config){
    if(!(config instanceof Array)){
      return false;
    }
    config.forEach(item => {
      if(this.validateWorkFlowStatus&&item.name){
        this[item.name](item);
      }
    });
    var commitInterval=setInterval(()=>{
      if(this.validateWorkFlowCount==config.length&&this.validateWorkFlowStatus){
        this.callback();
        clearInterval(commitInterval);
      }
      if(!this.validateWorkFlowStatus){
        clearInterval(commitInterval);
      }
    })
  }
}

export default ValidateRule;