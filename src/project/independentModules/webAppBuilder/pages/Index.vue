<template>
  <div id="web-app-builder">
    <div id="web-app-builder-body">
      <transition
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated fadeOutLeft"
      >
        <left-header
          class="left-header"
          @switchStatus="switchStatus"
          :asideStatus="asideStatus"
          :style="leftHeaderStyle"
          v-show="!previewStatus"
        ></left-header>
      </transition>
      <transition
        enter-active-class="animated fadeInRight"
        leave-active-class="animated fadeOutRight"
      >
        <right-header
          class="right-header"
          @goBack="goBack"
          :style="rightHeaderStyle"
          @addApp="addApp"
          @save="saveApp"
          @preview="preview"
          @selectApp="selectApp"
          v-show="!previewStatus"
          :currentAppInfo="currentAppInfo"
          :onlyGlanceOver="onlyGlanceOver"
          @download="download"
          @share="share"
          @editAppName="editAppName"
        ></right-header>
      </transition>
      <transition
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated fadeOutLeft"
      >
        <left-tab
          class="left-tab"
          :height="height"
          :asideStatus="asideStatus"
          @switchStatus="switchStatus"
          :style="leftHeaderStyle"
          @changeTheme="changeTheme"
          :configJSON="configJSON"
          @saveLayerTree="saveLayerTree"
          @changeWidget="changeWidget"
          v-show="!previewStatus"
          :updateDataTimeStamp="updateDataTimeStamp"
          @changeAttribute="changeAttribute"
          :infoQueryConfigJSON="infoQueryConfigJSON"
          :advancedSearchConfigJSON="advancedSearchConfigJSON"
          :overlayAnalysisConfigJSON="overlayAnalysisConfigJSON"
          :searchBarConfigJSON="searchBarConfigJSON"
          @directUpdateConfig="directUpdateConfig"
        ></left-tab>
      </transition>
      <map-area
        class="map-area"
        :height="height"
        :style="mapAreaStyle"
        :configXML="configXML"
        :reloadTimeStamp="reloadTimeStamp"
        :previewStatus="previewStatus"
        @cancelPreview="cancelPreview"
        :infoQueryConfigXML="infoQueryConfigXML"
        :advancedSearchConfigXML="advancedSearchConfigXML"
        :overlayAnalysisConfigXML="overlayAnalysisConfigXML"
        :searchBarConfigXML="searchBarConfigXML"
      ></map-area>
      <add-app-dialog
        :dialogVisible="addAppDialogVisible"
        :addAppDialogTitle="addAppDialogTitle"
        :addAppInfo="addAppInfo"
        @dialogClose="closeAddAppDialog"
        @save="saveAddApp"
      ></add-app-dialog>
      <personal-center-service-sharing-dialog
        ref="serviceSharingDialog"
        :classMark="true"
        @getserviceListByMe="getNewAppInfo"
      ></personal-center-service-sharing-dialog>
      <edit-app-name
        :dialogVisible="editNameDialogVisible"
        @dialogClose="editAppNameClose"
        @save="saveEditAppName"
        :currentAppName="currentAppName"
      ></edit-app-name>
    </div>
  </div>
</template>

