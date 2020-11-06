export default {
  "config": {
    "theme": {
      "_name": "default-blue",
      "_layout": "scene_1_themeDefault"
    },
    "map": {
      "scales": {
        "scale": [{
          "_id": "0",
          "__text": "0.0000000016901635716026585738"
        }, {
          "_id": "1",
          "__text": "0.0000000033803271432053171475"
        }, {
          "_id": "2",
          "__text": "0.0000000067606542864106342951"
        }, {
          "_id": "3",
          "__text": "0.0000000135213085728212685901"
        }, {
          "_id": "4",
          "__text": "0.0000000270426171456425371803"
        }, {
          "_id": "5",
          "__text": "0.0000000540852342912850743605"
        }, {
          "_id": "6",
          "__text": "0.000000108170468582570148721"
        }, {
          "_id": "7",
          "__text": "0.000000216340937165140297442"
        }, {
          "_id": "8",
          "__text": "0.0000004326818743302805948841"
        }, {
          "_id": "9",
          "__text": "0.0000008653637486605611897682"
        }, {
          "_id": "10",
          "__text": "0.0000017307274973211223795364"
        }, {
          "_id": "11",
          "__text": "0.0000034614549946422447590727"
        }, {
          "_id": "12",
          "__text": "0.0000069229099892844895181455"
        }, {
          "_id": "13",
          "__text": "0.0000138458199785689790362909"
        }, {
          "_id": "14",
          "__text": "0.0000276916399571379580725819"
        }, {
          "_id": "15",
          "__text": "0.0000553832799142759161451638"
        }, {
          "_id": "16",
          "__text": "0.0001107665598285518322903276"
        }, {
          "_id": "17",
          "__text": "0.0002215331196571036645806552"
        }, {
          "_id": "18",
          "__text": "0.0004430662393142073291613103"
        }, {
          "_id": "19",
          "__text": "0.0008861324786284146583226207"
        }, {
          "_id": "20",
          "__text": "0.0017722649572568293166452413"
        }, {
          "_id": "21",
          "__text": "0.0035445299145136586332904827"
        }, {
          "_id": "22",
          "__text": "0.0070890598290273172665809653"
        }, {
          "_id": "23",
          "__text": "0.0141781196580546345331619307"
        }
        ]
      },
      "projection": {
        "prj": "102100",
        "proj4": "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs",
        // "proj4": "+proj=longlat +datum=WGS84 +no_defs",
        "origin": {
          // "_x": "-180.000000",
          // "_y": "90.000000"
          // "_x": "-20037625.34278925",
          // "_y": "20037464.34278925"
          "_x": '',
          "_y": ''
        }
      },
      "_init_extent": "1526220.71 -2211258.85 19861360.23 8864182.95 ",
      // "_init_extent": "97.356209 26.047632 108.534233 34.316605",
      "_min_scale_id": "0",
      // "_full_extent": "97.356209 26.047632 108.534233 34.316605",
      "_full_extent": "1526220.71 -2211258.85 19861360.23 8864182.95 ",
      "_id": "map"
    },
    "allControls": {
      "control": [{
        "subcontrol": [{
          "_type": "zoom_in",
          "_widge_name": "webAppBuilder.ZoomIn",//拉框放大
          "_icon": "el-icon-portal-fangda",
          "_iseditbtn": "0",
          "_isshowbtn": "1",
          "_widge_type": "base",
          "_sort_no": "1"
        }, {
          "_type": "zoom_out",
          "_widge_name": "webAppBuilder.ZoomOut",//拉框缩小
          "_icon": "el-icon-portal-suoxiao",
          "_iseditbtn": "0",
          "_isshowbtn": "1",
          "_widge_type": "base",
          "_sort_no": "2"
        }, {
          "_type": "roaming",
          "_widge_name": "webAppBuilder.Pan",//地图漫游
          "_icon": "el-icon-portal-ic_pan_tool_px",
          "_iseditbtn": "0",
          "_isshowbtn": "1",
          "_widge_type": "base",
          "_sort_no": "3"
        }, {
          "_type": "forward-map",
          "_widge_name": "webAppBuilder.PreviousExtent",//前一视图
          "_icon": "el-icon-portal-xiangqian",
          "_iseditbtn": "0",
          "_isshowbtn": "1",
          "_widge_type": "base",
          "_sort_no": "4"
        }, {
          "_type": "backward-map",
          "_widge_name": "webAppBuilder.NextExtent",//后一视图
          "_icon": "el-icon-portal-xiangqian-copy",
          "_iseditbtn": "0",
          "_isshowbtn": "1",
          "_widge_type": "base",
          "_sort_no": "5"
        }, {
          "_type": "full-map",
          "_widge_name": "webAppBuilder.FullExtent",//全图浏览
          "_icon": "el-icon-portal-diqiu1",
          "_iseditbtn": "0",
          "_isshowbtn": "1",
          "_widge_type": "base",
          "_sort_no": "6"
        }, {
          "_type": "drawing",
          "_widge_name": "webAppBuilder.DrawingPanel",//绘图面板
          "_icon": "el-icon-portal-shuazi",
          "_iseditbtn": "0",
          "_isshowbtn": "1",
          "_widge_type": "base",
          "_sort_no": "7"
        },
        {
          "_type": "info-query",
          "_widge_name": "webAppBuilder.InformationQuery",//属性查询
          "_icon": "el-icon-portal-information",
          "_iseditbtn": "1",
          "_isshowbtn": "1",
          "_widge_type": "specialSubject",
          "_sort_no": "1"
        }],
        "_position": "topright",
        "_type": "toolbar"
      },
      {
        "_type": "sidebar",
        "_position": "left",
        "_iswidget": "0",
        "subcontrol": [{
          "_type": "tree",
          "_id": "controlTree",
          "_iswidget": "0"
        }, {
          "_type": "advanced",
          "_id": "controlAdvancedQuery",
          "_icon": "el-icon-portal-query1",
          "_iseditbtn": "1",
          "_isshowbtn": "1",
          "_widge_name": "webAppBuilder.Advanced",//高级查询
          "_widge_type": "specialSubject",
          "_sort_no": "2"
        },
        {
          "_type": "overlay",
          "_id": "controlOverlayAnalysis",
          "_icon": "el-icon-portal-shuxingchaxun",
          "_iseditbtn": "1",
          "_isshowbtn": "1",
          "_widge_name": "webAppBuilder.Overlay",//叠置分析
          "_widge_type": "specialSubject",
          "_sort_no": "3"
        }
        ]
      },
      {
        "_fullscreen": "1",
        "_position": "topright",
        "_type": "zoom",//仅仅在zoom控件中存在，1为添加全屏按钮，0为不添加
        "_widge_name": "webAppBuilder.FullScreen",//地图缩放工具
        "_icon": "el-icon-portal-quanping",
        "_iseditbtn": "0",
        "_isshowbtn": "1",
        "_isspecial": "1",
        "_widge_type": "base",
        "_sort_no": "8"
      },
      // {
      //   "_tooltip": "KQ GEO",
      //   "_url": "http://kqgeo.com.cn/",
      //   "_type": "attribution",
      //   "_label": "KQ GEO",
      //   "_img": "../../images/logo.png",
      //   "_iswidget":"0"
      // }, 
      {
        "_decimals": "2",
        "_position": "bottomleft",
        "_label_x": "Lng",
        "_type": "coordinates",
        "_label_y": "Lat",
        "_widge_name": "webAppBuilder.Coordinate",//地图坐标控件
        "_icon": "el-icon-portal-zuobiaozhuanhuan1",
        "_iseditbtn": "0",
        "_isshowbtn": "1",
        "_widge_type": "base",
        "_sort_no": "9"
      }, {
        "_position": "bottomleft",
        "_type": "scale",
        "_widge_name": "webAppBuilder.SpecificScale",//比列尺
        "_icon": "el-icon-portal-bilichi",
        "_iseditbtn": "0",
        "_isshowbtn": "1",
        "_widge_type": "base",
        "_sort_no": "10"
      },
      // {
      //   "_position": "topleft",
      //   "_type": "styleeditor"
      // }, 
      {
        "_position": "topright",
        "_type": "compare",
        "_widge_name": "webAppBuilder.LayerComparison",//图层对比
        "_icon": "el-icon-portal-fenshiduibiicon",
        "_iseditbtn": "0",
        "_isshowbtn": "1",
        "_widge_type": "base",
        "_sort_no": "11"
      }, {
        "subcontrol": [{
          "_name": "Google vector",
          "_maptype": "google",
          "_subtype": "vector",
          "_is_selected": "1",
          "_iswidget": "0"
        }, {
          "_name": "Google image",
          "_maptype": "google",
          "_subtype": "image",
          "_iswidget": "0"
        }],
        "_type": "basemap",
        "_position": "topright",
        "_visible": "0",
        "_iswidget": "0"
      }, {
        "_position": "topleft",
        "_type": "searchbar",
        "_widge_name": "webAppBuilder.Search",//搜索栏
        "_icon": "el-icon-portal-sousuo",
        "_iseditbtn": "1",
        "_isshowbtn": "1",
        "_widge_type": "specialSubject",
        "_sort_no": "4"
      }]
    },
    "controls": {
      "control": [{
        "subcontrol": [{
          "_type": "zoom_in"
        }, {
          "_type": "zoom_out"
        }, {
          "_type": "roaming"
        }, {
          "_type": "forward-map"
        }, {
          "_type": "backward-map"
        }, {
          "_type": "full-map"
        }, {
          "_type": "drawing"
        }],
        "_position": "topright",
        "_type": "toolbar"
      },
      {
        "_type": "sidebar",
        "_position": "left",
        "subcontrol": [{
          "_type": "tree",
          "_id": "controlTree"
        }]
      },
      {
        "_fullscreen": "1",
        "_position": "topright",
        "_type": "zoom"
      },
      // {
      //   "_tooltip": "KQ GEO",
      //   "_url": "http://kqgeo.com.cn/",
      //   "_type": "attribution",
      //   "_label": "KQ GEO",
      //   "_img": "../../images/logo.png"
      // }, {
      //   "_decimals": "2",
      //   "_position": "bottomleft",
      //   "_label_x": "Lng",
      //   "_type": "coordinates",
      //   "_label_y": "Lat"
      // }, 
      {
        "_decimals": "2",
        "_position": "bottomleft",
        "_label_x": "Lng",
        "_type": "coordinates",
        "_label_y": "Lat"
      },
      {
        "_position": "bottomleft",
        "_type": "scale"
      },
      // {
      //   "_position": "topleft",
      //   "_type": "styleeditor"
      // }, 
      {
        "_position": "topright",
        "_type": "compare"
      },
      {
        "subcontrol": [{
          "_name": "高德矢量",
          "_maptype": "gaode",
          "_subtype": "vector",
          "_is_selected": "1"
        }, {
          "_name": "高德影像",
          "_maptype": "gaode",
          "_subtype": "image"
        }],
        "_type": "basemap",
        "_position": "topright",
        "_visible": "0"
      }]
    },
    "tree": {
      "_label": "Layer",
      "_icon": "image_folder",
      "_select_max_count": "50"
    },
    "_custom": "0"
  }
}