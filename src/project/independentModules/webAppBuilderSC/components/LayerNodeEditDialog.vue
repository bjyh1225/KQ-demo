<template>
  <div class="layer-manage-dialog" append-to-body>
    <el-dialog
      :visible.sync="dialogVisible"
      width="900px"
      :before-close="handleClose"
      :modal-append-to-body="false"
      :custom-class="'layer-cataloguer-dialog-pop'"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>{{$t('webAppBuilder.LayerPropertySettings')}}</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <el-form :model="layerInfo" :label-width="'120px'" :rules="rules" ref="layerNodeEditForm">
          <el-form-item :label="$t('myCenter.Name')+'：'" prop="_label">
            <el-input v-model="layerInfo._label"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('webAppBuilder.TheService')+'：'">
                <span>{{layerInfo._service_name}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('webAppBuilder.LayerID')+'：'">
                <span>{{layerInfo._id}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('webAppBuilder.LayerType')+'：'">
                <span>{{layerInfo._type=='sl'?$t('webAppBuilder.Vector'):$t('webAppBuilder.Image')}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('webAppBuilder.UpdateInRealTime')+'：'">
                <span>{{layerInfo._is_dynamic==1?$t('webAppBuilder.Yes'):$t('webAppBuilder.No')}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('webAppBuilder.DefaultView')+'：'">
                <el-radio v-model="layerInfo._visible" label="1">{{$t('webAppBuilder.Yes')}}</el-radio>
                <el-radio v-model="layerInfo._visible" label="0">{{$t('webAppBuilder.No')}}</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('webAppBuilder.AerialView')+'：'">
                <el-radio v-model="layerInfo._is_mini" label="1">{{$t('webAppBuilder.Yes')}}</el-radio>
                <el-radio v-model="layerInfo._is_mini" label="0">{{$t('webAppBuilder.No')}}</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item :label="$t('webAppBuilder.Icon')+'：'">
            <el-radio v-model="layerInfo._icon" label="default">
              <img src="/thirdParty/kqwebmap/ftree/default.png" />
            </el-radio>
            <el-radio v-model="layerInfo._icon" label="earth">
              <img src="/thirdParty/kqwebmap/ftree/earth.png" />
            </el-radio>
            <el-radio v-model="layerInfo._icon" label="image">
              <img src="/thirdParty/kqwebmap/ftree/image.png" />
            </el-radio>
            <el-radio v-model="layerInfo._icon" label="annotation">
              <img src="/thirdParty/kqwebmap/ftree/annotation.png" />
            </el-radio>
            <el-radio v-model="layerInfo._icon" label="point">
              <img src="/thirdParty/kqwebmap/ftree/point.png" />
            </el-radio>
            <el-radio v-model="layerInfo._icon" label="line">
              <img src="/thirdParty/kqwebmap/ftree/line.png" />
            </el-radio>
            <el-radio v-model="layerInfo._icon" label="polygon">
              <img src="/thirdParty/kqwebmap/ftree/polygon.png" />
            </el-radio>
            <el-radio v-model="layerInfo._icon" label="vector">
              <img src="/thirdParty/kqwebmap/ftree/vector.png" />
            </el-radio>
          </el-form-item>
          <el-form-item :label="$t('webAppBuilder.Transparency')+'：'">
            <el-slider v-model="layerInfo._opacity" :min="0" :max="1" :step="0.1"></el-slider>
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
  name: "LayerNodeEditDialog",
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
  data() {
    return {
      rules: {
        _label: [
          {
            required: true,
            message: this.$t("webAppBuilder.PleaseEnterLayerName"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleClose() {
      this.$refs.layerNodeEditForm.clearValidate();
      this.$emit("dialogClose");
    },
    save() {
      this.$refs.layerNodeEditForm.validate(valid => {
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
  .el-slider {
    width: 50%;
  }
}
</style>

