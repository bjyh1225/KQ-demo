<template>
  <div>
    <manage-template
      :tableData="orgPostDeptList"
      :tableCol="tableCol"
      :tableConf="tableConf"
      :leftSpan="8"
      :rightSpan="16"
      :total="total"
      :pageSize="pageSize"
      :pageIndex="pageIndex"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @selectionChange="selectionChange"
    >
      <template slot="left">
        <div class="dept">
          <manage-organization-dept
            class="manage-organization-dept-loading"
            @addDept="addDept"
            @delOrgById="delOrgById"
            @selectChange="selectChange"
            @handleNodeClick="handleNodeClick"
            :orgDimension="orgDimension"
            :deptList="deptList"
            ref="manageOrganizationDept"
          ></manage-organization-dept>
        </div>
      </template>
      <template slot="rightTop">
        <el-row class="org-display">
          <el-form :model="deptDisplayInfo" :label-width="formLabelWidth">
            <el-col :span="12">
              <el-form-item :label="$t('management.organizationCode')+':'">
                <el-input v-model="deptDisplayInfo.code" autocomplete="off" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('management.organizationName')+':'">
                <el-input v-model="deptDisplayInfo.name" autocomplete="off" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('management.rank')+':'">
                <el-input v-model="deptDisplayInfo.sortNo" autocomplete="off" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
        <el-row class="job-title-btn-group">
          <el-col :span="14">
            <el-button
              type="primary base-btn"
              icon="el-icon-plus"
              @click="addJobTitle"
            >{{$t('management.associateToPosition')}}</el-button>
            <el-button
              type="primary base-btn"
              icon="el-icon-d-caret"
              @click="modifyPositionSortShow"
            >{{$t('management.rankingPositions')}}</el-button>
          </el-col>
          <el-col :span="10">
            <el-input
              :placeholder="$t('service.pleaseEnterKeywords')"
              v-model="searchKey"
              @keyup.enter.native="search"
            >
              <i slot="suffix" class="el-input__icon el-icon-search" v-show="searchKey.length===0"></i>
            </el-input>
          </el-col>
        </el-row>
      </template>
    </manage-template>
    <manage-organization-dialog
      :dialogVisible="orgDialogVisible"
      @dialogClose="dialogClose"
      @save="saveDept"
      :deptInfo="deptInfo"
    ></manage-organization-dialog>
    <manage-job-title-dialog
      :dialogVisible="jobtitleDialogVisible"
      :orgPostList="orgPostList"
      @dialogClose="dialogClose"
      @savePost="savePost"
      :isSelectionPost="isSelectionPost"
    ></manage-job-title-dialog>
    <manage-post-sort-dialog
      :dialogVisible="postSortDialogVisible"
      @dialogClose="dialogClose"
      :postSortList="postSortList"
      @modifyPositionSort="modifyPositionSort"
    ></manage-post-sort-dialog>
  </div>
</template>

