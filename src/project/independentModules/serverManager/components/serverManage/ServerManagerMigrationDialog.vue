<template>
  <div class="system-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="1000px"
      :modal="true"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>服务迁移</span>
        </div>
      </template>
      <el-row class="dialog-body"> 
        <el-row>
          <span class="service-name">服务名称：<span class='name'>{{serviceInfo.name}}</span></span>
          <span class="service-name">服务别名：<span class='name'>{{serviceInfo.aliasName}}</span></span>
        </el-row>
        <el-table :data="migrationList" border>
          <el-table-column
            prop="nodeName"
            label="节点名称"
            align="center"
            min-width="20%">
          </el-table-column>
          <el-table-column
            prop="tags"
            label="标签"
            align="center"
            min-width="40%"
          >
            <template slot-scope="scope">
              <el-tag
                :key="tag"
                v-for="tag in scope.row.nodeTags"
                :disable-transitions="false"
              >{{tag}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="isPublished"
            label="发布状态"
            align="center"
            min-width="20%">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.copyIsPublished"
                active-text="已发布"
                inactive-text="未发布"
                @change="publishOrDelete(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="isStarted"
            label="启动状态"
            align="center"
            min-width="20%">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.copyIsStarted"
                active-text="已启动"
                inactive-text="未启动"
                @change="startOrStop(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-white-btn" @click="handleClose">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//服务迁移
export default {
  name: "ServerManagerMigrationDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    serviceInfo:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  watch: {
    dialogVisible(){
      if(this.dialogVisible){
        this.getMigrationList();
      }
    }
  },
  data() {
    return {
      migrationList:[]
    };
  },
  methods: {
    handleClose() {
      this.$emit("dialogClose");
    },
    save(){
      this.$refs.catalogueForm.validate(valid => {
        if (valid) {
          this.$emit("save");
        } else {
          return false;
        }
      });
    },
    getMigrationList(){
      this.$api.serverManageApi.getServiceNodeList(
        { 
          serviceName: this.serviceInfo.name
        },
        {
          loadingText:"正在查询"         
        }
      ).then(res=>{
        let data= res.data.data;
        data.forEach(item=>{
          if (item.status == "NotExists") {
            item.isPublished = false;
            item.isStarted = false;
          } else if (item.status == "starting") {
            item.isPublished = true;
            item.isStarted = false;
          } else if (item.status == "running") {
            item.isPublished = true;
            item.isStarted = true;
          } else if (item.status == "stopping") {
            item.isPublished = true;
            item.isStarted = false;
          } else if (item.status == "stopped") {
            item.isPublished = true;
            item.isStarted = false;
          }
          item.copyIsPublished=item.isPublished;
          item.copyIsStarted=item.isStarted;
        })
        this.migrationList=data;
      })
    },
    publishService(item){//发布服务
      this.$api.serverManageApi.createServiceByName({
          serviceName:item.name,
          serviceAliases:item.nodeName
        },{
          loadingText:"保存中"         
        }
      )
      .then(() => {
        this.$message({
          type:"success",
          message:"发布成功"
        })
        this.getMigrationList();
      })
    },
    deleteService(item,num){//删除服务
      this.$api.serverManageApi.deleteServer({
          serviceName: item.name, 
          serviceAliases: item.nodeName 
      },{
        loadingText:"删除中" 
      }).then(()=>{
        this.$message({
          type:"success",
          message:"取消发布成功"
        })
        if(num==1){
          this.$emit("updateList");
          this.handleClose();
        }
        else{
          this.getMigrationList();
        }
      })
    },
    publishOrDelete(item){//发布或删除服务
      if(item.isPublished){//删除
        if(item.isStarted){
          this.$message({
            type:"warning",
            message:"服务是启动状态，不能进行此操作"
          })
          item.copyIsPublished=item.isPublished;
        }
        else{
          let count=0;
          this.migrationList.forEach(item=>{
            if(item.isPublished){
              count=count+1;
            }
          })
          this.$confirm(
            count==1?"该操作会彻底删除该服务，确定继续吗？":"确定取消发布该服务吗？",
            "提示",
            {
              confirmButtonText:"确定",
              cancelButtonText:"取消",
              type: "warning"
            }
          ).then(()=>{
            this.deleteService(item,count);
          }).catch(()=>{
            item.copyIsPublished=item.isPublished;
          })
        }
      }
      else{
        this.publishService(item);
      }
    },
    startService(item){
      this.$api.serverManageApi.openServer({
        serviceName: item.name, serviceAliases: item.nodeName
      },{
        loadingText:"启动中"         
      }).then(() => {
        this.$message({
          type:"success",
          message:"启动成功"
        })
        this.getMigrationList();
        this.$emit("updateSingleService");
      });
    },
    stopService(item){
       this.$api.serverManageApi._stopServer({
        serviceName: item.name, 
        serviceAliases: item.nodeName
      },{
          loadingText:"停止中"         
        }).then(() => {
        this.$message({
          type:"success",
          message:"停止成功"
        })
        this.getMigrationList();
        this.$emit("updateSingleService");
      });
    },
    startOrStop(item){
      if(item.isStarted){//停止
        this.$confirm(
          "确定要停止该服务吗？",
          "提示",
          {
            confirmButtonText:"确定",
            cancelButtonText:"取消",
            type: "warning"
          }
        ).then(()=>{
          this.stopService(item);
        }).catch(()=>{
          item.copyIsStarted=item.isStarted;
        })
      }
      else{//启动
        this.startService(item);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.system-dialog {
  .dialog-title {
    border-bottom: 1px solid #ebeef5;
    padding-bottom: 20px;
    span {
      padding-bottom: 18px;
      box-shadow: #1890ff 0px 2px 0px;
    }
  }
  .dialog-body {
    padding: 0 20px;
    border-bottom: 1px solid #ebeef5;
    .service-name{
      margin-right:40px;
      .name{
        color:#3691e9;
      }
    }
    .el-table{
      margin:30px 0;
    }
  }
  /deep/.el-dialog__body {
    border: none;
    padding: 10px 20px;
  }
}
</style>
