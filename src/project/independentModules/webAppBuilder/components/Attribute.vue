<template>
  <div>
    <el-form :rules="rules" :model="attributeInfo" ref="attributeForm">
      <div class="area">
        <div class="title app-aside-border-bottom">
          <div
            class="title-font app-aside-title-font-color app-aside-title-icon"
          >{{$t('webAppBuilder.InformationSettings')}}</div>
          <i class="el-icon-portal-baocun save-btn" @click="save"></i>
        </div>
        <div class="content info">
          <p class="app-aside-normal-font-color desc-font">{{$t('webAppBuilder.SetRange')}}</p>
          <el-select
            v-model="attributeInfo._service_id"
            :placeholder="$t('webAppBuilder.Service')"
            @change="serviceChange"
            :popper-class="'app-builer-select'"
          >
            <el-option
              v-for="item in serviceList"
              :key="item._service_id"
              :label="item._service_name"
              :value="item._service_id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="area">
        <div class="title app-aside-border-bottom">
          <div
            class="title-font app-aside-title-font-color app-aside-title-icon"
          >{{$t('webAppBuilder.CustomizeVisibleScaleRange')}}</div>
        </div>
        <div class="content">
          <el-row>
            <el-col :span="11" class="slider-compatible">
              <span
                class="app-aside-normal-font-color form-font sf-font"
              >{{$t('webAppBuilder.BeginToZoomTheScale')}}</span>
            </el-col>
            <el-col :span="11">
              <el-slider :min="0" :max="8" :step="1" v-model="attributeInfo._min_scale_id"></el-slider>
            </el-col>
            <el-col :span="2" class="slider-font-compatible">
              <span class="app-aside-normal-font-color slider-font">{{attributeInfo._min_scale_id}}</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="area">
        <div class="title app-aside-border-bottom">
          <div
            class="title-font app-aside-title-font-color app-aside-title-icon"
          >{{$t('webAppBuilder.InitialCoordinateRange')}}</div>
          <el-button
            type="primary"
            class="app-builder-btn default-compatible-btn"
            @click="defaultInit"
          >{{$t('webAppBuilder.UseDefaultCoordinateRange')}}</el-button>
        </div>
        <div class="content">
          <el-row :gutter="10">
            <el-col :span="12">
              <p class="coordinate-font app-aside-normal-font-color">Xmin：</p>
              <el-form-item prop="_init_extent_x_min">
                <el-input
                  v-model="attributeInfo._init_extent_x_min"
                  class="coordinate-input"
                  :placeholder="$t('webAppBuilder.EnterMinXCoordinate')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <p class="coordinate-font app-aside-normal-font-color">Ymin：</p>
              <el-form-item prop="_init_extent_y_min">
                <el-input
                  v-model="attributeInfo._init_extent_y_min"
                  class="coordinate-input"
                  :placeholder="$t('webAppBuilder.EnterMinYCoordinate')"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <p class="coordinate-font app-aside-normal-font-color">Xmax：</p>
              <el-form-item prop="_init_extent_x_max">
                <el-input
                  v-model="attributeInfo._init_extent_x_max"
                  class="coordinate-input"
                  :placeholder="$t('webAppBuilder.EnterMaxXCoordinate')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <p class="coordinate-font app-aside-normal-font-color">Ymax：</p>
              <el-form-item prop="_init_extent_y_max">
                <el-input
                  v-model="attributeInfo._init_extent_y_max"
                  class="coordinate-input"
                  :placeholder="$t('webAppBuilder.EnterMaxYCoordinate')"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="area" style="padding-top:0;">
        <div class="title app-aside-border-bottom">
          <div
            class="title-font app-aside-title-font-color app-aside-title-icon"
          >{{$t('webAppBuilder.FullextentCoordinateRange')}}</div>
          <el-button
            type="primary"
            class="app-builder-btn default-compatible-btn"
            @click="defaultFull"
          >{{$t('webAppBuilder.UseDefaultCoordinateRange')}}</el-button>
        </div>
        <div class="content">
          <el-row :gutter="10">
            <el-col :span="12">
              <p class="coordinate-font app-aside-normal-font-color">Xmin：</p>
              <el-form-item prop="_full_extent_x_min">
                <el-input
                  v-model="attributeInfo._full_extent_x_min"
                  class="coordinate-input"
                  :placeholder="$t('webAppBuilder.EnterMinXCoordinate')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <p class="coordinate-font app-aside-normal-font-color">Ymin：</p>
              <el-form-item prop="_full_extent_y_min">
                <el-input
                  v-model="attributeInfo._full_extent_y_min"
                  class="coordinate-input"
                  :placeholder="$t('webAppBuilder.EnterMinYCoordinate')"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <p class="coordinate-font app-aside-normal-font-color">Xmax：</p>
              <el-form-item prop="_full_extent_x_max">
                <el-input
                  v-model="attributeInfo._full_extent_x_max"
                  class="coordinate-input"
                  :placeholder="$t('webAppBuilder.EnterMaxXCoordinate')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <p class="coordinate-font app-aside-normal-font-color">Ymax：</p>
              <el-form-item prop="_full_extent_y_max">
                <el-input
                  v-model="attributeInfo._full_extent_y_max"
                  class="coordinate-input"
                  :placeholder="$t('webAppBuilder.EnterMaxYCoordinate')"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="area bottom">
        <div class="title app-aside-border-bottom">
          <div
            class="title-font app-aside-title-font-color app-aside-title-icon"
          >{{$t('webAppBuilder.OutputCoordinateSystem')}}</div>
        </div>
        <div class="content">
          <el-input v-model="attributeInfo._proj4" type="textarea" :rows="2" :disabled="true"></el-input>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { traversal } from "@/utils/traversal.js";