<script>
import ManageTemplate from "components/template/ManageTemplate";
import ManageOrganizationDept from "components/manageOrganization/ManageOrganizationDept";
import ManageOrganizationDialog from "components/manageOrganization/ManageOrganizationDialog";
import ManageJobTitleDialog from "components/manageOrganization/ManageJobTitleDialog";
import ManagePostSortDialog from "components/manageOrganization/ManagePostSortDialog";
export default {
  name: "manageOrganization",
  components: {
    ManageTemplate,
    ManageOrganizationDept,
    ManageOrganizationDialog,
    ManageJobTitleDialog,
    ManagePostSortDialog
  },
  props: {
    currentTabShowStatus: {
      type: Boolean,
      default: false
    }
  },
  watch: {
     currentTabShowStatus:{
        immediate: true, // immediate选项可以开启首次赋值监听
        handler(newVal, oldVal) {
            if(newVal){
              this.$nextTick(() => {
                this.$refs.manageOrganizationDept.reset();
              });
              this.getOrgDimension();
              this.getOrgPost();
            }
        }
    }
  },
  methods: {
    dialogClose() {
      this.orgDialogVisible = false;
      this.jobtitleDialogVisible = false;
      this.postSortDialogVisible = false;
    },
    addDept(data) {
      this.resetDeptInfo();
      this.deptInfo.parentId = data.id;
      this.deptInfo.parentCode = data.code;
      this.deptInfo.parentText = data.text;
      this.deptInfo.dimension = data.attributes.dimension;
      this.orgDialogVisible = true;
    },
    saveDept() {
      this.$api.manageOrganizationApi
        .save(this.deptInfo, { loadingText: this.$t("management.saving") })
        .then(() => {
          this.$message({
            message: this.$t("management.succeeded"),
            type: "success"
          });
          this.getDepByNameAndDimension();
          this.dialogClose();
        })
        .catch(() => {});
    },
    delOrgById(data) {
      //删除
      this.$confirm(
        this.$t("management.confirmToDeleteTheDepartmentAndAllItsBranches") +
          "?"
      )
        .then(() => {
          this.$api.manageOrganizationApi
            .delOrgById(
              { id: data.id, code: data.code },
              { loadingText: this.$t("management.deleting") }
            )
            .then(() => {
              this.$message({
                message: this.$t("management.succeeded"),
                type: "success"
              });
              this.getDepByNameAndDimension();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    resetDeptInfo() {
      this.deptInfo = {
        parentId: "",
        parentCode: "",
        code: "",
        parentText: "",
        sortNo: 0,
        name: "",
        dimension: ""
      };
    },
    //查询维度
    getOrgDimension() {
      this.resetOrgDimension();
      this.$api.dictionaryApi
        .getOrgDimension({
          loadingTarget: ".manage-organization-dept-loading",
          loadingText: this.$t("management.searchingOrganizations")
        })
        .then(res => {
          var data = res.data.data.rows;
          data.forEach(item => {
            this.orgDimension.push({ value: item.value, label: item.text });
          });
        })
        .catch(() => {});
    },
    //根据维度查询部门
    getDepByNameAndDimension() {
      this.resetDeptDisplay();
      this.$api.manageOrganizationApi
        .getDepByNameAndDimension(
          { dimension: this.dimensionValue },
          {
            loadingTarget: ".manage-organization-dept-loading",
            loadingText: this.$t("management.searchingOrganizations")
          }
        )
        .then(res => {
          var data = res.data.data;
          this.deptList = data;
        })
        .catch(() => {});
    },
    //维度改变
    selectChange(val) {
      this.dimensionValue = val;
      this.getDepByNameAndDimension();
    },
    //选中一个组织结构节点
    handleNodeClick(data) {
      this.resetDeptDisplay();
      this.deptDisplayInfo.code = data.code;
      this.deptDisplayInfo.name = data.attributes.name;
      this.deptDisplayInfo.sortNo = data.attributes.sortNo;
      this.deptDisplayInfo.id = data.id;
      if (this.deptDisplayInfo.id != "0") {
        this.getPositionPageByOrgId();
      }
    },
    //重置维度数据
    resetOrgDimension() {
      this.dimensionValue = "";
      this.orgDimension = [];
      this.deptList = [];
      this.resetDeptDisplay();
    },
    //重置部门显示
    resetDeptDisplay() {
      this.deptDisplayInfo = {
        name: "",
        code: "",
        sortNo: "",
        id: ""
      };
      this.orgPostDeptList = [];
      this.searchKey="";
    },
    //查询岗位信息
    getOrgPost() {
      this.$api.dictionaryApi
        .getOrgPost({ noLoading: true })
        .then(res => {
          var data = res.data.data.rows;
          this.orgPostList = data;
        })
        .catch(() => {});
    },
    //新增岗位
    addJobTitle() {
      if (!this.deptDisplayInfo.code) {
        this.$message({
          message: this.$t("management.pleaseSelectOrganization"),
          type: "warning"
        });
        return false;
      }
      if (this.deptDisplayInfo.id == "0") {
        this.$message({
          message: this.$t(
            "management.cannotAssociatePositionToDimensionNodePleaseSelectOrganization"
          ),
          type: "warning"
        });
        return false;
      }
      //查询当前已有的职位
      this.$api.manageOrganizationApi
        .getPositionListByOrgId({ orgId: this.deptDisplayInfo.id })
        .then(res => {
          var data = res.data.data;
          this.isSelectionPost = [];
          data.forEach(item => {
            this.isSelectionPost.push(item.postId);
          });
          this.jobtitleDialogVisible = true;
        })
        .catch(() => {});
    },
    //模糊查询
    search() {
      this.pageIndex = 1;
      this.getPositionPageByOrgId();
    },
    //分页
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getPositionPageByOrgId();
    },
    handleSizeChange(val) {
      this.pageIndex = 1;
      this.pageSize = val;
      this.getPositionPageByOrgId();
    },
    //根据机构查询职位
    getPositionPageByOrgId() {
      if (this.deptDisplayInfo.id == "0" || !this.deptDisplayInfo.id) {
        this.$message({
          message: this.$t("management.pleaseSelectOrganization"),
          type: "warning"
        });
        return false;
      }
      var params = {
        postName: this.searchKey,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        orgId: this.deptDisplayInfo.id
      };
      this.$api.manageOrganizationApi
        .getPositionPageByOrgId(params)
        .then(res => {
          var data = res.data.data;
          this.orgPostDeptList = data.rows;
          this.pageIndex = data.pageIndex;
          this.pageSize = data.pageSize;
          this.total = data.total;
          this.selectList = [];
        })
        .catch(() => {});
    },
    //保存岗位
    savePost(postList) {
      var params = {
        orgId: this.deptDisplayInfo.id,
        postIds: postList.toString()
      };
      this.$api.manageOrganizationApi
        .orgConnectPost(params, { loadingText: this.$t("management.saving") })
        .then(() => {
          this.$message({
            message: this.$t("management.succeeded"),
            type: "success"
          });
          this.getPositionPageByOrgId();
          this.dialogClose();
        })
        .catch(() => {});
    },
    //批量删除职位
    deletePositionInfoByIds() {
      if (this.selectList.length == 0) {
        this.$message({
          message: this.$t("management.pleaseSelectDataToDelete"),
          type: "warning"
        });
        return false;
      } else {
        this.$confirm(this.$t("management.confirmToDelete") + "?")
          .then(() => {
            var idList = [];
            this.selectList.forEach(function(value) {
              idList.push(value.id);
            });
            var ids = idList.toString();
            this.$api.manageOrganizationApi
              .deletePositionInfoByIds(
                { ids: ids },
                { loadingText: this.$t("management.deleting") }
              )
              .then(() => {
                this.$message({
                  message: this.$t("management.succeeded"),
                  type: "success"
                });
                this.getPermissionByPage();
              })
              .catch(() => {});
          })
          .catch(() => {});
      }
    },
    //修改职位排序弹出框显示
    modifyPositionSortShow() {
      if (this.selectList.length == 0) {
        this.$message({
          message: this.$t("management.pleaseSelectDataToRankAndModify"),
          type: "warning"
        });
        return false;
      }
      var str = JSON.stringify(this.selectList);
      this.postSortList = JSON.parse(str);
      this.postSortDialogVisible = true;
    },
    //修改职位排序
    modifyPositionSort() {
      var params = {
        positionDtos: JSON.stringify(this.postSortList)
      };
      this.$api.manageOrganizationApi
        .modifyPositionSort(params, {
          loadingText: this.$t("management.saving")
        })
        .then(() => {
          this.$message({
            message: this.$t("management.succeeded"),
            type: "success"
          });
          this.getPositionPageByOrgId();
          this.dialogClose();
        })
        .catch(() => {});
    },
    selectionChange(val) {
      this.selectList = val;
    }
  },
  data() {
    return {
      orgDialogVisible: false,
      jobtitleDialogVisible: false,
      postSortDialogVisible: false,
      formLabelWidth: "100px",
      orgDimension: [],
      dimensionValue: "", //当前选择的岗位
      deptList: [], //部门数据
      deptDisplayInfo: {
        name: "",
        code: "",
        sortNo: "",
        id: ""
      },
      deptInfo: {
        parentId: "",
        parentCode: "",
        code: "",
        parentText: "",
        sortNo: 0,
        name: "",
        dimension: ""
      },
      orgPostList: [], //全部的职位数据
      orgPostDeptList: [], //根据职位查询的职位数据
      isSelectionPost: [], //根据职位查询已经选择的职位数据
      postSortList: [],
      searchKey: "",
      selectList: [],
      pageIndex: 1, //分页信息
      pageSize: 10,
      total: 0,
      tableCol: [
        {
          prop: "postId",
          label: this.$t("management.positionCode"),
          minWidth: "10%"
        },
        {
          prop: "postName",
          label: this.$t("management.positionName"),
          minWidth: "10%"
        },
        {
          prop: "sortNo",
          label: this.$t("management.positionRank"),
          minWidth: "10%"
        }
      ],
      tableConf: {
        isOperate: false,
        isSelection: true
      }
    };
  }
};
</script>

<style lang='scss' scoped>

.dept {
  padding: 5px 20px 0px 0px;
}
.org-display {
  margin-top: 5px;
  @include manage-border();
  padding: 20px 20px 10px 20px;
}
.job-title-btn-group {
  padding: 20px 20px 10px 20px;
}
</style>