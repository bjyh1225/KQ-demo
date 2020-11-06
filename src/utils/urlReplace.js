
//引用路径 import {urlReplace} from '@/utils/urlReplace.js'
//url处理  val资源详情  
export function urlReplace(val) {
  var urlReplaceAfter = '';
  if (
    val.C_SERVICE_URL.indexOf("KQGis") > -1 &&
    val.C_SERVICE_URL.indexOf("/WMTS") == -1 &&
    val.C_SERVICE_URL.indexOf("/WMS") == -1 &&
    val.C_SERVICE_URL.indexOf("arcgis") == -1
  ) {
    var replaceRestKq = val.C_SERVICE_URL.replace("/rest/", "/kqwebmap/");
    var lastIndexKq = replaceRestKq.lastIndexOf("/");
    urlReplaceAfter = replaceRestKq.substring(0, lastIndexKq + 1);
  }
  else if (
    val.C_SERVICE_URL.indexOf("KQGis") > -1 ||
    val.C_SERVICE_URL.indexOf("/WMTS") > -1 ||
    (val.C_SERVICE_URL.indexOf("/WMS") > -1 ||
      val.C_SERVICE_URL.indexOf("/wms") > -1) ||
    val.C_SERVICE_URL.indexOf("arcgis") == -1
  ) {
    // var replaceRestWmts = val.C_SERVICE_URL.replace("/rest/", "/kqwebmap/");
    // urlReplaceAfter = replaceRestWmts.substring(
    //   0,
    //   replaceRestWmts.lastIndexOf(
    //     "/",
    //     replaceRestWmts.lastIndexOf("/") - 1
    //   ) + 1
    // );
    urlReplaceAfter = val.C_SERVICE_URL
  }
  else if (
    val.C_SERVICE_URL.indexOf("KQGis") == -1 &&
    val.C_SERVICE_URL.indexOf("/WMTS") == -1 &&
    (val.C_SERVICE_URL.indexOf("/WMS") == -1 ||
      val.C_SERVICE_URL.indexOf("/wms") == -1) &&
    val.C_SERVICE_URL.indexOf("arcgis") == -1
  ) {
    urlReplaceAfter = val.C_SERVICE_URL;
  } else if (
    val.C_SERVICE_URL.indexOf("arcgis") > -1 &&
    val.C_SERVICE_URL.indexOf("/WMTS") == -1 &&
    (val.C_SERVICE_URL.indexOf("/WMS") ||
      val.C_SERVICE_URL.indexOf("/wms") == -1) &&
    val.C_SERVICE_URL.indexOf("KQGis") == -1
  ) {
    //   arcmapping  普通
    urlReplaceAfter = val.C_SERVICE_URL + "?f=jsapi";
  }
  return urlReplaceAfter;
}