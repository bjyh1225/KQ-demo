import getTreeDoc from 'portal/independentModules/guide/doc/getTreeDoc.js'
import filterArrayByStringDoc from 'portal/independentModules/guide/doc/filterArrayByStringDoc.js'
import overflowEllipsisDoc from 'portal/independentModules/guide/doc/overflowEllipsisDoc.js'
import objectArrayDifferencesDoc from 'portal/independentModules/guide/doc/objectArrayDifferencesDoc.js'
import getTopPermissionDoc from 'portal/independentModules/guide/doc/getTopPermissionDoc.js'
export default [
  {
    functionName:"getTree",
    functionDesc:"生成树",
    doc:getTreeDoc
  },
  {
    functionName:"filterArrayByString",
    functionDesc:"过滤一维数组",
    doc:filterArrayByStringDoc
  },
  {
    functionName:"overflowEllipsis",
    functionDesc:"多行溢出省略号",
    doc:overflowEllipsisDoc
  },
  {
    functionName:"objectArrayDifferences",
    functionDesc:"差异对比",
    doc:objectArrayDifferencesDoc
  },
  {
    functionName:"getTopPermission",
    functionDesc:"获取综合后的权限",
    doc:getTopPermissionDoc
  }
]