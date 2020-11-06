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
        }]
      },
      "projection": {
        "prj": "102100",
        // "proj4": "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs",
        "proj4":"+proj=longlat +datum=WGS84 +no_defs",
        "origin": {
          "_x": "-20037625.34278925",
          "_y": "20037464.34278925"
        }
      },
      // "_init_extent": "1526220.71 -2211258.85 19861360.23 8864182.95 ",
      "_init_extent":"97.356209 26.047632 108.534233 34.316605",
      "_min_scale_id": "4",
      "_full_extent":"97.356209 26.047632 108.534233 34.316605",
      // "_full_extent": "1526220.71 -2211258.85 19861360.23 8864182.95 ",
      "_id": "map"
    },
    "allControls": {
      "control": [{
        "subcontrol": [{
          "_type": "zoom_in",
          "_widge_name":"拉框放大",
          "_icon":"zoom-in",
          "_iseditbtn":"0",
          "_isshowbtn":"1"
        }, {
          "_type": "zoom_out",
          "_widge_name":"拉框缩小",
          "_icon":"zoom-out",
          "_iseditbtn":"0",
          "_isshowbtn":"1"
        }, {
          "_type": "roaming",
          "_widge_name":"地图漫游",
          "_icon":"hand",
          "_iseditbtn":"0",
          "_isshowbtn":"1"
        }, {
          "_type": "forward-map",
          "_widge_name":"前一视图",
          "_icon":"arrow-left",
          "_iseditbtn":"0",
          "_isshowbtn":"1"
        }, {
          "_type": "backward-map",
          "_widge_name":"后一视图",
          "_icon":"arrow-right",
          "_iseditbtn":"0",
          "_isshowbtn":"1"
        }, {
          "_type": "full-map",
          "_widge_name":"全图浏览",
          "_icon":"full-map",
          "_iseditbtn":"0",
          "_isshowbtn":"1"
        }, {
          "_type": "drawing",
          "_widge_name":"绘图面板",
          "_icon":"draw",
          "_iseditbtn":"0",
          "_isshowbtn":"1"
        }],
        "_position": "topright",
        "_type": "toolbar"
      },
      // {
      //   "_type":"sidebar",
      //   "_position":"left",
      //   "subcontrol": [{
      //     "_type":"tree",
      //     "_id":"controlTree"
      //   }]
      // }, 
      {
        "_fullscreen": "1",
        "_position": "topright",
        "_type": "zoom",//仅仅在zoom控件中存在，1为添加全屏按钮，0为不添加
        "_widge_name":"地图缩放工具",
        "_icon":"fullscreen",
        "_iseditbtn":"0",
        "_isshowbtn":"1",
        "_isspecial":"1"
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
        "_widge_name":"地图坐标控件",
        "_icon":"zuobiaozhuanhuan",
        "_iseditbtn":"0",
        "_isshowbtn":"1"
      }, {
        "_position": "bottomleft",
        "_type": "scale",
        "_widge_name":"比列尺",
        "_icon":"bilichi",
        "_iseditbtn":"0",
        "_isshowbtn":"1"
      }, 
      // {
      //   "_position": "topleft",
      //   "_type": "styleeditor"
      // }, 
      {
        "_position": "topright",
        "_type": "compare",
        "_widge_name":"图层对比",
        "_icon":"layer-compare",
        "_iseditbtn":"0",
        "_isshowbtn":"1"
      }, {
        "subcontrol": [{
          "_name": "Google vector",
          "_maptype": "google",
          "_subtype": "vector",
          "_is_selected": "1",
          "_iswidget":"0"
        }, {
          "_name": "Google image",
          "_maptype": "google",
          "_subtype": "image",
          "_iswidget":"0"
        }],
        "_type": "basemap",
        "_position": "topright",
        "_visible": "0",
        "_iswidget":"0"
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
      // {
      //   "_type":"sidebar",
      //   "_position":"left",
      //   "subcontrol": [{
      //     "_type":"tree",
      //     "_id":"controlTree"
      //   }]
      // }, 
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
          "_name": "Google vector",
          "_maptype": "google",
          "_subtype": "vector",
          "_is_selected": "1"
        }, {
          "_name": "Google image",
          "_maptype": "google",
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