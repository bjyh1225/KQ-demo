<template>
  <div class="manage-dialog">
    <el-dialog :visible.sync="equilibriumDialogVisible" width="720px" :modal="true" :before-close="handleClose">
      <template slot="title">
        <div class="dialog-title">
          <span>{{title}}</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <el-table :data="lbruleList" border ref="multipleTable">
          <el-table-column prop="ruleName" :label="'策略名称'" min-width="30%"></el-table-column>
          <el-table-column prop="desc" :label="'策略说明'" min-width="50%"></el-table-column>
          <el-table-column :label="'状态'" min-width="20%">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.state" @change="modify(scope.row)"></el-switch>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
  import { Loading } from "element-ui"
  export default {
    name: "ClusterManageEquilibriumDialog",
    data() {
      return {
        title: "设置均衡策略",
        lbruleList: []
      };
    },
    props: {
      equilibriumDialogVisible: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      equilibriumDialogVisible() {
        if (this.equilibriumDialogVisible) {
          this.getLbruleList();
        }
      }
    },
    methods: {
      handleClose() {
        this.$emit("equilibriumDialogClose");
      },
      // 获取列表
      getLbruleList() {
        this.$api.clusterManageApi.getLbruleList({
        })
          .then(data => {
            if (data.data.code == "200") {
              this.$api.clusterManageApi.getLbrule({
              })
                .then(row => {
                  if (row.data.code == "200") {
                    data.data.data.forEach(element => {
                      if (element.ruleType == row.data.data.ruleType) {
                        element.state = true;
                      } else {
                        element.state = false;
                      }
                    });
                    this.lbruleList = data.data.data;
                  } else {
                    if (data.data.msg) {
                      this.$message({
                        type: "error",
                        message: "data.msg"
                      })
                    }
                  }
                })
                .finally(() => { });
            } else {
              if (data.data.msg) {
                this.$message({
                  type: "error",
                  message: "data.msg"
                })
              }
            }
          })
          .finally(() => { });
      },
      // 修改
      modify(val) {
        let flag = val.state; // eslint-disable-line no-unused-vars
        val.state = !val.state;
        let loading = Loading.service({
          lock: true,
          text: "正在重启网关中"
        });
        if (flag) {
          this.$api.clusterManageApi.modifyLbrule(
            { ruleType: val.ruleType },
            { noLoading: true }
          )
            .then(() => {
              let n = 0
              let getnowLbrule = setInterval(() => {
                n += 1
                this.$api.clusterManageApi.getLbrule({}, { noLoading: true, noIntercept: true })
                  .then(() => {
                    loading.close()
                    this.getLbruleList()
                    clearInterval(getnowLbrule)
                  })

              }, 15000);
              if (n == 3) {
                clearInterval(getnowLbrule)
              }
            })
            .catch(() => {
              loading.close()
            })

        }
      }
    }
  }


</script>
<style lang="scss" scoped>
  .manage-dialog {
    /deep/.el-dialog__body {
      padding: 10px 20px;
      min-height: 250px;
    }

    .dialog-body {
      // @include manage-border($types:('bottom'));
    }

    .dialog-title {
      padding-bottom: 20px;

      //  @include manage-border($types:('bottom'));
      span {
        //  @include dialog-title($width:2px);
        padding-bottom: 18px;
      }
    }
  }
</style>