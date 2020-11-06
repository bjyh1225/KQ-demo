export default {
  importPath:"import {getTopPermission} from '@/utils/differences.js'",
  importPathTitle:"引用路径",
  paramsDesc:[
    {
      paramsName:"arr",
      defalutValue:"无",
      paramsType:"Array",
      desc:"必须，需比较的数据，权限必须用1或0表示，1表示有该项权限，0表示没有。特殊说明：每条记录需要传入__OPERATIONAL字段，字段取值范围{add,modify,delete,unchanged,last} add表示新增，modify表示修改，delete表示删除，unchanged表示未更改，last表示修改之前的上次记录"
    },
    {
      paramsName:"dimension",
      defalutValue:"无",
      paramsType:"Array",
      desc:"必须，维度，比较权限数据的规则，比如根据某个人比较，如['用户id'，'部门Id'] "
    },
    {
      paramsName:"permission",
      defalutValue:"无",
      paramsType:"Array",
      desc:"必须，权限字段列表，如['权限1','权限2']"
    }
  ],
  paramsDescTitle:"获取综合后的权限参数说明",
  codeTitle:"示例代码",
  code:`
  <pre style="
  margin: 0;
  padding: 0;
  color: #606266;
  font-size: 15px;
  line-height: 22px;
  font-family: 'pingfang SC','helvetica neue',arial,'hiragino sans gb','microsoft yahei ui','microsoft yahei',simsun,sans-serif;">
    import {getTopPermission} from '@/utils/differences.js'
    var arr=[
      {id:"1",name:"A",p1:"1",p2:"0",__OPERATIONAL:"add"},
      {id:"1",name:"A",p1:"0",p2:"0",__OPERATIONAL:"unchanged"}
    ];
    getTopPermission(arr,[id],['p1','p2'])
    输出结果：
    [
      {id:"1",name:"A",p1:"1",p2:"0",__OPERATIONAL:"modify",__ADDPERMISSION:['p1']}
    ]
  </pre>
  `
}