<script>
import LeftHeader from "../components/LeftHeader";
import RightHeader from "../components/RightHeader";
import LeftTab from "../components/LeftTab";
import MapArea from "../components/MapArea";
import AddAppDialog from "../components/AddAppDialog";
import x2js from "x2js";
import xmlJson from "../config/configJSON";
import PersonalCenterServiceSharingDialog from "components/personalCenterService/PersonalCenterServiceSharingDialog";
import EditAppName from "../components/EditAppName";
import { traversal } from "@/utils/traversal.js";
export default {
  name: "Index",
  components: {
    LeftHeader,
    RightHeader,
    LeftTab,
    MapArea,
    AddAppDialog,
    PersonalCenterServiceSharingDialog,
    EditAppName
  },
  methods: {
    goBack() {
      var checkStatus = true;
      for (var i in this.copyFieldMapping) {
        if (
          JSON.stringify(this[i]) !=
          JSON.stringify(this[this.copyFieldMapping[i]])
        ) {
          checkStatus = false;
        }
      }
      if (checkStatus) {
        // this.$router.push("/");
        this.$router.go(-1);
      } else {
        this.$confirm(
          this.$t("webAppBuilder.TheCurrentOperationHasNotBeenSaved") + "？"
        )
          .then(() => {
            this.$router.push("/");
          })
          .catch(() => {});
      }
    },
    share() {
      //共享设置
      if (!this.currentAppInfo.id) {
        this.$message({
          message: this.$t("webAppBuilder.PleaseSelectAnAppShare"),
          type: "warning"
        });
        return false;
      }
      this.$api.webAppBuilderApi
        .selectPermissionById(
          { appId: this.currentAppInfo.id ,scope:this.currentAppInfo.scope?this.currentAppInfo.scope:'Private' },
          {
            loadingText: this.$t("service.searching"),
            __LOGINTYPE: "dialog"
          }
        )
        .then(res => {
          var data = res.data.data;
          this.$refs.serviceSharingDialog.privateDataFun({
            checkList: data,
            serviceListSharing: this.currentAppInfo,
            messageSharingName: this.$t("webAppBuilder.Apps")
          });
        })
        .catch(() => {});
    },
    shareClose() {
      this.shareDialogVisible = false;
    },
    download() {
      //下载应用
      if (!this.currentAppInfo.id) {
        this.$message({
          message: this.$t("webAppBuilder.PleaseSelectAnAppDownload"),
          type: "warning"
        });
        return false;
      }
      var baseUrl = "";
      if (window.location.href.indexOf(this.$route.path) > 0) {
        baseUrl = window.location.href.slice(
          0,
          window.location.href.indexOf(this.$route.path)
        );
      } else {
        baseUrl = window.location.href;
      }
      var url =
        baseUrl +
        `/api/app/get/downloadById?appId=${this.currentAppInfo.id}&personnelId=${this.$store.getters.userInfo.id}`;
      window.open(url);
      // this.$api.webAppBuilderApi
      //   .downloadById(
      //     { appId: this.currentAppInfo.id },
      //     {
      //       loadingText: "正在下载",
      //       __LOGINTYPE: "dialog"
      //     }
      //   )
      //   .then(res => {
      //     if (!res.data) {
      //       this.$message({
      //         message: "当前配置信息为空，不能下载空配置",
      //         type: "warning"
      //       });
      //       return false;
      //     }
      //     var data = this.Base64.decode(res.data);
      //     const blob = new Blob([data]);
      //     const fileName = this.currentAppInfo.name + "_config.xml";
      //     if ("download" in document.createElement("a")) {
      //       const elink = document.createElement("a");
      //       elink.download = fileName;
      //       elink.style.display = "none";
      //       elink.href = URL.createObjectURL(blob);
      //       document.body.appendChild(elink);
      //       elink.click();
      //       URL.revokeObjectURL(elink.href);
      //       document.body.removeChild(elink);
      //     } else {
      //       navigator.msSaveBlob(blob, fileName);
      //     }
      //   })
      //   .catch(() => {});
    },
    editAppName() {
      //编辑应用名称
      this.editNameDialogVisible = true;
      this.currentAppName = {
        name: this.currentAppInfo.name
      };
    },
    editAppNameClose() {
      this.editNameDialogVisible = false;
    },
    saveEditAppName() {
      this.$api.webAppBuilderApi
        .saveApp(
          {
            id: this.currentAppInfo.id,
            name: this.currentAppName.name,
            scope: this.currentAppInfo.scope,
            appClassify: this.currentAppInfo.appClassify
          },
          {
            loadingText: this.$t("webAppBuilder.BeingSaved"),
            __LOGINTYPE: "dialog"
          }
        )
        .then(() => {
          this.$message({
            message: this.$t("management.succeeded"),
            type: "success"
          });
          this.editNameDialogVisible = false;
          this.selectApp({ C_ID: this.currentAppInfo.id });
        })
        .catch(res => {
          if (res.data.status == 392) {
            this.editNameDialogVisible = false;
          }
        });
    },
    addApp(type) {
      //新建一个应用
      this.addAppInfo = {
        scope: "Private",
        appClassify: "",
        name: "",
        appComments: "",
        configJson: {},
        configXml: "",
        infoQueryJson: {},
        infoQueryXml: "",
        advancedSearchJson: {},
        advancedSearchXml: "",
        overlayAnalysisJson: {},
        overlayAnalysisXml: "",
        searchJson: {},
        searchXml: ""
      };
      if (type) {
        for (var i in this.fieldMapping) {
          this.addAppInfo[i] = this[this.fieldMapping[i]];
        }
        // this.addAppInfo.configJson = this.configJSON;
        // this.addAppInfo.configXml = this.configXml;
        this.addAppDialogTitle = this.$t("webAppBuilder.SaveApp");
      } else {
        // var jsXmlUtil = new x2js();
        this.addAppInfo.configJson = JSON.parse(JSON.stringify(xmlJson));
        // this.addAppInfo.configXml = jsXmlUtil.js2xml(
        //   this.addAppInfo.configJson
        // );
        this.addAppDialogTitle = this.$t("webAppBuilder.NewApp");
      }
      this.addAppDialogVisible = true;
    },
    saveApp() {
      //保存
      if (!this.currentAppInfo.id) {
        this.addApp("save");
        return false;
      }
      var jsXmlUtil = new x2js();
      // this.currentAppInfo.configXml = this.Base64.encode(
      //   jsXmlUtil.js2xml(this.currentAppInfo.configJson)
      // );
      // this.currentAppInfo.configJson = this.Base64.encode(
      //   JSON.stringify(this.currentAppInfo.configJson)
      // );
      for (var i in this.xmlJsonMapping) {
        this.currentAppInfo[this.xmlJsonMapping[i]] = this.Base64.encode(
          jsXmlUtil.js2xml(this.currentAppInfo[i])
        );
        this.currentAppInfo[i] = this.Base64.encode(
          JSON.stringify(this.currentAppInfo[i])
        );
      }
      this.$api.webAppBuilderApi
        .saveApp(this.currentAppInfo, {
          loadingText: this.$t("webAppBuilder.BeingSaved"),
          __LOGINTYPE: "dialog"
        })
        .then(() => {
          this.$message({
            message: this.$t("management.succeeded"),
            type: "success"
          });
          this.updateDataTask();
        })
        .catch(() => {});
    },
    saveAddApp() {
      //保存新增的app
      var jsXmlUtil = new x2js();
      for (var i in this.xmlJsonMapping) {
        this.addAppInfo[this.xmlJsonMapping[i]] = this.Base64.encode(
          jsXmlUtil.js2xml(this.addAppInfo[i])
        );
        this.addAppInfo[i] = this.Base64.encode(
          JSON.stringify(this.addAppInfo[i])
        );
      }
      // this.addAppInfo.configXml = this.Base64.encode(
      //   jsXmlUtil.js2xml(this.addAppInfo.configJson)
      // );
      // this.addAppInfo.configJson = this.Base64.encode(
      //   JSON.stringify(this.addAppInfo.configJson)
      // );
      this.$api.webAppBuilderApi
        .saveApp(this.addAppInfo, {
          loadingText: this.$t("webAppBuilder.BeingSaved"),
          __LOGINTYPE: "dialog"
        })
        .then(res => {
          this.$message({
            message: this.$t("management.succeeded"),
            type: "success"
          });
          var data = res.data.data;
          this.currentAppInfo = data;
          this.closeAddAppDialog();
          this.updateDataTask();
        })
        .catch(() => {});
    },
    getNewAppInfo() {
      this.selectApp({ C_ID: this.currentAppInfo.id });
    },
    selectApp(item) {
      //打开一个应用
      this.$api.webAppBuilderApi
        .selectById(
          {
            appId: item.C_ID
          },
          {
            loadingText: this.$t("service.searching"),
            __LOGINTYPE: "dialog"
          }
        )
        .then(res => {
          var data = res.data.data;
          this.currentAppInfo = data;
          if (data.ywEdit > 0) {
            this.onlyGlanceOver = false;
          } else {
            this.onlyGlanceOver = true;
          }
          this.updateDataTask();
        })
        .catch(res => {
          if (res.data.status == 391) {
            this.$message({
              message: this.$t('myCenter.Nopermissionstoviewthisresourcenow'),
              type: "warning"
            });
          }
        });
    },
    closeAddAppDialog() {
      this.addAppDialogVisible = false;
    },
    preview() {
      //预览
      this.previewStatus = true;
      this.mapAreaStyle =
        "margin-left:0px;position:absolute;top:0;left:0;width: 100%;height: 100%;";
    },
    cancelPreview() {
      this.previewStatus = false;
      this.mapAreaStyle =
        "margin-left:349px;position:relative;width: auto;height:" +
        (this.height - 51) +
        "px;";
    },
    switchStatus() {
      //切换侧边栏状态
      this.asideStatus = !this.asideStatus;
      if (this.asideStatus) {
        this.leftHeaderStyle = "width:348px;";
        this.rightHeaderStyle = "margin-left:349px;";
        this.mapAreaStyle = "margin-left:349px;";
      } else {
        this.leftHeaderStyle = "width:60px;";
        this.rightHeaderStyle = "margin-left:61px;";
        this.mapAreaStyle = "margin-left:61px;";
      }
    },
    changeTheme(item) {
      //主题的修改
      this.configJSON.config.theme._name = item.name;
      this.configJSON.config.theme._color = item.color;
      // this.configJSON.config.controls.control[0]._position="bottomleft";
      this.reload();
    },
    changeWidget(widgetList) {
      //微件的改变
      this.configJSON.config.controls.control = widgetList;
      this.reload();
    },
    changeAttribute(attributeData) {
      //属性的改变
      var data = JSON.parse(JSON.stringify(attributeData.portalattributeinfo));
      var defaultData = JSON.parse(
        JSON.stringify(attributeData.defaultportalattributeinfo)
      );
      var defaultConfigJSON = JSON.parse(JSON.stringify(xmlJson));
      //服务的数据
      if (data._current_service_url) {
        this.configJSON.config.map._current_service_url =
          data._current_service_url;
      } else {
        this.configJSON.config.map._current_service_url = "";
      }
      //自定义可见比例范围
      if (data._min_scale_id || data._min_scale_id == 0) {
        this.configJSON.config.map._min_scale_id = data._min_scale_id;
      } else {
        this.configJSON.config.map._min_scale_id =
          defaultConfigJSON.config.map._min_scale_id;
      }
      //初始坐标范围
      if (data._init_extent_x_min) {
        this.configJSON.config.map._init_extent =
          data._init_extent_x_min +
          " " +
          data._init_extent_y_min +
          " " +
          data._init_extent_x_max +
          " " +
          data._init_extent_y_max;
      } else {
        this.configJSON.config.map._init_extent =
          defaultConfigJSON.config.map._init_extent;
      }
      //全图坐标范围
      if (data._full_extent_x_min) {
        this.configJSON.config.map._full_extent =
          data._full_extent_x_min +
          " " +
          data._full_extent_y_min +
          " " +
          data._full_extent_x_max +
          " " +
          data._full_extent_y_max;
      } else {
        this.configJSON.config.map._full_extent =
          defaultConfigJSON.config.map._full_extent;
      }
      //输出坐标系统
      if (data._proj4) {
        this.configJSON.config.map.projection.proj4 = data._proj4;
      } else {
        this.configJSON.config.map.projection.proj4 =
          defaultConfigJSON.config.map.projection.proj4;
      }
      //prj
      if (data._prj) {
        this.configJSON.config.map.projection.prj = data._prj;
      } else {
        this.configJSON.config.map.projection.prj =
          defaultConfigJSON.config.map.projection.prj;
      }
      //比例尺
      if (data._scales) {
        //比例尺
        var scaleData = JSON.parse(data._scales);
        this.configJSON.config.map.scales.scale = [];
        for (var i = 0; i < scaleData.length; i++) {
          var temp = {
            _id: scaleData[i].id||scaleData[i]._id,
            __text: scaleData[i].scale||scaleData[i].__text
          };
          this.configJSON.config.map.scales.scale.push(
            JSON.parse(JSON.stringify(temp))
          );
        }
      } else {
        this.configJSON.config.map.scales.scale =
          defaultConfigJSON.config.map.scales.scale;
      }
      //中心点
      if (data._origin) {
        this.configJSON.config.map.projection.origin = data._origin;
      } else {
        this.configJSON.config.map.projection.origin =
          defaultConfigJSON.config.map.projection._origin;
      }
      this.configJSON.config.map.portalattributeinfo = JSON.parse(
        JSON.stringify(data)
      );
      this.configJSON.config.map.defaultportalattributeinfo = JSON.parse(
        JSON.stringify(defaultData)
      );
      this.reload();
    },
    saveLayerTree(layerTree) {
      //保存图层树
      var sourceMap = {};
      var sourceList = [];
      traversal(
        layerTree[0].layer,
        "layer",
        function(item, parent, sourceMap) {
          if(item._service_type=='kqmapping'){
          if (item._src_name && !sourceMap[item._src_name]) {
            sourceMap[item._src_name] = {
              _url: item._src_name.replace("/MapServer", ""),
              _name: item._src_name,
              _type: item._service_type,
              _service_id: item._service_id
            };
          }
          }else if(item._service_type=='wms'&&item._service_type_alias=='bigData'){
            var regex = /.*\:\/\/([^\/]*).*/;
            var match = item._src_name.match(regex);
            var http=  item._src_name.substring(0, item._src_name.indexOf("\/")+2);
            if (item._src_name && !sourceMap[item._src_name]) {
              sourceMap[item._src_name] = {
                _url: `${http}${match[1]}/kqcloudserver/wms?`,
                _name: item._src_name,
                _type: item._service_type,
                _service_id: item._service_id
              };
            }
          }else{
            if (item._src_name && !sourceMap[item._src_name]) {
            sourceMap[item._src_name] = {
              _url: item._src_name,
              _name: item._src_name,
              _type: item._service_type,
              _service_id: item._service_id
            };
          }
          }
        },
        null,
        sourceMap
      );
      // var getSource = (list, loop) => {
      //   loop = loop + 1;
      //   if (loop > 50) {
      //     return false;
      //   }
      //   for (var j = 0; j < list.length; j++) {
      //     var data = list[j];
      //     if (!sourceMap[data._src_name]&&data._src_name) {
      //       sourceMap[data._src_name] = {
      //         _url: data._src_name.replace("/MapServer", ""),
      //         _name: data._src_name,
      //         _type: data._service_type,
      //         _service_id: data._service_id
      //       };
      //     }
      //     if (data.layer && data.layer.length > 0) {
      //       for (var i = 0; i < data.layer.length; i++) {
      //         if (!sourceMap[data.layer[i]._src_name]&&data._src_name) {
      //           sourceMap[data.layer[i]._src_name] = {
      //             _url: data.layer[i]._src_name.replace("/MapServer", ""),
      //             _name: data.layer[i]._src_name,
      //             _type: data.layer[i]._service_type,
      //             _service_id: data.layer[i]._service_id
      //           };
      //         }
      //         if (data.layer[i].layer && data.layer[i].layer.length > 0) {
      //           getSource(data.layer[i].layer, loop);
      //         }
      //       }
      //     }
      //   }
      // };
      // getSource(layerTree[0].layer);

      this.configJSON.config.tree.layers = {};
      this.configJSON.config.tree.layers.layer = layerTree[0].layer;
      this.configJSON.config.tree._label = layerTree[0]._label;
      for (var key in sourceMap) {
        sourceList.push(sourceMap[key]);
      }
      this.configJSON.config.tree.sources = {};
      this.configJSON.config.tree.sources.source = sourceList;
      if (sourceList.length == 0) {
        var defaultConfigJSON = JSON.parse(JSON.stringify(xmlJson));
        this.configJSON.config.map = defaultConfigJSON.config.map;
      }
      if (
        sourceList.length > 0 &&
        !this.configJSON.config.map._current_service_url
      ) {
        this.getServiceDetails(sourceList[0]._service_id);
      } else {
        this.reload();
      }
    },
    getServiceDetails(id) {
      this.$api.webAppBuilderApi
        .getServiceDetails(
          {
            serviceId: id
          },
          {
            loadingText: this.$t("service.searching"),
            __LOGINTYPE: "dialog"
          }
        )
        .then(res => {
          try {
            var data = res.data.data[0];
            var serviceDetailsInfo = {};
            serviceDetailsInfo._service_id = data.C_ID;
            serviceDetailsInfo._min_scale_id = this.configJSON.config.map._min_scale_id;
            serviceDetailsInfo._current_service_url = data.C_SERVICE_URL;
            this.configJSON.config.map._current_service_url =
              data.C_SERVICE_URL;
              if(data.C_SERVICE_TYPE=='kqmapping'){
            if (data.C_SERVICE_INITIAL) {
              //初始坐标
              this.configJSON.config.map._init_extent = "";
              var initArr = data.C_SERVICE_INITIAL.split(",");
              for (var i = 0; i < initArr.length; i++) {
                if (i == 0) {
                  serviceDetailsInfo._init_extent_x_min = initArr[i];
                }
                if (i == 1) {
                  serviceDetailsInfo._init_extent_y_min = initArr[i];
                }
                if (i == 2) {
                  serviceDetailsInfo._init_extent_x_max = initArr[i];
                }
                if (i == 3) {
                  serviceDetailsInfo._init_extent_y_max = initArr[i];
                }
                //更新配置
                if (!this.configJSON.config.map._init_extent) {
                  this.configJSON.config.map._init_extent =
                    this.configJSON.config.map._init_extent + initArr[i];
                } else {
                  this.configJSON.config.map._init_extent =
                    this.configJSON.config.map._init_extent + " " + initArr[i];
                }
              }
            }
            if (data.C_SERVICE_FULL) {
              //全图坐标
              this.configJSON.config.map._full_extent = "";
              var fullArr = data.C_SERVICE_FULL.split(",");
              // eslint-disable-next-line
              for (var i = 0; i < fullArr.length; i++) {
                if (i == 0) {
                  serviceDetailsInfo._full_extent_x_min = fullArr[i];
                }
                if (i == 1) {
                  serviceDetailsInfo._full_extent_y_min = fullArr[i];
                }
                if (i == 2) {
                  serviceDetailsInfo._full_extent_x_max = fullArr[i];
                }
                if (i == 3) {
                  serviceDetailsInfo._full_extent_y_max = fullArr[i];
                }
                //更新配置
                if (!this.configJSON.config.map._full_extent) {
                  this.configJSON.config.map._full_extent =
                    this.configJSON.config.map._full_extent + fullArr[i];
                } else {
                  this.configJSON.config.map._full_extent =
                    this.configJSON.config.map._full_extent + " " + fullArr[i];
                }
              }
            }
            //有初始坐标，没有全图坐标
            if (data.C_SERVICE_INITIAL && !data.C_SERVICE_FULL) {
              serviceDetailsInfo._full_extent_x_min =
                serviceDetailsInfo._init_extent_x_min;
              serviceDetailsInfo._full_extent_y_min =
                serviceDetailsInfo._init_extent_y_min;
              serviceDetailsInfo._full_extent_x_max =
                serviceDetailsInfo._init_extent_x_max;
              serviceDetailsInfo._full_extent_y_max =
                serviceDetailsInfo._init_extent_y_max;
              this.configJSON.config.map._full_extent =
                serviceDetailsInfo._full_extent_x_min +
                " " +
                serviceDetailsInfo._full_extent_y_min +
                " " +
                serviceDetailsInfo._full_extent_x_max +
                " " +
                serviceDetailsInfo._full_extent_y_max;
            }
            //有全图坐标，没有初始坐标
            if (!data.C_SERVICE_INITIAL && data.C_SERVICE_FULL) {
              serviceDetailsInfo._init_extent_x_min =
                serviceDetailsInfo._full_extent_x_min;
              serviceDetailsInfo._init_extent_y_min =
                serviceDetailsInfo._full_extent_y_min;
              serviceDetailsInfo._init_extent_x_max =
                serviceDetailsInfo._full_extent_x_max;
              serviceDetailsInfo._init_extent_y_max =
                serviceDetailsInfo._full_extent_y_max;
              //更新配置
              this.configJSON.config.map._init_extent =
                serviceDetailsInfo._init_extent_x_min +
                " " +
                serviceDetailsInfo._init_extent_y_min +
                " " +
                serviceDetailsInfo._init_extent_x_max +
                " " +
                serviceDetailsInfo._init_extent_y_max;
            }
            if (data.C_SERVICE_PROJFOUR) {
              //输出坐标系统
              serviceDetailsInfo._proj4 = data.C_SERVICE_PROJFOUR;
              //更新配置
              this.configJSON.config.map.projection.proj4 =
                data.C_SERVICE_PROJFOUR;
            }
            if (data.C_SERVICE_SCALES) {
              //比例尺
              serviceDetailsInfo._scales = data.C_SERVICE_SCALES;
              //更新配置
              var scaleData = JSON.parse(data.C_SERVICE_SCALES);
              this.configJSON.config.map.scales.scale = [];
              // eslint-disable-next-line
              for (var i = 0; i < scaleData.length; i++) {
                var temp = {
                  _id: scaleData[i].id,
                  __text: scaleData[i].scale
                };
                this.configJSON.config.map.scales.scale.push(
                  JSON.parse(JSON.stringify(temp))
                );
              }
            }
            if (data.C_SERVICE_ORIGIN) {
              //中心点
              var origin = JSON.parse(data.C_SERVICE_ORIGIN);
              serviceDetailsInfo._origin = {};
              serviceDetailsInfo._origin._x = origin.x;
              serviceDetailsInfo._origin._y = origin.y;
              //更新配置
              this.configJSON.config.map.projection.origin._x = origin.x;
              this.configJSON.config.map.projection.origin._y = origin.y;
            }
            if (data.C_SERVICE_PRJ) {
              //prj
              serviceDetailsInfo._prj = data.C_SERVICE_PRJ;
              //更新配置
              this.configJSON.config.map.projection.prj = data.C_SERVICE_PRJ;
            }
            this.configJSON.config.map.portalattributeinfo = JSON.parse(
              JSON.stringify(serviceDetailsInfo)
            );
            this.configJSON.config.map.defaultportalattributeinfo = JSON.parse(
              JSON.stringify(serviceDetailsInfo)
            );
            }
            this.reload();
          } catch (e) {
            console.error(e);
          }
        })
        .catch(() => {});
    },
    directUpdateConfig() {
      var jsXmlUtil = new x2js();
      this.infoQueryConfigXML = jsXmlUtil.js2xml(this.infoQueryConfigJSON);
      this.advancedSearchConfigXML = jsXmlUtil.js2xml(
        this.advancedSearchConfigJSON
      );
      this.overlayAnalysisConfigXML = jsXmlUtil.js2xml(
        this.overlayAnalysisConfigJSON
      );
      this.searchBarConfigXML = jsXmlUtil.js2xml(this.searchBarConfigJSON);
      // console.log("infoQueryConfigXML配置",this.infoQueryConfigXML,"\n",
      // "advancedSearchConfigXML配置",this.advancedSearchConfigXML,"\n",
      // "overlayAnalysisConfigXML配置",this.overlayAnalysisConfigXML,"\n",
      // "searchBarConfigXML配置",this.searchBarConfigXML
      // )
      this.reload();
    },
    updateDataTask() {
      //数据更新
      var jsXmlUtil = new x2js();
      if (!this.currentAppInfo.configJson) {
        this.currentAppInfo.configJson = xmlJson;
        this.currentAppInfo.configXml = jsXmlUtil.js2xml(xmlJson);
        this.currentAppInfo.infoQueryJson = {};
        this.currentAppInfo.infoQueryXml = "";
        this.currentAppInfo.advancedSearchJson = {};
        this.currentAppInfo.advancedSearchXml = "";
        this.currentAppInfo.overlayAnalysisJson = {};
        this.currentAppInfo.overlayAnalysisXml = "";
        this.currentAppInfo.searchJson = {};
        this.currentAppInfo.searchXml = "";
      } else {
        if (!this.currentAppInfo.infoQueryJson) {
          this.currentAppInfo.infoQueryJson = {};
        } else {
          this.currentAppInfo.infoQueryJson = JSON.parse(
            this.Base64.decode(this.currentAppInfo.infoQueryJson)
          );
        }
        if (!this.currentAppInfo.advancedSearchJson) {
          this.currentAppInfo.advancedSearchJson = {};
        } else {
          this.currentAppInfo.advancedSearchJson = JSON.parse(
            this.Base64.decode(this.currentAppInfo.advancedSearchJson)
          );
        }
        if (!this.currentAppInfo.overlayAnalysisJson) {
          this.currentAppInfo.overlayAnalysisJson = {};
        } else {
          this.currentAppInfo.overlayAnalysisJson = JSON.parse(
            this.Base64.decode(this.currentAppInfo.overlayAnalysisJson)
          );
        }
        if (!this.currentAppInfo.searchJson) {
          this.currentAppInfo.searchJson = {};
        } else {
          this.currentAppInfo.searchJson = JSON.parse(
            this.Base64.decode(this.currentAppInfo.searchJson)
          );
        }
        this.currentAppInfo.configJson = JSON.parse(
          this.Base64.decode(this.currentAppInfo.configJson)
        );
        this.currentAppInfo.configXml = jsXmlUtil.js2xml(
          this.currentAppInfo.configJson
        );
        this.currentAppInfo.infoQueryXml = jsXmlUtil.js2xml(
          this.currentAppInfo.infoQueryJson
        );
        this.currentAppInfo.advancedSearchXml = jsXmlUtil.js2xml(
          this.currentAppInfo.advancedSearchJson
        );
        this.currentAppInfo.overlayAnalysisXml = jsXmlUtil.js2xml(
          this.currentAppInfo.overlayAnalysisJson
        );
        this.currentAppInfo.searchXml = jsXmlUtil.js2xml(
          this.currentAppInfo.searchJson
        );
      }
      for (var i in this.fieldMapping) {
        this[this.fieldMapping[i]] = this.currentAppInfo[i];
      }

      // this.configXML = this.currentAppInfo.configXml;
      // this.configJSON = this.currentAppInfo.configJson;
      // this.copyConfigJSON = JSON.parse(JSON.stringify(this.configJSON));
      for (var j in this.copyFieldMapping) {
        this[this.copyFieldMapping[j]] = JSON.parse(JSON.stringify(this[j]));
      }
      this.updateDataTimeStamp = new Date();
      this.reload();
    },
    reload() {
      //重新加载
      var jsXmlUtil = new x2js();
      this.configXML = jsXmlUtil.js2xml(this.configJSON);
      // console.log("我的配置",this.configXML);
      this.reloadTimeStamp = new Date();
    }
  },
  data() {
    return {
      height: 700,
      asideStatus: true, //侧边栏状态，true表示打开，false表示关闭
      leftHeaderStyle: "width:348px;",
      rightHeaderStyle: "margin-left:349px;",
      mapAreaStyle: "margin-left:349px;",
      reloadTimeStamp: 0, //重新加载
      updateDataTimeStamp: 0, //数据更新
      addAppDialogVisible: false,
      addAppDialogTitle: this.$t("webAppBuilder.NewApp"),
      previewStatus: false,
      currentAppInfo: {}, //当前的应用信息
      currentAppInfoCopy: {},
      addAppInfo: {}, //新增应用信息
      onlyGlanceOver: false,
      shareDialogVisible: false, //共享设置
      sharingId: "", //共享Id
      sharingOldData: null, //共享备份数据
      configJSON: {}, //配置JSON
      copyConfigJSON: {}, //备份信息
      configXML: "", //配置XML
      infoQueryConfigJSON: {}, //属性查询JSON
      copyInfoQueryConfigJSON: {}, //备份属性查询JSON
      infoQueryConfigXML: "", //属性查询XML
      advancedSearchConfigJSON: {}, //高级查询JSON
      copyAdvancedSearchConfigJSON: {}, //备份高级查询JSON
      advancedSearchConfigXML: "", //高级查询XML
      overlayAnalysisConfigJSON: {}, //叠置分析JSON
      copyOverlayAnalysisConfigJSON: {}, //备份叠置分析JSON
      overlayAnalysisConfigXML: "", //叠置分析XML
      searchBarConfigJSON: {}, //搜索栏JSON
      copySearchBarConfigJSON: {}, //备份搜索栏JSON
      searchBarConfigXML: "", //搜索栏XML
      editNameDialogVisible: false, //编辑应用名称弹窗
      currentAppName: {}, //当前应用名称
      fieldMapping: {
        advancedSearchJson: "advancedSearchConfigJSON",
        advancedSearchXml: "advancedSearchConfigXML",
        configJson: "configJSON",
        configXml: "configXML",
        infoQueryJson: "infoQueryConfigJSON",
        infoQueryXml: "infoQueryConfigXML",
        overlayAnalysisJson: "overlayAnalysisConfigJSON",
        overlayAnalysisXml: "overlayAnalysisConfigXML",
        searchJson: "searchBarConfigJSON",
        searchXml: "searchBarConfigXML"
      }, //字段映射
      xmlJsonMapping: {
        configJson: "configXml",
        infoQueryJson: "infoQueryXml",
        overlayAnalysisJson: "overlayAnalysisXml",
        searchJson: "searchXml",
        advancedSearchJson: "advancedSearchXml"
      }, //xml和json的映射
      copyFieldMapping: {
        configJSON: "copyConfigJSON",
        infoQueryConfigJSON: "copyInfoQueryConfigJSON",
        advancedSearchConfigJSON: "copyAdvancedSearchConfigJSON",
        overlayAnalysisConfigJSON: "copyOverlayAnalysisConfigJSON",
        searchBarConfigJSON: "copySearchBarConfigJSON"
      } //备份字段映射
    };
  },
  created() {
    var height =
      document.documentElement.clientHeight ||
      document.body.clientHeight ||
      700;
    this.height = height;
    //创建样式表
    var appStyle = document.createElement("link");
    appStyle.setAttribute("rel", "stylesheet");
    appStyle.setAttribute("type", "text/css");
    // eslint-disable-next-line
    appStyle.setAttribute("href", portal_config.WEB_APP_BUILDER_STYLE);
    document.head.appendChild(appStyle);
    //数据初始化
    var copyXmlJson = JSON.parse(JSON.stringify(xmlJson));
    var jsXmlUtil = new x2js();
    this.configXML = jsXmlUtil.js2xml(copyXmlJson);
    this.configJSON = copyXmlJson;
    this.copyConfigJSON = JSON.parse(JSON.stringify(copyXmlJson));
    if (this.$route.query && this.$route.query.id) {
      this.preview();
    }
    //x2jsone.js2xml(testJson);
    //jsXmlUtil.xml2js(con)
  },
  mounted() {
    if (this.$route.query && this.$route.query.id) {
      this.preview();
      this.selectApp({ C_ID: this.$route.query.id });     
    } else {
      this.reload();
    }
    // if (this.$route.query && this.$route.query.id) {
    //   this.preview();
    //   this.selectApp({ C_ID: this.$route.query.id });     
    // } else {
    //   this.reload();
    // }
    // window.onbeforeunload=(e)=>{
    //   var e = window.event||e;
    //   var currentJson=JSON.stringify(this.configJSON);
    //   var copyJson=JSON.stringify(this.copyConfigJSON);
    //   if(currentJson!=copyJson){
    //     e.returnValue=("操作尚未保存，确定离开当前页面吗？");
    //   }
    // }
  }
};
</script>

<style lang='scss' scoped>
.left-header {
  float: left;
  border-right: 1px solid #525a68;
}
.left-tab {
  float: left;
}
</style>