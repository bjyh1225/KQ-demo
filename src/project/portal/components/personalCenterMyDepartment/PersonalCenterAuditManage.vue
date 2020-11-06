<template>
  <div class="audit-manage">
    <el-row class="audit-manage-right-top">
      <el-col :span="10" class="pages">
        <span v-if="total==0">{{total}}-{{page*pageSize>total?total:page*pageSize}}</span>
        <span v-if="total>0">{{1+(page-1)*pageSize}}-{{page*pageSize>total?total:page*pageSize}}</span>&nbsp
        <span>/</span>&nbsp
        <span>{{total}}</span>
      </el-col>
      <el-col :span="14">
        <el-row type="flex" justify="space-between" class="map-search">
          <el-col :span="24">
            <div class="inp">
              <el-input
                :placeholder="'请输入资源名称'"
                v-model="searchVal"
                class="input-with-select"
                @keyup.enter.native="searchFun"
              >
                <el-button
                  slot="append"
                  @click="searchFun"
                  class="base-btn"
                >{{$t('service.search')}}</el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="audit-manage-right-center">
      <el-row class="center-type">
        <el-col :span="18">
          <span class="center-type-span">资源类型：</span>
          <div class="center-type-box">
            <span
              class="center-type-specific"
              v-for="(itemType,t) in resourceTypeList"
              :key="t"
              @click="resourceTypeChoice(itemType.typeCode)"
              :class="resourceType==itemType.typeCode?'action-style':''"
            >{{itemType.type}}</span>
          </div>
        </el-col>
        <el-col :span="6" class="pages-right">
          <span>申请时间</span>
          <span>:</span>
          <div class="dropdown-box">
            <el-dropdown @command="dropdownSortList">
              <span>
                <span class="arrange-hover sortDataColor">{{sortData}}</span>
                <span class="el-icon-arrow-down arrange-hover"></span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(sortitems,i) in sortDropDown"
                  :key="i"
                  :command="sortitems"
                >{{sortitems.sortname}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span
              :class="sort=='DESC'?'el-icon-portal-ziyuan':'el-icon-portal-ziyuan1'"
              @click="sort=='DESC'?order(sort='ASC'):order(sort='DESC')"
              class="arrange-hover"
            ></span>
          </div>
        </el-col>
      </el-row>
      <el-row class="center-type">
        <span>审核状态：</span>
        <el-radio-group v-model="auditStatusAction" @change="auditStatusChoice">
          <el-radio :label="1">{{$t('management.ToBeReviewed')}}</el-radio>
          <el-radio :label="2">{{$t('myCenter.Verified')}}</el-radio>
          <el-radio :label="3">{{$t('myCenter.Expired')}}</el-radio>
        </el-radio-group>
      </el-row>
    </el-row>
    <el-row v-show="auditResourceList.length>0?false:true" class="noData">
      <img :src="displayNoDataSrc" alt />
      <span>{{$t('service.sorryNoDataIsAvailableNow')}}</span>
    </el-row>
    <el-row v-show="auditResourceList.length>0?true:false" class="data-box">
      <el-row class="linear-btn" v-show="auditStatusAction==1">
        <el-button @click="mulVerify" class="base-linear-btn">{{$t('management.ReviewInBatches')}}</el-button>
      </el-row>
      <el-table :data="auditResourceList" border @selection-change="selectionChange">
        <el-table-column type="selection" min-width="5%"></el-table-column>
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :min-width="item.minWidth"
          v-for="(item,ix) in tableCol"
          :key="ix"
        ></el-table-column>
        <el-table-column
          prop="AUDITACTUALNAME"
          label="审核人"
          :min-width="'6%'"
          v-if="auditStatusAction==2"
        ></el-table-column>
        <el-table-column :label="$t('management.ReviewStatus')" :min-width="'6%'">
          <template slot-scope="scope">{{renderScope[scope.row.C_AUDIT_SCOPE]}}</template>
        </el-table-column>
        <el-table-column prop="cz" :label="$t('management.operate')" :min-width="'7%'">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              class="base-btn"
              @click="verify(scope.row)"
              v-if="scope.row.C_AUDIT_SCOPE==0"
            >{{$t('management.Review')}}</el-button>
            <el-button
              size="mini"
              type="danger"
              class="base-btn"
              @click="showDetails(scope.row)"
              v-else
            >{{$t('myCenter.Showdetails')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 分页 -->
    <pagination
      v-show="auditResourceList.length>0?true:false"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :pageSizes="pageSizes"
      :total="total"
      :pageSize="pageSize"
      :pageIndex="page"
      class="pagination"
    ></pagination>
    <personal-center-my-verify-dialog
      :dialogVisible="verifyDialogVisible"
      @dialogClose="dialogClose"
      :dialogTitle="this.$t('management.Review')"
      :operate="operate"
      :verifyInfo="verifyInfo"
      @save="saveAudit"
    ></personal-center-my-verify-dialog>
    <personal-center-my-apply-dialog
      :dialogVisible="applyDialogVisible"
      @dialogClose="applyDialogClose"
      :dialogTitle="$t('myCenter.Reviewdetails')"
      :applyInfo="applyInfo"
    ></personal-center-my-apply-dialog>
  </div>
</template>

<script>
import Pagination from "../common/page/Pagination";
import PersonalCenterMyVerifyDialog from "components/personalCenterMyVerify/PersonalCenterMyVerifyDialog";
import PersonalCenterMyApplyDialog from "components/personalCenterMyApply/PersonalCenterMyApplyDialog";
export default {
  name: "PersonalCenterAuditManage",
  components: {
    Pagination,
    PersonalCenterMyVerifyDialog,
    PersonalCenterMyApplyDialog
  },
  props: {
    codekey: {
      //组织机构选中
      type: String,
      default: ""
    },
    fatherCodekey: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      displayNoDataSrc: require("img/nodata.jpg"), //暂无数据默认显示图片
      pageSizes: [12, 24, 36],
      pageSize: 12,
      page: 1,
      total: 0,
      auditResourceList: [],
      searchVal: "", //top搜索框值
      auditStatusAction: 1, //审核状态选中
      resourceType: "mapService",
      resourceTypeList: [
        { type: "地图服务", typeCode: "mapService", action: false },
        { type: "数据服务", typeCode: "dataService", action: false },
        { type: "功能服务", typeCode: "functionService", action: false },
        { type: "三维服务", typeCode: "sceneService", action: false },
        { type: "数据中心", typeCode: "data", action: false },
        { type: "附件中心", typeCode: "fileService", action: false },
        { type: "制图", typeCode: "mapbuilder", action: false },
        { type: "场景", typeCode: "scenebuilder", action: false },
        { type: "大屏", typeCode: "bigbuilder", action: false },
        { type: "应用", typeCode: "appbuilder", action: false }
      ], //资源类型
      sortDropDown: [
        {
          sortname: this.$t("portalStatistics.Today"),
          id: "1",
          summaryDays: 0
        },
        {
          sortname: this.$t("portalStatistics.LastWeek"),
          id: "2",
          summaryDays: 7
        },
        {
          sortname: this.$t("portalStatistics.LastMonth"),
          id: "3",
          summaryDays: 30
        },
        {
          sortname: this.$t("portalStatistics.All"),
          id: "4",
          summaryDays: "all"
        }
      ],
      sortData: this.$t("portalStatistics.Today"),
      sort: "DESC", //请求返回默认排序值
      tableCol: [
        {
          prop: "C_RESOURCE_NAME",
          label: this.$t("management.ResourceName"),
          minWidth: "15%"
        },
        {
          prop: "AUDITNAME",
          label: '作者',
          minWidth: "10%"
        },
        {
          prop: "CREATENAME",
          label: this.$t("management.Applicant"),
          minWidth: "10%"
        },
        // {
        //   prop: "C_CREATE_TIME",
        //   label: this.$t("management.ApplicationTime"),
        //   minWidth: "10%"
        // },
      ],
      renderScope: {
        "0": this.$t("management.ToBeReviewed"),
        "1": this.$t("management.Pass"),
        "2": this.$t("management.Reject"),
        "4": this.$t("myCenter.Expired")
      },
      selectData: [], //复选框
      verifyDialogVisible: false,
      verifyInfo: {},
      applyDialogVisible: false,
      applyInfo: {},
      operate: "single",
      scopeMapping: {
        "1": " ToBeAudited",
        "2": "Audited",
        "3": "Expired"
      },
      startTime: this.dateListFun(0),
      endTime: this.dateListFun(0)
    };
  },
  methods: {
    // 获取最近天数日期函数
    dateListFun(val) {
      let t = new Date(Date.now() - 86400000 * val);
      let str = `${t.getFullYear()}-${
        t.getMonth() + 1 > 9 ? t.getMonth() + 1 : "0" + (t.getMonth() + 1)
      }-${t.getDate() > 9 ? t.getDate() : "0" + t.getDate()}`;
      return str;
    },
    getdepartmentAuditResourceList() {
      this.$api.personalCenterMyDepartmentApi
        .getdepartmentAuditResourceList(
          {
            page: this.page,
            size: this.pageSize,
            searchVal: this.searchVal,
            sort: this.sort,
            codekey: this.codekey,
            fatherCodekey: this.fatherCodekey,
            scope: this.scopeMapping[this.auditStatusAction],
            resourceType: this.resourceType,
            startTime: this.startTime,
            endTime: this.endTime
          },
          {
            loadingText: this.$t("service.searching")
          }
        )
        .then(res => {
          this.auditResourceList = res.data.data.rows;
          this.total = res.data.data.total;
          this.page = res.data.data.pageIndex;
          this.pageSize = res.data.data.pageSize;
        })
        .catch(() => {});
    },
    saveAudit(type) {
      this.verifyInfo.scope = type;
      this.verifyInfo.auditComment = this.verifyInfo.C_AUDIT_COMMENT;
      this.$api.personalCenterMyVerifyApi
        .getMyAuditList(this.verifyInfo, {
          loadingText: this.$t("management.InReview")
        })
        .then(() => {
          this.$message({
            message: this.$t("management.ReviewedSuccessfully"),
            type: "success"
          });
          this.dialogClose();
          this.reset();
          this.getMyAuditListData();
        })
        .catch(() => {});
    },
    reset() {
      this.pageIndex = 1;
      this.pageSize = 10;
      this.total = 0;
      this.auditResourceList = [];
    },
    //复选框
    selectionChange(val) {
      this.selectData = val;
    },
    dialogClose() {
      this.verifyDialogVisible = false;
    },
    verify(row) {
      //单个审核
      this.title = this.$t("management.Review");
      this.operate = "single";
      this.verifyInfo = row;
      this.verifyInfo.IDS = row.C_ID;
      this.verifyDialogVisible = true;
    },
    showDetails(row) {
      this.applyInfo = row;
      this.applyDialogVisible = true;
    },
    applyDialogClose() {
      this.applyDialogVisible = false;
    },
    mulVerify() {
      //批量
      if (this.selectData.length == 0) {
        this.$message({
          message: this.$t("management.PleaseSelectDataToOperate"),
          type: "warning"
        });
        return false;
      }
      var ids = [];
      for (var i = 0; i < this.selectData.length; i++) {
        ids.push(this.selectData[i].C_ID);
      }
      this.verifyInfo = {
        IDS: ids.toString()
      };
      this.title = this.$t("management.ReviewInBatches");
      this.operate = "mul";
      this.verifyDialogVisible = true;
    },
    //请求 下拉排序列表
    dropdownSortList(command) {
      this.endTime = this.dateListFun(0);
      if (command.summaryDays == 0) {
        this.startTime = this.endTime;
      } else if (command.summaryDays == 7) {
        this.startTime = this.dateListFun(command.summaryDays - 1);
      } else if (command.summaryDays == 30) {
        this.startTime = this.dateListFun(command.summaryDays - 1);
      } else {
        this.startTime = null;
        this.endTime = null;
      }
      this.sortData = command.sortname;
      this.getdepartmentAuditResourceList();
    },
    // 点击资源类型
    resourceTypeChoice(val) {
      this.resourceType = val;
      this.getdepartmentAuditResourceList();
    },
    // 审核状态选中
    auditStatusChoice() {
      this.getdepartmentAuditResourceList();
    },
    //每页显示条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getdepartmentAuditResourceList();
    },
    //当前页码
    handleCurrentChange(val) {
      this.page = val;
      this.getdepartmentAuditResourceList();
    },
    //请求  top搜索
    searchFun() {
      this.getdepartmentAuditResourceList();
    },
    //请求  倒序，正序排序
    order(val) {
      this.sort = val;
      this.getdepartmentAuditResourceList();
    }
  }
};
</script>
<style lang="scss" scoped>
.audit-manage {
  .noData {
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
    height: 330px;
    text-align: center;
    font-size: 15px;
    color: #606266;
    background: #fff;
    img {
      margin-top: 45px;
    }
    span {
      margin-top: 20px;
      display: block;
    }
  }
  .data-box.el-row {
    padding: 10px;
    background-color: #fff;
    .linear-btn {
      padding-bottom: 10px;
    }
  }
  .pagination {
    margin-top: 20px;
  }
  .audit-manage-right-top {
    padding: 0 10px;
    background: #fff;
    .pages {
      height: 48px;
      line-height: 48px;
      color: #909399;
    }
    .map-search {
      height: 48px;
      line-height: 48px;
      width: 100%;
      .inp {
        float: left;
        height: 30px;
        width: 100%;
        /deep/.el-input-group__append {
          width: 50px;
          font-size: 14px;
          color: #ffffff;
          padding: 0;
          text-align: center;
          border: none;
          border-radius: 0;
          .el-button {
            width: 50px;
            height: 30px;
            line-height: 28px;
            border-radius: 0;
            padding: 0;
          }
          .base-btn {
            @include base-radio-button();
          }
        }
        /deep/.el-input__inner {
          border-radius: 0;
          border: 1px solid #dcdfe6;
          border-right: none;
          height: 30px;
          line-height: 30px;
        }
        /deep/.el-input__inner:focus {
          @include base-active-underline(
            $types: (
              "top",
              "bottom",
              "left"
            )
          );
        }
      }
    }
  }
  .audit-manage-right-center {
    font-size: 14px;
    border: 1px solid #ebebeb;
    margin: 20px 0;
    .center-type {
      padding: 15px 0 0 10px;
      .action-style {
        @include base-active-color();
      }
      /deep/.el-radio-group {
          font-size: 0;
          padding-left: 6px;
      }
      .center-type-span {
        float: left;
      }
      .center-type-box {
        margin-left: 70px;
        padding: 0px;
      }
      .center-type-specific {
        padding: 8px 4px;
        margin-right: 5px;
        color: #6c6d6f;
        &:hover {
          @include base-active-color();
          cursor: pointer;
        }
      }
      .center-type-specific {
        padding: 0 4px 8px;
        margin-right: 5px;
        color: #6c6d6f;
        display: inline-block;
        &:hover {
          @include base-active-color();
          cursor: pointer;
        }
      }
    }
    .center-type:last-child {
      padding-bottom: 8px;
      padding-top: 6px;
    }
    .pages-right {
      padding-right: 10px;
      text-align: right;
      span {
        margin-right: 5px;
      }
      .dropdown-box {
        // height: 48px;
        display: inline-block;
        // .el-dropdown {
        //   height: 30px;
        // }
        .arrange-hover.sortDataColor {
          @include base-active-color();
          display: inline-block;
          text-align: center;
        }
        .arrange-hover {
          text-decoration: none;
          color: #242424;
        }
        .arrange-hover:hover {
          cursor: pointer;
          @include base-active-color();
        }
      }
      .el-button {
        margin-left: 10px;
        padding: 6px 8px;
      }
      .el-icon-arrow-down,
      .el-icon-bottom,
      .el-icon-top {
        font-size: 16px;
        margin-left: 2px;
        font-weight: 900;
      }
    }
  }
}
</style>