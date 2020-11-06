<template>
  <div class="resource-manage">
    <el-row class="personal-department-right-top">
      <el-col :span="10" class="pages">
        <span v-if="total==0">{{total}}-{{page*pageSize>total?total:page*pageSize}}</span>
        <span v-if="total>0">{{1+(page-1)*pageSize}}-{{page*pageSize>total?total:page*pageSize}}</span>&nbsp
        <span>/</span>&nbsp
        <span>{{total}}</span>
      </el-col>
      <el-col :span="14">
        <el-row type="flex" justify="space-between" class="map-search">
          <el-col :span="20">
            <div class="inp">
              <el-input
                :placeholder="$t('service.searchMapServices')"
                v-model="searchVal"
                class="input-with-select"
                @keyup.enter.native="searchFun"
              >
                <el-button
                  slot="append"
                  @click="searchFun"
                  class="base-btn"
                >{{$t('service.search')}}</el-button>
              </el-input>
            </div>
          </el-col>
          <el-col :span="4" class="icon">
            <div
              class="btn el-icon-portal-liebiao1"
              @click="switchLayout('grid')"
              :class="layout=='grid'?'btn-focus':''"
            ></div>
            <div
              class="btn el-icon-portal-liebiao"
              @click="switchLayout('list')"
              :class="layout=='list'?'btn-focus':''"
            ></div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="personal-department-right-center">
      <el-row class="center-type">
        <el-col :span="18">
          <span class="center-type-span">资源类型：</span>
          <div class="center-type-box">
            <span
              class="center-type-specific"
              v-for="(itemType,t) in resourceTypeList"
              :key="t"
              @click="resourceTypeChoice(itemType.typeCode)"
              :class="resourceType==itemType.typeCode?'action-style':''"
            >{{itemType.type}}</span>
          </div>
        </el-col>
        <el-col :span="6" class="pages-right">
          <span>{{$t('service.rankingBasis')}}</span>
          <span>:</span>
          <div class="dropdown-box">
            <el-dropdown @command="dropdownSortList">
              <span>
                <span class="arrange-hover sortDataColor">{{sortData}}</span>
                <span class="el-icon-arrow-down arrange-hover"></span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(sortitems,i) in sortDropDown"
                  :key="i"
                  :command="sortitems"
                >{{sortitems.sortname}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span
              :class="sort=='DESC'?'el-icon-portal-ziyuan':'el-icon-portal-ziyuan1'"
              @click="sort=='DESC'?order(sort='ASC'):order(sort='DESC')"
              class="arrange-hover"
            ></span>
          </div>
        </el-col>
      </el-row>
      <el-row class="center-type">
        <span>共享范围：</span>
        <span class="center-type-specific">
          <el-checkbox-group 
            v-model="checkboxGroup" @change='getdepartmentResourceList()' :min="1">
            <el-checkbox v-for="(itemScope,i) in sharedScope" :label="itemScope" :key="i">
              {{itemScope=='Public'?'公共  ':itemScope=='Partial'?'部分授权':'私有'}}
            </el-checkbox>
          </el-checkbox-group>
        </span>
      </el-row>
    </el-row>
    <el-row v-show="favoritesResourceList.length>0?false:true" class="noData">
      <img :src="displayNoDataSrc" alt />
      <span>{{$t('service.sorryNoDataIsAvailableNow')}}</span>
    </el-row>
    <el-row class="personal-department-right-list" :gutter="22">
      <el-col
        v-show="favoritesResourceList.length>0?true:false"
        v-for="(item,ix) in favoritesResourceList"
        :key="item.C_ID"
        :class="{'grid-layout':layout=='grid','list-layout':layout=='list','animated':true,'fadeInUp':layout=='grid',      'fadeInRight':layout=='list'}"
        :span="layoutWidth"
      >
        <el-row class="container" v-if="layout=='grid'">
          <el-col
            class="img-container"
            :span="imgContainerWidth"
            @mouseenter.native="collectShow"
            @mouseleave.native="collectHide"
            @click.native="addressJump(item)"
          >
            <el-image
              :src="item.C_IMG?item.C_IMG:item.C_RESOURCE_TYPE=='fileService'?item.defaultSrc:defaultImgMap[item.C_RESOURCE_TYPE]?defaultImgMap[item.C_RESOURCE_TYPE]:defaultImg"
              :fit="'cover'"
            >
              <div slot="placeholder" class="image-slot">
                <span class="text">{{$t('myCenter.Loading')}}...</span>
              </div>
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline text"></i>
              </div>
            </el-image>
            <div class="mask"></div>
            <i class="el-icon-more collection-btn" @click="details(item)" @click.stop></i>
          </el-col>
          <el-col class="details-container" :span="detailsContainerWidth">
            <el-row class="details-container-title">
              <el-tooltip class="item" effect="light" :content="item.C_NAME" placement="bottom">
                <span>{{item.C_NAME}}</span>
              </el-tooltip>
            </el-row>
            <el-row class="details-container-release">
              <el-col :span="12">
                <i class="el-icon-portal-yonghudefuben"></i>
                {{item.USERNAME}}
              </el-col>
              <el-col
                :span="12"
                class="container-right"
              >{{globalMethods.dateFormat("YYYY-mm-dd",item.C_CREATE_TIME)}}</el-col>
            </el-row>
            <el-row class="details-container-icon">
              <el-col :span="12">
                <i class="el-icon-portal-yuedu"></i>&nbsp
                <span>{{item.C_HITS}}</span>
              </el-col>
              <el-col :span="12" class="container-right">
                <span @click="shareSettings(item)" v-tips="'共享'">
                  <i class="el-icon-portal-share-set"></i>
                </span>&nbsp
                <span @click="edit(item)" v-tips="'编辑'">
                  <i class="el-icon-edit"></i>
                </span>&nbsp
                <span
                  class="dep-operate-normal-btn"
                  @click="display(item)"
                  v-if="item.C_SERVICE_STATUS==0||item.C_FILE_STATUS==0"
                  v-tips="'显示'"
                >
                  <i class="el-icon-portal-xianshi-yincang"></i>
                </span>
                <span class="dep-operate-normal-btn" @click="hide(item)" v-else v-tips="'隐藏'">
                  <i class="el-icon-portal-xianshiyincang-"></i>
                </span>&nbsp
                <span @click="close(item)" v-tips="'删除'">
                  <i class="el-icon-delete"></i>
                </span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="container" v-else>
          <div class="dep-details-area">
            <el-row class="dep-top">
              <el-col :span="8" class="dep-name">{{item.C_NAME}}</el-col>
              <el-col :span="16" class="dep-btn">
                <span class="dep-operate-normal-btn" @click="details(item)">
                  <i class="el-icon-tickets"></i>
                  <span>{{$t('management.ViewDetails')}}</span>
                </span>
                <span class="dep-operate-normal-btn" @click="shareSettings(item)">
                  <i class="el-icon-portal-share-set"></i>
                  <span>共享</span>
                </span>
                <span class="dep-operate-normal-btn" @click="edit(item)">
                  <i class="el-icon-edit"></i>
                  <span>{{$t('myCenter.Edit')}}</span>
                </span>
                <span
                  class="dep-operate-normal-btn"
                  @click="display(item)"
                  v-if="item.C_SERVICE_STATUS==0||item.C_FILE_STATUS==0"
                >
                  <i class="el-icon-portal-xianshi-yincang"></i>
                  <span>显示</span>
                </span>
                <span class="dep-operate-normal-btn" @click="hide(item)" v-else>
                  <i class="el-icon-portal-xianshiyincang-"></i>
                  <span>隐藏</span>
                </span>
                <span class="dep-operate-normal-btn" @click="close(item)">
                  <i class="el-icon-delete"></i>
                  <span>删除</span>
                </span>
              </el-col>
            </el-row>
            <el-row class="dep-bottom">
              <span class="dep-details-info">
                <i class="el-icon-portal-yonghudefuben"></i>
                <span>{{item.USERNAME}}</span>
              </span>
              <el-divider direction="vertical"></el-divider>
              <span class="dep-details-info">
                <i class="el-icon-portal-shijian"></i>
                <span>{{item.C_CREATE_TIME}}</span>
              </span>
              <el-divider direction="vertical"></el-divider>
              <span class="dep-details-info">
                <i class="el-icon-portal-yuedu"></i>
                <span>{{item.C_HITS}}</span>
              </span>
              <el-divider direction="vertical"></el-divider>
              <span class="dep-details-info">
                <i class="el-icon-portal-kaisuo" v-show="item.C_SCOPE=='Public'"></i>
                <i class="el-icon-portal-yunyingduan-kaisuo" v-show="item.C_SCOPE=='Partial'"></i>
                <i class="el-icon-portal-siyou" v-show="item.C_SCOPE=='Private'"></i>
                <span v-show="item.C_SCOPE=='Public'">{{$t('service.public')}}</span>
                <span v-show="item.C_SCOPE=='Partial'">{{$t('service.Partialauthorization')}}</span>
                <span v-show="item.C_SCOPE=='Private'">{{$t('service.private')}}</span>
              </span>
              <el-divider direction="vertical"></el-divider>
              <span class="dep-details-info">
                <i class="el-icon-portal-biaoqian"></i>
                <span>{{item.C_KEYWORD}}</span>
              </span>
            </el-row>
          </div>
        </el-row>
      </el-col>
    </el-row>
    <!-- 分页 -->
    <pagination
      v-show="favoritesResourceList.length>0?true:false"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :pageSizes="pageSizes"
      :total="total"
      :pageSize="pageSize"
      :pageIndex="page"
      class="pagination"
    ></pagination>
    <personal-center-service-details-dialog ref="serviceDetails"></personal-center-service-details-dialog>
    <personal-center-service-edit-dialog
      :arr="arr"
      :editInfo="editInfo"
      :resourceData="resourceData"
      :editDialogVisible="editDialogVisibleMap"
      @editDialogClose="editDialogCloseMap"
      @getserviceListByMe="getdepartmentResourceList"
    ></personal-center-service-edit-dialog>
    <personal-datacenter-service-edit-dialog
      :arr="arr"
      :editInfo="editInfo"
      :resourceData="resourceData"
      :editDialogVisible="editDialogVisibleData"
      @editDialogClose="editDialogCloseData"
      @getserviceListByMe="getdepartmentResourceList"
    ></personal-datacenter-service-edit-dialog>
    <personal-file-service-edit-dialog
      :arr="arr"
      :editInfo="editInfo"
      :resourceData="resourceData"
      :editDialogVisible="editDialogVisibleFile"
      @editDialogClose="editDialogCloseFile"
      @getserviceListByMe="getdepartmentResourceList"
    ></personal-file-service-edit-dialog>
    <personal-function-service-edit-dialog
      :arr="arr"
      :editInfo="editInfo"
      :resourceData="resourceData"
      :editDialogVisible="editDialogVisibleFunction"
      @editDialogClose="editDialogCloseFunction"
      @getserviceListByMe="getdepartmentResourceList"
    ></personal-function-service-edit-dialog>
    <personal-scene-service-edit-dialog
      :arr="arr"
      :editInfo="editInfo"
      :resourceData="resourceData"
      :editDialogVisible="editDialogVisibleScene"
      @editDialogClose="editDialogCloseScene"
      @getserviceListByMe="getdepartmentResourceList"
    ></personal-scene-service-edit-dialog>
    <personal-data-service-edit-dialog
      :arr="arr"
      :editInfo="editInfo"
      :resourceData="resourceData"
      :editDialogVisible="editDialogVisibleDataservice"
      @editDialogClose="editDialogCloseDataservice"
      @getserviceListByMe="getdepartmentResourceList"
    ></personal-data-service-edit-dialog>
    <manage-builder-category-details-edit-dialog
      :arr="arr"
      :editInfo="editInfo"
      :resourceData="resourceData"
      :editDialogVisible="editDialogVisibleBuilder"
      @editDialogClose="editDialogCloseBuilder"
      @getserviceListByMe="getdepartmentResourceList"
    ></manage-builder-category-details-edit-dialog>
    <personal-center-service-sharing-dialog
      ref="serviceSharingDialog"
      @dialogClose="dialogClose"
      @getserviceListByMe="getdepartmentResourceList"
    ></personal-center-service-sharing-dialog>
    <service-file-preview-dialog
      :fileServiceDialogVisible="fileServiceDialogVisible"
      @handleClose="handleClose"
      :fileServiceDetails="fileServiceDetails"
      :isDetailsFilelist="isDetailsFilelist"
    ></service-file-preview-dialog>
  </div>
</template>
<script>
import { urlReplace } from "@/utils/urlReplace.js";
import Pagination from "../common/page/Pagination";
import PersonalCenterServiceDetailsDialog from "components/personalCenterService/PersonalCenterServiceDetailsDialog";
import PersonalCenterServiceEditDialog from "components/personalCenterService/PersonalCenterServiceEditDialog";
import PersonalFileServiceEditDialog from "components/personalFileService/PersonalFileServiceEditDialog";
import PersonalDatacenterServiceEditDialog from "components/personalDatacenterService/PersonalDatacenterServiceEditDialog";
import PersonalFunctionServiceEditDialog from "components/personalFunctionService/PersonalFunctionServiceEditDialog";
import PersonalSceneServiceEditDialog from "components/personalSceneService/PersonalSceneServiceEditDialog";
import PersonalDataServiceEditDialog from "components/personalDataService/PersonalDataServiceEditDialog";
import PersonalCenterServiceSharingDialog from "components/personalCenterService/PersonalCenterServiceSharingDialog";
import ManageBuilderCategoryDetailsEditDialog from "components/manageMapDraftingCategory/ManageBuilderCategoryDetailsEditDialog";
import ServiceFilePreviewDialog from "components/serviceFile/ServiceFilePreviewDialog";
import { getFileDefaultImg } from "portal/components/common/uploadClipping/uploadClippingConfig/uploadClippingConfig.js";

export default {
  name: "PersonalCenterResourceManage",
  components: {
    Pagination,
    PersonalCenterServiceDetailsDialog,
    PersonalCenterServiceEditDialog,
    PersonalFileServiceEditDialog,
    PersonalDatacenterServiceEditDialog,
    PersonalFunctionServiceEditDialog,
    PersonalSceneServiceEditDialog,
    PersonalDataServiceEditDialog,
    PersonalCenterServiceSharingDialog,
    ManageBuilderCategoryDetailsEditDialog,
    ServiceFilePreviewDialog
  },
  props: {
    codekey: {
      //组织机构选中
      type: String,
      default: ""
    },
    fatherCodekey: {
      type: String,
      default: ""
    }
  },
  computed: {
    layoutWidth() {
      if (this.layout == "grid") {
        return 6;
      } else {
        return 24;
      }
    },
    imgContainerWidth() {
      if (this.layout == "grid") {
        return 24;
      } else {
        return 8;
      }
    },
    detailsContainerWidth() {
      if (this.layout == "grid") {
        return 24;
      } else {
        return 16;
      }
    }
  },
  watch: {
    editDialogVisibleMap() {
      if (!this.editDialogVisibleMap) {
        this.editInfo.power = "";
        this.editInfo.type = "";
        this.editInfo.serverAdd = "";
        this.editInfo.name = "";
        this.editInfo.describe = "";
        this.editInfo.thumbnail = "";
        this.editInfo.keyWord = "";
      }
    },
    editDialogVisibleData() {
      if (!this.editDialogVisibleData) {
        this.editInfo.power = "";
        this.editInfo.name = "";
        this.editInfo.describe = "";
        this.editInfo.keyWord = "";
      }
    },
    editDialogVisibleFile() {
      if (!this.editDialogVisibleFile) {
        this.editInfo.power = "";
        this.editInfo.name = "";
        this.editInfo.describe = "";
        this.editInfo.keyWord = "";
      }
    },
    editDialogVisibleFunction() {
      if (!this.editDialogVisibleFunction) {
        this.editInfo.power = "";
        this.editInfo.name = "";
        this.editInfo.describe = "";
        this.editInfo.keyWord = "";
      }
    },
    editDialogVisibleScene() {
      if (!this.editDialogVisibleScene) {
        this.editInfo.power = "";
        this.editInfo.name = "";
        this.editInfo.describe = "";
        this.editInfo.keyWord = "";
      }
    },
    editDialogVisibleDataservice() {
      if (!this.editDialogVisibleDataservice) {
        this.editInfo.power = "";
        this.editInfo.name = "";
        this.editInfo.describe = "";
        this.editInfo.keyWord = "";
      }
    }
  },
  data() {
    return {
      displayNoDataSrc: require("img/nodata.jpg"), //暂无数据默认显示图片
      pageSizes: [12, 24, 36],
      pageSize: 12,
      page: 1,
      total: 0,
      sortData: this.$t("service.updateTime"),
      sortOrder: "CREATE_TIME",
      layout: "grid",
      sort: "DESC", //请求返回默认排序值
      searchVal: "", //top搜索框值
      sharedScope: [], //共享范围  默认为公共、部分
      checkboxGroup:[],//共享范围选中
      resourceType: "mapService",
      resourceTypeList: [
        { type: "地图服务", typeCode: "mapService", action: false },
        { type: "数据服务", typeCode: "dataService", action: false },
        { type: "功能服务", typeCode: "functionService", action: false },
        { type: "三维服务", typeCode: "sceneService", action: false },
        { type: "数据中心", typeCode: "data", action: false },
        { type: "附件中心", typeCode: "fileService", action: false },
        { type: "制图", typeCode: "mapbuilder", action: false },
        { type: "场景", typeCode: "scenebuilder", action: false },
        { type: "大屏", typeCode: "bigbuilder", action: false },
        { type: "应用", typeCode: "appbuilder", action: false }
      ], //资源类型
      sortDropDown: [
        {
          sortname: this.$t("service.updateTime"),
          sortid: "CREATE_TIME"
        },
        {
          sortname: this.$t("service.visits"),
          sortid: "HITS"
        },
        {
          sortname: this.$t("service.title"),
          sortid: "NAME"
        }
      ],
      defaultImgMap: {
        mapService: "/config/imageConfig/function/mapService/mapService1.png",
        functionService:
          "/config/imageConfig/function/functionService/functionService1.png",
        appbuilder: "/config/imageConfig/function/app/app1.png",
        sceneService:
          "/config/imageConfig/function/threeDimensional/threeDimensional1.png",
        dataService:
          "/config/imageConfig/function/dataService/dataService1.png",
        // fileService: "/config/imageConfig/function/file/compress.png",
        data: "/config/imageConfig/function/data/data1.png"
      },
      defaultImg:
        "/config/imageConfig/function/functionService/functionService1.png",
      favoritesResourceList: [],
      category: [], //下拉类别
      arr: [], //下拉类别
      editInfo: {
        power: "",
        type: "",
        serverAdd: "",
        name: "",
        describe: "",
        thumbnail: "",
        keyWord: "",
        proxyName: "",
        proxyUrl: "",
        isReqProxyUrl: false
      },
      resourceData: {}, //点击编辑存储信息
      editDialogVisibleMap: false, //编辑弹框
      editDialogVisibleData: false,
      editDialogVisibleFile: false,
      editDialogVisibleFunction: false,
      editDialogVisibleScene: false,
      editDialogVisibleDataservice: false,
      dialogVisible: false,
      editDialogVisibleBuilder: false,
      fileServiceDialogVisible: false, //文件预览
      fileServiceDetails: {}, //文件详情
      isDetailsFilelist: [] //文件夹单文件详情
    };
  },
  methods: {
    collectShow(e) {
      if (this.layout == "list") {
        return false;
      }
      e.currentTarget.getElementsByClassName("mask")[0].style.display = "block";
      e.currentTarget.getElementsByClassName(
        "collection-btn"
      )[0].style.display = "block";
    },
    collectHide(e) {
      if (this.layout == "list") {
        return false;
      }
      e.currentTarget.getElementsByClassName("mask")[0].style.display = "none";
      e.currentTarget.getElementsByClassName(
        "collection-btn"
      )[0].style.display = "none";
    },
    switchLayout(val) {
      this.layout = val;
    },
    // 获取管理员共享权限
    getOrgMngConfig() {
      this.$api.visualizationApi
        .getSysParamConfigureByKey(
          {
            key: "orgMngConfig"
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          var data = res.data.data;
          if (data) {
            this.sharedScope = data.value.split(",");
          } else {
            this.sharedScope = ["Public", "Partial"];
          }
          this.checkboxGroup.push(this.sharedScope[0]);
          this.getdepartmentResourceList();
        })
        .catch(() => {});
    },
    // 获取资源列表
    getdepartmentResourceList() {
      this.$api.personalCenterMyDepartmentApi
        .getdepartmentResourceList(
          {
            page: this.page,
            size: this.pageSize,
            searchVal: this.searchVal,
            sortOrder: this.sortOrder,
            sort: this.sort,
            codekey: this.codekey,
            fatherCodekey: this.fatherCodekey,
            scope: this.checkboxGroup.toString(),
            resourceType: this.resourceType
          },
          {
            loadingText: this.$t("service.searching")
          }
        )
        .then(res => {
          if (this.resourceType == "fileService") {
            res.data.data.rows.forEach(fl => {
              if (fl.C_FOLDER == 1) {
                fl.defaultSrc = getFileDefaultImg("folder");
              } else {
                fl.defaultSrc = getFileDefaultImg(fl.SUFFIX);
              }
            });
          }
          this.favoritesResourceList = res.data.data.rows;
          this.total = res.data.data.total;
          this.page = res.data.data.pageIndex;
          this.pageSize = res.data.data.pageSize;
        })
        .catch(() => {});
    },
    // 点击资源类型
    resourceTypeChoice(val) {
      this.resourceType = val;
      this.getdepartmentResourceList();
    },
    //请求 下拉排序列表
    dropdownSortList(command) {
      this.sortOrder = command.sortid;
      this.sortData = command.sortname;
      this.getdepartmentResourceList();
    },
    //请求  top搜索
    searchFun() {
      this.getdepartmentResourceList();
    },
    //请求  倒序，正序排序
    order(val) {
      this.sort = val;
      this.getdepartmentResourceList();
    },
    // 查看详情
    details(val) {
      val.personnelId = val.C_CREATE_BY;
      this.$refs.serviceDetails.viewDetails(val);
    },
    // 地址跳转
    addressJump(val) {
      if (!this.$listeners["goToIEarth"]) {
        if (val.C_RESOURCE_TYPE == "appbuilder") {
          this.$router.push({
            path: "/appbuilder",
            query: { id: val.C_ID }
          });
        } else if (
          val.C_RESOURCE_TYPE == "mapService" &&
          val.C_SERVICE_TYPE != "bigData" &&
          val.C_SERVICE_TYPE != "kqmapping"
        ) {
          window.open(urlReplace(val));
        } else if (
          val.C_RESOURCE_TYPE == "mapService" &&
          val.C_SERVICE_TYPE == "bigData"
        ) {
          window.open(val.C_SERVICE_VIEWURL);
        } else if (
          val.C_RESOURCE_TYPE == "mapService" &&
          val.C_SERVICE_TYPE == "kqmapping"
        ) {
          // 实时获取服务状态
          this.$api.serviceMapApi
            .getServiceState({
              serviceUrl: val.C_SERVICE_URL,
              serviceType: val.C_SERVICE_TYPE
            })
            .then(res => {
              if (res.data.data.serviceState == 1) {
                this.$message({
                  message: this.$t(
                    "management.TheservicehasbeenstoppedPleasestartitbeforeaccess"
                  ),
                  type: "warning"
                });
              } else if (
                res.data.data.serviceState != 1 &&
                res.data.data.serviceState != 4 &&
                res.data.data.serviceState != ""
              ) {
                this.$message({
                  message: res.data.data.serviceState,
                  type: "warning"
                });
              } else {
                // window.open(urlReplace(val));
                window.open(val.C_SERVICE_VIEWURL);
              }
            })
            .catch(() => {});
        } else if (val.C_RESOURCE_TYPE == "data") {
          this.$message({
            message: "数据中心不支持地址跳转",
            type: "warning"
          });
        } else if (val.C_RESOURCE_TYPE == "functionService") {
          window.open(val.C_SERVICE_URL);
        } else if (val.C_RESOURCE_TYPE == "dataService") {
          window.open(val.C_SERVICE_URL);
        } else if (val.C_RESOURCE_TYPE == "fileService") {
          // this.$message({
          //   message: "附件中心不支持地址跳转",
          //   type: "warning"
          // });
          if (
            val.SUFFIX == "jpg" ||
            val.SUFFIX == "png" ||
            val.SUFFIX == "jpeg" ||
            val.SUFFIX == "gif" ||
            val.SUFFIX == "mp4" ||
            val.SUFFIX == "avi" ||
            val.SUFFIX == "mov" ||
            val.SUFFIX == "mkv" ||
            val.SUFFIX == "flv" ||
            val.SUFFIX == "vmvb" ||
            val.SUFFIX == "scs" ||
            val.C_FOLDER == 1
          ) {
            if (val.C_FOLDER == 1) {
              // 文件夹  获取单文件信息
              this.$api.serviceFileCenApi
                .getFolderDatails({
                  folderId: val.C_ID
                })
                .then(res => {
                  if (res.data.data[0].folderlist[0].YWBROWSE > 0) {
                    this.isDetailsFilelist = res.data.data[0].filelist;
                    this.fileServiceDialogVisible = true;
                  }
                })
                .catch(() => {});
            } else {
              this.fileServiceDialogVisible = true;
            }
            this.fileServiceDetails = val; //图片视频文件预览
          } else {
            this.details(val); //查看详情
          }
        }
      }
    },

    //每页显示条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getdepartmentResourceList();
    },
    //当前页码
    handleCurrentChange(val) {
      this.page = val;
      this.getdepartmentResourceList();
    },
    // 删除统一调用函数
    closeSummary(val, messageName) {
      this.$message({
        message: this.$t("management.Deletesuccessful"),
        type: "success"
      });
      var messageDel = [];
      val.forEach(element => {
        element.forEach(item => {
          var selectedName = "";
          this.favoritesResourceList.forEach(list => {
            if (list.C_ID == item.C_SOURCE_ID) {
              selectedName = list.C_NAME;
            }
          });
          item.personnelId = element.C_CREATE_BY;
          item.message =
            this.$store.getters.userInfo.username +
            "管理员删除了服务名为【" +
            selectedName +
            "】的" +
            messageName +
            "资源";
          messageDel.push(item);
        });
      });
      this.messagePushMap(messageDel);
    },
    // 删除
    close(val) {
      this.$confirm(this.$t("management.confirmToDelete") + "?")
        .then(() => {
          var messageClose = [];
          val.toId = val.C_CREATE_BY;
          if (val.C_RESOURCE_TYPE == "mapService") {
            val.message =
              this.$store.getters.userInfo.username +
              "管理员正在删除服务名为【" +
              val.C_NAME +
              "】的地图服务资源";
            messageClose.push(val);
            this.messagePushMap(messageClose);
            this.$api.personalCenterServiceApi
              .deleteKqService(
                {
                  IDS: val.C_ID,
                  personnelId: val.C_CREATE_BY
                },
                { loadingText: this.$t("myCenter.Deleting") }
              )
              .then(res => {
                if (res.status == 200) {
                  this.closeSummary(res.data.data, "地图服务");
                }
                this.page = 1;
                this.getdepartmentResourceList();
              })
              .catch(() => {});
          } else if (val.C_RESOURCE_TYPE == "dataService") {
            val.message =
              this.$store.getters.userInfo.username +
              "管理员正在删除服务名为【" +
              val.C_NAME +
              "】的数据服务资源";
            messageClose.push(val);
            this.messagePushMap(messageClose);
            this.$api.personalDataServiceApi
              .deleteDataService(
                {
                  IDS: val.C_ID,
                  personnelId: val.C_CREATE_BY
                },
                { loadingText: this.$t("myCenter.Deleting") }
              )
              .then(res => {
                if (res.status == 200) {
                  this.closeSummary(res.data.data, "数据服务");
                }
                this.page = 1;
                this.getdepartmentResourceList();
              })
              .catch(() => {});
          } else if (val.C_RESOURCE_TYPE == "functionService") {
            val.message =
              this.$store.getters.userInfo.username +
              "管理员正在删除服务名为【" +
              val.C_NAME +
              "】的功能服务资源";
            messageClose.push(val);
            this.messagePushMap(messageClose);
            this.$api.personalFunctionServiceApi
              .deleteFunctionService(
                {
                  IDS: val.C_ID,
                  personnelId: val.C_CREATE_BY
                },
                { loadingText: this.$t("myCenter.Deleting") }
              )
              .then(res => {
                if (res.status == 200) {
                  this.closeSummary(res.data.data, "功能服务");
                }
                this.page = 1;
                this.getdepartmentResourceList();
              })
              .catch(() => {});
          } else if (val.C_RESOURCE_TYPE == "sceneService") {
            val.message =
              this.$store.getters.userInfo.username +
              "管理员正在删除服务名为【" +
              val.C_NAME +
              "】的三维服务资源";
            messageClose.push(val);
            this.messagePushMap(messageClose);
            this.$api.personalSceneServiceApi
              .deletesceneService(
                {
                  IDS: val.C_ID,
                  personnelId: val.C_CREATE_BY
                },
                { loadingText: this.$t("myCenter.Deleting") }
              )
              .then(res => {
                if (res.status == 200) {
                  this.closeSummary(res.data.data, "三维服务");
                }
                this.page = 1;
                this.getdepartmentResourceList();
              })
              .catch(() => {});
          } else if (val.C_RESOURCE_TYPE == "data") {
            val.message =
              this.$store.getters.userInfo.username +
              "管理员正在删除服务名为【" +
              val.C_NAME +
              "】的数据中心资源";
            messageClose.push(val);
            this.messagePushMap(messageClose);
            this.$api.personalDatacenterServiceApi
              .deleteData(
                {
                  IDS: val.C_ID,
                  personnelId: val.C_CREATE_BY
                },
                { loadingText: this.$t("myCenter.Deleting") }
              )
              .then(res => {
                if (res.status == 200) {
                  this.closeSummary(res.data.data, "数据中心");
                }
                this.page = 1;
                this.getdepartmentResourceList();
              })
              .catch(() => {});
          } else if (val.C_RESOURCE_TYPE == "fileService") {
            val.message =
              this.$store.getters.userInfo.username +
              "管理员正在删除服务名为【" +
              val.C_NAME +
              "】的附件中心资源";
            messageClose.push(val);
            this.messagePushMap(messageClose);
            this.$api.personalFileServiceApi
              .deletefileResourceService(
                {
                  IDS: val.C_ID,
                  personnelId: val.C_CREATE_BY
                },
                { loadingText: this.$t("myCenter.Deleting") }
              )
              .then(res => {
                if (res.status == 200) {
                  this.closeSummary(res.data.data, "附件中心");
                }
                this.page = 1;
                this.getdepartmentResourceList();
              })
              .catch(() => {});
          } else if (val.C_RESOURCE_TYPE == "mapbuilder") {
            val.message =
              this.$store.getters.userInfo.username +
              "管理员正在删除服务名为【" +
              val.C_NAME +
              "】的制图资源";
            messageClose.push(val);
            this.messagePushMap(messageClose);
            this.$api.webMapBuilderApi
              .deleteMapbuilder(
                {
                  IDS: val.C_ID,
                  personnelId: val.C_CREATE_BY
                },
                { loadingText: this.$t("myCenter.Deleting") }
              )
              .then(res => {
                if (res.status == 200) {
                  this.closeSummary(res.data.data, "制图");
                }
                this.page = 1;
                this.getdepartmentResourceList();
              })
              .catch(() => {});
          } else if (val.C_RESOURCE_TYPE == "scenebuilder") {
            val.message =
              this.$store.getters.userInfo.username +
              "管理员正在删除服务名为【" +
              val.C_NAME +
              "】的场景资源";
            messageClose.push(val);
            this.messagePushMap(messageClose);
            this.$api.webSceneBuilderApi
              .deleteSceneApp(
                {
                  IDS: val.C_ID,
                  personnelId: val.C_CREATE_BY
                },
                { loadingText: this.$t("myCenter.Deleting") }
              )
              .then(res => {
                if (res.status == 200) {
                  this.closeSummary(res.data.data, "场景");
                }
                this.page = 1;
                this.getdepartmentResourceList();
              })
              .catch(() => {});
          } else if (val.C_RESOURCE_TYPE == "bigbuilder") {
            val.message =
              this.$store.getters.userInfo.username +
              "管理员正在删除服务名为【" +
              val.C_NAME +
              "】的大屏资源";
            messageClose.push(val);
            this.messagePushMap(messageClose);
            this.$api.webDashBoardBuilderApi
              .deleteBigbuilder(
                {
                  IDS: val.C_ID,
                  personnelId: val.C_CREATE_BY
                },
                { loadingText: this.$t("myCenter.Deleting") }
              )
              .then(res => {
                if (res.status == 200) {
                  this.closeSummary(res.data.data, "大屏");
                }
                this.page = 1;
                this.getdepartmentResourceList();
              })
              .catch(() => {});
          } else if (val.C_RESOURCE_TYPE == "appbuilder") {
            val.message =
              this.$store.getters.userInfo.username +
              "管理员正在删除服务名为【" +
              val.C_NAME +
              "】的应用资源";
            messageClose.push(val);
            this.messagePushMap(messageClose);
            this.$api.personalCenterAppApi
              .deleteAppService(
                {
                  IDS: val.C_ID,
                  personnelId: val.C_CREATE_BY
                },
                { loadingText: this.$t("myCenter.Deleting") }
              )
              .then(res => {
                if (res.status == 200) {
                  this.closeSummary(res.data.data, "应用");
                }
                this.page = 1;
                this.getdepartmentResourceList();
              })
              .catch(() => {});
          }
        })
        .catch(() => {});
    },
    // 消息推送
    messagePushMap(val) {
      this.$api.messageApi
        .sendMsgToGroup(
          { list: JSON.stringify(val), personnelId: val.personnelId },
          { loadingText: this.$t("myCenter.Pushingdata") }
        )
        .then(() => {})
        .catch(() => {});
    },
    // 共享设置
    shareSettings(val) {
      var serviceListSharing = {
        scope: val.C_SCOPE,
        resourceType: val.C_RESOURCE_TYPE,
        id: val.C_ID,
        name: val.C_NAME,
        keyWord: val.C_KEYWORD,
        comments: val.C_COMMENTS,
        serviceUrl: val.C_SERVICE_URL,
        serviceType: val.C_SERVICE_TYPE,
        serviceClassify: val.C_SERVICE_CLASSIFY,
        appClassify: val.C_APP_CLASSIFY,
        dataClassify: val.C_DATA_CLASSIFY,
        fileClassify: val.C_FILE_CLASSIFY,
        fileStatus: val.C_FILE_STATUS,
        serviceStatus: val.C_SERVICE_STATUS || val.C_FILE_STATUS,
        personnelId: val.C_CREATE_BY,
        referenceId: val.C_FILE_REFERENCEID
          ? val.C_FILE_REFERENCEID
          : val.C_FILE_ID
      };
      if (val.C_RESOURCE_TYPE == "mapService") {
        this.$api.personalCenterServiceApi
          .selectPermissionById(
            {
              serviceId: val.C_ID,
              personnelId: val.C_CREATE_BY,
              scope: val.C_SCOPE
            },
            { loadingText: this.$t("service.searching") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.$refs.serviceSharingDialog.privateDataFun({
                checkList: res.data.data,
                serviceListSharing: serviceListSharing,
                messageSharingName: "地图服务"
              });
            }
          })
          .catch(error => {
            if (error.data.status == "390") {
              this.getdepartmentResourceList();
            }
          });
      } else if (val.C_RESOURCE_TYPE == "dataService") {
        this.$api.personalDataServiceApi
          .selectPermissionById(
            {
              serviceId: val.C_ID,
              personnelId: val.C_CREATE_BY,
              scope: val.C_SCOPE
            },
            { loadingText: this.$t("service.searching") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.$refs.serviceSharingDialog.privateDataFun({
                checkList: res.data.data,
                serviceListSharing: serviceListSharing,
                messageSharingName: "数据服务"
              });
            }
          })
          .catch(error => {
            if (error.data.status == "390") {
              this.getdepartmentResourceList();
            }
          });
      } else if (val.C_RESOURCE_TYPE == "functionService") {
        this.$api.personalFunctionServiceApi
          .selectPermissionById(
            {
              serviceId: val.C_ID,
              personnelId: val.C_CREATE_BY,
              scope: val.C_SCOPE
            },
            { loadingText: this.$t("service.searching") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.$refs.serviceSharingDialog.privateDataFun({
                checkList: res.data.data,
                serviceListSharing: serviceListSharing,
                messageSharingName: "功能服务"
              });
            }
          })
          .catch(error => {
            if (error.data.status == "390") {
              this.getdepartmentResourceList();
            }
          });
      } else if (val.C_RESOURCE_TYPE == "sceneService") {
        this.$api.personalSceneServiceApi
          .selectPermissionById(
            {
              serviceId: val.C_ID,
              personnelId: val.C_CREATE_BY,
              scope: val.C_SCOPE
            },
            { loadingText: this.$t("service.searching") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.$refs.serviceSharingDialog.privateDataFun({
                checkList: res.data.data,
                serviceListSharing: serviceListSharing,
                messageSharingName: "三维服务"
              });
            }
          })
          .catch(error => {
            if (error.data.status == "390") {
              this.getdepartmentResourceList();
            }
          });
      } else if (val.C_RESOURCE_TYPE == "data") {
        this.$api.personalDatacenterServiceApi
          .selectPermissionById(
            {
              dataId: val.C_ID,
              personnelId: val.C_CREATE_BY,
              scope: val.C_SCOPE
            },
            { loadingText: this.$t("service.searching") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.$refs.serviceSharingDialog.privateDataFun({
                checkList: res.data.data,
                serviceListSharing: serviceListSharing,
                messageSharingName: "数据中心"
              });
            }
          })
          .catch(error => {
            if (error.data.status == "390") {
              this.getdepartmentResourceList();
            }
          });
      } else if (val.C_RESOURCE_TYPE == "fileService") {
        this.$api.personalFileServiceApi
          .selectPermissionById(
            {
              fileId: val.C_ID,
              personnelId: val.C_CREATE_BY,
              scope: val.C_SCOPE
            },
            { loadingText: this.$t("service.searching") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.$refs.serviceSharingDialog.privateDataFun({
                checkList: res.data.data,
                serviceListSharing: serviceListSharing,
                messageSharingName: "附件中心"
              });
            }
          })
          .catch(error => {
            if (error.data.status == "390") {
              this.getdepartmentResourceList();
            }
          });
      } else if (val.C_RESOURCE_TYPE == "mapbuilder") {
        this.$api.webMapBuilderApi
          .selectPermissionById(
            {
              appId: val.C_ID,
              personnelId: val.C_CREATE_BY,
              scope: val.C_SCOPE
            },
            { loadingText: this.$t("service.searching"), __LOGINTYPE: "dialog" }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.$refs.serviceSharingDialog.privateDataFun({
                checkList: res.data.data,
                serviceListSharing: serviceListSharing,
                messageSharingName: "制图"
              });
            }
          })
          .catch(error => {
            if (error.data.status == "390") {
              this.getdepartmentResourceList();
            }
          });
      } else if (val.C_RESOURCE_TYPE == "scenebuilder") {
        this.$api.webSceneBuilderApi
          .selectPermissionById(
            {
              appId: val.C_ID,
              personnelId: val.C_CREATE_BY,
              scope: val.C_SCOPE
            },
            { loadingText: this.$t("service.searching") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.$refs.serviceSharingDialog.privateDataFun({
                checkList: res.data.data,
                serviceListSharing: serviceListSharing,
                messageSharingName: "场景"
              });
            }
          })
          .catch(error => {
            if (error.data.status == "390") {
              this.getdepartmentResourceList();
            }
          });
      }
      // else if (val.C_RESOURCE_TYPE == "bigbuilder") {
      // }
      else if (val.C_RESOURCE_TYPE == "appbuilder") {
        this.$api.personalCenterAppApi
          .selectPermissionById(
            {
              appId: val.C_ID,
              personnelId: val.C_CREATE_BY,
              scope: val.C_SCOPE
            },
            { loadingText: this.$t("service.searching") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.$refs.serviceSharingDialog.privateDataFun({
                checkList: res.data.data,
                serviceListSharing: serviceListSharing,
                messageSharingName: "应用"
              });
            }
          })
          .catch(error => {
            if (error.data.status == "390") {
              this.getdepartmentResourceList();
            }
          });
      }
    },
    // 编辑
    edit(val) {
      this.getServiceCategory(val);
      //详情数据
      if (val.C_RESOURCE_TYPE == "mapService") {
        this.$api.serviceMapApi
          .getServiceDetails(
            {
              serviceId: val.C_ID,
              personnelId: val.C_CREATE_BY
            },
            { loadingText: this.$t("service.searching") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.editInfo.serverAdd = res.data.data[0].C_SERVICE_URL;
              this.editInfo.name = res.data.data[0].C_NAME;
              this.editInfo.describe = res.data.data[0].C_COMMENTS;
              this.editInfo.keyWord = res.data.data[0].C_KEYWORD;
              this.editInfo.proxyName = res.data.data[0].C_PROXY_NAME;
              this.editInfo.proxyUrl = res.data.data[0].C_PROXY_URL;
              this.editInfo.isReqProxyUrl =
                res.data.data[0].C_IS_PROXY == "1" ? true : false;
              this.editDialogVisibleMap = true;
            }
          })
          .catch(() => {});
      } else if (val.C_RESOURCE_TYPE == "dataService") {
        this.$api.serviceDataApi
          .getServiceDetails(
            {
              serviceId: val.id ? val.id : val.C_ID,
              personnelId: val.C_CREATE_BY
            },
            { loadingText: this.$t("service.searching") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.editInfo.serverAdd = res.data.data[0].C_SERVICE_URL;
              this.editInfo.name = res.data.data[0].C_NAME;
              this.editInfo.describe = res.data.data[0].C_COMMENTS;
              this.editInfo.keyWord = res.data.data[0].C_KEYWORD;
              this.editDialogVisibleDataservice = true;
            }
          })
          .catch(() => {});
      } else if (val.C_RESOURCE_TYPE == "functionService") {
        this.$api.serviceFunctionApi
          .getServiceDetails(
            {
              serviceId: val.id ? val.id : val.C_ID,
              personnelId: val.C_CREATE_BY
            },
            { loadingText: this.$t("service.searching") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.editInfo.serverAdd = res.data.data[0].C_SERVICE_URL;
              this.editInfo.name = res.data.data[0].C_NAME;
              this.editInfo.describe = res.data.data[0].C_COMMENTS;
              this.editInfo.keyWord = res.data.data[0].C_KEYWORD;
              this.editInfo.proxyName = res.data.data[0].C_PROXY_NAME;
              this.editInfo.isReqProxyUrl =
                res.data.data[0].C_IS_PROXY == "1" ? true : false;
              this.editDialogVisibleFunction = true;
            }
          })
          .catch(() => {});
      } else if (val.C_RESOURCE_TYPE == "sceneService") {
        this.$api.serviceSceneApi
          .getServiceDetails(
            {
              serviceId: val.id ? val.id : val.C_ID,
              personnelId: val.C_CREATE_BY
            },
            { loadingText: this.$t("service.searching") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.editInfo.serverAdd = res.data.data[0].C_SERVICE_URL;
              this.editInfo.name = res.data.data[0].C_NAME;
              this.editInfo.describe = res.data.data[0].C_COMMENTS;
              this.editInfo.keyWord = res.data.data[0].C_KEYWORD;
              this.editDialogVisibleScene = true;
            }
          })
          .catch(() => {});
      } else if (val.C_RESOURCE_TYPE == "data") {
        this.$api.serviceDatacenterApi
          .getDataDetails(
            {
              dataId: val.id ? val.id : val.C_ID,
              personnelId: val.C_CREATE_BY
            },
            { loadingText: this.$t("service.searching") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.editInfo.serverAdd = res.data.data[0].C_SERVICE_URL;
              this.editInfo.name = res.data.data[0].C_NAME;
              this.editInfo.describe = res.data.data[0].C_COMMENTS;
              this.editInfo.keyWord = res.data.data[0].C_KEYWORD;
              this.editDialogVisibleData = true;
            }
          })
          .catch(() => {});
      } else if (val.C_RESOURCE_TYPE == "fileService") {
        if (val.C_FOLDER == 0 || !val.folder) {
          this.$api.serviceFileCenApi
            .getFileDetails({
              fileId: val.id ? val.id : val.C_ID,
              personnelId: val.C_CREATE_BY
            })
            .then(res => {
              if (res.data.status == 200) {
                this.editInfo.serverAdd = res.data.data[0].C_SERVICE_URL;
                this.editInfo.name = res.data.data[0].C_NAME;
                this.editInfo.describe = res.data.data[0].C_COMMENTS;
                this.editInfo.keyWord = res.data.data[0].C_KEYWORD;
                this.editDialogVisibleFile = true;
              }
            })
            .catch(() => {});
        } else {
          this.$api.serviceFileCenApi
            .getFolderDatails({
              folderId: val.id ? val.id : val.C_ID,
              personnelId: val.C_CREATE_BY
            })
            .then(res => {
              if (res.data.status == 200) {
                this.editInfo.serverAdd =
                  res.data.data[0].folderlist[0].C_SERVICE_URL;
                this.editInfo.name = res.data.data[0].folderlist[0].C_NAME;
                this.editInfo.describe =
                  res.data.data[0].folderlist[0].C_COMMENTS;
                this.editInfo.keyWord =
                  res.data.data[0].folderlist[0].C_KEYWORD;
                this.editDialogVisibleFile = true;
              }
            })
            .catch(() => {});
        }
      } else if (val.C_RESOURCE_TYPE == "mapbuilder") {
        this.$api.webMapBuilderApi
          .getMapbuilderDetails({
            appId: val.id ? val.id : val.C_ID,
            personnelId: val.C_CREATE_BY
          })
          .then(res => {
            if (res.data.status == 200) {
              this.editInfo.serverAdd = res.data.data[0].C_APP_URL;
              this.editInfo.name = res.data.data[0].C_NAME;
              this.editInfo.describe = res.data.data[0].C_COMMENTS;
              this.editInfo.keyWord = res.data.data[0].C_KEYWORD;
              this.editDialogVisibleBuilder = true;
            }
          })
          .catch(() => {});
      } else if (val.C_RESOURCE_TYPE == "scenebuilder") {
        this.$api.webSceneBuilderApi
          .getSceneAppDetails({
            appId: val.id ? val.id : val.C_ID,
            personnelId: val.C_CREATE_BY
          })
          .then(res => {
            if (res.data.status == 200) {
              this.editInfo.serverAdd = res.data.data[0].C_APP_URL;
              this.editInfo.name = res.data.data[0].C_NAME;
              this.editInfo.describe = res.data.data[0].C_COMMENTS;
              this.editInfo.keyWord = res.data.data[0].C_KEYWORD;
              this.editDialogVisibleBuilder = true;
            }
          })
          .catch(() => {});
      }
      // else if (val.C_RESOURCE_TYPE == "bigbuilder") {
      //   //
      // }
      else if (val.C_RESOURCE_TYPE == "appbuilder") {
        this.$api.serviceAppCenterApi
          .getAppDetails({
            appId: val.id ? val.id : val.C_ID,
            personnelId: val.C_CREATE_BY
          })
          .then(res => {
            if (res.data.status == 200) {
              this.editInfo.serverAdd = res.data.data[0].C_APP_URL;
              this.editInfo.name = res.data.data[0].C_NAME;
              this.editInfo.describe = res.data.data[0].C_COMMENTS;
              this.editInfo.keyWord = res.data.data[0].C_KEYWORD;
              this.editDialogVisibleBuilder = true;
            }
          })
          .catch(() => {});
      }
      this.editInfo.power = "";
      this.editInfo.type = "";
      this.editInfo.thumbnail = "";
      this.resourceData = {
        serviceType: val.C_SERVICE_TYPE,
        img: val.C_IMG,
        serviceUrl: val.C_SERVICE_URL,
        serviceClassify: val.C_SERVICE_CLASSIFY,
        id: val.C_ID,
        scope: val.C_SCOPE,
        personnelId: val.C_CREATE_BY,
        serviceStatus: val.C_SERVICE_STATUS,
        fileStatus: val.C_FILE_STATUS
      };
      if (val.C_RESOURCE_TYPE == "mapService") {
        this.resourceData.serviceEpsg = val.C_SERVICE_EPSG;
        this.resourceData.serviceFull = val.C_SERVICE_FULL;
        this.resourceData.serviceInitial = val.C_SERVICE_INITIAL;
        this.resourceData.serviceOrigin = val.C_SERVICE_ORIGIN;
        this.resourceData.servicePrj = val.C_SERVICE_PRJ;
        this.resourceData.serviceProjFour = val.C_SERVICE_PROJFOUR;
      } else if (val.C_RESOURCE_TYPE == "data") {
        this.resourceData.dataClassify = val.C_DATA_CLASSIFY;
      } else if (val.C_RESOURCE_TYPE == "fileService") {
        this.resourceData.fileClassify = val.C_FILE_CLASSIFY;
        this.resourceData.referenceId = val.C_FILE_REFERENCEID;
      } else if (
        val.C_RESOURCE_TYPE == "mapbuilder" ||
        val.C_RESOURCE_TYPE == "scenebuilder" ||
        val.C_RESOURCE_TYPE == "bigbuilder" ||
        val.C_RESOURCE_TYPE == "appbuilder"
      ) {
        this.resourceData.serviceClassify = val.C_APP_CLASSIFY;
        this.resourceData.serviceUrl = val.C_APP_URL;
        this.resourceData.resourceType = val.C_RESOURCE_TYPE;
        this.resourceData.referenceId = val.C_FILE_ID;
      }
    },
    // 显示
    display(val) {
      var messageClose = [];
      val.toId = val.C_CREATE_BY;
      if (val.C_RESOURCE_TYPE == "mapService") {
        val.message =
          this.$store.getters.userInfo.username +
          "管理员正在显示服务名为【" +
          val.C_NAME +
          "】的地图服务资源";
        messageClose.push(val);
        this.messagePushMap(messageClose);
        this.$api.personalCenterServiceApi
          .getMeServiceShow(
            {
              serviceIds: val.C_ID,
              personnelId: val.C_CREATE_BY
            },
            { loadingText: this.$t("myCenter.Displaying") }
          )
          .then(res => {
            if (res.status == 200) {
              this.hideFun(res, "数据服务", "显示");
              this.getdepartmentResourceList();
            }
          });
      } else if (val.C_RESOURCE_TYPE == "dataService") {
        val.message =
          this.$store.getters.userInfo.username +
          "管理员正在显示服务名为【" +
          val.C_NAME +
          "】的数据服务资源";
        messageClose.push(val);
        this.messagePushMap(messageClose);
        this.$api.personalDataServiceApi
          .getMeServiceShow(
            {
              serviceIds: val.C_ID,
              personnelId: val.C_CREATE_BY
            },
            { loadingText: this.$t("myCenter.Displaying") }
          )
          .then(res => {
            if (res.status == 200) {
              this.hideFun(res, "数据服务", "显示");
              this.getdepartmentResourceList();
            }
          });
      } else if (val.C_RESOURCE_TYPE == "functionService") {
        val.message =
          this.$store.getters.userInfo.username +
          "管理员正在显示服务名为【" +
          val.C_NAME +
          "】的功能服务资源";
        messageClose.push(val);
        this.messagePushMap(messageClose);
        this.$api.personalFunctionServiceApi
          .getMeServiceShow(
            {
              serviceIds: val.C_ID,
              personnelId: val.C_CREATE_BY
            },
            { loadingText: this.$t("myCenter.Displaying") }
          )
          .then(res => {
            if (res.status == 200) {
              this.hideFun(res, "功能服务", "显示");
              this.getdepartmentResourceList();
            }
          });
      } else if (val.C_RESOURCE_TYPE == "sceneService") {
        val.message =
          this.$store.getters.userInfo.username +
          "管理员正在显示服务名为【" +
          val.C_NAME +
          "】的三维服务资源";
        messageClose.push(val);
        this.messagePushMap(messageClose);
        this.$api.personalSceneServiceApi
          .getMeServiceShow(
            {
              serviceIds: val.C_ID,
              personnelId: val.C_CREATE_BY
            },
            { loadingText: this.$t("myCenter.Displaying") }
          )
          .then(res => {
            if (res.status == 200) {
              this.hideFun(res, "三维服务", "显示");
              this.getdepartmentResourceList();
            }
          });
      } else if (val.C_RESOURCE_TYPE == "data") {
        val.message =
          this.$store.getters.userInfo.username +
          "管理员正在显示服务名为【" +
          val.C_NAME +
          "】的数据中心资源";
        messageClose.push(val);
        this.messagePushMap(messageClose);
        this.$api.personalDatacenterServiceApi
          .getDataShow(
            {
              IDS: val.C_ID,
              personnelId: val.C_CREATE_BY
            },
            { loadingText: this.$t("myCenter.Displaying") }
          )
          .then(res => {
            if (res.status == 200) {
              this.hideFun(res, "数据中心", "显示");
              this.getdepartmentResourceList();
            }
          });
      } else if (val.C_RESOURCE_TYPE == "fileService") {
        val.message =
          this.$store.getters.userInfo.username +
          "管理员正在显示服务名为【" +
          val.C_NAME +
          "】的附件中心资源";
        messageClose.push(val);
        this.messagePushMap(messageClose);
        this.$api.personalFileServiceApi
          .getFileShow(
            {
              IDS: val.C_ID,
              personnelId: val.C_CREATE_BY
            },
            { loadingText: this.$t("myCenter.Displaying") }
          )
          .then(res => {
            if (res.status == 200) {
              this.hideFun(res, "附件中心", "显示");
              this.getdepartmentResourceList();
            }
          });
      } else if (val.C_RESOURCE_TYPE == "mapbuilder") {
        val.message =
          this.$store.getters.userInfo.username +
          "管理员正在显示服务名为【" +
          val.C_NAME +
          "】的制图资源";
        messageClose.push(val);
        this.messagePushMap(messageClose);
        this.$api.webMapBuilderApi
          .getMapbuilderShow(
            {
              IDS: val.C_ID,
              personnelId: val.C_CREATE_BY
            },
            { loadingText: this.$t("myCenter.Displaying") }
          )
          .then(res => {
            if (res.status == 200) {
              this.hideFun(res, "制图", "显示");
              this.getdepartmentResourceList();
            }
          });
      } else if (val.C_RESOURCE_TYPE == "scenebuilder") {
        val.message =
          this.$store.getters.userInfo.username +
          "管理员正在显示服务名为【" +
          val.C_NAME +
          "】的场景资源";
        messageClose.push(val);
        this.messagePushMap(messageClose);
        this.$api.webSceneBuilderApi
          .getSceneAppShow(
            {
              IDS: val.C_ID,
              personnelId: val.C_CREATE_BY
            },
            { loadingText: this.$t("myCenter.Displaying") }
          )
          .then(res => {
            if (res.status == 200) {
              this.hideFun(res, "场景", "显示");
              this.getdepartmentResourceList();
            }
          });
      }
      // else if (val.C_RESOURCE_TYPE == "bigbuilder") {
      // }
      else if (val.C_RESOURCE_TYPE == "appbuilder") {
        val.message =
          this.$store.getters.userInfo.username +
          "管理员正在显示服务名为【" +
          val.C_NAME +
          "】的应用资源";
        messageClose.push(val);
        this.messagePushMap(messageClose);
        this.$api.serviceAppCenterApi
          .getAppShow(
            {
              IDS: val.C_ID,
              personnelId: val.C_CREATE_BY
            },
            { loadingText: this.$t("myCenter.Displaying") }
          )
          .then(res => {
            if (res.status == 200) {
              this.hideFun(res, "应用", "显示");
              this.getdepartmentResourceList();
            }
          });
      }
    },
    // 隐藏 显示 推送公共函数
    hideFun(res, messageName, status) {
      if (status == "显示") {
        this.$message({
          message: this.$t("myCenter.DisplayedSuccessfully"),
          type: "success"
        });
      } else {
        this.$message({
          message: this.$t("myCenter.HidedSuccessfully"),
          type: "success"
        });
      }
      var messageHide = [];
      res.data.data.forEach(element => {
        element.forEach(item => {
          var selectedName = "";
          this.favoritesResourceList.forEach(list => {
            if (list.C_ID == item.C_SOURCE_ID) {
              selectedName = list.C_NAME;
            }
          });
          item.personnelId = element.C_CREATE_BY;
          item.message =
            this.$store.getters.userInfo.username +
            "管理员" +
            status +
            "了名为【" +
            selectedName +
            "】的" +
            messageName +
            "资源";
          messageHide.push(item);
        });
      });
      this.messagePushMap(messageHide);
    },
    // 隐藏
    hide(val) {
      var messageClose = [];
      val.toId = val.C_CREATE_BY;
      if (val.C_RESOURCE_TYPE == "mapService") {
        val.message =
          this.$store.getters.userInfo.username +
          "管理员正在隐藏服务名为【" +
          val.C_NAME +
          "】的地图服务资源";
        messageClose.push(val);
        this.messagePushMap(messageClose);
        this.$api.personalCenterServiceApi
          .getMeServiceHide(
            {
              serviceIds: val.C_ID,
              personnelId: val.C_CREATE_BY
            },
            { loadingText: this.$t("myCenter.Hiding") }
          )
          .then(res => {
            if (res.status == 200) {
              this.hideFun(res, "地图服务", "隐藏");
              this.getdepartmentResourceList();
            }
          });
      } else if (val.C_RESOURCE_TYPE == "dataService") {
        val.message =
          this.$store.getters.userInfo.username +
          "管理员正在隐藏服务名为【" +
          val.C_NAME +
          "】的数据服务资源";
        messageClose.push(val);
        this.messagePushMap(messageClose);
        this.$api.personalDataServiceApi
          .getMeServiceHide(
            {
              serviceIds: val.C_ID,
              personnelId: val.C_CREATE_BY
            },
            { loadingText: this.$t("myCenter.Hiding") }
          )
          .then(res => {
            if (res.status == 200) {
              this.hideFun(res, "数据服务", "隐藏");
              this.getdepartmentResourceList();
            }
          });
      } else if (val.C_RESOURCE_TYPE == "functionService") {
        val.message =
          this.$store.getters.userInfo.username +
          "管理员正在隐藏服务名为【" +
          val.C_NAME +
          "】的功能服务资源";
        messageClose.push(val);
        this.messagePushMap(messageClose);
        this.$api.personalFunctionServiceApi
          .getMeServiceHide(
            {
              serviceIds: val.C_ID,
              personnelId: val.C_CREATE_BY
            },
            { loadingText: this.$t("myCenter.Hiding") }
          )
          .then(res => {
            if (res.status == 200) {
              this.hideFun(res, "功能服务", "隐藏");
              this.getdepartmentResourceList();
            }
          });
      } else if (val.C_RESOURCE_TYPE == "sceneService") {
        val.message =
          this.$store.getters.userInfo.username +
          "管理员正在隐藏服务名为【" +
          val.C_NAME +
          "】的三维服务资源";
        messageClose.push(val);
        this.messagePushMap(messageClose);
        this.$api.personalSceneServiceApi
          .getMeServiceHide(
            {
              serviceIds: val.C_ID,
              personnelId: val.C_CREATE_BY
            },
            { loadingText: this.$t("myCenter.Hiding") }
          )
          .then(res => {
            if (res.status == 200) {
              this.hideFun(res, "三维服务", "隐藏");
              this.getdepartmentResourceList();
            }
          });
      } else if (val.C_RESOURCE_TYPE == "data") {
        val.message =
          this.$store.getters.userInfo.username +
          "管理员正在隐藏服务名为【" +
          val.C_NAME +
          "】的数据中心资源";
        messageClose.push(val);
        this.messagePushMap(messageClose);
        this.$api.personalDatacenterServiceApi
          .getDataHide(
            {
              IDS: val.C_ID,
              personnelId: val.C_CREATE_BY
            },
            { loadingText: this.$t("myCenter.Hiding") }
          )
          .then(res => {
            if (res.status == 200) {
              this.hideFun(res, "数据中心", "隐藏");
              this.getdepartmentResourceList();
            }
          });
      } else if (val.C_RESOURCE_TYPE == "fileService") {
        val.message =
          this.$store.getters.userInfo.username +
          "管理员正在隐藏服务名为【" +
          val.C_NAME +
          "】的附件中心资源";
        messageClose.push(val);
        this.messagePushMap(messageClose);
        this.$api.personalFileServiceApi
          .getFileHide(
            {
              IDS: val.C_ID,
              personnelId: val.C_CREATE_BY
            },
            { loadingText: this.$t("myCenter.Hiding") }
          )
          .then(res => {
            if (res.status == 200) {
              this.hideFun(res, "附件中心", "隐藏");
              this.getdepartmentResourceList();
            }
          });
      } else if (val.C_RESOURCE_TYPE == "mapbuilder") {
        val.message =
          this.$store.getters.userInfo.username +
          "管理员正在隐藏服务名为【" +
          val.C_NAME +
          "】的制图资源";
        messageClose.push(val);
        this.messagePushMap(messageClose);
        this.$api.webMapBuilderApi
          .getMapbuilderHide(
            {
              IDS: val.C_ID,
              personnelId: val.C_CREATE_BY
            },
            { loadingText: this.$t("myCenter.Displaying") }
          )
          .then(res => {
            if (res.status == 200) {
              this.hideFun(res, "制图", "隐藏");
              this.getdepartmentResourceList();
            }
          });
      } else if (val.C_RESOURCE_TYPE == "scenebuilder") {
        val.message =
          this.$store.getters.userInfo.username +
          "管理员正在隐藏服务名为【" +
          val.C_NAME +
          "】的场景资源";
        messageClose.push(val);
        this.messagePushMap(messageClose);
        this.$api.webSceneBuilderApi
          .getSceneAppHide(
            {
              IDS: val.C_ID,
              personnelId: val.C_CREATE_BY
            },
            { loadingText: this.$t("myCenter.Displaying") }
          )
          .then(res => {
            if (res.status == 200) {
              this.hideFun(res, "场景", "隐藏");
              this.getdepartmentResourceList();
            }
          });
      }
      // else if (val.C_RESOURCE_TYPE == "bigbuilder") {
      // }
      else if (val.C_RESOURCE_TYPE == "appbuilder") {
        val.message =
          this.$store.getters.userInfo.username +
          "管理员正在隐藏服务名为【" +
          val.C_NAME +
          "】的应用资源";
        messageClose.push(val);
        this.messagePushMap(messageClose);
        this.$api.serviceAppCenterApi
          .getAppHide(
            {
              IDS: val.C_ID,
              personnelId: val.C_CREATE_BY
            },
            { loadingText: this.$t("myCenter.Displaying") }
          )
          .then(res => {
            if (res.status == 200) {
              this.hideFun(res, "应用", "隐藏");
              this.getdepartmentResourceList();
            }
          });
      }
    },
    // 初始获取权限公共函数
    getServiceCategoryFun(res) {
      this.arr = [];
      var map = [];
      this.category = res.data.data;
      this.category.forEach(item => {
        if (item.parentId == 0) {
          map.push(item);
        }
      });
      map.forEach(ar => {
        this.arr.push(ar);
        this.category.forEach(it => {
          if (ar.id == it.parentId) {
            it.typeName = `${ar.typeName} — ${it.typeName}`;
            this.arr.push(it);
          }
        });
      });
    },
    //初始获取权限
    getServiceCategory(val) {
      if (val.C_RESOURCE_TYPE == "mapService") {
        this.$api.personalCenterServiceApi
          .getServiceCategory({ loadingText: this.$t("service.searching") })
          .then(res => {
            if (res.status == 200) {
              this.getServiceCategoryFun(res);
            }
          });
      } else if (val.C_RESOURCE_TYPE == "dataService") {
        this.$api.personalDataServiceApi
          .getServiceCategory({ loadingText: this.$t("service.searching") })
          .then(res => {
            if (res.status == 200) {
              this.getServiceCategoryFun(res);
            }
          });
      } else if (val.C_RESOURCE_TYPE == "functionService") {
        this.$api.personalFunctionServiceApi
          .getFSCategory({ loadingText: this.$t("service.searching") })
          .then(res => {
            if (res.status == 200) {
              this.getServiceCategoryFun(res);
            }
          });
      } else if (val.C_RESOURCE_TYPE == "sceneService") {
        this.$api.personalSceneServiceApi
          .getServiceCategory({ loadingText: this.$t("service.searching") })
          .then(res => {
            if (res.status == 200) {
              this.getServiceCategoryFun(res);
            }
          });
      } else if (val.C_RESOURCE_TYPE == "data") {
        this.$api.personalDatacenterServiceApi
          .getDataCategory({ loadingText: this.$t("service.searching") })
          .then(res => {
            if (res.status == 200) {
              this.getServiceCategoryFun(res);
            }
          });
      } else if (val.C_RESOURCE_TYPE == "fileService") {
        this.$api.personalFileServiceApi
          .getFileCategory({ loadingText: this.$t("service.searching") })
          .then(res => {
            if (res.status == 200) {
              this.getServiceCategoryFun(res);
            }
          });
      } else if (val.C_RESOURCE_TYPE == "mapbuilder") {
        this.$api.webMapBuilderApi
          .getMapbuilderCategoryList({
            loadingText: this.$t("service.searching")
          })
          .then(res => {
            if (res.status == 200) {
              this.getServiceCategoryFun(res);
            }
          });
      } else if (val.C_RESOURCE_TYPE == "scenebuilder") {
        this.$api.webSceneBuilderApi
          .getSceneAppCategory({ loadingText: this.$t("service.searching") })
          .then(res => {
            if (res.status == 200) {
              this.getServiceCategoryFun(res);
            }
          });
      }
      // else if (val.C_RESOURCE_TYPE == "bigbuilder") {
      // }
      else if (val.C_RESOURCE_TYPE == "appbuilder") {
        this.$api.serviceAppCenterApi
          .getAppCategory({ loadingText: this.$t("service.searching") })
          .then(res => {
            if (res.status == 200) {
              this.getServiceCategoryFun(res);
            }
          });
      }
    },
    editDialogCloseMap() {
      this.editDialogVisibleMap = false;
    },
    editDialogCloseData() {
      this.editDialogVisibleData = false;
    },
    editDialogCloseFile() {
      this.editDialogVisibleFile = false;
    },
    editDialogCloseFunction() {
      this.editDialogVisibleFunction = false;
    },
    editDialogCloseScene() {
      this.editDialogVisibleScene = false;
    },
    editDialogCloseDataservice() {
      this.editDialogVisibleDataservice = false;
    },
    editDialogCloseBuilder() {
      this.editDialogVisibleBuilder = false;
    },
    dialogClose() {
      this.dialogVisible = false;
    },
    // 关闭文件预览
    handleClose() {
      this.fileServiceDialogVisible = false;
    }
  },
  mounted() {
    this.getOrgMngConfig();
  }
};
</script>

