<template>
  <div>
    <el-row class="service-btn-group">
      <el-col :span="14">
        <el-button
          type="primary base-btn"
          icon="el-icon-view"
          @click="getFileShow(selectedData)"
        >{{$t('myCenter.Display')}}</el-button>
        <el-button
          type="primary base-btn"
          icon="el-icon-portal-hide"
          @click="getFileHide(selectedData)"
        >{{$t('myCenter.Hide')}}</el-button>
        <el-button
          type="primary base-btn"
          icon="el-icon-delete"
          @click="deletefileResourceService"
        >{{$t('management.deleteInBatch')}}</el-button>
      </el-col>
      <el-col :span="10" class="add-service-btn-group">
        <el-menu
          :default-active="activeIndex"
          class="files-btn"
          mode="horizontal"
          @select="register"
        >
          <el-submenu index="1" popper-class="menu-files">
            <template slot="title">
              <span>{{$t('management.UploadMyFiles')}}</span>
            </template>
            <el-menu-item index="singleFile">{{$t('myCenter.SingleFileUpload')}}</el-menu-item>
            <el-menu-item index="multiFile">{{$t('myCenter.BatchFileUpload')}}</el-menu-item>
            <el-menu-item index="folder">{{$t('myCenter.FolderUpload')}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="serviceList" border @selection-change="selectionChange" ref="multipleTable">
        <el-table-column type="selection" min-width="5%"></el-table-column>
        <el-table-column :label="$t('myCenter.DisplayState')" min-width="9%">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.fileStatus"
              @change="!scope.row.fileStatus?getFileHide(scope.row.id):getFileShow(scope.row.id)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('management.NameFile')" min-width="20%"></el-table-column>
        <el-table-column prop="comments" :label="$t('management.FileDescription')" min-width="30%"></el-table-column>
        <el-table-column prop="email" :label="$t('myCenter.SharingExtent')" min-width="10%">
          <template slot-scope="scope">
            <span
              v-show="scope.row.scope=='Partial'?true:false"
            >{{$t('service.Partialauthorization')}}</span>
            <span v-show="scope.row.scope=='Public'?true:false">{{$t('myCenter.Public')}}</span>
            <span v-show="scope.row.scope=='Private'?true:false">{{$t('myCenter.Private')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" :label="$t('myCenter.RegistrationTime')" min-width="14%"></el-table-column>
        <el-table-column :label="$t('myCenter.Operate')" min-width="12%" prop="cz">
          <template slot-scope="scope">
            <el-dropdown class="switch-operate" @command="operateCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-portal-more el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  command="sharingSettings"
                  :info="scope.row"
                >{{$t('myCenter.Share')}}</el-dropdown-item>
                <el-dropdown-item command="edit" :info="scope.row">{{$t('myCenter.Edit')}}</el-dropdown-item>
                <el-dropdown-item
                  command="viewDetails"
                  :info="scope.row"
                >{{$t('management.ViewDetails')}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <personal-file-service-dialog
      :dialogVisible="dialogVisible"
      @save="save"
      :dropdownCategory="dropdownCategory"
      @dialogClose="dialogClose"
      :registerInfo="registerInfo"
      @nextStep="nextStep"
      @backFun="backFun"
      :nextShow="nextShow"
    ></personal-file-service-dialog>
    <personal-center-service-sharing-dialog
      ref="serviceSharingDialog"
      @dialogClose="dialogClose"
      @dialogMultiClose="dialogMultiClose"
      @dialogFolderClose="dialogFolderClose"
      @getserviceListByMe="getFileListByUser"
    ></personal-center-service-sharing-dialog>
    <personal-file-service-edit-dialog
      :arr="dropdownCategory"
      :editInfo="editInfo"
      :resourceData="resourceData"
      :editDialogVisible="editDialogVisible"
      @editDialogClose="editDialogClose"
      @getserviceListByMe="getFileListByUser"
    ></personal-file-service-edit-dialog>
    <pagination
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :total="total"
      :pageSize="pageSize"
      :pageIndex="page"
      class="pagination"
    ></pagination>
    <personal-center-service-details-dialog ref="serviceDetails"></personal-center-service-details-dialog>
    <personal-file-service-folder-dialog
      :dialogVisible="dialogFolderVisible"
      @save="saveFolder"
      :dropdownCategory="dropdownCategory"
      @dialogClose="dialogFolderClose"
      :registerInfo="registerFolderInfo"
      @nextStep="nextStep"
      @backFun="backFun"
      :nextShow="nextShow"
    ></personal-file-service-folder-dialog>
    <personal-file-service-multi-dialog
      :dialogVisible="dialogMultiVisible"
      @saveMulti="saveMulti"
      :dropdownCategory="dropdownCategory"
      @dialogClose="dialogMultiClose"
      :registerInfo="registerMultiInfo"
      @nextStep="nextStep"
      @backFun="backFun"
      :nextShow="nextShow"
    ></personal-file-service-multi-dialog>
  </div>
</template>

<script>
import Pagination from "components/common/page/Pagination";
import PersonalFileServiceDialog from "components/personalFileService/PersonalFileServiceDialog";
import PersonalCenterServiceSharingDialog from "components/personalCenterService/PersonalCenterServiceSharingDialog";
import PersonalFileServiceEditDialog from "components/personalFileService/PersonalFileServiceEditDialog";
import PersonalCenterServiceDetailsDialog from "components/personalCenterService/PersonalCenterServiceDetailsDialog";
import PersonalFileServiceFolderDialog from "components/personalFileService/PersonalFileServiceFolderDialog";
import PersonalFileServiceMultiDialog from "components/personalFileService/PersonalFileServiceMultiDialog";

export default {
  props: {
    currentTabShowStatus: {
      type: Boolean,
      default: false,
    },
  },
  name: "PersonalFileService",
  components: {
    Pagination,
    PersonalFileServiceDialog,
    PersonalCenterServiceSharingDialog,
    PersonalFileServiceEditDialog,
    PersonalCenterServiceDetailsDialog,
    PersonalFileServiceMultiDialog,
    PersonalFileServiceFolderDialog,
  },
  data() {
    return {
      activeIndex: "",
      dialogVisible: false, //单文件上传
      dialogFolderVisible: false, //文件夹上传
      dialogMultiVisible: false, //多文件上传
      pageSize: 10,
      page: 1,
      total: 0,
      serviceStatusData: "", //状态数据
      serviceList: [], //数据
      category: [], //下拉类别
      dropdownCategory: [], //下拉类别
      selectedData: [], //复选框选中值
      displayValue: true,
      nextShow: false, // 步骤条点击下一步
      messageSharingName: this.$t("myCenter.MyFiles"),
      registerInfo: {
        //弹框双向数据
        power: "", //分类
        name: "",
        describe: "", //描述
        keyWord: "",
      },
      registerMultiInfo: {
        power: "", //分类
        MultiInfo: [],
      },
      registerFolderInfo: {
        folderName: "", //文件夹名
        power: "",
        name: "",
        describe: "",
        keyWord: "",
      },
      editInfo: {
        power: "",
        name: "",
        describe: "",
        keyWord: "",
      },
      editDialogVisible: false, //编辑
      resourceData: {}, //点击编辑存储信息
    };
  },
  watch: {
    currentTabShowStatus: {
      immediate: true, // immediate选项可以开启首次赋值监听
      handler(newVal, oldVal) {
        if (newVal) {
          this.getFileListByUser();
        }
      },
    },
    dialogVisible() {
      if (!this.dialogVisible) {
        this.registerInfo.power = "";
        this.registerInfo.name = "";
        this.registerInfo.describe = "";
        this.registerInfo.keyWord = "";
      }
    },
    dialogFolderVisible() {
      if (!this.dialogFolderVisible) {
        this.registerFolderInfo = {
          folderName: "",
          power: "",
          name: "",
          describe: "",
          keyWord: "",
        };
      }
    },
    dialogMultiVisible() {
      if (!this.dialogMultiVisible) {
        this.registerMultiInfo = { power: "", MultiInfo: [] };
      }
    },
    editDialogVisible() {
      if (!this.editDialogVisible) {
        this.editInfo.power = "";
        this.editInfo.name = "";
        this.editInfo.describe = "";
        this.editInfo.keyWord = "";
      }
    },
  },
  methods: {
    operateCommand(command, $item) {
      switch (command) {
        case "sharingSettings":
          this.sharingSettings($item.$attrs.info);
          break;
        case "edit":
          this.edit($item.$attrs.info);
          break;
        default:
          break;
        case "viewDetails":
          this.viewDetails($item.$attrs.info);
          break;
      }
    },
    //每页显示条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getFileListByUser();
    },
    //当前页码
    handleCurrentChange(val) {
      this.page = val;
      this.getFileListByUser();
    },
    selectionChange(rows) {
      var array = [];
      rows.forEach((item) => {
        array.push(item.id);
      });
      this.selectedData = array.join(",");
    },
    //注册
    register(key) {
      this.activeIndex = key;
      if (key == "singleFile") {
        //单文件
        this.dialogVisible = true;
      } else if (key == "multiFile") {
        //多文件
        this.dialogMultiVisible = true;
      } else {
        //文件夹
        this.dialogFolderVisible = true;
      }
      this.getFileCategory();
    },
    // 共享设置
    sharingSettings(val) {
      this.$api.personalFileServiceApi
        .selectPermissionById(
          { fileId: val.id, scope: val.scope },
          { loadingText: this.$t("service.searching") }
        )
        .then((res) => {
          if (res.data.status == 200) {
            this.$refs.serviceSharingDialog.privateDataFun({
              checkList: res.data.data,
              serviceListSharing: val,
              messageSharingName: this.messageSharingName,
            });
          }
        })
        .catch((error) => {
          if (error.data.status == "390") {
            this.getFileListByUser();
          }
        });
    },
    // 查看详情
    viewDetails(val) {
      this.$refs.serviceDetails.viewDetails(val);
    },
    //编辑
    edit(val) {
      this.getFileCategory();
      if (!val.folder) {
        this.$api.serviceFileCenApi
          .getFileDetails(
            {
              fileId: val.id,
            },
            { loadingText: this.$t("service.searching") }
          )
          .then((res) => {
            if (res.data.status == 200) {
              this.editInfo.name = res.data.data[0].C_NAME;
              this.editInfo.keyWord = res.data.data[0].C_KEYWORD
                ? res.data.data[0].C_KEYWORD
                : "";
              this.editInfo.describe = res.data.data[0].C_COMMENTS
                ? res.data.data[0].C_COMMENTS
                : "";
              this.serviceList.forEach((item) => {
                if (item.id == val.id) {
                  item.name = res.data.data[0].C_NAME;
                  item.comments = res.data.data[0].C_COMMENTS;
                }
              });
            }
          })
          .catch(() => {});
      } else {
        this.$api.serviceFileCenApi
          .getFolderDatails(
            {
              folderId: val.id,
            },
            { loadingText: this.$t("service.searching") }
          )
          .then((res) => {
            if (res.data.status == 200) {
              this.editInfo.name = res.data.data[0].folderlist[0].C_NAME;
              this.editInfo.keyWord = res.data.data[0].folderlist[0].C_KEYWORD
                ? res.data.data[0].folderlist[0].C_KEYWORD
                : "";
              this.editInfo.describe = res.data.data[0].folderlist[0].C_COMMENTS
                ? res.data.data[0].folderlist[0].C_COMMENTS
                : "";
              this.serviceList.forEach((item) => {
                if (item.id == val.id) {
                  item.name = res.data.data[0].folderlist[0].C_NAME;
                  item.comments = res.data.data[0].folderlist[0].C_COMMENTS;
                }
              });
            }
          })
          .catch(() => {});
      }
      this.editInfo.power = "";
      this.editDialogVisible = true;
      this.resourceData = val;
    },
    //关闭弹窗
    dialogClose() {
      this.dialogVisible = false;
      this.activeIndex = "";
    },
    dialogFolderClose() {
      this.dialogFolderVisible = false;
      this.activeIndex = "";
    },
    dialogMultiClose() {
      this.dialogMultiVisible = false;
      this.activeIndex = "";
    },
    editDialogClose() {
      this.editDialogVisible = false;
    },
    // 注册  下一步
    nextStep() {
      this.nextShow = true;
    },
    // 注册  上一步
    backFun() {
      this.nextShow = false;
    },
    //确定
    save(val) {
      var fileListData = [];
      fileListData.push({
        name: this.registerInfo.name,
        comments: this.registerInfo.describe,
        referenceId: val.referenceId,
        keyWord: this.registerInfo.keyWord,
      });
      this.$refs.serviceSharingDialog.sharingNewData({
        scope: val.scope,
        permissionListDatas: val.permissionListData,
      });
      this.$refs.serviceSharingDialog.messagePushCommonFun({
        ID: "",
        // name: this.registerInfo.name,
        serviceType: "fileService",
        // serviceComments: this.registerInfo.describe,
        serviceClassify: val.serviceClassify,
        // referenceId: val.referenceId,
        request: "fileSave",
        // keyWord: this.registerInfo.keyWord,
        fileListData: fileListData,
      });
    },
    // 多文件上传
    saveMulti(val) {
      // 关键字处理
      var fileListData = [];
      this.registerMultiInfo.MultiInfo.forEach((item) => {
        fileListData.push({
          name: item.filesname,
          comments: item.describe,
          referenceId: item.id,
          keyWord: item.dynamicTags.toString(),
        });
      });
      this.$refs.serviceSharingDialog.sharingNewData({
        scope: val.scope,
        permissionListDatas: val.permissionListData,
      });
      this.$refs.serviceSharingDialog.messagePushCommonFun({
        ID: "",
        fileListData: fileListData,
        serviceType: "fileServiceMulti",
        serviceClassify: val.serviceClassify,
        request: "fileSaveMulti",
      });
    },
    // 文件夹上传
    saveFolder(val) {
      var fileListData = [];
      val.referenceId.forEach((fileid) => {
        fileListData.push({ referenceId: fileid.id, name: fileid.name });
      });
      this.$refs.serviceSharingDialog.sharingNewData({
        scope: val.scope,
        permissionListDatas: val.permissionListData,
      });
      this.$refs.serviceSharingDialog.messagePushCommonFun({
        ID: "",
        // name: this.registerFolderInfo.name,
        serviceType: "fileServiceFolder",
        serviceComments: this.registerFolderInfo.describe,
        serviceClassify: val.serviceClassify,
        request: "fileSaveFolder",
        keyWord: this.registerFolderInfo.keyWord,
        fileListData: fileListData,
        folderName: this.registerFolderInfo.folderName,
      });
    },
    //初始获取
    getFileListByUser() {
      this.$api.personalFileServiceApi
        .getFileListByUser(
          {
            page: this.page,
            size: this.pageSize,
          },
          { loadingText: this.$t("service.searching") }
        )
        .then((res) => {
          this.total = res.data.data.total;
          res.data.data.rows.forEach((item) => {
            if (item.fileStatus == 0) {
              item.fileStatus = false;
            } else {
              item.fileStatus = true;
            }
          });
          this.serviceList = res.data.data.rows;
        });
    },
    //初始获取权限
    getFileCategory() {
      this.$api.personalFileServiceApi
        .getFileCategory({ loadingText: this.$t("service.searching") })
        .then((res) => {
          if (res.status == 200) {
            this.dropdownCategory = [];
            var map = [];
            this.category = res.data.data;
            this.category.forEach((item) => {
              if (item.parentId == 0) {
                map.push(item);
              }
            });
            map.forEach((ar) => {
              this.dropdownCategory.push(ar);
              this.category.forEach((it) => {
                if (ar.id == it.parentId) {
                  it.typeName = `${ar.typeName} — ${it.typeName}`;
                  this.dropdownCategory.push(it);
                }
              });
            });
          }
        });
    },
    //显示
    getFileShow(val) {
      if (val == "" && this.selectedData.length == 0) {
        this.$message({
          message: this.$t("myCenter.PleaseTickTheFile"),
          type: "warning",
        });
        return false;
      }
      this.$api.personalFileServiceApi
        .getFileShow(
          {
            IDS: val,
          },
          { loadingText: this.$t("myCenter.Displaying") }
        )
        .then((res) => {
          if (res.status == 200) {
            this.$message({
              message: this.$t("myCenter.DisplayedSuccessfully"),
              type: "success",
            });
            var messageArr = [];
            res.data.data.forEach((element) => {
              element.forEach((item) => {
                var selectedName = "";
                var jurisdictionNameData = "";
                var jurisdiction = [];
                this.serviceList.forEach((list) => {
                  if (list.id == item.C_SOURCE_ID) {
                    selectedName = list.name;
                  }
                });
                if (item.C_YW_SEARCH == 1) {
                  jurisdiction.push(this.$t("myCenter.Query"));
                }
                if (item.C_YW_BROWSE == 1) {
                  jurisdiction.push(this.$t("myCenter.Browse"));
                }
                if (item.C_YW_EDIT == 1) {
                  jurisdiction.push(this.$t("myCenter.Edit"));
                }
                jurisdictionNameData = jurisdiction.join("、");
                item.message =
                  this.$store.getters.userInfo.username +
                  this.$t("myCenter.TheDisplayedAttachmentResourceIs") +
                  selectedName +
                  this.$t("myCenter.AttachmentResourceyourPermissionIs") +
                  this.$t("myCenter.yourPermissionIsStart");
                jurisdictionNameData + this.$t("myCenter.yourPermissionIsEnd");
                messageArr.push(item);
              });
            });
            this.messagePushFunction(messageArr);
          }
          this.page = 1;
          this.getFileListByUser();
        });
    },
    //批量删除
    deletefileResourceService() {
      if (this.selectedData.length == 0) {
        this.$message({
          message: this.$t("myCenter.PleaseTickTheFile"),
          type: "warning",
        });
        return false;
      }
      this.$confirm(this.$t("management.confirmToDelete") + "?")
        .then(() => {
          this.$api.personalFileServiceApi
            .deletefileResourceService(
              {
                IDS: this.selectedData,
              },
              { loadingText: this.$t("myCenter.Deleting") }
            )
            .then((res) => {
              if (res.status == 200) {
                this.$message({
                  message: this.$t("myCenter.BatchDeleteSuccessfully"),
                  type: "success",
                });
                var messageDel = [];
                res.data.data.forEach((element) => {
                  element.forEach((item) => {
                    var selectedName = "";
                    this.serviceList.forEach((list) => {
                      if (list.id == item.C_SOURCE_ID) {
                        selectedName = list.name;
                      }
                    });
                    item.message =
                      this.$store.getters.userInfo.username +
                      this.$t("myCenter.DeletedTheAttachmentResourceOf") +
                      selectedName +
                      this.$t("myCenter.DeletedTheAttachmentResourceEnd");
                    messageDel.push(item);
                  });
                });
                this.messagePushFunction(messageDel);
              }
              this.page = 1;
              this.getFileListByUser();
            })
            .catch(() => {});
        })
        .catch(() => {
          this.$refs.multipleTable.clearSelection();
        });
    },
    //隐藏
    getFileHide(val) {
      if (val == "" && this.selectedData.length == 0) {
        this.$message({
          message: this.$t("myCenter.PleaseTickTheFile"),
          type: "warning",
        });
        return false;
      }
      this.$api.personalFileServiceApi
        .getFileHide(
          {
            IDS: val,
          },
          { loadingText: this.$t("myCenter.Hiding") }
        )
        .then((res) => {
          if (res.status == 200) {
            this.$message({
              message: this.$t("myCenter.HidedSuccessfully"),
              type: "success",
            });
            var messageHide = [];
            res.data.data.forEach((element) => {
              element.forEach((item) => {
                var selectedName = "";
                this.serviceList.forEach((list) => {
                  if (list.id == item.C_SOURCE_ID) {
                    selectedName = list.name;
                  }
                });
                item.message =
                  this.$store.getters.userInfo.username +
                  this.$t("myCenter.TheHiddenAttachmentResourceIs") +
                  selectedName +
                  this.$t("myCenter.AttachmentResourceandYouAreNotAbleToUseIt");
                messageHide.push(item);
              });
            });
            this.messagePushFunction(messageHide);
          }
          this.page = 1;
          this.getFileListByUser();
        });
    },
    // 消息推送
    messagePushFunction(val) {
      this.$api.messageApi
        .sendMsgToGroup(
          { list: JSON.stringify(val) },
          { loadingText: this.$t("myCenter.Pushingdata") }
        )
        .then(() => {})
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss">
@import "~@/style/mixin.scss";
.menu-files .el-menu--popup {
  min-width: 144px;
  .el-menu-item:hover {
    @include manage-menu-color();
    background: #f8f6f6;
  }
}
.menu-files .el-menu--popup-bottom-start {
  margin-top: 10px;
}
</style>
<style lang='scss' scoped>
.add-service-btn-group {
  text-align: right;
  height: 38px;
  line-height: 38px;
  .el-menu.el-menu--horizontal {
    border: none;
  }
  .el-menu--horizontal > .el-submenu {
    float: right;
  }
  /deep/.el-submenu__title i {
    color: #fff;
  }
  /deep/.el-menu--horizontal > .el-submenu .el-submenu__title {
    height: 38px;
    line-height: 38px;
    @include base-btn();
    border-radius: 4px;
  }
}
.service-btn-group {
  margin-bottom: 10px;
}
.el-table {
  margin-bottom: 13px;
}
.pagination {
  margin-bottom: 30px;
}
.el-icon-portal-hide {
  color: #dcdfe6;
}
/deep/.el-switch.is-checked .el-switch__core {
  @include base-bg-color();
}
</style>