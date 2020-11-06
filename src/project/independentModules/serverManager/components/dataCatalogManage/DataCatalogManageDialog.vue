<template>
  <div class="manage-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="1000px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>目录管理</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <el-row>
          <el-col :span="10">
            <category-tree 
            :placeholder="'请输入目录'"
            :categoryTree="catalogTree"
            @add="addCatalog"
            @edit="editCatalog"
            @delById="deleteCatalog"
            @draggableTree="draggableTree"
            @saveTree="saveCatalogTree"
            @categorySearch="editCatalog"
            @cancelTree="cancelCatalogTree"
            :draggable="draggable"
            ></category-tree>
          </el-col>
          <el-col :span="14">
            <el-row class="add-edit-catalog">
              <el-row class="op-title">
                <el-divider content-position="left">{{draggable?editingTitle:catalogOperationTitle}}</el-divider>
              </el-row>
              <el-form
                :model="dataCatalogInfo"
                label-width="100px"
                :rules="rules"
                ref="catalogForm"
              >
                <el-form-item :label="'目录名称：'" prop="typeName">
                  <el-input v-model="dataCatalogInfo.typeName" :disabled="draggable"></el-input>
                </el-form-item>
                <el-form-item :label="'所属目录：'">
                  <el-input v-model="dataCatalogInfo.parentTypeName" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item :label="'目录描述：'">
                  <el-input type="textarea" v-model="dataCatalogInfo.comments" :rows="3" :disabled="draggable"></el-input>
                </el-form-item>
              </el-form>
              <el-row class="btn-container">
                <el-button
                  type="primary"
                  icon="el-icon-finished"
                  class="base-btn"
                  @mousedown.native="save"
                  :disabled="draggable"
                >保存</el-button>
              </el-row>
            </el-row>
          </el-col>
        </el-row>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import CategoryTree from "./DataCatalogTree";
export default {
  name: "DataCatalogManageDialog",
  components:{
    CategoryTree
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    catalogList:{
      type:Array,
      default:()=>{
        return []
      }
    }
  },
  watch:{
    dialogVisible(){
      if(this.dialogVisible){
        this.init();
      }
    },
    catalogList(){
      this.resetCatalogTree();
    }
  },
  data() {
    return {
      catalogTree:[],
      copyCatalogTree:[],
      dataCatalogInfo:{},
      catalogOperationTitle:"新建目录",
      editingTitle:"目录编辑中",
      draggable:false,
      rules:{
        typeName:[
          {
            required: true,
            message:"请输入目录名称",
            trigger: "blur",
          }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.$refs.catalogForm.clearValidate();
      this.$emit("dialogClose");
    },
    save(){
      this.$refs.catalogForm.validate((valid) => {
        if (valid) {
          this.$api.dataManageApi.saveCategory(this.dataCatalogInfo,{
            loadingText:"正在保存"
          }).then(()=>{
            this.$message({
              type:"success",
              message:"保存成功"
            })
            this.$emit("updateCatalog");
            this.resetDataCatalogOperation();
          }).catch(()=>{})
        } else {
          return false;
        }
      });
    },
    addCatalog(info){//添加目录
      this.resetDataCatalogInfo();
      if(info.id!="0"){
        this.dataCatalogInfo.parentTypeName=info.typeName;
        this.dataCatalogInfo.parentId=info.id;
      }
      this.catalogOperationTitle="新建目录";
    },
    editCatalog(info){//编辑目录
      this.$api.dataManageApi.getCategoryById({id:info.id},{
        loadingText:"正在查询"
      }).then(res=>{
        let data=res.data.data;
        this.dataCatalogInfo=data;
        this.catalogOperationTitle="编辑目录";
      }).catch(()=>{})
    },
    deleteCatalog(info){
      this.$confirm('确认删除此目录及所有子目录吗？此操作将会删除此目录下的所有数据。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.dataManageApi.deleteCategory({
          id:info.id
        },{loadingText:"正在删除"}).then(()=>{
          this.$message({
            type:"success",
            message:"删除成功"
          })
          if(info.id==this.dataCatalogInfo.id||info.id==this.dataCatalogInfo.parentId){
            this.resetDataCatalogOperation();
          }
          this.$emit("updateCatalog");
        })
      })
    },
    draggableTree(){
      this.draggable=true;
      this.copyCatalogTree=JSON.parse(JSON.stringify(this.catalogTree));
      this.resetDataCatalogOperation();
    },
    saveCatalogTree(){
      this.globalMethods.traversal(this.catalogTree,"children",(current,parent,params,ix)=>{
        if(parent!='root'){
          current.parentId=parent.id;
          current.sortNo=ix;
        }
      })
      this.$api.dataManageApi.saveDragCategory({
        dataJson:JSON.stringify(this.catalogTree[0].children)
      },{
        loadingText:"正在保存"
      }).then(()=>{
        this.$message({
          type:"success",
          message:"保存成功"
        })
        this.draggable=false;
        this.$emit("updateCatalog");
      }).catch(()=>{})
    },
    cancelCatalogTree(){
      this.$confirm('确认取消编辑目录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.catalogTree=this.copyCatalogTree;
        this.draggable=false;
      })
    },
    resetDataCatalogOperation(){
      this.catalogOperationTitle="新建目录";
      this.resetDataCatalogInfo();
    },
    resetDataCatalogInfo(){//重置数据
      this.dataCatalogInfo={
        typeName:"",
        parentTypeName:"",
        id:null,
        parentId:null,
        comments:""
      }
    },
    resetCatalogTree(){
      this.catalogTree=[];
      var root = {
        parentId: "-1",
        id: "0",
        typeName: "数据目录",
        comments: ""
      };
      let data=JSON.parse(JSON.stringify(this.catalogList));
      data.push(root);
      this.catalogTree = this.globalMethods.getTree(
        data,
        "id",
        "parentId",
        "children",
        function(item) {
          return item.parentId == "-1" ? true : false;
        },
        (arr)=>{
          this.globalMethods.sortUtil(arr,['sortNo'],'asc')
        }
      );
      this.globalMethods.sortUtil(this.catalogTree[0].children,['sortNo'],'asc');
    },
    init(){//初始化
      this.draggable=false;
      this.resetDataCatalogOperation();
      this.resetCatalogTree();
    }
  }
};
</script>

<style lang='scss' scoped>

.manage-dialog {
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  .dialog-title {
    padding-bottom: 20px;
    @include manage-border(
      $types: (
        "bottom"
      )
    );
    span {
      @include dialog-title($width: 2px);
      padding-bottom: 18px;
    }
  }
  /deep/ .el-cascader {
    width: 100%;
  }
  .el-form {
    padding: 0px 20px 0 40px;
  }
  .op-title{
    padding: 0px 20px;
    margin-top:60px;
    margin-bottom:20px;
    /deep/ .el-divider__text{
      @include base-active-color();
      font-size:16px;
    }
  }
  .btn-container{
    padding:0 20px;
    text-align: right;
  }
}
</style>