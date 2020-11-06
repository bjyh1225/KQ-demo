<template>
  <div class="manage-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>{{dialogTitle}}</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <el-form
          :model="serverInfo"
          :label-width="formLabelWidth"
          :rules="rules"
          ref="manageServerForm"
        >
          <el-form-item :label="$t('management.ServerName')+':'" prop="name">
            <el-input v-model="serverInfo.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('management.HTTPProtocol')+':'" prop="serverHttp">
            <el-select v-model="serverInfo.serverHttp" :disabled="disableStatus">
              <el-option :key="'http'" :label="'http'" :value="'http'"></el-option>
              <el-option :key="'https'" :label="'https'" :value="'https'"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('management.ServerIP')+':'" prop="serverIp">
            <el-input v-model="serverInfo.serverIp" :disabled="disableStatus"></el-input>
          </el-form-item>
          <el-form-item :label="$t('management.ServerPort')+':'" prop="serverPortnumber">
            <el-input v-model="serverInfo.serverPortnumber" :disabled="disableStatus"></el-input>
          </el-form-item>
          <el-form-item :label="$t('management.remarks')+':'" prop="comments">
            <el-input v-model="serverInfo.comments" type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-white-btn" @click="handleClose">{{$t('management.cancel')}}</el-button>
        <el-button type="primary" class="base-btn" @mousedown.native="save">{{$t('management.ok')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ManageProxyServerDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default() {
        return this.$t("management.RegisterServer");
      }
    },
    serverInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    formLabelWidth: {
      type: String,
      default: "120px"
    },
    operate: {
      type: String,
      default: "add"
    }
  },
  watch: {
    operate() {
      if (this.operate == "edit") {
        this.disableStatus = true;
      } else {
        this.disableStatus = false;
      }
    }
  },
  data() {
    // var checkServerIp = (rule, value, callback) => {
    //   if (this.operate == "edit") {
    //     callback();
    //   } else {
    //     if (value.split(".")[0] == "127") {
    //       return callback(new Error(this.$t("myCenter.ThisIPcannotbesetasGISIPnow")));
    //     }
    //     if (
    //       this.serverInfo.serverPortnumber &&
    //       this.serverInfo.serverHttp
    //     ) {
    //       this.$api.manageServerApi
    //         .getTypeAllListOnly({
    //           serverIp: this.serverInfo.serverIp,
    //           serverPortnumber: this.serverInfo.serverPortnumber,
    //           serverHttp: this.serverInfo.serverHttp
    //         })
    //         .then(res => {
    //           if (res.data.data) {
    //             callback();
    //           } else {
    //             callback(
    //               new Error(
    //                 this.$t(
    //                   "management.TheServiceAlreadyExistsAndCannotBeRegisteredAgain"
    //                 )
    //               )
    //             );
    //           }
    //         })
    //         .catch(() => {
    //           callback(
    //             new Error(this.$t("management.ErrorInVerifyingService"))
    //           );
    //         });
    //     } else {
    //       callback();
    //     }
    //   }
    // };
    return {
      disableStatus: false,
      rules: {
        serverIp: [
          {required:true,message:this.$t("management.PleaseEnterServerIP"),trigger: 'blur'},
          {
            pattern:/^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/,
            message: this.$t("management.TheServerIPEnteredIsIncorrectInFormat"),
            trigger: 'blur'
          },
          {max:50,message:this.$t("management.Theinputcharactersmustbelessthan50"),trigger: 'blur'}
          // {required: true, validator: checkServerIp, trigger: "submit" }
        ],
        serverPortnumber: [
          {required:true,message:this.$t("management.PleaseEnterServerPort"),trigger: 'blur'},
          {
            pattern:/^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
            message:this.$t("management.TheServerPortEnteredIsIncorrectInFormat"),
            trigger:'blur'
          },
          {max:50,message:this.$t("management.Theinputcharactersmustbelessthan50"),trigger: 'blur'}
          // {required: true, validator: checkServerPort, trigger: "submit" }
        ],
        name: [
          {required:true,message:this.$t("management.PleaseEnterServerName"),trigger: 'blur'},
          {max:50,message:this.$t("management.Theinputcharactersmustbelessthan50"),trigger: 'blur'}
        ],
        serverHttp: [
          {required: true,message: this.$t("management.PleaseSelectHTTPProtocol"),trigger: "change"}
        ],
        comments:[
          {max:50,message:this.$t("management.Theinputcharactersmustbelessthan80"),trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    handleClose() {
      this.$refs.manageServerForm.clearValidate();
      this.$emit("dialogClose");
    },
    save() {
      this.$refs.manageServerForm.validate(valid => {
        if (valid) {
          this.$emit("save");
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>

.manage-dialog {
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  .dialog-body {
    @include manage-border(
      $types: (
        "bottom"
      )
    );
  }
  .dialog-title {
    padding-bottom: 20px;
    @include manage-border(
      $types: (
        "bottom"
      )
    );
    span {
      @include dialog-title($width: 2px);
      padding-bottom: 18px;
    }
  }
  /deep/ .el-cascader {
    width: 100%;
  }
  .el-form {
    padding: 0px 100px;
    /deep/ .el-select {
      width: 100%;
    }
  }
}
</style>