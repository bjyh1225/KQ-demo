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
        <el-button
          @click="mulVerify"
          class="base-linear-btn"
          :disabled="searchInfo.verifyStatus==1?false:true"
        >{{$t('management.ReviewInBatches')}}</el-button>
        <span class="searcth-font">{{$t('management.ReviewStatus')}}：</span>
        <el-radio-group v-model="searchInfo.verifyStatus" @change="search">
          <el-radio :label="1">{{$t('management.ToBeReviewed')}}</el-radio>
          <el-radio :label="2">{{$t('myCenter.Verified')}}</el-radio>
          <el-radio :label="3">{{$t('myCenter.Expired')}}</el-radio>
        </el-radio-group>
      </el-row>
    </el-row>
    <el-table :data="verifyList" border @selection-change="selectionChange">
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
        v-if="searchInfo.verifyStatus!=1"
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
  name: "PersonalCenterMyVerifyList",
  components: {
    Pagination
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    search() {
      this.$emit("search", this.searchKey);
    },
    selectionChange(val) {
      this.selectData = val;
    },
    verify(row) {
      this.$emit("verify", row);
    },
    showDetails(row) {
      this.$emit("showDetails", row);
    },
    mulVerify() {
      if (this.selectData.length == 0) {
        this.$message({
          message: this.$t("management.PleaseSelectDataToOperate"),
          type: "warning"
        });
        return false;
      }
      this.$emit("mulVerify", this.selectData);
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
    searchInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    verifyList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      pickeroptions: {
        disabledDate: time => {
          return time.getTime() > Date.now();
        }
      },
      tableCol: [
        {
          prop: "C_RESOURCE_NAME",
          label: this.$t("management.ResourceName"),
          minWidth: "15%"
        },
        {
          prop: "CREATENAME",
          label: this.$t("management.Applicant"),
          minWidth: "10%"
        },
        {
          prop: "C_CREATE_TIME",
          label: this.$t("management.ApplicationTime"),
          minWidth: "10%"
        }
      ],
      selectData: [],
      renderScope: {
        "0": this.$t("management.ToBeReviewed"),
        "1": this.$t("management.Pass"),
        "2": this.$t("management.Reject"),
        "4": this.$t("myCenter.Expired")
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
  }
}
.pagination {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>