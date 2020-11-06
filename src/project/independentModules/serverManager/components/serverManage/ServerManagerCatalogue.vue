<template>
  <div class="server-manager-catalogue">
    <div class="title">
      <el-row>
        <el-col :span="18">
          <span><i class="kqserver-liebiao catologue-icon"></i>目录</span>
        </el-col>
        <el-col :span="6" class="button-area">
          <el-tooltip class="item" effect="dark" content="添加目录" placement="right">
            <i class="el-icon-plus" @click="addCatalogue" v-if="buttonAuthorityVerification('serverManagerCatalogueAdd')"></i>
          </el-tooltip>
        </el-col>
      </el-row>
    </div>
    <dl class="catalogue">
      <dt :class="{'is-active':activeName==catalogueList.name}" @click="catologueClick(catalogueList)" v-if="catalogueList.name">
        <div class="button-area">
          <el-tooltip class="item" effect="dark" content="发布服务" placement="right">
            <i class="kqserver-tianjiashujubiao" @click.stop="servicePublish(catalogueList)" v-if="buttonAuthorityVerification('serverManagerCataloguePublish')"></i>
          </el-tooltip>
        </div>
        <div class="catalogue-title">
          <span><i class="el-icon-folder catologue-icon"></i>{{catalogueList.aliasName}}</span>
        </div>
      </dt>
      <dd v-for="item in catalogueList.childFolders" :key="item.name" :class="{'is-active':activeName==item.name}"  @click="catologueClick(item)">
        <div class="button-area">
          <el-tooltip class="item" effect="dark" content="发布服务" placement="right">
            <i class="kqserver-tianjiashujubiao" @click.stop="servicePublish(item)" v-if="buttonAuthorityVerification('serverManagerCataloguePublish')"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑目录" placement="right">
            <i class="el-icon-edit" @click.stop="editCatalogue(item)" v-if="buttonAuthorityVerification('serverManagerCatalogueEdit')"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除目录" placement="right">
            <i class="el-icon-delete" @click.stop="deleteCatalogue(item)" v-if="buttonAuthorityVerification('serverManagerCatalogueDelete')"></i>
          </el-tooltip>
        </div>
        <div class="catalogue-title">
          <span><i class="el-icon-folder catologue-icon"></i>{{item.aliasName}}</span>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script>
//服务管理目录
export default {
  name:"ServerManagerCatalogue",
  props:{
    catalogueList:{
      type:Object,
      default:()=>{
        return {};
      }
    },
    activeName:{
      type:String,
      default:""
    }
  },
  data(){
    return {
      limits:{},
      limitsMapping:{
        "serverManagerCataloguePublish":"limit_publishService",
      }
    }
  },
  methods:{
    catologueClick(info){
      this.$emit('catologueClick',info);
    },
    addCatalogue(){
      this.$emit('addCatalogue');
    },
    editCatalogue(info){
      this.$emit("editCatalogue",info);
    },
    deleteCatalogue(info){
      this.$emit("deleteCatalogue",info);
    },
    servicePublish(info){
      this.$emit("servicePublish",info);
    },
    buttonAuthorityVerification(buttonName){
      let isLogin=this.$store.getters.isLogin;
      let status=true;
      //未登录
      if(!isLogin){
        return false;
      }
      return true;
       //根据权限判断
      if(this.limitsMapping[buttonName]){
        if(!this.limits[this.limitsMapping[buttonName]]){
          return false;
        }
      }
      return status;
    }
  }
}
</script>

<style lang='scss' scoped>
  .server-manager-catalogue{
    border:1px solid #ebebeb;
    .title{
      font-size:14px;
      height:38px;
      line-height:38px;
      color:#242424;
      border-bottom:1px solid #ebebeb;
      padding-left:20px;
      overflow: hidden;
      .button-area{
        text-align: right;
        padding-right:14px;
        color:#3691e9;
        font-size:14px;
        i{
          cursor: pointer;
          &:hover{
            color:rgba(54, 145, 233,0.8);
          }
        }
      }
    }
    .catalogue{
      margin:0;
      .is-active{
        color:#3691e9;
        background:#ecf5ff;
        .button-area{
          color:#3691e9;
        }
        .catologue-icon{
          color:#3691e9;
        }
      }
      dt,dd{
        height:38px;
        line-height:38px;
        font-size:14px;
        color:#4c4c4c;
        border-bottom:1px solid #ebebeb;
        cursor: pointer;
        &:hover{
          color:#3691e9;
          .button-area{
            color:#3691e9;
          }
          .catologue-icon{
            color:#3691e9;
          }
        }
      }
      dt{
        padding-left:20px;
      }
      dd{
        margin:0;
        padding-left:40px;
      }
      dd:last-child{
        border:none;
      }
      .catalogue-title{
        margin-right:80px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .button-area{
        width:80px;
        float:right;
        height:38px;
        line-height:38px;
        text-align: right;
        padding-right:14px;
        color:#3691e9;
        font-size:14px;
        i{
          margin-left:5px;
          &:hover{
            color:rgba(54, 145, 233,0.8);
          }
        }
      }
    }
    .catologue-icon{
      color:#3691e9;
      margin-right:6px;
    }
  }
</style>