import epsgJson from "../config/epsg.js";
export default {
  name: "Attribute",
  components: {},
  props: {
    configJSON: {
      type: Object,
      default: () => {
        return {};
      }
    },
    updateDataTimeStamp: {
      default: 0
    },
    activeName: {
      type: String,
      default: ""
    }
  },
  watch: {
    updateDataTimeStamp() {
      this.getServiceList();
    },
    activeName() {
      if (this.activeName == "attribute") {
        this.getServiceList();
      }
    }
  },
  data() {
    var checkCoordinate = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        // eslint-disable-next-line
        var pattern = /^(\-)?\d+(\.\d+)?$/;
        if (!pattern.test(value)) {
          return callback(
            new Error(this.$t("webAppBuilder.PleaseEnterCorrectCoordinates"))
          );
        } else {
          callback();
        }
      }
    };
    return {
      serviceList: [],
      attributeInfo: {},
      currentServiceDetails: {},
      rules: {
        _init_extent_x_min: [
          {
            required: false,
            validator: checkCoordinate,
            trigger: "blur"
          }
        ],
        _init_extent_y_min: [
          {
            required: false,
            validator: checkCoordinate,
            trigger: "blur"
          }
        ],
        _init_extent_x_max: [
          {
            required: false,
            validator: checkCoordinate,
            trigger: "blur"
          }
        ],
        _init_extent_y_max: [
          {
            required: false,
            validator: checkCoordinate,
            trigger: "blur"
          }
        ],
        _full_extent_x_min: [
          {
            required: false,
            validator: checkCoordinate,
            trigger: "blur"
          }
        ],
        _full_extent_y_min: [
          {
            required: false,
            validator: checkCoordinate,
            trigger: "blur"
          }
        ],
        _full_extent_x_max: [
          {
            required: false,
            validator: checkCoordinate,
            trigger: "blur"
          }
        ],
        _full_extent_y_max: [
          {
            required: false,
            validator: checkCoordinate,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    getServiceList() {
      //服务列表
      this.serviceList = [];
      this.attributeInfo = {};
      this.currentServiceDetails = {};
      if (this.configJSON.config.tree.layers) {
        var data = this.configJSON.config.tree.layers.layer;
        var common = {};
        traversal(data, "layer", item => {
          var temp = {
            _service_id: item._service_id,
            _service_name: item._service_name,
            _service_type:item._service_type,
            _src_name:item._src_name,
            _service_type_alias:item._service_type_alias||null
          };
          if (!common[item._src_name]) {
            common[item._src_name] = temp;
          }
        });
        for (var key in common) {
          this.serviceList.push(common[key]);
        }
      }
      //默认属性
      if (this.configJSON.config.map.defaultportalattributeinfo) {
        this.currentServiceDetails = this.configJSON.config.map.defaultportalattributeinfo;
      }
      //当前的服务
      if (this.configJSON.config.map.portalattributeinfo) {
        this.attributeInfo = JSON.parse(
          JSON.stringify(this.configJSON.config.map.portalattributeinfo)
        );
      }
      //特殊处理
      if (this.attributeInfo._min_scale_id) {
        this.attributeInfo._min_scale_id = Number(
          this.attributeInfo._min_scale_id
        );
      }
    },
    selectService(row) {
      //查询图层详情
      var urlLayer='';
      var serviceType='';
      if(row._service_type_alias == "bigData"){
        var regex = /.*\:\/\/([^\/]*).*/;
        var match = row._src_name.match(regex);
        var http=  row._src_name.substring(0, row._src_name.indexOf("\/")+2);
        var index=row._src_name.lastIndexOf("\=");
        var layerId=row._src_name.substring(index+1,row._src_name.length);
        urlLayer=`${http}${match[1]}/bigdata/api/catalog/layer/metainfo?layerId=${layerId}`
        serviceType=row._service_type_alias;
      }else{
        urlLayer=row._src_name;
        serviceType=row._service_type;
      }
      this.$api.webAppBuilderApi
        .getLayers(
          {
            url: urlLayer,
            serviceType: serviceType
          },
          {
            loadingText: this.$t("service.searching"),
            __LOGINTYPE: "dialog"
          }
        )
        .then(res => {
          var dataStr = res.data.data;
          if (typeof dataStr === "string") {
            var data = JSON.parse(dataStr);
              if (row._service_type == "wmts") {
                var wmts_Capabilities={};
                if (data.Capabilities.Contents.Layer instanceof Array) {
                  wmts_Capabilities=data.Capabilities.Contents.Layer[0];
                }else{
                  wmts_Capabilities=data.Capabilities.Contents.Layer;
                }
                //  具体比例尺
                //初始坐标
                this.configJSON.config.map._init_extent = "";
                var initArrmin = wmts_Capabilities[
                  "ows:WGS84BoundingBox"
                ]["ows:LowerCorner"].split(" ");
                var initArrmax = wmts_Capabilities[
                  "ows:WGS84BoundingBox"
                ]["ows:UpperCorner"].split(" ");
                var serviceDetailsInfo = {};
                serviceDetailsInfo._init_extent_x_min = initArrmin[0];
                serviceDetailsInfo._init_extent_y_min = initArrmin[1];
                serviceDetailsInfo._init_extent_x_max = initArrmax[0];
                serviceDetailsInfo._init_extent_y_max = initArrmax[1];
                //全图坐标
                // eslint-disable-next-line
                serviceDetailsInfo._full_extent_x_min = initArrmin[0];
                serviceDetailsInfo._full_extent_y_min = initArrmin[1];
                serviceDetailsInfo._full_extent_x_max = initArrmax[0];
                serviceDetailsInfo._full_extent_y_max = initArrmax[1];
                  // 中心点
              var origins = data.Capabilities.Contents.TileMatrixSet[0].TileMatrix[0].TopLeftCorner.split(" ");
              serviceDetailsInfo._origin = {};
              serviceDetailsInfo._origin._x = origins[1];
              serviceDetailsInfo._origin._y = origins[0];
              // // bound
              serviceDetailsInfo._bound = `${initArrmin[0]} ${initArrmin[1]} ${initArrmax[0]} ${initArrmax[1]}`;
                //比例尺
                //更新配置
                var scaleData =
                  data.Capabilities.Contents.TileMatrixSet[0].TileMatrix;
                this.configJSON.config.map.scales.scale = [];
                // eslint-disable-next-line
                for (var i = 0; i < scaleData.length; i++) {
                  var temp = {
                    _id: scaleData[i]["ows:Identifier"],
                    __text:(1/(scaleData[i].ScaleDenominator/0.9449404761904766)).toFixed(28)
                  };
                  this.configJSON.config.map.scales.scale.push(
                    JSON.parse(JSON.stringify(temp))
                  );
                }
                serviceDetailsInfo._scales = JSON.stringify(this.configJSON.config.map.scales.scale);
                // prj
                var prjs =data.Capabilities.Contents.TileMatrixSet[0]['ows:SupportedCRS'];
                var index=prjs.substring(prjs.lastIndexOf("EPSG::")+6,prjs.length);
                serviceDetailsInfo._prj =JSON.parse(JSON.stringify(epsgJson)).EPSG[index].prj;
                //   //输出坐标系统
                serviceDetailsInfo._proj4 =JSON.parse(JSON.stringify(epsgJson)).EPSG[index].proj4;
              }else if(row._service_type == "wms"&&row._service_type_alias=='bigData'){
                var bigData_Capabiliti={};
                if (data.content.layers instanceof Array) {
                  bigData_Capabiliti=data.content.layers[0];
                }else{
                  bigData_Capabiliti=data.content.layers;
                }
                  //  具体比例尺
                //初始坐标
                var serviceDetailsInfo = {};
                serviceDetailsInfo._init_extent_x_min = bigData_Capabiliti.bbox.minX;
                serviceDetailsInfo._init_extent_y_min = bigData_Capabiliti.bbox.minY;
                serviceDetailsInfo._init_extent_x_max = bigData_Capabiliti.bbox.maxX;
                serviceDetailsInfo._init_extent_y_max = bigData_Capabiliti.bbox.maxY;
                //全图坐标
                // eslint-disable-next-line
                serviceDetailsInfo._full_extent_x_min = bigData_Capabiliti.bbox.minX;
                serviceDetailsInfo._full_extent_y_min = bigData_Capabiliti.bbox.minY;
                serviceDetailsInfo._full_extent_x_max = bigData_Capabiliti.bbox.maxX;
                serviceDetailsInfo._full_extent_y_max = bigData_Capabiliti.bbox.maxY;
                 // prj
                var bigDataprjs =bigData_Capabiliti.crs;
                var index=bigDataprjs.substring(bigDataprjs.lastIndexOf("EPSG:")+5,bigDataprjs.length);
                serviceDetailsInfo._prj =`EPSG:${JSON.parse(JSON.stringify(epsgJson)).EPSG[index].prj}`;
                //   //输出坐标系统
                serviceDetailsInfo._proj4 =JSON.parse(JSON.stringify(epsgJson)).EPSG[index].proj4;
                serviceDetailsInfo._scales = JSON.stringify(this.configJSON.config.map.scales.scale);
                if(JSON.parse(JSON.stringify(epsgJson)).EPSG[index].longitudeLatitude){
                  serviceDetailsInfo._origin = {};
                  serviceDetailsInfo._origin._x = 180;
                  serviceDetailsInfo._origin._y = -90;
                }
              }else{
                var wms_Capabiliti={};
                if (data["WMS_Capabilities"].Capability.Layer.Layer instanceof Array) {
                  wms_Capabiliti=data["WMS_Capabilities"].Capability.Layer.Layer[0];
                }else{
                  wms_Capabiliti=data["WMS_Capabilities"].Capability.Layer.Layer;
                }
                  //  具体比例尺
                //初始坐标
                var serviceDetailsInfo = {};
                serviceDetailsInfo._init_extent_x_min = wms_Capabiliti.EX_GeographicBoundingBox.westBoundLongitude;
                serviceDetailsInfo._init_extent_y_min = wms_Capabiliti.EX_GeographicBoundingBox.southBoundLatitude;
                serviceDetailsInfo._init_extent_x_max = wms_Capabiliti.EX_GeographicBoundingBox.eastBoundLongitude;
                serviceDetailsInfo._init_extent_y_max = wms_Capabiliti.EX_GeographicBoundingBox.northBoundLatitude;
                //全图坐标
                // eslint-disable-next-line
                serviceDetailsInfo._full_extent_x_min = wms_Capabiliti.EX_GeographicBoundingBox.westBoundLongitude;
                serviceDetailsInfo._full_extent_y_min = wms_Capabiliti.EX_GeographicBoundingBox.southBoundLatitude;
                serviceDetailsInfo._full_extent_x_max = wms_Capabiliti.EX_GeographicBoundingBox.eastBoundLongitude;
                serviceDetailsInfo._full_extent_y_max = wms_Capabiliti.EX_GeographicBoundingBox.northBoundLatitude;
                 // prj
                var wmsprjs =wms_Capabiliti.CRS;
                var index=wmsprjs.substring(wmsprjs.lastIndexOf("EPSG:")+5,wmsprjs.length);
                serviceDetailsInfo._prj =JSON.parse(JSON.stringify(epsgJson)).EPSG[index].prj;
                //   //输出坐标系统
                serviceDetailsInfo._proj4 =JSON.parse(JSON.stringify(epsgJson)).EPSG[index].proj4;
                serviceDetailsInfo._scales = JSON.stringify(this.configJSON.config.map.scales.scale);
              }
              serviceDetailsInfo._service_id=row._service_id;
              this.currentServiceDetails = JSON.parse(
                JSON.stringify(serviceDetailsInfo)
              );
            this.attributeInfo = JSON.parse(JSON.stringify(serviceDetailsInfo));
          }
          
        })
        .catch(() => {});
    },
    serviceChange(row) {
        this.serviceList.forEach(item=>{
        if(item._service_id==row){
          if (item._service_type == "kqmapping") {
            this.getServiceDetails(row);
          }else{
            this.selectService(item);
          }
        }
      })
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
          var data = res.data.data[0];
          var serviceDetailsInfo = {};
          serviceDetailsInfo._service_id = data.C_ID;
          serviceDetailsInfo._current_service_url = data.C_SERVICE_URL;
          if(data.C_SERVICE_TYPE=='kqmapping'){
          if (data.C_SERVICE_INITIAL) {
            //初始坐标
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
            }
          }
          if (data.C_SERVICE_FULL) {
            //全图坐标
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
          }
          if (data.C_SERVICE_PROJFOUR) {
            //输出坐标系统
            serviceDetailsInfo._proj4 = data.C_SERVICE_PROJFOUR;
          }
          if (data.C_SERVICE_SCALES) {
            //比例尺
            serviceDetailsInfo._scales = data.C_SERVICE_SCALES;
          }
          if (data.C_SERVICE_ORIGIN) {
            //中心点
            var origin = JSON.parse(data.C_SERVICE_ORIGIN);
            serviceDetailsInfo._origin = {};
            serviceDetailsInfo._origin._x = origin.x;
            serviceDetailsInfo._origin._y = origin.y;
          }
          if (data.C_SERVICE_PRJ) {
            //prj
            serviceDetailsInfo._prj = data.C_SERVICE_PRJ;
          }
          //缩放
          serviceDetailsInfo._min_scale_id = this.configJSON.config.map._min_scale_id;
          //特殊处理
          if (serviceDetailsInfo._min_scale_id) {
            serviceDetailsInfo._min_scale_id = Number(
              serviceDetailsInfo._min_scale_id
            );
          }
          this.currentServiceDetails = JSON.parse(
            JSON.stringify(serviceDetailsInfo)
          );
          this.attributeInfo = JSON.parse(JSON.stringify(serviceDetailsInfo));
           }
        })
        .catch(() => {});
    },
    save() {
      this.$refs.attributeForm.validate(valid => {
        if (valid) {
          if (!this.attributeInfo._service_id) {
            this.$message({
              message: this.$t("webAppBuilder.NoServiceIsSelected"),
              type: "warning"
            });
            return false;
          }
          //效验是否写齐坐标
          //初始坐标
          var fields = [
            "_init_extent_x_min",
            "_init_extent_y_min",
            "_init_extent_x_max",
            "_init_extent_y_max"
          ];
          var count = 0;
          var i = 0;
          for (i = 0; i < fields.length; i++) {
            if (this.attributeInfo[fields[i]]) {
              count = count + 1;
            }
          }
          if (count != 0 && count != 4) {
            this.$message({
              message: this.$t("webAppBuilder.CompleteInitialCoordinateRange"),
              type: "warning"
            });
            return false;
          }
          //全图坐标
          fields = [
            "_full_extent_x_min",
            "_full_extent_y_min",
            "_full_extent_x_max",
            "_full_extent_y_max"
          ];
          count = 0;
          i = 0;
          for (i = 0; i < fields.length; i++) {
            if (this.attributeInfo[fields[i]]) {
              count = count + 1;
            }
          }
          if (count != 0 && count != 4) {
            this.$message({
              message: thsi.$t(
                "webAppBuilder.CompleteFullextentCoordinateRange"
              ),
              type: "warning"
            });
            return false;
          }
          this.$emit("changeAttribute", {
            portalattributeinfo: this.attributeInfo,
            defaultportalattributeinfo: this.currentServiceDetails
          });
        } else {
          return false;
        }
      });
    },
    defaultInit() {
      //使用默认初始坐标
      var fields = [
        "_init_extent_x_min",
        "_init_extent_y_min",
        "_init_extent_x_max",
        "_init_extent_y_max"
      ];
      for (var i = 0; i < fields.length; i++) {
        if (this.currentServiceDetails[fields[i]]) {
          this.attributeInfo[fields[i]] = this.currentServiceDetails[fields[i]];
        } else {
          this.attributeInfo[fields[i]] = "";
        }
      }
    },
    defaultFull() {
      //使用默认全图坐标
      var fields = [
        "_full_extent_x_min",
        "_full_extent_y_min",
        "_full_extent_x_max",
        "_full_extent_y_max"
      ];
      for (var i = 0; i < fields.length; i++) {
        if (this.currentServiceDetails[fields[i]]) {
          this.attributeInfo[fields[i]] = this.currentServiceDetails[fields[i]];
        } else {
          this.attributeInfo[fields[i]] = "";
        }
      }
    }
  },
  mounted() {
    // this.setColor();
  }
};
</script>

