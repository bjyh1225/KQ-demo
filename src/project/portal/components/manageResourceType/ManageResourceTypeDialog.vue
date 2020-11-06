<template>
  <div class="resource-sort-dialog">
    <el-dialog
      :visible.sync="resourceDialogVisible"
      width="800px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div slot="title" class="dialog-title">
        <span class="title-text">{{$t('management.CustomCategories')}}</span>
      </div>
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item
          :label="$t('management.ResourceName') +  ':'"
          :label-width="labelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          :label=" $t('management.ResourceKey') +  ':'"
          :label-width="labelWidth"
          prop="codeKey"
        >
          <el-input v-model="form.codeKey" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="$t('management.rankId')+':'" :label-width="labelWidth">
          <el-input-number v-model="form.sortNo" :min="1" step-strictly></el-input-number>
        </el-form-item>
        <el-form-item :label="$t('webAppBuilder.Icon')+':'" :label-width="labelWidth" prop="img">
          <el-radio-group v-model="form.img" v-if="radio == false">
            <el-radio-button label="el-icon-portal-map">
              <i class="el-icon-portal-map"></i>
            </el-radio-button>
            <el-radio-button label="el-icon-portal-shujufuwuqi">
              <i class="el-icon-portal-shujufuwuqi"></i>
            </el-radio-button>
            <el-radio-button label="el-icon-portal-gongju">
              <i class="el-icon-portal-gongju"></i>
            </el-radio-button>
            <el-radio-button label="el-icon-portal-diqiu1">
              <i class="el-icon-portal-diqiu1"></i>
            </el-radio-button>
            <el-radio-button label="el-icon-portal-jichudilishujuku">
              <i class="el-icon-portal-jichudilishujuku"></i>
            </el-radio-button>
            <el-radio-button label="el-icon-portal-wenjian1">
              <i class="el-icon-portal-wenjian1"></i>
            </el-radio-button>
            <el-radio-button label="el-icon-portal-map1">
              <i class="el-icon-portal-map1"></i>
            </el-radio-button>
            <el-radio-button label="el-icon-portal-changjingguanli">
              <i class="el-icon-portal-changjingguanli"></i>
            </el-radio-button>
            <el-radio-button label="el-icon-portal-yonghufenzuyingyong">
              <i class="el-icon-portal-yonghufenzuyingyong"></i>
            </el-radio-button>
          </el-radio-group>
          <el-input
            v-model="form.img"
            autocomplete="off"
            v-if="radio == true"
            style="width: 341.88px;"
            @input="imgChange"
          >
            <template slot="append" v-if="previewStatus == true" style="width:17px">
              <div @mouseleave="previewChangeLeave" @mouseover="previewChangeOver">
                <i :class="form.img" ref="i" v-if="iStatus == true"></i>
                <i class="el-icon-portal-fangkuang" v-else-if="iStatus == false"></i>
              </div>
            </template>
            <template slot="append" v-else-if="previewStatus == false">
              <span
                @mouseover="previewChangeOver"
                @mouseleave="previewChangeLeave"
              >{{$t("visualization.Preview")}}</span>
            </template>
          </el-input>
          <el-checkbox
            v-model="radio"
            style="margin-left: 10px;"
            @change="radioChange"
          >{{$t('management.CustomIcon')}}</el-checkbox>
        </el-form-item>
        <el-form-item
          :label="$t('management.remarks')+ ':'"
          :label-width="labelWidth"
          prop="comments"
        >
          <el-input type="textarea" v-model="form.comments" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="base-white-btn" @click="handleClose">{{$t('myCenter.cancel')}}</el-button>
        <el-button class="base-btn" @click="handleSure('ruleForm')">{{$t('myCenter.Sure')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    resourceDialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("management.ResourceNameCannotBeEmpty")));
      } else if (value.length >= 50) {
        callback(
          new Error(this.$t("management.Theinputcharactersmustbelessthan50"))
        );
      } else {
        callback();
      }
    };
    var validateCodeKey = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("management.TheCurrentKeyAlreadyExists")));
      } else if (value.length >= 50) {
        callback(
          new Error(this.$t("management.Theinputcharactersmustbelessthan50"))
        );
      } else {
        callback();
      }
    };
    var validateComments = (rule, value, callback) => {
      if (value.length >= 80) {
        callback(
          new Error(this.$t("management.Theinputcharactersmustbelessthan80"))
        );
      } else {
        callback();
      }
    };
    return {
      labelWidth: "100px",
      radio: false,
      previewStatus: false,
      iStatus: true,
      form: {
        name: "",
        codeKey: "",
        comments: "",
        img: "",
        sortNo: 1,
        isSystem: 0,
      },
      rules: {
        name: [
          {
            validator: validateName,
            trigger: "blur",
            required: true,
          },
        ],
        codeKey: [
          {
            validator: validateCodeKey,
            trigger: "blur",
            required: true,
          },
        ],
        comments: [
          {
            validator: validateComments,
            trigger: "blur",
          },
        ],
      },
      Icon: {
        icon1: "el-icon-portal-map",
        icon2: "el-icon-portal-shujufuwuqi",
        icon3: "el-icon-portal-gongju",
        icon4: "el-icon-portal-diqiu",
        icon5: "el-icon-portal-jichudilishujuku",
        icon6: "el-icon-portal-wenjian1",
        icon7: "el-icon-portal-map1",
        icon8: "el-icon-portal-changjingguanli",
        icon9: "el-icon-portal-daping",
        icon10: "el-icon-portal-yonghufenzuyingyong",
      },
    };
  },
  methods: {
    handleClose() {
      this.$emit("resHandleClose");
      this.$refs.ruleForm.resetFields();
      this.form.img = "";
      this.form.comments = "";
      this.form.name = "";
      this.form.codeKey = "";
      this.form.sortNo = 1;
      this.radio = false;
      this.previewStatus = false;
    },
    radioChange() {
      this.form.img = "";
      this.previewStatus = false;
    },
    removeRule() {
      this.$refs.ruleForm.clearValidate("img");
    },
    previewChangeOver() {
      if (this.form.img != "") {
        this.previewStatus = true;
        if (this.$refs.i) {
          if (
            window.getComputedStyle(this.$refs.i).width == "auto" ||
            window.getComputedStyle(this.$refs.i).width == "0px"
          ) {
            this.iStatus = false;
          }
        }
      }
    },
    previewChangeLeave() {
      this.previewStatus = false;
      this.iStatus = true;
    },
    imgChange() {
      if (this.previewStatus == true) {
        this.previewStatus = false;
      }
    },
    handleSure(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.manageResourceSortApi
            .validateResCategory({
              name: this.form.name,
              codeKey: this.form.codeKey,
            })
            .then(() => {
              this.$api.manageResourceSortApi
                .saveResoureCategory(this.form)
                .then((res) => {
                  if (res.data.title == "success") {
                    this.$message({
                      message: this.$t("webAppBuilder.AddedSuccessfully"),
                      type: "success",
                    });
                    this.handleClose();
                  }
                });
            })
            .catch(() => {
              this.$message({
                message: this.$t("management.NotTheOnlyResourceKey"),
                type: "warning",
              });
              this.form.codeKey = "";
            });
        } else {
          return false;
        }
      });
    },
  },
  mounted() {
    //国际化样式处理
    if (this.$store.getters.language == "english") {
      this.labelWidth = "160px";
    } else {
      this.labelWidth = "100px";
    }
  },
};
</script>
<style lang='scss' scoped>
.resource-sort-dialog {
  .dialog-title {
    text-align: left;
    font-size: 16px;
    font-family: "pingfang SC", "helvetica neue", arial, "hiragino sans gb",
      "microsoft yahei ui", "microsoft yahei", simsun, sans-serif;
    overflow: hidden;
    border-bottom: 1px solid #000;
  }

  /deep/.el-dialog__body {
    padding: 10px 20px;
  }

  .dialog-body {
    @include manage-border(
      $types: (
        "bottom",
      )
    );
  }

  .dialog-title {
    padding-bottom: 20px;
    @include manage-border(
      $types: (
        "bottom",
      )
    );

    span {
      @include dialog-title($width: 2px);
      padding-bottom: 18px;
    }
  }

  .dialog-footer {
    padding-top: 15px;
  }

  /deep/.el-input-group__append {
    text-align: center;
    padding: 0;

    div {
      width: 70px;
      height: 38px;
      line-height: 42px;
      text-align: center;
      box-sizing: border-box;
      cursor: pointer;
    }

    span {
      display: block;
      width: 70px;
      height: 38px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
    }
  }

  /deep/ .el-cascader {
    width: 100%;
  }

  .el-form {
    padding: 0px 100px;
    border-bottom: 1px solid #ebeef5;
  }

  /deep/ .el-radio-button__inner {
    width: 38px;
    padding-left: 10px;
    height: 38px;
  }
}
</style>