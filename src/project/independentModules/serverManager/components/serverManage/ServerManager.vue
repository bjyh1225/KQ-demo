<template>
  <div class="server-manager">
    <el-row type="flex" justify="space-around">
      <el-col :span="5" class="server-manager-left">
        <server-manager-catalogue
          class="catalogue"
          :activeName="catalogueActiveName"
          :catalogueList="catalogueList"
          @catologueClick="catologueClick"
          @addCatalogue="addCatalogue"
          @editCatalogue="editCatalogue"
          @deleteCatalogue="deleteCatalogue"
          @servicePublish="servicePublish"
        ></server-manager-catalogue>
        <server-manager-type
          class="type"
          :typeList="typeList"
          :typeActiveName="typeActiveName"
          @typeClick="typeClick"
          v-if="!searchTypeVisible"
        ></server-manager-type>
      </el-col>
      <el-col :span="17" class="server-manager-right">
        <server-manager-list-search
          class="search"
          :displayStyle="displayStyle"
          @switchDisplay="switchDisplay"
          :pageIndex="pageIndex"
          :pageSize="pageSize"
          :total="total"
          :searchInfo="searchInfo"
          :searchTypeVisible="searchTypeVisible"
          :typeList="typeList"
          :typeActiveName="typeActiveName"
          @typeClick="typeClick"
          @refresh="refreshServiceList"
        ></server-manager-list-search>
        <server-manager-list
          class="list"
          :displayStyle="displayStyle"
          :serviceList="serviceList"
          :pageIndex="pageIndex"
          :pageSize="pageSize"
          :total="total"
          :typeActiveName="typeActiveName"
          :serviceTypeConfig="serviceTypeConfig"
          @runService="runService"
          @stopService="stopService"
          @deleteService="deleteService"
          @edit="editService"
          @cache="openCacheDialog"
          @permissionManage="openPermissionManageDialog"
          @attribute="openAttributeDialog"
          @thumbnail="openThumbnailDialog"
          @moveService="openMigrationManageDialog"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          @saveHits="saveHits"
        ></server-manager-list>
      </el-col>
    </el-row>
    <!-- 目录弹窗 -->
    <server-manager-catalogue-dialog
      :dialogVisible="catalogueDialogVisible"
      :catalogueInfo="catalogueInfo"
      :dialogTitle="catalogueDialogTitle"
      :operate="catalogueDialogOperate"
      @dialogClose="catalogueDialogClose"
      @save="saveCatalogue"
    ></server-manager-catalogue-dialog>
    <!-- 发布服务弹窗 -->
    <server-manager-publish-dialog
      :dialogVisible="publishDialogVisible"
      @dialogClose="publishDialogClose"
      :typeList="typeList"
      :serviceInfo="serviceInfo"
      :serviceTypeConfig="serviceTypeConfig"
      @createService="createService"
    ></server-manager-publish-dialog>
    <!-- 编辑服务弹窗 -->
    <server-manager-edit-service-dialog
      :serviceInfo="editServiceInfo"
      :dialogTitle="editServiceDialogTitle"
      :dialogVisible="editServiceDialogVisible"
      @dialogClose="editServiceDialogClose"
      :serviceTypeConfig="serviceTypeConfig"
      @save="editServiceSave"
    ></server-manager-edit-service-dialog>
    <!-- 缓存管理弹窗 -->
    <server-manager-cache-dialog
      :dialogVisible="cacheDialogVisible"
      @dialogClose="cacheDialogClose"
      :serviceInfo="currentServiceInfo"
    ></server-manager-cache-dialog>
    <!-- 属性弹窗 -->
    <server-manager-attribute-dialog
      :dialogVisible="attributeDialogVisible"
      @dialogClose="attributeDialogClose"
      :serviceInfo="currentServiceInfo"
      :serviceTypeConfig="serviceTypeConfig"
    ></server-manager-attribute-dialog>
    <!-- 编辑缩略图弹窗 -->
    <server-manager-thumbnail-dialog
      :dialogVisible="thumbnailDialogVisible"
      @dialogClose="thumbnailDialogClose"
      :serviceInfo="currentServiceInfo"
    ></server-manager-thumbnail-dialog>
    <!-- 授权管理弹窗 -->
    <server-permission-manage-dialog
      :dialogVisible="permissionManageDialogVisible"
      @dialogClose="permissionManageDialogClose"
      :serviceInfo="currentServiceInfo"
    ></server-permission-manage-dialog>
    <!-- 服务迁移弹窗 -->
    <server-manager-migration-dialog
      :dialogVisible="migrationManageDialogVisible"
      @dialogClose="migrationManageDialogClose"
      :serviceInfo="currentServiceInfo"
      @updateList="updateList"
      @updateSingleService="updateSingleService"
    ></server-manager-migration-dialog>
  </div>
