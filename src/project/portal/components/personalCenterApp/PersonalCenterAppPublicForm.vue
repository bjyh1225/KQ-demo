<template>
  <div id="app-public">
    <el-form
      :model="registerInfo"
      :label-width="formLabelWidth"
      :rules="rules"
      ref="roleForm"
      id="app-public-form"
    >
      <el-form-item :label="$t('myCenter.TheCategory')" prop="appClassify">
        <el-select
          v-model="registerInfo.appClassify"
          :placeholder="$t('myCenter.PleaseSelect')"
          style="width: 100%;"
        >
          <!-- <el-option-group
            v-for="group in dropdownCategory"
            :key="group.id"
            :label="group.typeName"
            :class="classMark?'with-select':''"
          > -->
            <el-option
              v-for="item in dropdownCategory"
              :key="item.id"
              :label="item.typeName"
              :value="item.id"
            ></el-option>
          <!-- </el-option-group> -->
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('management.AppNames')" prop="name">
        <el-input v-model="registerInfo.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('management.AppDescription')" prop="appComments">
        <el-input type="textarea" v-model="registerInfo.appComments"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "PersonalCenterAppPublicForm",
  props: {
    registerInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    formLabelWidth: {
      type: String,
      default: "120px"
    },
    distinguishAppBuilder: {
      type: String,
      default: "null"
    },
    classMark: {
      //应用定制的类
      type: Boolean,
      default: () => {
        return false;
      }
    },
    defaultClassify: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      rules: {
        appClassify: [
          {
            required: true,
            message: this.$t("myCenter.PleaseSelectTheItsCategory"),
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: this.$t("management.PleaseEnterAppName"),
            trigger: "blur"
          }
        ]
      },
      dropdownCategory: [], //下拉类别
      category: [] //下拉类别
    };
  },
  mounted() {
    this.getAppCategory();
  },
  watch: {
    distinguishAppBuilder() {
      if (
        this.distinguishAppBuilder == "appbuilder" ||
        this.distinguishAppBuilder == "appEdit"
      ) {
        this.getAppCategory();
      }
    },
    dropdownCategory() {
      if (
        this.dropdownCategory.length > 0 &&
        this.defaultClassify.appClassify != ""
      ) {
        this.dropdownCategory.forEach(item => {
          item.children.forEach(ic => {
            if (ic.id == this.defaultClassify.appClassify) {
              this.registerInfo.appClassify = ic.id;
              return false;
            }
          });
        });
      }
    }
  },
  methods: {
    //初始获取权限
    getAppCategory() {
      var parameter = {};
      if (this.distinguishAppBuilder == "appbuilder") {
        parameter = {
          loadingText: this.$t("service.searching"),
          __LOGINTYPE: "dialog"
        };
      } else {
        parameter = {
          loadingText: this.$t("service.searching")
        };
      }
      this.$api.personalCenterAppApi.getAppCategory(parameter).then(res => {
        if (res.status == 200) {
            this.dropdownCategory = [];
            var map = [];
            this.category = res.data.data;
            this.category.forEach(item=>{
              if(item.parentId==0){
                map.push(item);
              }
            })
             map.forEach(ar=>{
               this.dropdownCategory.push(ar);
              this.category.forEach(it=>{
                  if(ar.id==it.parentId){
                    it.typeName=`${ar.typeName} — ${it.typeName}`;
                    this.dropdownCategory.push(it);
                  }
                })
              })
        }
      });
    },
    openFormDialog() {
      this.$refs.roleForm.clearValidate();
    },
    validate() {
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          this.$emit("formResult", valid);
        } else {
          this.$message({
            message: this.$t("myCenter.Pleasecompletetheserivcesbasicinfo"),
            type: "warning"
          });
        }
      });
    },
    resetFields() {
      this.$refs.roleForm.resetFields();
    },
    clearValidate() {
      this.$refs.roleForm.clearValidate();
    },
    checkData(success, fail) {
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          if (success && typeof success === "function") {
            success();
          }
        } else {
          if (fail && typeof fail === "function") {
            fail();
          }
        }
      });
    }
  }
};
</script>
<style lang='scss'>
.el-popup-parent--hidden
  .el-select-dropdown.el-popper
  .el-select-dropdown__wrap
  .el-select-dropdown__list
  .el-select-group__wrap.with-select
  .el-select-group
  .el-select-dropdown__item.selected {
  color: #3691e9;
}
</style>