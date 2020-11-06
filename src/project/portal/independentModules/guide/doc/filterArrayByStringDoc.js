export default {
  importPath:"import {filterArrayByString} from '@/utils/filterUtils.js'",
  importPathTitle:"引用路径",
  paramsDesc:[
    {
      paramsName:"source",
      paramsType:"Array",
      defalutValue:"无",
      desc:"必须，需要生成树的数组"
    },
    {
      paramsName:"filterString",
      paramsType:"String",
      defalutValue:"无",
      desc:"必须，需过滤的内容"
    },
    {
      paramsName:"filterField",
      paramsType:"String",
      defalutValue:"无",
      desc:"必须，需过滤的字段"
    },
    {
      paramsName:"isLike",
      paramsType:"Boolean",
      defalutValue:"true",
      desc:"是否模糊查询"
    },
    {
      paramsName:"concatField",
      paramsType:"String",
      defalutValue:"value",
      desc:"拼接变量后存放的变量名，默认是value，为了elementui控制使用，默认都会拼一个value"
    }
  ],
  paramsDescTitle:"filterArrayByString方法参数说明",
  codeTitle:"示例代码",
  code:`
  <pre style="
  margin: 0;
  padding: 0;
  color: #606266;
  font-size: 15px;
  line-height: 22px;
  font-family: 'pingfang SC','helvetica neue',arial,'hiragino sans gb','microsoft yahei ui','microsoft yahei',simsun,sans-serif;">
    import {filterArrayByString} from '@/utils/filterArrayByString.js'
    var data=[
      {
        "dept":"总公司",
        "id":"1"
      },
      {
        "dept":"分公司",
        "id":"2",
        "parentId":"1"
      }
    ]
    var result=filterArrayByString(data,'总','dept');
    输出结果：
      [
        {
          "dept":"总公司",
          "id":"1"
        }
      ]
  </pre>
  `
}