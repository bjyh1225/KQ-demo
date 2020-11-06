export default {
  importPath:"import {overflowEllipsis} from '@/utils/overflowEllipsis.js'",
  importPathTitle:"引用路径",
  paramsDesc:[
    {
      paramsName:"containerClassName",
      defalutValue:"无",
      paramsType:"String",
      desc:"必须，外部高度容器类名"
    },
    {
      paramsName:"textClassName",
      defalutValue:"无",
      paramsType:"String",
      desc:"必须，文字容器类名"
    },
    {
      paramsName:"num",
      defalutValue:"50",
      paramsType:"Number",
      desc:"避免死循环的比较次数，默认为50"
    }
  ],
  paramsDescTitle:"多行溢出省略号参数说明",
  codeTitle:"示例代码",
  code:`
  <pre style="
  margin: 0;
  padding: 0;
  color: #606266;
  font-size: 15px;
  line-height: 22px;
  font-family: 'pingfang SC','helvetica neue',arial,'hiragino sans gb','microsoft yahei ui','microsoft yahei',simsun,sans-serif;">
    &lt;template&gt;
      &lt;div class='heightContainer' &gt;
        &lt;div class='fontContainer' &gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/template&gt;
    &lt;script&gt;
      import {overflowEllipsis} from '@/utils/overflowEllipsis.js'
      export default {
        mounted(){
          overflowEllipsis('heightContainer','fontContainer')
        }
      }
    &lt;/script&gt;
  </pre>
  `
}