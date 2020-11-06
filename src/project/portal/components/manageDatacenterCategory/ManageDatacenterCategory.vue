<template>
  <div>
    <el-row>
      <el-col :span="8">
        <manage-service-category-tree
          :draggable="draggable"
          :categoryTree="categoryTree"
          @add="add"
          @edit="edit"
          @delById="delById"
          @draggableTree="draggableTree"
          @saveTree="saveTree"
          @cancelTree="cancelTree"
          @handleDrop="handleDrop"
          class="manage-service-category-tree-loading"
          @categorySearch="categorySearch"
          :placeholder="$t('management.Pleaseenterthedatacategory')"
        ></manage-service-category-tree>
      </el-col>
      <el-col :span="16" v-if="!draggable">
        <manage-service-category-save
          :serviceCategoryInfo="serviceCategoryInfo"
          @save="save"
          class="manage-service-category-save-loading"
          ref="serviceCategorySave"
          :checkTypeName="checkTypeName"
          :checkComments="checkComments"
        ></manage-service-category-save>
      </el-col>
      <el-col :span="16" v-else>
        <div class="category-save">
          <el-row class="category-save-container">
            <el-row class="category-save-title">
              <span>{{$t('management.CatalogEditing')}}</span>
            </el-row>
            <el-row class="category-save-icon">
              <i class="el-icon-portal-icon-tuoyewenjian"></i>
            </el-row>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ManageServiceCategoryTree from "components/manageServiceCategory/ManageServiceCategoryTree";
