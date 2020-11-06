<template>
  <div class="category-save">
    <el-row class="category-save-container">
      <el-row class="category-save-title">
        <span>{{$t('management.categoryWindow')}}</span>
      </el-row>
      <el-form
        :model="serviceCategoryInfo"
        label-width="100px"
        :rules="rules"
        ref="serviceCategoryForm"
      >
        <el-form-item :label="$t('management.categoryName')+':'" prop="typeName">
          <el-input v-model="serviceCategoryInfo.typeName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('myCenter.TheCategory')">
          <el-input v-model="serviceCategoryInfo.parentTypeName" disabled="disabled"></el-input>
        </el-form-item>
        <!-- <el-form-item :label="$t('management.rankId')+':'" prop="name">
          <el-input-number v-model="serviceCategoryInfo.sortNo" :min="1" :max="10"></el-input-number>
        </el-form-item> -->
        <el-form-item :label="$t('management.categoryDescription')+':'" prop="comments">
          <el-input type="textarea" v-model="serviceCategoryInfo.comments"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="btn-container">
        <el-button
          type="primary"
          icon="el-icon-finished"
          class="base-btn"
          @mousedown.native="save"
        >{{$t('management.submit')}}</el-button>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ManageServiceCategorySave",
  props: {
    serviceCategoryInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    checkTypeName: {
      type: Function,
      default: (rule, value, callback) => {
        if (!value) {
          return callback(
            new Error(this.$t("management.pleaseEnterTheCategoryName"))
          );
        }
        callback();
      }
    },
    checkComments:{
      type: Function,
      default: (rule, value, callback) => {
        callback();
      }
    }
  },
  methods: {
    save() {
      this.$refs.serviceCategoryForm.validate(valid => {
        if (valid) {
          this.$emit("save");
        } else {
          return false;
        }
      });
    },
    reset() {
      this.$refs.serviceCategoryForm.clearValidate();
    }
  },
  data() {
    return {
      rules: {
        typeName: [
          { required: true, validator: this.checkTypeName, trigger: "blur" }
        ],
        comments:[{ required: false, validator: this.checkComments, trigger: "blur" }]
      }
    };
  }
};
</script>

<style lang='scss' scoped>

.category-save {
  padding: 0 20px;
  .category-save-container {
    @include manage-border();
    height: 500px;
    padding: 0 20px;
    .category-save-title {
      @include manage-border(
        $types: (
          "bottom"
        )
      );
      padding: 10px 0;
      span {
        @include base-color();
      }
    }
    .el-form {
      margin-top: 20px;
      /deep/.el-textarea__inner {
        height: 100px;
      }
    }
    .btn-container {
      padding-left: 100px;
    }
  }
}
</style>