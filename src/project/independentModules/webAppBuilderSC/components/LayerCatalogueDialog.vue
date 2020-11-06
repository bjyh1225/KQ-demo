<template>
  <div class="layer-manage-dialog" append-to-body>
    <el-dialog
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="handleClose"
      :modal-append-to-body="false"
      :custom-class="'layer-cataloguer-dialog-pop'"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>{{$t('webAppBuilder.LayerDirectorySettings')}}</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <el-form :model="layerInfo" :label-width="'70px'" :rules="rules" ref="layerCatalogueForm">
          <el-form-item :label="$t('myCenter.Name')+'：'" prop="_label">
            <el-input v-model="layerInfo._label"></el-input>
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
  name: "LayerCatalogueDialog",
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    layerInfo: {
      type: Object,
      default: () => {
        return {
          _label: ""
        };
      }
    }
  },
  watch: {
    dialogVisible() {}
  },
  data() {
    return {
      rules: {
        _label: [
          {
            required: true,
            message: this.$t(
              "webAppBuilder.PleaseEnterTheNameOfLayerDirectory"
            ),
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleClose() {
      this.$refs.layerCatalogueForm.clearValidate();
      this.$emit("dialogClose");
    },
    save() {
      this.$refs.layerCatalogueForm.validate(valid => {
        if (valid) {
          this.$emit("save", this.layerInfo);
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
}
</style>