<style lang='scss' scoped>
.resource-manage {
  .noData {
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
    height: 330px;
    text-align: center;
    font-size: 15px;
    color: #606266;
    background: #fff;
    img {
      margin-top: 45px;
    }
    span {
      margin-top: 20px;
      display: block;
    }
  }
  .personal-department-right-top {
    padding: 0 10px;
    background: #fff;
    .pages {
      height: 48px;
      line-height: 48px;
      color: #909399;
    }
    .map-search {
      height: 48px;
      line-height: 48px;
      width: 100%;
      .inp {
        float: left;
        height: 30px;
        width: 100%;
        /deep/.el-input-group__append {
          width: 50px;
          font-size: 14px;
          color: #ffffff;
          padding: 0;
          text-align: center;
          border: none;
          border-radius: 0;
          .el-button {
            width: 50px;
            height: 30px;
            line-height: 28px;
            border-radius: 0;
            padding: 0;
          }
          .base-btn {
            @include base-radio-button();
          }
        }
        /deep/.el-input__inner {
          border-radius: 0;
          border: 1px solid #dcdfe6;
          border-right: none;
          height: 30px;
          line-height: 30px;
        }
        /deep/.el-input__inner:focus {
          @include base-active-underline(
            $types: (
              "top",
              "bottom",
              "left"
            )
          );
        }
      }
      .icon {
        text-align: right;
        .btn {
          width: 32px;
          border: 10px 0;
          padding: 7px 0px;
          border: 1px solid #dcdfe6;
          text-align: center;
        }
        div:first-child {
          border-right: none;
        }
        .btn-focus {
          @include base-active-color();
          @include base-active-underline($width: 3px, $types: "bottom");
          height: 12px;
        }
      }
    }
  }
  .personal-department-right-center {
    font-size: 14px;
    border: 1px solid #ebebeb;
    margin: 20px 0;
    .center-type {
      padding: 15px 0 0 10px;
      .action-style {
        @include base-active-color();
      }
      .center-type-span {
        float: left;
      }
      .center-type-box {
        margin-left: 70px;
        padding: 0px;
      }
      .center-type-specific {
        padding: 8px 4px;
        margin-right: 5px;
        color: #6c6d6f;
        &:hover {
          @include base-active-color();
          cursor: pointer;
        }
      }
      .center-type-specific {
        padding: 0 4px 8px;
        margin-right: 5px;
        color: #6c6d6f;
        display: inline-block;
        &:hover {
          @include base-active-color();
          cursor: pointer;
        }
      }
    }
    .center-type:last-child {
      padding-bottom: 8px;
      padding-top: 6px;
    }
    .pages-right {
      padding-right: 10px;
      text-align: right;
      span {
        margin-right: 5px;
      }
      .dropdown-box {
        // height: 48px;
        display: inline-block;
        // .el-dropdown {
        //   height: 30px;
        // }
        .arrange-hover.sortDataColor {
          @include base-active-color();
          display: inline-block;
          text-align: center;
        }
        .arrange-hover {
          text-decoration: none;
          color: #242424;
        }
        .arrange-hover:hover {
          cursor: pointer;
          @include base-active-color();
        }
      }
      .el-button {
        margin-left: 10px;
        padding: 6px 8px;
      }
      .el-icon-arrow-down,
      .el-icon-bottom,
      .el-icon-top {
        font-size: 16px;
        margin-left: 2px;
        font-weight: 900;
      }
    }
  }
  .personal-department-right-list {
    .grid-layout {
      .container {
        background: #fff;
        border: 1px solid #dfdfdf;
        margin-bottom: 22px;
        .img-container {
          width: 100%;
          padding-bottom: 70%;
          overflow: hidden;
          .el-image {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background: #f3f9f9;
          }
        }
        .details-container {
          padding: 0 16px;
          font-size: 14px;
          @include base-active-color();
          .details-container-title {
            margin: 10px 0;
            height: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .details-container-release {
            margin: 10px 0;
            color: #000;
            font-size: 12px;
          }
          .details-container-icon {
            margin: 10px 0;
            i:hover {
              cursor: pointer;
            }
          }
          .container-right {
            text-align: right;
          }
        }
      }
    }
    .list-layout {
      .container {
        border: 1px solid #dfdfdf;
        margin-bottom: 22px;
        background: #fff;
        color: #7c7c7c;
        .dep-details-area {
          margin-left: 30px;
          padding-right: 30px;
          font-size: 14px;
          .dep-top {
            border-bottom: 1px solid #f5f5f5;
            height: 47px;
            line-height: 47px;
            .dep-name {
              font-size: 15px;
              @include base-active-color();
            }
            .dep-btn {
              text-align: right;
              .dep-operate-normal-btn {
                @include base-active-color();
                margin-left: 10px;
                cursor: pointer;
              }
              // .dep-operate-forbid-btn{
              //   color:#f56c6c;
              //   margin-left:10px;
              // }
            }
          }
          .dep-bottom {
            height: 47px;
            line-height: 47px;
            .dep-details-info {
              i {
                margin-right: 4px;
              }
            }
          }
        }
      }
    }
    //图片悬停
    .img-container {
      position: relative;
      overflow: hidden;
      .mask {
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.3);
        z-index: 999;
      }
      .collection-btn {
        display: none;
        position: absolute;
        width: 26px;
        height: 26px;
        right: 4px;
        top: 4px;
        z-index: 1000;
        background: #fff;
        @include base-active-color();
        font-size: 16px;
        border-radius: 4px;
        cursor: pointer;
        &::before {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 16px;
          height: 16px;
          margin: auto;
        }
      }
      .remark-btn {
        position: absolute;
        width: 26px;
        height: 26px;
        left: 4px;
        top: 4px;
        z-index: 1000;
        @include base-bg-font();
        font-size: 16px;
        border-radius: 4px;
        cursor: default;
        &::before {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 16px;
          height: 16px;
          margin: auto;
        }
      }
    }
    //图片默认
    .image-slot {
      background: #f5f7fa;
      width: 100%;
      height: 100%;
      line-height: 100%;
      text-align: center;
      display: table;
      .text {
        font-size: 14px;
        color: #909399;
        display: table-cell;
        vertical-align: middle;
      }
      .el-icon-picture-outline {
        font-size: 26px;
      }
    }
  }
}
</style>