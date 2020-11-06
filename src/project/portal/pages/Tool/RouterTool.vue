<template>
  <div>
    <p>菜单路由配置工具<span style="font-size:14px;">(注意：本工具仅提供基础配置，更多配置参考二次开发手册)</span></p>
    <div style="width:600px;">
      <el-form :model="routerForm" label-width="150px">
        <el-divider content-position="left">菜单路由基本信息</el-divider>
        <el-form-item label="路由名称：">
          <el-input v-model="routerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="路由路径：">
          <el-input v-model="routerForm.path"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径：">
          <el-input v-model="routerForm.menuPath"></el-input>
          <span>(说明：在无菜单路径时，路由路径默认为菜单路径)</span>
        </el-form-item>
        <el-form-item label="菜单显示名称：">
          <el-input v-model="routerForm.menuName"></el-input>
        </el-form-item>
        <el-form-item label="菜单顺序：">
          <el-input v-model="routerForm.sortNo"></el-input>
          <span>(说明：为数字，数字越大排越后)</span>
        </el-form-item>
        <el-form-item label="组件名称：">
          <el-input v-model="routerForm.component"></el-input>
        </el-form-item>
        <el-form-item label="是否第三方链接：">
          <el-radio-group v-model="routerForm.externalLinksRouter">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-divider content-position="left">菜单路由层级关系</el-divider>
        <el-form-item label="父节点名称：">
          <el-input v-model="routerForm.parent"></el-input>
        </el-form-item>
        <el-form-item label="路由挂载节点名称：">
          <el-input v-model="routerForm.routerParentNode"></el-input>
          <span>(说明：路由挂载与/平级填写root,在/内填写/,在其他节点下填写其他节点的名称)</span>
        </el-form-item>

        <el-divider content-position="left">菜单位置</el-divider>
        <el-form-item label="是否是首页菜单：">
          <el-radio-group v-model="routerForm.isIndexMenu">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="首页但无子菜单：">
          <el-radio-group v-model="routerForm.indexMenuNoChild">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
          <span style="margin-left:20px;">(说明：显示在首页但是无子菜单，可能存在子路由)</span>
        </el-form-item>

        <el-divider content-position="left">权限控制</el-divider>
        <el-form-item label="是否默认显示：">
          <el-radio-group v-model="routerForm.defaultDisplay">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="登录之后自动显示：">
          <el-radio-group v-model="routerForm.afterLoginDefaultDisplay">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="授权时不忽略：">
          <el-radio-group v-model="routerForm.permissionNoIgnore">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
          <span style="margin-left:20px;">(说明：在授权时候不忽略的菜单，即使菜单设置了默认显示，登录后默认显示，主要用于下面部分子菜单需要授权，部分默认显示)</span>
        </el-form-item>

        <el-divider content-position="left">重定向</el-divider>
        <el-form-item label="重定向路径：">
          <el-input v-model="routerForm.redirect"></el-input>
        </el-form-item>
        <el-form-item label="默认重定向第一个：">
          <el-radio-group v-model="routerForm.defaultFirstRedirect">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-divider content-position="left">特殊选项</el-divider>
        <el-form-item label="不挂载路由：">
          <el-radio-group v-model="routerForm.noMountRoute">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="不挂载菜单：">
          <el-radio-group v-model="routerForm.noMountMenu">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div style="margin:20px 0 50px 0;">
        <el-button type="primary" @click="create">生成菜单路由</el-button>
      </div>
      <div style="position:fixed;right:0;top:100px;width:400px;border:1px solid #ebebeb;min-height:200px;">
        <p>生成的结果(meta属性根据需求自行添加)：</p>
        <div>
          {{result}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menu from 'common/config/allProjectConfig/allProjectMenuRouter.js'
export default {
  name:"RouterTool",
  methods:{
    create(){
      if(!this.routerForm.name){
        this.result="路由名称不能为空";
        return false;
      }
      if(menu[this.routerForm.name]){
        this.result="路由名称已存在";
        return false;  
      }
      this.result=`
        const ${this.routerForm.name}={
          name:'${this.routerForm.name}',
          path:'${this.routerForm.path}',
          component:'${this.routerForm.component}',
          menuPath:'${this.routerForm.menuPath}',
          menuName:'${this.routerForm.menuName}',
          sortNo:${this.routerForm.sortNo},
          parent:'${this.routerForm.parent}',
          routerParentNode:'${this.routerForm.routerParentNode}',
          isIndexMenu:${this.routerForm.isIndexMenu},
          defaultDisplay:${this.routerForm.defaultDisplay},
          afterLoginDefaultDisplay:${this.routerForm.afterLoginDefaultDisplay},
          indexMenuNoChild:${this.routerForm.indexMenuNoChild},
          redirect:'${this.routerForm.redirect}',
          defaultFirstRedirect:${this.routerForm.defaultFirstRedirect},
          permissionNoIgnore:${this.routerForm.permissionNoIgnore},
          externalLinksRouter:${this.routerForm.externalLinksRouter},
          noMountRoute:${this.routerForm.noMountRoute},
          noMountMenu:${this.routerForm.noMountMenu}
        }
      `
    }
  },
  data(){
    return {
      result:'',
      routerForm:{
        name:"",
        path:"",
        component:"",
        menuPath:"",
        menuName:"",
        parent:"",
        routerParentNode:"",
        isIndexMenu:false,
        defaultDisplay:false,
        afterLoginDefaultDisplay:false,
        indexMenuNoChild:false,
        redirect:"",
        defaultFirstRedirect:false,
        sortNo:1,
        permissionNoIgnore:false,
        externalLinksRouter:false,
        noMountRoute:false,
        noMountMenu:false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-divider{
    /deep/ .el-divider__text{
      color:#0c97f3;
    }
  }
</style>