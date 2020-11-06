<template>
  <div class="system-dialog">
    <el-dialog :visible.sync="dialogVisible" width="1000px"
     :modal = "true"
     :close-on-click-modal="false"
      :before-close="handleClose">
      <template slot="title">
        <div class="dialog-title">
          <span>服务授权</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <el-row class="service-name">
          <span class="label">服务名：</span>
          <span>{{serviceInfo.aliasName}}</span>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-row class="list-area">
              <el-row class="list-search">
                <el-input placeholder="请输入角色关键字" v-model="searchKey"></el-input>
              </el-row>
              <el-row class="list-checkbox">
                <el-scrollbar style="height:100%">
                  <el-checkbox-group v-model="checkRole" @change="handleCheckedChange" v-show="roleCheckBoxList.length>0&&roleAreaShow">
                    <div v-for="role in roleCheckBoxList" :key="role.roleName">
                      <el-checkbox :label="role.roleId" v-show="role.isShow">{{role.roleName+"("+role.roleAlias+")"}}</el-checkbox>
                    </div>
                  </el-checkbox-group>
                  <div v-show="roleCheckBoxList.length==0||!roleAreaShow" class="no-data">
                    暂无数据
                  </div>
                </el-scrollbar>
              </el-row>
            </el-row>
          </el-col>
          <el-col :span="18">
            <el-row style="height:400px;" class="table-area">
              <el-scrollbar style="height:100%">
                <el-table :data="roleList" border>
                  <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    :min-width="item.minWidth"
                    v-for="(item,ix) in tableCol"
                    :key="ix"
                    :show-overflow-tooltip="true"
                  >
                    <template slot-scope="scope">
                      <span v-if="item.prop=='roleName'||item.prop=='roleAlias'">{{scope.row[item.prop]}}</span>
                      <span v-else>
                        <i class="el-icon-check permission" v-if="scope.row[item.prop]===true" @click="setPermission(scope.row,item.prop)"></i>
                        <i class="el-icon-close permission" v-else-if="scope.row[item.prop]===false" @click="setPermission(scope.row,item.prop)"></i>
                        <i class="permission-ban" v-else></i>
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-scrollbar>
            </el-row>
          </el-col>
        </el-row>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-white-btn" @click="handleClose">取 消</el-button>
        <el-button type="primary" class="base-btn" @click="saveRolePermission">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:"ServerPermissionManageDialog",
  props:{
    dialogVisible:{
      type:Boolean,
      default:false
    },
    serviceInfo:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  watch:{
    dialogVisible(){
      if(this.dialogVisible){
        this.reset();
        this.getJurisdictionListByRoles();
      }
    },
    searchKey(){
      this.searchList();
    }
  },
  data(){
    return {
      roleList:[],
      roleCheckBoxList:[],
      roleDataMap:{},
      tableCol:[],
      checkRole:[],
      lastCheckRole:[],
      permissionFields:[],
      searchKey:"",
      roleAreaShow:true,
      mappingAfter:{}
    }
  },
  methods:{
    handleClose(){
      this.$emit('dialogClose');
    },
    saveRolePermission(){
      if(this.roleList.length==0){
        this.$message({
          type:'warning',
          message:"当前未选择任何角色，请先勾选角色"
        })
        return false;
      }
      let mappingJson={};
      this.roleList.forEach(item=>{
        mappingJson[item.roleId]=[];
        this.permissionFields.forEach(fields=>{
          if(item[fields]==true){
            let temp={
              "ROLE_ID":item.roleId,
              "SERVER_NAME":this.serviceInfo.name,
              "SERVICE_JURISDICTION_ID":item[fields+"_DATA"].ID
            }
            mappingJson[item.roleId].push(temp);
          }
        })
      })
      let str=JSON.stringify(mappingJson);
      this.$api.serverManageApi.mappingSave({
        "SERVER_NAME":this.serviceInfo.name,
        "MAPPING_JSON":str
      },{
        loadingText:"授权中"         
      }).then(res=>{
        if(res.data.code==200){
          this.$message({
            type:"success",
             message:"授权成功"
          })
          this.handleClose();
        }
      }).catch(()=>{

      })
    },
    getCacheData(){
      this.$api.serverManageApi.getCacheData({
        serverName:this.serviceInfo.name
      },{
          loadingText:"正在查询"         
        }).then(res=>{
        let data=res.data.data;
        let mapping=data.serverMap.mapping;
        let mappingAfter={};
        for(var i in mapping){
          this.checkRole.push(i);
          if(Array.isArray(mapping[i])){
            mappingAfter[i]=[];
            mapping[i].forEach(item=>{
              mappingAfter[i].push(item.SERVICE_JURISDICTION_ID);
            })
          }
        }
        this.roleCheckBoxList.forEach(item=>{
          let tempItem=JSON.parse(JSON.stringify(item));
          if(mappingAfter[tempItem.roleId]){
            this.permissionFields.forEach(fields=>{
              if(tempItem[fields]!='ban'&&mappingAfter[tempItem.roleId].indexOf(tempItem[fields+"_DATA"].ID)<0){
                tempItem[fields]=false;
              }
            })
            this.roleList.push(tempItem);
          }
        })
        this.lastCheckRole=JSON.parse(JSON.stringify(this.checkRole));
        this.mappingAfter=mappingAfter;
      }).catch(()=>{
      })
    },
    getJurisdictionListByRoles(){
      this.$api.serverManageApi.getJurisdictionListByRoles({
      },{
        loadingText:"正在查询" 
      }).then(res=>{
        let data=res.data.data;
        let permission=[
          {
            prop:"roleName",
            label:"角色名称",
            minWidth:"20%"
          },
          {
            prop:"roleAlias",
            label:"角色别名",
            minWidth:"20%"
          }
        ];
        let permissionFields=[];
        let roleData=[];
        let roleDataMap={};
        data.forEach((item,ix)=>{
          let tempRole={
            roleId:item.roleId,
            roleName:item.roleName,
            roleAlias:item.roleAlias,
            isShow:true,
            list:item.list
          }
          item.list.forEach(listItem=>{
            if(ix==0){
              let tempList={
                prop:listItem.NAME,
                label:listItem.ALIAS,
                minWidth:"12%"
              }
              permission.push(tempList);
              permissionFields.push(listItem.NAME)
            }
            let p=false;
            if(listItem.disabled){
              p='ban';
            }
            else{
              p=true;
            }
            tempRole[listItem.NAME]=p;
            tempRole[listItem.NAME+"_DATA"]=listItem;
          })
          roleData.push(tempRole);
          roleDataMap[item.roleId]=tempRole;
        })
        this.roleCheckBoxList=roleData;
        this.tableCol=permission;
        this.roleDataMap=roleDataMap;
        this.permissionFields=permissionFields;
        // this.getJurisdictionByService();
        this.getCacheData();
      }).catch(()=>{})
    },
    getJurisdictionByService(){
      this.$api.serverManageApi.getJurisdictionByService({
        "serverName":this.serviceInfo.name
      },{
        loadingText:"正在查询"         
      }).then(res=>{
        let data=res.data.data;
        let mapping=data.mapping;
        let mappingAfter={};
        for(var i in mapping){
          this.checkRole.push(i);
          if(Array.isArray(mapping[i])){
            mappingAfter[i]=[];
            mapping[i].forEach(item=>{
              mappingAfter[i].push(item.SERVICE_JURISDICTION_ID);
            })
          }
        }
        this.roleCheckBoxList.forEach(item=>{
          let tempItem=JSON.parse(JSON.stringify(item));
          if(mappingAfter[tempItem.roleId]){
            this.permissionFields.forEach(fields=>{
              if(tempItem[fields]!='ban'&&mappingAfter[tempItem.roleId].indexOf(tempItem[fields+"_DATA"].ID)<0){
                tempItem[fields]=false;
              }
            })
            this.roleList.push(tempItem);
          }
        })
        this.lastCheckRole=JSON.parse(JSON.stringify(this.checkRole));
        this.mappingAfter=mappingAfter;
      }).catch(()=>{
      })
    },
    setPermission(row,key){
      this.$set(row,key,!row[key]);
    },
    handleCheckedChange(){
      let r=this.diff(this.checkRole,this.lastCheckRole);
      r.add.forEach(item=>{
        if(this.roleDataMap[item]){
          let data=JSON.parse(JSON.stringify(this.roleDataMap[item]));
          if(this.mappingAfter[data.roleId]){
            this.permissionFields.forEach(fields=>{
              if(data[fields]!='ban'&&this.mappingAfter[data.roleId].indexOf(data[fields+"_DATA"].ID)<0){
                data[fields]=false;
              }
            })
          }
          this.roleList.push(data);
        }
      })
      for(let i=this.roleList.length-1;i>=0;i--){
        if(r.delete.indexOf(this.roleList[i].roleId)>-1){
          this.roleList.splice(i,1);
        }
      }
      this.lastCheckRole=JSON.parse(JSON.stringify(this.checkRole));
    },
    searchList(){
      this.roleAreaShow=false;
      this.roleCheckBoxList.forEach(item=>{
        if(this.searchKey==""){
          this.roleAreaShow=true;
          this.$set(item,'isShow',true);
        }
        else{
          if(item.roleName.indexOf(this.searchKey)>-1||item.roleAlias.indexOf(this.searchKey)>-1){
            this.roleAreaShow=true;
            this.$set(item,'isShow',true);
          }
          else{
            this.$set(item,'isShow',false);
          }
        }
      })
    },
    diff(current,last){
      let r={
        add:[],
        delete:[]
      }
      //删除数组
      last.forEach(item=>{
        if(current.indexOf(item)<0){
          r.delete.push(item)
        }
      })
      //新增数组
      current.forEach(item=>{
        if(last.indexOf(item)<0){
          r.add.push(item)
        }
      })
      return r;
    },
    reset(){
      this.roleList=[];
      this.roleCheckBoxList=[];
      this.roleDataMap=[];
      this.tableCol=[];
      this.checkRole=[];
      this.lastCheckRole=[];
      this.permissionFields=[];
      this.searchKey="";
      this.mappingAfter={};
    }
  }
}
</script>

