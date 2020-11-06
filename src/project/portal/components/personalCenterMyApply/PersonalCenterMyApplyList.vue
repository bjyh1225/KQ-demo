<template>
  <el-row>
    <el-row class="header">
      <el-row>
        <el-col :span="11">
          <span class="searcth-font">{{$t('management.ApplicationTime')}}：</span>
          <el-date-picker
            :unlink-panels="true"
            v-model="searchInfo.applyTime"
            :picker-options="pickeroptions"
            value-format="yyyy-MM-dd"
            type="daterange"
            :range-separator="$t('myCenter.ZhiTo')"
            :start-placeholder="$t('myCenter.From')"
            :end-placeholder="$t('myCenter.To')"
          ></el-date-picker>
        </el-col>
        <el-col :span="11">
          <span class="searcth-font">{{$t('management.ResourceName')}}：</span>
          <el-input :placeholder="$t('service.pleaseEnterKEY')" v-model="searchInfo.resourceName">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button class="base-btn search-btn" @click="search">{{$t('portalStatistics.Query')}}</el-button>
        </el-col>
      </el-row>
      <el-row class="verify-group">
        <el-button @click="mulDelete" class="base-linear-btn">{{$t('management.deleteInBatch')}}</el-button>
        <span class="searcth-font">{{$t('management.ReviewStatus')}}：</span>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >{{$t('management.selectAll')}}</el-checkbox>
        <el-checkbox-group v-model="searchInfo.verifyStatus" @change="search">
          <el-checkbox :label="0">{{$t('management.ToBeReviewed')}}</el-checkbox>
          <el-checkbox :label="1">{{$t('management.Approve')}}</el-checkbox>
          <el-checkbox :label="2">{{$t('management.Reject')}}</el-checkbox>
          <el-checkbox :label="4">{{$t('myCenter.Expired')}}</el-checkbox>
        </el-checkbox-group>
      </el-row>
    </el-row>
    <el-table :data="applyList" border @selection-change="selectionChange">
      <el-table-column type="selection" min-width="5%"></el-table-column>
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :min-width="item.minWidth"
        v-for="(item,ix) in tableCol"
        :key="ix"
      ></el-table-column>
      <el-table-column :label="$t('management.ReviewStatus')" :min-width="'6%'">
        <template slot-scope="scope">{{renderScope[scope.row.C_AUDIT_SCOPE]}}</template>
      </el-table-column>
      <el-table-column prop="cz" :label="$t('management.operate')" :min-width="'12%'">
        <template slot-scope="scope">
          <el-button
            size="mini"
            class="base-btn"
            @click="showDetails(scope.row)"
          >{{$t('management.ViewDetails')}}</el-button>
          <el-button
            size="mini"
            class="base-btn-del"
            @click="singleDelete(scope.row)"
            v-if="scope.row.C_AUDIT_SCOPE!=0"
          >{{$t('visualization.Delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="total"
      :pageSize="pageSize"
      :pageIndex="pageIndex"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      class="pagination"
    ></pagination>
  </el-row>
</template>

<script>
import Pagination from "components/common/page/Pagination";
export default {
  name: "PersonalCenterMyMessageMenu",
  components: {
    Pagination
  },
  methods: {
    handleCheckAllChange(val) {
      this.searchInfo.verifyStatus = val ? [0, 1, 2, 4] : [];
      this.search();
    },
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    search() {
      this.$emit("search");
      this.isIndeterminate =
        this.searchInfo.verifyStatus.length == 4 ? false : true;
      this.checkAll = this.searchInfo.verifyStatus.length == 4 ? true : false;
    },
    selectionChange(val) {
      this.selectData = val;
    },
    showDetails(row) {
      this.$emit("showDetails", row);
    },
    singleDelete(row) {
      this.$emit("singleDelete", row);
    },
    mulDelete() {
      if (this.selectData.length == 0) {
        this.$message({
          message: this.$t("management.PleaseSelectDataToOperate"),
          type: "warning"
        });
        return false;
      }
      this.$emit("mulDelete", this.selectData);
    }
  },
  props: {
    pageIndex: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    applyList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    searchInfo: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      verifyStatus: [],
      pickeroptions: {
        disabledDate: time => {
          return time.getTime() > Date.now();
        }
      },
      checkAll: false,
      isIndeterminate: true,
      verifyStatusList: [
        this.$t("management.ToBeReviewed"),
        this.$t("management.Approve"),
        this.$t("management.Reject"),
        this.$t('myCenter.Expired')
      ],
      searchKey: "",
      tableCol: [
        {
          prop: "C_RESOURCE_NAME",
          label: this.$t("management.ResourceName"),
          minWidth: "15%"
        },
        {
          prop: "C_CREATE_TIME",
          label: this.$t("management.ApplicationTime"),
          minWidth: "10%"
        },
        {
          prop: "C_AUDIT_TIME",
          label: this.$t("management.Reviewer"),
          minWidth: "8%"
        }
      ],
      selectData: [],
      renderScope: {
        "0": this.$t("management.ToBeReviewed"),
        "1": this.$t("management.Pass"),
        "2": this.$t("management.Reject"),
        "4": this.$t('myCenter.Expired')
      }
    };
  }
};
</script>

<style lang='scss' scoped>

.header {
  margin-bottom: 15px;
  .searcth-font {
    font-size: 14px;
    color: #606266;
    margin-right: 5px;
  }
  .el-date-editor {
    width: 75%;
  }
  .el-input {
    width: 75%;
  }
  .verify-group {
    margin-top: 10px;
    .searcth-font {
      margin-left: 20px;
    }
    .el-checkbox-group {
      display: inline-block;
      margin-left: 30px;
    }
  }
}
.pagination {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>