<template>
  <div class="data-catalog-manage">
    <data-catalog-header class="data-catalog-manage-header"></data-catalog-header>
    <el-row class="data-catalog-manage-contents" type="flex" justify="space-around">
      <el-col :span="5">
        <data-catalog-nav class="catalog" :catalogTree="catalogTree" @openCatalogManageDialog="openCatalogManageDialog"></data-catalog-nav>
        <data-catalog-type class="type"></data-catalog-type>
      </el-col>
      <el-col :span="17">
        <data-catalog-list></data-catalog-list>
      </el-col>
    </el-row>
    <data-catalog-manage-dialog 
    :dialogVisible="catalogManageDialogVisible"
    @dialogClose="catalogManageDialogClose"
    @updateCatalog="updateCatalog"
    :catalogList="catalogList"
    ></data-catalog-manage-dialog>
  </div>
</template>

<script>
import DataCatalogHeader from './DataCatalogHeader'
import DataCatalogNav from './DataCatalogNav'
import DataCatalogType from './DataCatalogType'
import DataCatalogList from './DataCatalogList'
import DataCatalogManageDialog from './DataCatalogManageDialog'
export default {
  name:"DataCatalogManage",
  components:{
    DataCatalogHeader,
    DataCatalogNav,
    DataCatalogType,
    DataCatalogList,
    DataCatalogManageDialog
  },
  data(){
    return {
      catalogTree:[],
      catalogList:[],
      catalogManageDialogVisible:false
    }
  },
  methods:{
    queryCatalogList(){
      return new Promise((resolve,reject)=>{
        this.$api.dataManageApi.getCategoryList({},{
          loadingText:"正在查询"
        }).then(res=>{
          let data=res.data.data;
          data.forEach(item=>{
            item.id=item.id.toString();
          })
          resolve(data);
        }).catch(error=>{
          reject(error);
        })
      })
    },
    getCatalogList(){//查询目录列表
      this.queryCatalogList().then(data=>{
        this.catalogList=data;
        this.catalogTree=this.globalMethods.getTree(data,"id",
        "parentId",
        "children",
        null,
        (arr)=>{
          this.globalMethods.sortUtil(arr,['sortNo'],'asc')
        });
        this.globalMethods.sortUtil(this.catalogTree,['sortNo'],'asc');
      }).catch(()=>{
        this.catalogList=[];
        this.catalogTree=[];
      })
    },
    updateCatalog(){//更新目录
      this.getCatalogList();
    },
    openCatalogManageDialog(){
      this.queryCatalogList().then(data=>{
        this.catalogList=data;
        this.catalogTree=this.globalMethods.getTree(data,"id",
        "parentId",
        "children",
        null,
        (arr)=>{
          this.globalMethods.sortUtil(arr,['sortNo'],'asc')
        });
        this.globalMethods.sortUtil(this.catalogTree,['sortNo'],'asc');
        this.catalogManageDialogVisible=true;
      }).catch(()=>{
      })
    },
    catalogManageDialogClose(){
      this.catalogManageDialogVisible=false;
    }
  },
  mounted(){
    this.getCatalogList();
  }
}
</script>

<style lang="scss" scoped>
  .data-catalog-manage{
    .data-catalog-manage-contents{
      text-align: left;
      min-height: 700px;
      width:100%;
      margin-top:20px;
      .type{
        margin-top:50px;
        background:#fff;
      }
      .catalog{
        background: #fff;
      }
    }
  }
</style>