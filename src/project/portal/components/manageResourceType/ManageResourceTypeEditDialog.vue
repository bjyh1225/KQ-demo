<template>
  <div class="resource-type-edit-dialog">
    <el-dialog
      :visible.sync="resourceEditDialogVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
      @open="openDialog"
    >
      <div slot="title" class="dialog-title">
        <span class="title-text">{{$t('management.EditCategories')}}</span>
      </div>
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item
          :label="$t('management.ResourceName') + ':'"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('management.ResourceKey') + ':'"
          :label-width="formLabelWidth"
          prop="codeKey"
        >
          <el-input v-model="form.codeKey" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="$t('management.rankId')+':'" :label-width="formLabelWidth">
          <el-input-number v-model="form.sortNo" :min="1" step-strictly></el-input-number>
        </el-form-item>
        <el-form-item :label="$t('webAppBuilder.Icon')+':'" :label-width="formLabelWidth">
          <el-radio-group v-model="form.img" v-if="radio == false" @click.native="removeRule">
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
        <el-form-item :label="$t('management.remarks') +':'" :label-width="formLabelWidth">
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
    resourceEditDialogVisible: {
      type: Boolean,
      default: false,
    },
    resourceEditDialogId: {
      type: String,
      default: "",
    },
    resourceEditDialogIsSystem: {
      type: String,
      default: "",
    },
  },
  data() {
    //表单验证
    var validateName = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("资源名称不能为空"));
      } else if (value != "" && value.length >= 50) {
        callback(new Error("输入字符长度不能超过50"));
      } else {
        callback();
      }
    };
    return {
      radio: false,
      flag: false,
      previewStatus: false,
      iStatus: true,
      form: {
        name: "",
        img: "",
        codeKey: "",
        sortNo: "",
        comments: "",
        id: "",
        personnelId: "",
        isSystem: "",
      },
      Icon: {
        icon1: "el-icon-portal-map",
        icon2: "el-icon-portal-shujufuwuqi",
        icon3: "el-icon-portal-gongju",
        icon4: "el-icon-portal-diqiu1",
        icon5: "el-icon-portal-jichudilishujuku",
        icon6: "el-icon-portal-wenjian1",
        icon7: "el-icon-portal-map1",
        icon8: "el-icon-portal-changjingguanli",
        icon9: "el-icon-portal-daping",
        icon10: "el-icon-portal-yonghufenzuyingyong",
      },
      formLabelWidth: "100px",
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
            required: true,
          },
        ],
      },
    };
  },
  methods: {
    handleClose() {
      this.$emit("resEditHandleClose");
      this.$refs.ruleForm.resetFields();
      this.form.img = "";
      this.form.comments = "";
      this.form.name = "";
      this.form.codeKey = "";
      this.previewStatus = false;
      this.iStatus = true;
      this.radio = false;
      this.flag = false;
    },
    removeRule() {
      this.$refs.ruleForm.clearValidate("img");
    },
    radioChange() {
      this.previewStatus = false;
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
    openDialog() {
      this.$api.manageResourceSortApi
        .selectById({
          id: this.resourceEditDialogId,
          personnelId: JSON.parse(sessionStorage.getItem("userInfo")).id,
        })
        .then((res) => {
          for (let Key in this.Icon) {
            if (res.data.data.img == this.Icon[Key]) {
              this.flag = true;
            }
          }
          if (this.flag == true) {
            this.radio = false;
          } else {
            this.radio = true;
          }
          this.form.name = res.data.data.name;
          this.form.codeKey = res.data.data.codeKey;
          this.form.comments = res.data.data.comments;
          this.form.img = res.data.data.img;
          this.form.sortNo = res.data.data.sortNo;
        })
        .catch((error) => {
          return error;
        });
    },

    handleSure(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.personnelId = JSON.parse(
            sessionStorage.getItem("userInfo")
          ).id;
          this.form.id = this.resourceEditDialogId;
          this.form.isSystem = this.resourceEditDialogIsSystem;
          this.$api.manageResourceSortApi
            .saveResoureCategory(this.form)
            .then(() => {
              this.$message({
                message: this.$t("management.EditedSuccessfully"),
                type: "success",
              });
              if (this.$refs.ruleform !== undefined) {
                this.$refs.ruleform.resetFields();
              }
              this.handleClose();
            })
            .catch((error) => {
              return error;
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
      this.formLabelWidth = "160px";
    } else {
      this.formLabelWidth = "100px";
    }
  },
};
</script>
<style lang='scss' scoped>
.resource-type-edit-dialog {
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

  /deep/ .el-cascader {
    width: 100%;
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