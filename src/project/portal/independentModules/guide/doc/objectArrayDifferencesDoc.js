export default {
  importPath:"import {objectArrayDifferences} from '@/utils/differences.js'",
  importPathTitle:"引用路径",
  paramsDesc:[
    {
      paramsName:"oldArray",
      defalutValue:"无",
      paramsType:"Array",
      desc:"必须，需要差异对比的旧数组"
    },
    {
      paramsName:"newArray",
      defalutValue:"无",
      paramsType:"Array",
      desc:"必须，需要差异对比的新数组"
    },
    {
      paramsName:"rules",
      defalutValue:"无",
      paramsType:"Object",
      desc:"必须，addRules新增差异规则，modifyRules修改差异规则，deleteRules删除差异规则"
    },
    {
      paramsName:"callback",
      defalutValue:"无",
      paramsType:"Object",
      desc:"回调函数：四个周期回调add,modify,delete,complete"
    }
  ],
  paramsDescTitle:"差异对比参数说明",
  codeTitle:"示例代码",
  code:`
  <pre style="
  margin: 0;
  padding: 0;
  color: #606266;
  font-size: 15px;
  line-height: 22px;
  font-family: 'pingfang SC','helvetica neue',arial,'hiragino sans gb','microsoft yahei ui','microsoft yahei',simsun,sans-serif;">
    import {objectArrayDifferences} from '@/utils/differences.js'
    var oldData=[
      {id:"1",name:"A",age:"17"},
      {id:"2",name:"B",age:"18"},
      {id:"3",name:"C",age:"19"}
    ];
    var newData=[
      {id:"1",name:"A",age:"18"},
      {id:"2",name:"B",age:"18"},
      {id:"",name:"D",age:"20"}
    ];
    objectArrayDifferences(oldData,newData,{addRules:"id",modifyRules:"id",deleteRules:"id"})
    输出结果：
    {
      addArray:[{id:"",name:"D",age:"20"}],//新增数据
      modifyArray:[{id:"1",name:"A",age:"18"}],//修改数据
      deleteArray:[{id:"3",name:"C",age:"19"}]//删除数据
    }
  </pre>
  `
}