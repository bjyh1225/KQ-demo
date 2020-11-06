export default {
  importPath:"import {getTree} from '@/utils/getTree.js'",
  importPathTitle:"引用路径",
  paramsDesc:[
    {
      paramsName:"source",
      paramsType:"Array",
      defalutValue:"无",
      desc:"必须，需要生成树的数组"
    },
    {
      paramsName:"id",
      paramsType:"String",
      defalutValue:"id",
      desc:"用作比较的字段名"
    },
    {
      paramsName:"parentId",
      paramsType:"String",
      defalutValue:"parentId",
      desc:"用作比较的父字段名"
    },
    {
      paramsName:"children",
      paramsType:"String",
      defalutValue:"children",
      desc:"子节点挂载名"
    },
    {
      paramsName:"isRootRules",
      paramsType:"Function",
      defalutValue:"无",
      desc:"自定义根节点判断规则，默认规则parentId为空或0或undefined或未找到父节点"
    },
    {
      paramsName:"childrenHandle",
      paramsType:"Function",
      defalutValue:"无",
      desc:"自定义子节点处理函数"
    },
    {
      paramsName:"isNullChild",
      paramsType:"Boolean",
      defalutValue:"false",
      desc:"如果没有子节点，是否需要拼一个空数组进父节点中，默认是不拼"
    },
    {
      paramsName:"isAddContact",
      paramsType:"Boolean",
      defalutValue:"false",
      desc:"是直接替换父节点的children值，还是进行push，默认是直接替换"
    }
  ],
  paramsDescTitle:"getTree方法参数说明",
  codeTitle:"示例代码",
  code:`
  <pre style="
  margin: 0;
  padding: 0;
  color: #606266;
  font-size: 15px;
  line-height: 22px;
  font-family: 'pingfang SC','helvetica neue',arial,'hiragino sans gb','microsoft yahei ui','microsoft yahei',simsun,sans-serif;">
    import {getTree} from '@/utils/getTree.js'
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
    var result=getTree(data);
    输出结果：
      [
        {
          "dept":"总公司",
          "id":"1",
          "children":[
            {
              "dept":"分公司",
              "id":"2",
              "parentId":"1"
            }
          ]
        }
      ]
  </pre>
  `
}