<style lang='scss' scoped>
  .system-dialog{
    .dialog-title{
      border-bottom:1px solid #ebeef5;
      padding-bottom: 20px;
      span{
        padding-bottom: 18px;
        box-shadow: #1890ff 0px 2px 0px;
      }
    }
    .dialog-body{
      padding:0 20px;
      border-bottom:1px solid #ebeef5;
      .service-name{
        margin-bottom:14px;
        .label{
          margin-right:10px;
        }
      }
      /deep/ .el-scrollbar .el-scrollbar__wrap {
        overflow-x: hidden;
      }
      .list-area{
        height:400px;
        border:1px solid #EBEEF5;
        .list-search{
          border-bottom:1px solid #EBEEF5;
          padding:6px;
        }
        .list-checkbox{
          padding:0 6px;
          height:340px;
          .el-checkbox{
            display: block;
            line-height:30px;
            height:30px;
          }
          /deep/ .el-checkbox__label{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: middle;
            width:180px;
          }
          .no-data{
            height: 30px;
            line-height: 30px;
            text-align: center;
          }
        }
      }
      .table-area{
        margin-bottom:20px;
        .el-table{
          /deep/ th{
            display: table-cell !important;
          }
          .permission{
            cursor: pointer;
          }
          .permission-ban{
            width: 95px;
            border: 0.2px solid #ebeef5;
            -webkit-transform: rotate(-30deg);
            transform: rotate(-30deg);
            position: absolute;
            text-align: center;
            left: -4px;
          }
        }
      }
    }
    /deep/.el-dialog__body{
      border:none;
      padding: 10px 20px;
    }
    .el-select{
      width:100%;
    }
  }
</style>