<template>
  <div class="manage-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="1000px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>{{dialogTitle}}</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <el-col class="dialog-right">
          <el-form
            :model="permissionInfo"
            :label-width="formLabelWidth"
            :rules="rules"
            ref="permissionForm"
          >
            <el-form-item :label="$t('management.permissionCode')+':'" prop="code">
              <el-input v-model="permissionInfo.code" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('management.permissionName')+':'" prop="name">
              <el-input v-model="permissionInfo.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('management.rankId')+':'">
              <el-input-number v-model="permissionInfo.sortNo" :min="0" :max="10"></el-input-number>
            </el-form-item>
            <el-form-item :label="$t('management.inclusionPermission')+':'">
              <el-row class="permission-select-area">
                <el-col :span="8" class="permission-select-content tree-area">
                  <span class="title">{{$t('management.MenuPermission')}}</span>
                  <el-scrollbar class="scroll">
                    <el-tree
                      :data="menuList"
                      show-checkbox
                      node-key="name"
                      :props="defaultProps"
                      @check-change="menuCheckChange"
                      ref="menuTree"
                      default-expand-all
                      :default-checked-keys="defaultCheckedKeys"
                    ></el-tree>
                  </el-scrollbar>
                </el-col>
                <el-col :span="16" class="permission-select-content function-area">
                  <span class="title">{{$t('management.FunctionPermission')}}</span>
                  <el-scrollbar class="scroll">
                    <el-row class="waterfall" v-if="functionList.length>0">
                      <el-col :span="8" class="waterfall-col">
                        <div
                          class="waterfall-block"
                          v-for="item in firstColWaterfall.data"
                          :key="item.name"
                        >
                          <p class="waterfall-block-title">{{item.label}}</p>
                          <el-checkbox
                            v-model="fitem.checked"
                            v-for="fitem in item.functionAuthority"
                            :key="fitem.parentName+fitem.name"
                          >{{fitem.label}}</el-checkbox>
                        </div>
                      </el-col>
                      <el-col :span="8" class="waterfall-col">
                        <div
                          class="waterfall-block"
                          v-for="item in secondColWaterfall.data"
                          :key="item.name"
                        >
                          <p class="waterfall-block-title">{{item.label}}</p>
                          <el-checkbox
                            v-model="fitem.checked"
                            v-for="fitem in item.functionAuthority"
                            :key="fitem.parentName+fitem.name"
                          >{{fitem.label}}</el-checkbox>
                        </div>
                      </el-col>
                      <el-col :span="8" class="waterfall-col">
                        <div
                          class="waterfall-block"
                          v-for="item in thirdColWaterfall.data"
                          :key="item.name"
                        >
                          <p class="waterfall-block-title">{{item.label}}</p>
                          <el-checkbox
                            v-model="fitem.checked"
                            v-for="fitem in item.functionAuthority"
                            :key="fitem.parentName+fitem.name"
                          >{{fitem.label}}</el-checkbox>
                        </div>
                      </el-col>
                    </el-row>
                    <div
                      class="no-function"
                      v-else
                    >{{$t('management.ThereIsNoFunctionPermissionCurrently')}}</div>
                  </el-scrollbar>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item :label="$t('management.remarks')+':'" prop="describe">
              <el-input type="textarea" v-model="permissionInfo.describe"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-white-btn" @click="handleClose">{{$t('management.cancel')}}</el-button>
        <el-button type="primary" class="base-btn" @mousedown.native="save">{{$t('management.ok')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllMenu } from "common/routerUtils/menuFun.js";
export default {
  name: "ManagePermissionDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    dialogTitle: {
      type: String,
      default() {
        return this.$t("management.addPermission");
      },
    },
    permissionInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    operate: {
      type: String,
      default: "add",
    },
  },
  methods: {
    handleClose() {
      this.$refs.permissionForm.clearValidate();
      this.$emit("dialogClose");
    },
    save() {
      this.$refs.permissionForm.validate((valid) => {
        if (valid) {
          //处理权限
          let treeData = this.$refs.menuTree.getCheckedNodes(false, true);
          let realTreeData = this.$refs.menuTree.getCheckedNodes(false, false);
          let menu = [];
          let realMenu = [];
          // let functionAuthority=[];
          let functionAuthorityDetails = {};
          treeData.forEach((item) => {
            menu.push(item.name);
          });
          realTreeData.forEach((item) => {
            realMenu.push(item.name);
          });
          this.functionList.forEach((item) => {
            item.functionAuthority.forEach((fitem) => {
              if (fitem.checked) {
                // functionAuthority.push(item.name+"-"+fitem.name);
                if (!functionAuthorityDetails[item.name]) {
                  functionAuthorityDetails[item.name] = [];
                  functionAuthorityDetails[item.name].push(fitem.name);
                } else {
                  functionAuthorityDetails[item.name].push(fitem.name);
                }
              }
            });
          });
          this.permissionInfo.include = {
            menu: menu,
            functionAuthority: functionAuthorityDetails,
          };
          let realMenuJson = {
            menu: realMenu,
            functionAuthority: functionAuthorityDetails,
          };
          this.permissionInfo.includeResourceJson = JSON.stringify(
            realMenuJson
          );
          this.$emit("save");
        } else {
          return false;
        }
      });
    },
    menuCheckChange(treeInfo, checked) {
      //菜单点击改变
      let data = JSON.parse(JSON.stringify(treeInfo));
      if (checked && data.functionAuthority) {
        let st = false;
        this.functionList.forEach((item) => {
          if (item.name == data.name) {
            st = true;
          }
        });
        if (!st) {
          this.functionList.push(data);
          this.createWaterfall();
        }
      }
      if (!checked && data.functionAuthority) {
        let index;
        this.functionList.forEach((item, ix) => {
          if (item.name == data.name) {
            index = ix;
          }
        });
        if (index || index == 0) {
          this.functionList.splice(index, 1);
        }
        this.createWaterfall();
      }
    },
    createWaterfall() {
      this.resetWaterfall();
      this.functionList.forEach((item) => {
        let r = this.getCurrentAddWaterfall();
        r.height = r.height + item.functionAuthority.length + 15;
        r.data.push(item);
      });
    },
    getCurrentAddWaterfall() {
      let sortList = [
        this.firstColWaterfall,
        this.secondColWaterfall,
        this.thirdColWaterfall,
      ];
      this.globalMethods.sortUtil(sortList, ["height"]);
      return sortList[0];
    },
    resetWaterfall() {
      this.firstColWaterfall = {
        height: 0,
        data: [],
      };
      this.secondColWaterfall = {
        height: 0,
        data: [],
      };
      this.thirdColWaterfall = {
        height: 0,
        data: [],
      };
    },
    getMenuList() {
      var menuList = getAllMenu(this);
      this.menuList = menuList;
    },
  },
  watch: {
    operate() {
      if (this.operate == "edit") {
        this.disableStatus = true;
      } else {
        this.disableStatus = false;
      }
    },
    dialogVisible() {
      if (this.dialogVisible) {
        this.functionList = [];
        this.resetWaterfall();
        this.menuList = [];
        this.defaultCheckedKeys = [];
        this.getMenuList();
        //编辑时初始化数据
        if (this.operate == "edit") {
          if (this.permissionInfo.include.menu) {
            this.defaultCheckedKeys = this.permissionInfo.include.menu;
          }
          this.globalMethods.traversal(this.menuList, "children", (item) => {
            if (item.functionAuthority) {
              let newItem = {
                name: item.name,
                label: item.label,
                functionAuthority: JSON.parse(
                  JSON.stringify(item.functionAuthority)
                ),
              };
              newItem.functionAuthority.forEach((fitem) => {
                if (
                  this.permissionInfo.include.functionAuthority &&
                  this.permissionInfo.include.functionAuthority[item.name]
                ) {
                  let functionAuthority = this.permissionInfo.include
                    .functionAuthority;
                  if (functionAuthority[item.name].indexOf(fitem.name) < 0) {
                    fitem.checked = false;
                  }
                } else {
                  fitem.checked = false;
                }
              });
              this.functionList.push(newItem);
            }
          });
          this.createWaterfall();
        }
      }
    },
  },
  data() {
    var checkPermissionCode = (rule, value, callback) => {
      if (this.operate == "edit") {
        callback();
      }
      let rules = new this.formRules.baseValidateRule({
        errorMsg: this.$t("management.errorsInVerifyingThePermissionCode"),
        value: value,
        callback: callback,
      });
      rules.execute([
        {
          name: "requiredFieldValidator",
          errorMsg: this.$t("management.pleaseEnterThePermissionCode"),
        },
        {
          name: "repeatValidator",
          errorMsg: this.$t("management.thePermissionCodeCannotBeRepeated"),
          api: this.$api.managePermissionApi.validateCode,
          params: {
            code: value,
          },
        },
        {
          name: "fieldLengthValidator",
          errorMsg: this.$t("management.Theinputcharactersmustbelessthan50"),
          maxFieldLength: 50,
        },
      ]);
    };
    var checkPermissionName = (rule, value, callback) => {
      let rules = new this.formRules.baseValidateRule({
        errorMsg: this.$t("management.Errorinverifyingthepermissionname"),
        value: value,
        callback: callback,
      });
      rules.execute([
        {
          name: "requiredFieldValidator",
          errorMsg: this.$t("management.pleaseEnterThePermissionName"),
        },
        {
          name: "fieldLengthValidator",
          errorMsg: this.$t("management.Theinputcharactersmustbelessthan50"),
          maxFieldLength: 50,
        },
      ]);
    };
    var checkIncludePer = (rule, value, callback) => {
      if (this.permissionInfo.include.length > 0) {
        callback();
      } else {
        callback(
          new Error(this.$t("management.pleaseSelectToIncludePermission"))
        );
      }
    };
    var checkPermissionDescribe = (rule, value, callback) => {
      if (value == null) {
        value = "";
      }
      let rules = new this.formRules.baseValidateRule({
        errorMsg: this.$t("management.Errorinverifyingtheremark"),
        value: value,
        callback: callback,
      });
      rules.execute([
        {
          name: "fieldLengthValidator",
          errorMsg: this.$t("management.Theinputcharactersmustbelessthan80"),
          maxFieldLength: 80,
        },
      ]);
    };
    return {
      disableStatus: false,
      formLabelWidth: "120px",
      rules: {
        code: [
          { required: true, validator: checkPermissionCode, trigger: "blur" },
        ],
        name: [
          {
            required: true,
            trigger: "blur",
            validator: checkPermissionName,
          },
        ],
        includePer: [
          { required: true, validator: checkIncludePer, trigger: "change" },
        ],
        describe: [
          {
            required: false,
            trigger: "blur",
            validator: checkPermissionDescribe,
          },
        ],
      },
      menuList: [],
      functionList: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      firstColWaterfall: {
        height: 0,
        data: [],
      },
      secondColWaterfall: {
        height: 0,
        data: [],
      },
      thirdColWaterfall: {
        height: 0,
        data: [],
      },
      defaultCheckedKeys: [],
    };
  },
  mounted() {
    //国际化样式处理
    if (this.$store.getters.language == "english") {
      this.formLabelWidth = "150px";
    } else {
      this.formLabelWidth = "120px";
    }
  },
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
        "bottom",
      )
    );
    /deep/ .el-cascader {
      width: 100%;
    }
    .permission-select-area {
      .permission-select-content {
        border: 1px solid #ebeef5;
        position: relative;
        height: 300px;
        padding: 16px 0px 0px 0px;
        .scroll {
          height: 100%;
        }
        /deep/ .el-scrollbar .el-scrollbar__wrap {
          overflow-x: hidden;
        }
        .title {
          position: absolute;
          display: inline-block;
          top: -8px;
          left: 20px;
          padding: 0 10px;
          background: #fff;
          @include base-active-color();
          z-index: 99;
          font-size: 14px;
          line-height: 16px;
          height: 16px;
        }
        .no-function {
          color: #909399;
          text-align: center;
          margin-top: 120px;
          font-size: 14px;
        }
      }
      .tree-area {
        .el-tree {
          width: 98%;
          margin: 0 auto;
        }
      }
      .function-area {
        border-left: none;
        .waterfall {
          .waterfall-col {
            padding: 0 10px;
            .waterfall-block {
              background: #f8f8f8;
              margin-bottom: 15px;
              padding: 5px 10px;
              .waterfall-block-title {
                color: #606266;
                font-size: 15px;
                margin: 0;
                padding: 0;
                height: 26px;
                line-height: 26px;
              }
              .el-checkbox {
                display: block;
                margin: 0;
                padding: 0;
                height: 26px;
                line-height: 26px;
              }
            }
          }
        }
        .function-block {
          width: 30%;
          background: #f8f8f8;
        }
      }
    }
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
  .dialog-right {
    padding-right: 30px;
  }
}
</style>