</template>

<script>
import ServerManagerCatalogue from "./ServerManagerCatalogue.vue";
import ServerManagerType from "./ServerManagerType.vue";
import ServerManagerListSearch from "./ServerManagerListSearch.vue";
import ServerManagerList from "./ServerManagerList.vue";
import ServerManagerCatalogueDialog from "./ServerManagerCatalogueDialog.vue";
import ServerManagerPublishDialog from "./ServerManagerPublishDialog.vue";
import ServerManagerEditServiceDialog from "./ServerManagerEditServiceDialog.vue";
import ServerManagerCacheDialog from "./ServerManagerCacheDialog.vue";
import ServerManagerAttributeDialog from "./ServerManagerAttributeDialog.vue";
import ServerManagerThumbnailDialog from "./ServerManagerThumbnailDialog.vue";
import ServerPermissionManageDialog from "./ServerPermissionManageDialog.vue";
import ServerManagerMigrationDialog from "./ServerManagerMigrationDialog.vue";
export default {
  name: "ServerManager",
  components: {
    ServerManagerCatalogue,
    ServerManagerType,
    ServerManagerListSearch,
    ServerManagerList,
    ServerManagerCatalogueDialog,
    ServerManagerPublishDialog,
    ServerManagerEditServiceDialog,
    ServerManagerCacheDialog,
    ServerManagerAttributeDialog,
    ServerManagerThumbnailDialog,
    ServerPermissionManageDialog,
    ServerManagerMigrationDialog,
  },
  data() {
    return {
      catalogueList: {},
      typeList: [],
      typeActiveName: "", //选中的分类
      catalogueActiveName: "", //选择的目录
      displayStyle: "grid", //展示风格
      catalogueInfo: {},
      catalogueDialogVisible: false,
      catalogueDialogTitle: "",
      catalogueDialogOperate: "",
      publishDialogVisible: false,
      editServiceDialogVisible: false,
      cacheDialogVisible: false,
      attributeDialogVisible: false,
      thumbnailDialogVisible: false,
      permissionManageDialogVisible: false, //授权管理弹出窗显示
      migrationManageDialogVisible: false, //服务迁移弹出窗显示
      editServiceDialogTitle: "", //修改服务弹出窗标题
      serviceInfo: {},
      editServiceInfo: { sr: { prj: "" } },
      currentServiceInfo: {}, //当前服务信息
      currentServiceInfoIndex: null, //当前服务信息在list中的索引
      searchTypeVisible: false, //分类是否显示在搜索区域
      serviceList: [],
      pageIndex: 1,
      pageSize: 12,
      total: 0,
      searchInfo: {
        order: "lastModifyTime",
        orderSort: "desc",
        searchKey: "",
      },
      listRefreshTimestamp: null,
      serviceTypeConfig: {
        MapService: {
          type: ".kqmd",
          preview: true,
          serverManagerListRun: true,
          serverManagerListStop: true,
          serverManagerListDelete: true,
          serverManagerListThumburl: true,
          serverManagerListPermission: true,
          serverManagerListMove: true,
          serverManagerListAttribute: true,
          serverManagerListCache: true,
          serverManagerListEdit: true,
          editDialogStep: true,
          scale: true,
          afterSaveSetDetails: true,
          defaultImage: require("./img/mapService1.png"),
        },
        DataService: {
          type: ".kqdata",
          preview: false,
          serverManagerListRun: true,
          serverManagerListStop: true,
          serverManagerListDelete: true,
          serverManagerListThumburl: false,
          serverManagerListPermission: true,
          serverManagerListMove: true,
          serverManagerListAttribute: true,
          serverManagerListCache: false,
          serverManagerListEdit: true,
          editDialogStep: false,
          scale: false,
          afterSaveSetDetails: false,
          defaultImage: require("./img/dataService1.png"),
        },
        "3DService": {
          type: ".config",
          preview: true,
          serverManagerListRun: true,
          serverManagerListStop: true,
          serverManagerListDelete: true,
          serverManagerListThumburl: false,
          serverManagerListPermission: true,
          serverManagerListMove: true,
          serverManagerListAttribute: true,
          serverManagerListCache: false,
          serverManagerListEdit: true,
          editDialogStep: false,
          scale: false,
          afterSaveSetDetails: false,
          defaultImage: require("./img/threeDimensional1.png"),
        },
      },
    };
  },
  methods: {
    getThumbnailTask(item, index) {
      //缩略图获取任务
      let timestamp = this.listRefreshTimestamp;
      item.waitThumbnail = true;
      this.serviceList.splice(index, 1, item);
      let count = 0;
      let task = setInterval(() => {
        if (timestamp == this.listRefreshTimestamp) {
          count = count + 1;
          this.getSingleServiceInfo(item.name, true, true)
            .then((res) => {
              let data = res.data.data;
              let newInfo = data.result;
              if (newInfo.thumburl) {
                newInfo.waitThumbnail = false;
                newInfo.thumburl =
                  newInfo.thumburl + "?tempid=" + Math.random();
                this.serviceList.splice(index, 1, newInfo);
                clearInterval(task);
              }
              if (count > 2) {
                newInfo.waitThumbnail = false;
                newInfo.thumburl = this.serviceTypeConfig[
                  newInfo.serviceType
                ].defaultImage;
                this.serviceList.splice(index, 1, newInfo);
                clearInterval(task);
              }
            })
            .catch(() => {
              if (count > 2) {
                item.waitThumbnail = false;
                item.thumburl = this.serviceTypeConfig[
                  item.serviceType
                ].defaultImage;
                this.serviceList.splice(index, 1, item);
                clearInterval(task);
              }
            });
        } else {
          clearInterval(task);
        }
      }, 5000);
    },
    getCatalogue() {
      //目录查询
      let userInfo = this.$store.getters.userInfo;
      let roleId = null;
      if (userInfo.roleList) {
        roleId = userInfo.roleList[0].id;
      }
      this.$api.serverManageApi
        .getServiceCatalogue(
          {
            roleId: roleId,
          },
          {
            loadingText: this.$t("service.searching"),
          }
        )
        .then((res) => {
          let data = res.data.data;
          let folders = data.folders;
          this.typeList = folders[0].servicetype;
          this.typeActiveName = this.typeList[0].name;
          let root = {};
          let childFolders = [];
          folders.forEach((item) => {
            let copy = JSON.parse(JSON.stringify(item));
            if (item.name == "{root}") {
              root = copy;
            } else {
              if (item.isfolder) {
                childFolders.push(copy);
              }
            }
          });
          root.childFolders = childFolders;
          this.catalogueList = root;
          this.catalogueActiveName = root.name;
          if (childFolders.length > 8) {
            this.searchTypeVisible = true;
          } else {
            this.searchTypeVisible = false;
          }
          this.getServiceList();
        })
        .catch(() => {});
    },
    catologueClick(info) {
      //目录点击
      // if(this.catalogueActiveName==info.name){
      //   return false;
      // }
      this.catalogueActiveName = info.name;
      this.resetServiceList();
      this.getServiceList();
    },
    typeClick(info) {
      //分类点击
      if (this.typeActiveName == info.name) {
        return false;
      }
      this.typeActiveName = info.name;
      this.resetServiceList();
      this.getServiceList();
    },
    switchDisplay(type) {
      //布局切换
      this.displayStyle = type;
    },
    addCatalogue() {
      //新增目录
      this.catalogueDialogTitle = "添加目录";
      this.catalogueDialogOperate = "add";
      this.catalogueDialogVisible = true;
      this.catalogueInfo = {
        name: "",
        aliasname: "",
        description: "",
      };
    },
    editCatalogue(info) {
      //编辑目录
      this.catalogueDialogTitle = "编辑目录";
      this.catalogueDialogOperate = "edit";
      this.catalogueDialogVisible = true;
      this.catalogueInfo = {
        name: info.name,
        aliasname: info.aliasName,
        description: info.description,
      };
    },
    catalogueDialogClose() {
      //目录弹窗关闭
      this.catalogueDialogVisible = false;
    },
    addCatalogueSave() {
      this.$api.serverManageApi
        .createFolder(this.catalogueInfo, {
          loadingText: this.$t("myCenter.Saving"),
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "创建目录成功",
          });
          this.catalogueDialogVisible = false;
          this.getCatalogue();
        })
        .catch(() => {});
    },
    editCatalogueSave() {
      this.$api.serverManageApi
        .updateServiceFolder(this.catalogueInfo, {
          loadingText: this.$t("myCenter.Saving"),
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "保存成功",
          });
          this.catalogueDialogVisible = false;
          this.getCatalogue();
        })
        .catch(() => {});
    },
    saveCatalogue() {
      //目录保存
      if (this.catalogueDialogOperate == "add") {
        this.addCatalogueSave();
      }
      if (this.catalogueDialogOperate == "edit") {
        this.editCatalogueSave();
      }
    },
    getServiceList() {
      this.serviceList = [];
      let isLogin = this.$store.getters.isLogin;
      if (isLogin) {
        this.getServiceListByUser();
      } else {
        this.getServiceListNoUser();
      }
    },
    getServiceListNoUser() {
      this.$api.serverManageApi
        .listServiceByFolder(
          {
            folderName: this.catalogueActiveName,
            serviceType: this.typeActiveName,
            pageSize: this.pageSize,
            pageNum: this.pageIndex,
            orderType: this.searchInfo.orderSort,
            orderParam: this.searchInfo.order,
            serviceName: this.searchInfo.searchKey,
          },
          {
            loadingText: this.$t("service.searching"),
          }
        )
        .then((res) => {
          let data = res.data.data.services;
          data.content.forEach((item) => {
            if (item.thumburl) {
              item.thumburl = item.thumburl + "?tempId=" + Math.random();
            } else {
              item.thumburl = this.serviceTypeConfig[
                item.serviceType
              ].defaultImage;
            }
          });
          this.serviceList = data.content;
          this.total = data.totalElements;
          this.listRefreshTimestamp = new Date(); //列表刷新
        });
    },
    getServiceListByUser() {
      this.$api.serverManageApi
        .listServiceByUserFolder(
          {
            folderName: this.catalogueActiveName,
            serviceType: this.typeActiveName,
            pageSize: this.pageSize,
            pageNum: this.pageIndex,
            orderType: this.searchInfo.orderSort,
            orderParam: this.searchInfo.order,
            serviceName: this.searchInfo.searchKey,
          },
          {
            loadingText: this.$t("service.searching"),
          }
        )
        .then((res) => {
          let data = res.data.data.services;
          data.content.forEach((item) => {
            if (item.thumburl) {
              item.thumburl = item.thumburl + "?tempId=" + Math.random();
            } else {
              item.thumburl = this.serviceTypeConfig[
                item.serviceType
              ].defaultImage;
            }
          });
          this.serviceList = data.content;
          this.total = data.totalElements;
          this.listRefreshTimestamp = new Date(); //列表刷新
        });
    },
    refreshServiceList() {
      //重新查询
      this.getServiceList();
    },
    handleSizeChange(val) {
      this.pageIndex = 1;
      this.pageSize = val;
      this.getServiceList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getServiceList();
    },
    deleteCatalogue(info) {
      //删除目录
      let userInfo = this.$store.getters.userInfo;
      let roleId = null;
      if (userInfo.roleList) {
        roleId = userInfo.roleList[0].id;
      }
      this.$api.serverManageApi
        .getServiceCatalogue(
          {
            foldername: info.name,
            roleId: roleId,
          },
          {
            loadingText: this.$t("service.searching"),
          }
        )
        .then((res) => {
          if (res.data.data.services && res.data.data.services.length == 0) {
            this.$confirm(
              this.$t("serverManage.directoriesDelete_conform_content"),
              this.$t("serverManage.directoriesDelete_conform_title"),
              {
                cancelButtonText: this.$t("axios.inforBtn_cancelButtonText"),
                confirmButtonText: this.$t("axios.inforBtn_confirmButtonText"),
                type: "warning",
              }
            ).then(() => {
              this.$api.serverManageApi
                .deleteFolder(
                  {
                    name: info.name,
                  },
                  {
                    loadingText: "删除中",
                  }
                )
                .then(() => {
                  this.$message({
                    message: "删除目录成功",
                    type: "success",
                  });
                  this.getCatalogue();
                });
            });
          } else {
            this.$message({
              message: "删除目录前请先清空下面的服务",
              type: "warning",
            });
          }
        })
        .catch(() => {});
    },
    servicePublish(info) {
      //发布服务
      this.publishDialogVisible = true;
      this.resetServiceInfo();
      this.serviceInfo.foldername = info.name;
      this.serviceInfo.folderaliasname = info.aliasName;
    },
    publishDialogClose() {
      this.publishDialogVisible = false;
    },
    runService(item, index) {
      //启动服务
      this.$api.serverManageApi
        .openServer(
          {
            serviceName: item.name,
          },
          {
            loadingText: "启动中",
          }
        )
        .then(() => {
          this.$message({
            type: "success",
            message: "启动服务成功",
          });
          this.getSingleServiceInfo(item.name, false, true).then((res) => {
            let data = res.data.data;
            let newInfo = data.result;
            this.serviceList.splice(index, 1, newInfo);
            if (!newInfo.thumburl) {
              this.getThumbnailTask(newInfo, index);
            }
          });
        })
        .catch(() => {});
    },
    stopService(item, index) {
      //停止服务
      this.$api.serverManageApi
        .stopServer(
          {
            serviceName: item.name,
          },
          {
            loadingText: "停止中",
          }
        )
        .then(() => {
          this.$message({
            type: "success",
            message: "停止服务成功",
          });
          this.updateSingleService(item, index);
        })
        .catch(() => {});
    },
    deleteService(item) {
      //删除服务
      this.$api.serverManageApi
        .deleteServer(
          {
            serviceName: item.name,
          },
          {
            loadingText: "删除中",
          }
        )
        .then(() => {
          this.$message({
            type: "success",
            message: "删除服务成功",
          });
          this.resetStartPage();
          this.getServiceList();
        })
        .catch(() => {});
    },
    getSingleServiceInfo(name, closeloading, noHandle) {
      //查询单个服务的详细信息
      return new Promise((reslove, reject) => {
        this.$api.serverManageApi
          .queryServiceInfo(
            {
              servicename: name,
            },
            {
              noLoading: true,
            }
          )
          .then((res) => {
            if (res.data.data && res.data.data.result && !noHandle) {
              let item = res.data.data.result;
              if (item.thumburl) {
                item.thumburl = item.thumburl + "?tempId=" + Math.random();
              } else {
                item.thumburl = this.serviceTypeConfig[
                  item.serviceType
                ].defaultImage;
              }
            }
            reslove(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    updateSingleService(item, index) {
      //更新单个服务
      if (!item) {
        item = this.currentServiceInfo;
      }
      if (!index) {
        index = this.currentServiceInfoIndex;
      }
      this.getSingleServiceInfo(item.name).then((res) => {
        let data = res.data.data;
        let newInfo = data.result;
        this.serviceList.splice(index, 1, newInfo);
      });
    },
    editService(item, index) {
      //修改服务
      this.currentServiceInfo = item;
      this.currentServiceInfoIndex = index;
      this.resetEditServiceInfo();
      this.getEditInfoAndOpenDialog(item.name, "编辑服务");
    },
    getEditInfoAndOpenDialog(name, title) {
      //获取服务编辑详情并打开弹窗
      this.$api.serverManageApi
        .editAuth(
          {
            serviceName: name,
          },
          {
            loadingText: this.$t("service.searching"),
          }
        )
        .then(() => {
          this.getSingleServiceInfo(name).then((res) => {
            let data = res.data.data;
            let newInfo = data.result;
            if (newInfo.scales) {
              newInfo.scales.forEach((item) => {
                let num = (1 / item.scale).toFixed(4);
                item.scaleNum = num;
                item.scaleHandle = `1:${num}`;
              });
            }
            if (newInfo.scales && Array.isArray(newInfo.scales)) {
              newInfo.copyScales = JSON.parse(JSON.stringify(newInfo.scales));
            } else {
              newInfo.copyScales = [];
            }
            newInfo.copyScalemode = newInfo.scalemode;
            this.editServiceInfo = newInfo;
            this.editServiceDialogVisible = true;
            this.editServiceDialogTitle = title;
          });
        });
    },
    setDetailsInfo(name) {
      //详情设置
      this.resetEditServiceInfo();
      this.getEditInfoAndOpenDialog(name, "服务详情设置");
      // this.getSingleServiceInfo(name).then(res=>{
      //   let data=res.data.data;
      //   let newInfo=data.result;
      //   if(newInfo.scales){
      //     newInfo.scales.forEach(item=>{
      //       let num=(1/item.scale).toFixed(4);
      //       item.scaleNum=num;
      //       item.scaleHandle=`1:${num}`;
      //     })
      //   }
      //   if(newInfo.scales&&Array.isArray(newInfo.scales)){
      //     newInfo.copyScales=JSON.parse(JSON.stringify(newInfo.scales));
      //   }
      //   else{
      //     newInfo.copyScales=[];
      //   }
      //   newInfo.copyScalemode=newInfo.scalemode;
      //   this.editServiceInfo=newInfo;
      //   this.editServiceDialogVisible=true;
      //   this.editServiceDialogTitle="服务详情设置";
      // })
    },
    editServiceDialogClose() {
      this.editServiceDialogVisible = false;
    },
    editServiceSave(type) {
      //修改服务保存
      let scale = [];
      this.editServiceInfo.copyScales.forEach((item) => {
        scale.push({
          static: item.static,
          scale: item.scale,
          id: item.id,
        });
      });
      let sr = "";
      if (this.editServiceInfo.sr && this.editServiceInfo.sr.prj) {
        sr = this.editServiceInfo.sr.prj;
      }
      let data = {
        SERVER_NAME: this.editServiceInfo.name,
        aliasname: this.editServiceInfo.aliasName,
        description: this.editServiceInfo.description,
        imageformat: this.editServiceInfo.imageformat,
        vectorformat: this.editServiceInfo.vectorformat,
        scalemode: this.editServiceInfo.copyScalemode,
        scales: JSON.stringify(scale),
        sr: sr,
      };
      this.$api.serverManageApi
        .saveServiceinfo(data, {
          loadingText: this.$t("myCenter.Saving"),
        })
        .then(() => {
          if (type == "cache") {
            this.getSingleServiceInfo(this.editServiceInfo.name).then((res) => {
              let data = res.data.data;
              let newInfo = data.result;
              // this.updateSingleService();
              if (!newInfo.hasVectorCache && !newInfo.hasImageCache) {
                this.$message({
                  type: "warning",
                  message: "当前服务不能进行缓存管理操作",
                });
              } else {
                this.openCacheDialog(newInfo);
                this.editServiceDialogClose();
              }
              this.getServiceList();
            });
          } else {
            this.$message({
              type: "success",
              message: "保存成功",
            });
            this.editServiceDialogClose();
            this.getServiceList();
          }
        });
    },
    openCacheDialog(item) {
      this.currentServiceInfo = item;
      this.cacheDialogVisible = true;
    },
    cacheDialogClose() {
      this.cacheDialogVisible = false;
    },
    openAttributeDialog(item) {
      //属性
      this.getSingleServiceInfo(item.name).then((res) => {
        let data = res.data.data;
        if (data.result.thumburl) {
          data.result.thumburl =
            data.result.thumburl + "?tempId=" + Math.random();
        }
        this.currentServiceInfo = data.result;
        if (this.currentServiceInfo.scales) {
          this.currentServiceInfo.scales.forEach((item) => {
            let num = (1 / item.scale).toFixed(4);
            item.scaleNum = num;
            item.scaleHandle = `1:${num}`;
          });
        }
        this.currentServiceInfo.createTime = this.globalMethods.dateFormat(
          "YYYY-mm-dd HH:MM:SS",
          this.currentServiceInfo.createTime
        );
        if (this.currentServiceInfo.sr && this.currentServiceInfo.sr.prj) {
          this.currentServiceInfo.prj = this.currentServiceInfo.sr.prj;
        }
        if (this.currentServiceInfo.scalemode == 0) {
          this.currentServiceInfo.scalemodeValue = "谷歌模式";
        }
        if (this.currentServiceInfo.scalemode == 1) {
          this.currentServiceInfo.scalemodeValue = "自定义模式";
        }
        if (this.currentServiceInfo.scalemode == 2) {
          this.currentServiceInfo.scalemodeValue = "三维模式";
        }
        this.attributeDialogVisible = true;
      });
    },
    attributeDialogClose() {
      this.attributeDialogVisible = false;
    },
    openThumbnailDialog(item, index) {
      //编辑缩略图
      this.currentServiceInfoIndex = index;
      this.getSingleServiceInfo(item.name).then((res) => {
        let data = res.data.data;
        this.currentServiceInfo = data.result;
        this.thumbnailDialogVisible = true;
      });
    },
    thumbnailDialogClose() {
      this.thumbnailDialogVisible = false;
      this.getThumbnailTask(
        this.currentServiceInfo,
        this.currentServiceInfoIndex
      );
    },
    openPermissionManageDialog(item) {
      this.permissionManageDialogVisible = true;
      this.currentServiceInfo = item;
    },
    permissionManageDialogClose() {
      this.permissionManageDialogVisible = false;
    },
    openMigrationManageDialog(item, index) {
      //服务迁移弹窗传打开
      this.currentServiceInfo = item;
      this.currentServiceInfoIndex = index;
      this.migrationManageDialogVisible = true;
    },
    migrationManageDialogClose() {
      this.migrationManageDialogVisible = false;
    },
    createService() {
      //发布服务
      let params = new window.FormData();
      Object.keys(this.serviceInfo).forEach((key) => {
        params.append(key, this.serviceInfo[key]);
      });
      if (this.serviceInfo.server) {
        let tilepath = `mongodb: server=${this.serviceInfo.uri} authdb=${this.serviceInfo.authDb} dbname=${this.serviceInfo.dbName} username=${this.serviceInfo.username} pwd=${this.serviceInfo.password}`;
        params.append(tilepath, tilepath);
      }
      this.$api.serverManageApi
        .createService(params, {
          loadingText: this.$t("myCenter.Saving"),
        })
        .then(() => {
          this.saveServiceInfo();
        })
        .catch(() => {});
    },
    saveServiceInfo() {
      let SERVER_NAME =
        this.serviceInfo.foldername == "{root}"
          ? this.serviceInfo.servicename
          : `${this.serviceInfo.foldername}.${this.serviceInfo.servicename}`;
      this.$api.serverManageApi
        .saveServiceinfo(
          {
            SERVER_NAME: SERVER_NAME,
          },
          {
            loadingText: this.$t("myCenter.Saving"),
          }
        )
        .then(() => {
          this.typeActiveName = this.serviceInfo.serviceType;
          this.catalogueActiveName = this.serviceInfo.foldername;
          this.resetStartPage();
          if (
            this.serviceTypeConfig[this.serviceInfo.serviceType]
              .afterSaveSetDetails
          ) {
            this.$confirm("发布服务成功，是否前往设置详细信息", "提示", {
              confirmButtonText: "立即设置",
              cancelButtonText: "暂不设置",
              type: "warning",
            })
              .then(() => {
                this.publishDialogClose();
                this.setDetailsInfo(
                  this.serviceInfo.foldername == "{root}"
                    ? this.serviceInfo.servicename
                    : this.serviceInfo.foldername +
                        "." +
                        this.serviceInfo.servicename
                );
                this.getServiceList();
              })
              .catch(() => {
                this.publishDialogClose();
                this.getServiceList();
              });
          } else {
            this.$message({
              type: "success",
              message: "发布服务成功",
            });
            this.publishDialogClose();
            this.getServiceList();
          }
        });
    },
    saveHits(item, index) {
      //保存访问量
      this.$api.serverManageApi
        .saveHits(
          {
            serviceName: item.name,
          },
          {
            noLoading: true,
          }
        )
        .then(() => {
          this.updateSingleService(item, index);
        });
    },
    getGatewayInfo() {
      //查询网关信息
      this.$api.serverManageApi
        .getClusterNodes(
          {},
          {
            loadingText: this.$t("service.searching"),
          }
        )
        .then((res) => {
          let data = res.data.data;
          if (data.length == 0 || (data.length == 1 && data[0].type == 1)) {
            this.$alert("没有节点信息，请先注册GIS服务器到集群", "提示", {
              confirmButtonText: "确定",
              callback: () => {
                this.$router.push({ path: "/serviceIndex/clusterManager" });
              },
            });
          } else {
            this.getCatalogue();
          }
        })
        .catch(() => {});
    },
    updateList() {
      //更新列表
      this.resetStartPage();
      this.getServiceList();
    },
    resetStartPage() {
      this.pageIndex = 1;
    },
    resetServiceList() {
      this.serviceList = [];
      this.resetStartPage();
      this.searchInfo = {
        order: "lastModifyTime",
        orderSort: "desc",
        searchKey: "",
      };
      this.total = 0;
    },
    resetServiceInfo() {
      this.serviceInfo = {
        foldername: "",
        folderaliasname: "",
        serviceType: this.typeActiveName,
        serviceAliases: [],
        servicename: "",
        aliasname: "",
        description: "",
        storeType: "本地存储",
        uri: "",
        server: "",
        authDb: "admin",
        dbName: "",
        username: "",
        password: "",
        isDefaultTheme: true,
        file: null,
        owner: sessionStorage.getItem("username"),
      };
    },
    reset() {
      this.catalogueList = {};
      this.typeList = [];
      this.typeActiveName = "";
      this.displayStyle = "grid"; //展示风格
      this.catalogueInfo = {};
      this.catalogueDialogVisible = false;
      this.catalogueDialogTitle = "";
      this.catalogueDialogOperate = "";
    },
    resetEditServiceInfo() {
      this.editServiceInfo = {
        sr: { prj: "" },
      };
    },
  },
  mounted() {
    let isLogin = this.$store.getters.isLogin;
    if (isLogin) {
      this.getGatewayInfo();
    } else {
      this.getCatalogue();
    }
  },
};
</script>

<style lang='scss' scoped>
.server-manager {
  min-height: 700px;
  padding-top: 20px;
  background: #f5f5f5;
  .server-manager-left {
    .catalogue {
      background: #fff;
    }
    .type {
      margin-top: 50px;
      background: #fff;
    }
  }
}
</style>