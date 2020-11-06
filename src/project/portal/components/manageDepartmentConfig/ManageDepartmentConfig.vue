<template>
  <div class="content">
    <el-row class="title">
      <span>{{$t('management.WhatResourcesCanADepartmentAdministratorManageForDepartmentMembers')}}</span>
    </el-row>
    <el-row class="form-area">
      <el-col :span="3">{{$t('management.SharingScope')}}</el-col>
      <el-col :span="21">
        <el-checkbox-group v-model="configInfo.value">
          <el-checkbox label="Public">{{$t('management.Public')}}</el-checkbox>
          <el-checkbox label="Partial">{{$t('management.Limited')}}</el-checkbox>
          <el-checkbox label="Private">{{$t('management.Private')}}</el-checkbox>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <el-row class="add-btn">
      <el-button class="base-btn" type="primary" @click="saveAdd">{{$t('visualization.Save')}}</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ManageDepartmentConfig",
  props: {
    currentTabShowStatus: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    currentTabShowStatus: {
      immediate: true, // immediate选项可以开启首次赋值监听
      handler(newVal) {
        if (newVal) {
          this.getOrgMngConfig();
        }
      },
    },
  },
  data() {
    return {
      configInfo: {
        value: [],
        id: "",
      },
    };
  },
  methods: {
    saveAdd() {
      if (this.configInfo.value.length < 1) {
        this.$message({
          message: "请勾选共享范围",
          type: "warning",
        });
        return false;
      }
      this.$api.visualizationApi
        .saveSysParamConfigure(
          {
            key: "orgMngConfig",
            value: this.configInfo.value.toString(),
            force: true,
            id: this.configInfo.id,
          },
          {
            loadingText: this.$t("webAppBuilder.BeingSaved"),
            coverStatusCode: { 395: { needAlertMessage: false } },
          }
        )
        .then(() => {
          this.$message({
            message: this.$t("management.succeeded"),
            type: "success",
          });
        })
        .catch((error) => {
          if (error.data && error.data.status == 395) {
            this.$message({
              message: this.$t("management.EnableItBeforeConfiguration"),
              type: "error",
            });
          }
        });
    },
    getOrgMngConfig() {
      this.$api.visualizationApi
        .getSysParamConfigureByKey(
          {
            key: "orgMngConfig",
          },
          { loadingText: this.$t("service.searching") }
        )
        .then((res) => {
          var data = res.data.data;
          if (data) {
            this.configInfo.value = data.value.split(",");
            this.status = data.status;
            this.configInfo.id = data.id;
          } else {
            this.configInfo = {
              value: ["Public", "Partial"],
              id: "",
            };
          }
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang='scss' scoped>

.content {
  border: 1px solid #dfdfdf;
  padding: 0 70px;
  background: #fff;
  margin-top: 20px;
  .title {
    margin-top: 15px;
    border-bottom: 1px solid #dfdfdf;
    height: 40px;
    line-height: 40px;
    @include base-color();
    font-size: 16px;
    span {
      @include dialog-title($width: 2px);
      padding: 0 10px 10px 10px;
    }
  }
  .form-area {
    margin-top: 30px;
    /deep/.el-col.el-col-3 {
      text-align: right;
      padding-right: 20px;
    }
  }
  .add-btn {
    margin-bottom: 30px;
    padding-top: 30px;
  }
}
</style>