import ManageServiceCategorySave from "components/manageServiceCategory/ManageServiceCategorySave";
import { getTree } from "@/utils/getTree.js";
export default {
  name: "ManageDatacenterCategory",
  components: {
    ManageServiceCategoryTree,
    ManageServiceCategorySave,
  },
  props: {
    currentTabShowStatus: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    currentTabShowStatus: {
      immediate: true, // immediate选项可以开启首次赋值监听
      handler(newVal, oldVal) {
        if (newVal) {
          this.getDataCategory();
        }
      },
    },
  },
  data() {
    return {
      draggable: false, //是否拖拽
      categoryTree: [],
      serviceCategoryInfo: {
        id: "",
        parentId: "0",
        typeName: "",
        parentTypeName: "",
        sortNo: 1,
        comments: "",
      },
      checkTypeName: (rule, value, callback) => {
        let rules = new this.formRules.baseValidateRule({
          errorMsg: this.$t("management.errorsInVerifyingTheCategoryName"),
          value: value,
          callback: callback,
        });
        rules.execute([
          {
            name: "requiredFieldValidator",
            errorMsg: this.$t("management.pleaseEnterTheCategoryName"),
          },
          {
            name: "repeatValidator",
            errorMsg: this.$t("management.theCategoryNameCannotBeRepeated"),
            api: this.$api.manageDatacenterCategoryApi.checkTypeName,
            params: {
              typeName: this.serviceCategoryInfo.typeName,
              parentId: this.serviceCategoryInfo.parentId,
              id: this.serviceCategoryInfo.id,
            },
          },
          {
            name: "fieldLengthValidator",
            errorMsg: this.$t("management.Theinputcharactersmustbelessthan50"),
            maxFieldLength: 50,
          },
        ]);
      },
      checkComments: (rule, value, callback) => {
        if (value == null) {
          value = "";
        }
        let rules = new this.formRules.baseValidateRule({
          errorMsg: this.$t(
            "management.Errorinverifyingthecategorydescription"
          ),
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
      },
    };
  },
  methods: {
    beforeLeaveConfirm() {
      this.draggable = false;
      this.getDataCategory();
    },
    getDataCategory() {
      this.resetInfo();
      this.$api.manageDatacenterCategoryApi
        .getDataCategory({
          loadingTarget: ".manage-service-category-tree-loading",
          loadingText: this.$t("management.searchingServiceCategories"),
        })
        .then((res) => {
          var data = res.data.data;
          var root = {
            parentId: "-1",
            id: 0,
            typeName: this.$t("management.Datacategory"),
            comments: "",
          };
          data.push(root);
          this.categoryTree = getTree(
            data,
            "id",
            "parentId",
            "children",
            function (item) {
              return item.parentId == "-1" ? true : false;
            }
          );
        })
        .catch(() => {});
    },
    draggableTree(data) {
      this.draggable = true;
    },
    saveTree(data) {
      this.draggable = false;
      this.$api.manageDatacenterCategoryApi
        .saveServiceCategoryAll(
          {
            serviceCategoryListAllJson: JSON.stringify(
              this.categoryTree[0].children
            ),
          },
          {
            loadingText: this.$t("webAppBuilder.BeingSaved"),
          }
        )
        .then(() => {
          this.$message({
            message: this.$t("management.succeeded"),
            type: "success",
          });
          this.getDataCategory();
        })
        .catch(() => {});
    },
    cancelTree(data) {
      this.$confirm(
        this.$t("management.AreYouSureToCancelCatalogEditing"),
        this.$t("webAppBuilder.Tip"),
        {
          confirmButtonText: this.$t("myCenter.Sure"),
          cancelButtonText: this.$t("myCenter.cancel"),
          type: "warning",
        }
      )
        .then(() => {
          this.draggable = false;
          this.getDataCategory();
        })
        .catch(() => {});
    },
    handleDrop(data) {
      this.categoryTree = data;
    },
    add(data) {
      this.resetInfo();
      this.$refs.serviceCategorySave.reset();
      if (data.id != 0) {
        this.serviceCategoryInfo.parentId = data.id;
        this.serviceCategoryInfo.parentTypeName = data.typeName;
      } else {
        this.serviceCategoryInfo.parentId = data.id;
      }
    },
    edit(data) {
      this.$api.manageDatacenterCategoryApi
        .selectDataCategoryById(
          { id: data.id },
          {
            loadingTarget: ".manage-service-category-save-loading",
            loadingText: this.$t(
              "management.searchingDetailsOfServiceCategories"
            ),
          }
        )
        .then((res) => {
          var data = res.data.data[0];
          this.$refs.serviceCategorySave.reset();
          this.serviceCategoryInfo.id = data.C_ID;
          this.serviceCategoryInfo.typeName = data.C_TYPE_NAME;
          this.serviceCategoryInfo.parentId = data.C_PARENT_ID;
          this.serviceCategoryInfo.comments = data.C_COMMENTS;
          this.serviceCategoryInfo.sortNo = data.C_SORT_NO;
          this.serviceCategoryInfo.parentTypeName = data.PARENTNAME;
        })
        .catch(() => {});
    },
    delById(data) {
      this.$confirm(
        this.$t(
          "management.confirmToDeleteCategoriesOfMapServicesAndAllTheSubNodes"
        ) + "?"
      )
        .then(() => {
          this.$api.manageDatacenterCategoryApi
            .deleteDataCategory(
              { id: data.id },
              { loadingText: this.$t("management.deleting") }
            )
            .then(() => {
              this.$message({
                message: this.$t("management.succeeded"),
                type: "success",
              });
              this.getDataCategory();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    save() {
      this.$api.manageDatacenterCategoryApi
        .saveDataCategory(this.serviceCategoryInfo, {
          loadingText: this.$t("management.saving"),
        })
        .then(() => {
          this.$message({
            message: this.$t("management.succeeded"),
            type: "success",
          });
          this.getDataCategory();
        })
        .catch(() => {});
    },
    resetInfo() {
      this.serviceCategoryInfo = {
        id: "",
        parentId: "0",
        typeName: "",
        parentTypeName: "",
        sortNo: 1,
        comments: "",
      };
    },
    categorySearch(data) {
      if (data.id) {
        this.edit(data);
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.category-save {
  padding: 0 20px;
  .category-save-container {
    @include manage-border();
    height: 750px;
    padding: 0 20px;
    .category-save-title {
      @include manage-border(
        $types: (
          "bottom",
        )
      );
      padding: 10px 0;
      span {
        @include base-color();
      }
    }
    .category-save-icon {
      padding: 100px 0;
      text-align: center;
      i {
        font-size: 200px;
        color: #f5f5f5;
      }
    }
  }
}
</style>