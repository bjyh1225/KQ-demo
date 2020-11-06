<template>
  <div class="layer-manage-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="700px"
      :before-close="handleClose"
      :modal-append-to-body="false"
      :custom-class="'layer-cataloguer-dialog-pop'"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>{{$t('webAppBuilder.EditAppName')}}</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <el-form
          :model="currentAppName"
          :rules="rules"
          :label-width="'100px'"
          ref="editAppNameForm"
        >
          <el-form-item :label="$t('management.AppNames')+'：'" prop="name">
            <el-input v-model="currentAppName.name"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-white-btn" @click="handleClose">{{$t('management.cancel')}}</el-button>
        <el-button type="primary" class="app-builder-btn" @click="save">{{$t('management.ok')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "EditAppName",
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    currentAppName: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: this.$t("management.PleaseEnterAppName"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleClose() {
      this.$refs.editAppNameForm.clearValidate();
      this.$emit("dialogClose");
    },
    save() {
      this.$refs.editAppNameForm.validate(valid => {
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
.layer-manage-dialog {
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  .dialog-title {
    padding-bottom: 20px;
    border-bottom: 1px solid #ebeef5;
    span {
      padding-bottom: 18px;
    }
  }
  .dialog-body {
    border-bottom: 1px solid #ebeef5;
  }
  .el-slider {
    width: 50%;
  }
}
</style>