<style lang='scss' scoped>
.area {
  margin-left: 20px;
  margin-right: 6px;
  padding-top: 10px;
}
.layout {
  padding-top: 0px;
}
.title {
  height: 34px;
  line-height: 34px;
  .title-font {
    font-size: 14px;
    display: inline-block;
    padding-left: 10px;
    position: relative;
    &::before {
      content: "";
      display: inline-block;
      height: 14px;
      width: 4px;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      border-radius: 3px;
    }
  }
}
.info {
  .el-select {
    width: 100%;
  }
}
.content {
  margin-top: 10px;
  .desc-font {
    margin: 0;
    padding: 0;
    font-size: 12px;
    margin-bottom: 10px;
  }
  .form-font {
    margin: 0;
    padding: 0;
    font-size: 12px;
  }
  .sf-font {
    text-align: right;
  }
  .slider-compatible {
    line-height: 35px;
  }
  .slider-font-compatible {
    line-height: 37px;
  }
  .slider-font {
    font-size: 15px;
    padding-left: 12px;
  }
  .coordinate-font {
    margin: 0;
    padding: 0;
    margin-bottom: 5px;
    font-size: 12px;
  }
  .coordinate-input {
    margin-bottom: 5px;
    /deep/ .el-input__inner {
      height: 30px;
      font-size: 12px;
    }
  }
}
.bottom {
  margin-bottom: 15px;
  padding-top: 0px;
}
.default-compatible-btn {
  float: right;
  height: 30px;
  padding: 4px;
  font-size: 14px;
}
.save-btn {
  font-size: 20px;
  float: right;
  margin-right: 10px;
  cursor: pointer;
  color: #595959;
  &:hover {
    color: rgba(89, 89, 89, 0.8);
  }
}
.el-form-item {
  /deep/ .el-form-item__content {
    height: 30px;
    line-height: 30px;
  }
}
</style>