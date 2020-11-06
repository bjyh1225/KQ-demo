<template>
  <div class="personal-department">
    <el-row type="flex" justify="space-around">
      <el-col :span="5" class="personal-department-left">
        <personal-center-menu @handleSidebar="handleSidebar" @getIndexreplace='getIndexreplace' @allAppShow='allAppShow'></personal-center-menu>
      </el-col>
      <el-col :span="17" class="personal-department-right">
        <personal-center-resource-manage v-show="operationType=='All'" :codekey='codekey' :fatherCodekey='fatherCodekey' ref='resourceManage'></personal-center-resource-manage>
        <personal-center-audit-manage v-show="operationType=='Examine'" :codekey='codekey' :fatherCodekey='fatherCodekey' ref='auditManage'></personal-center-audit-manage>
      </el-col>
    </el-row>
  </div>
</template>
<script>

import PersonalCenterResourceManage from "./PersonalCenterResourceManage.vue";
import PersonalCenterAuditManage from "./PersonalCenterAuditManage.vue";
import PersonalCenterMenu from "./PersonalCenterMenu.vue";

export default {
  name: "personalCenterMyDepartment",
  components: {
    PersonalCenterResourceManage,
    PersonalCenterAuditManage,
    PersonalCenterMenu
  },
  data() {
    return {
      operationType:'All',//操作类型
      codekey: "", //组织机构选中
      fatherCodekey:''//组织机构父级
    };
  },
  methods: {
    // 操作类型
    allAppShow(val){
      this.operationType=val;
      if(this.operationType=='Examine'){
        this.$refs.auditManage.getdepartmentAuditResourceList();
      }
    },
    getIndexreplace(val){
      this.codekey = val;
      this.fatherCodekey=val;
    },
    // 组织机构选中
    handleSidebar(val) {
      this.codekey = val;
      this.$nextTick(() => {
        if(this.operationType=='Examine'){
          this.$refs.auditManage.getdepartmentAuditResourceList();
        }else{
          this.$refs.resourceManage.getdepartmentResourceList();
        }
      });
    },
  }
};
</script>

<style lang='scss' scoped>
.personal-department {
  min-height: 700px;
  padding-top: 10px;
  background: #f5f5f5;
  .personal-department-left {
    margin-right: 50px;
  }
  // .personal-department-right {
  // }
}
</style>