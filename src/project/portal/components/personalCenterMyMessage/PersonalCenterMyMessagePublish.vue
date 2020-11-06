<template>
  <el-row>
    <el-row class="title">
      <span>{{$t('myCenter.Publishsystemmessage')}}</span>
    </el-row>
    <el-row class="container">
      <el-row class="message-edit">
        <el-form
          :model="messageInfo"
          :label-width="formLabelWidth"
          :rules="rules"
          ref="messageForm"
        >
          <el-form-item :label="$t('myCenter.Message')+'：'" prop="content">
            <el-input type="textarea" v-model="messageInfo.content" :rows="20"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row class="btn-container">
        <el-button
          type="primary"
          icon="el-icon-finished"
          class="base-btn"
          @click="save"
        >{{$t('management.submit')}}</el-button>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "PersonalCenterMyMessagePublish",
  props: {
    active: {
      type: String,
      default: ""
    }
  },
  watch: {
    active() {
      if (this.active == "publish") {
        this.messageInfo.content = "";
        this.$refs.messageForm.clearValidate();
      }
    }
  },
  data() {
    return {
      formLabelWidth: "100px",
      messageInfo: {
        content: ""
      },
      rules: {
        content: [
          {
            required: true,
            message: this.$t("myCenter.Pleaseenterthemessage"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    save() {
      this.$refs.messageForm.validate(valid => {
        if (valid) {
          this.$api.personalCenterMyMessageApi
            .noticeMsgByPost({
              key: "Public",
              message: this.messageInfo.content
            })
            .then(() => {
              this.$message({
                message: this.$t("myCenter.Publishedsuccessfully"),
                type: "success"
              });
              this.messageInfo.content = "";
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>

.title {
  height: 49px;
  line-height: 49px;
  border-bottom: 1px solid #ebeef5;
  span {
    @include dialog-title($width: 2px);
    padding-bottom: 14px;
    font-size: 16px;
    @include base-color();
  }
}

.message-edit {
  margin-top: 20px;
}

.btn-container {
  text-align: center;
  margin-bottom: 20px;
}

.container {
  margin-top: 6px;
  border: 1px solid #ebeef5;
  padding-right: 20px;
}
</style>