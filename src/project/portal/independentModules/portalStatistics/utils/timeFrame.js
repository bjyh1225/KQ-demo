// import { getDateStr,getDateArry } from 'portal/independentModules/portalStatistics/utils/timeFrame.js'
// startDate : 开始时间  '2019-09-01'
// endDate : 结束时间
// dayLength : 每隔几天，0-代表每天，1-代表日期间隔一天
// 获取日期范围内的所有日期
export function getDateStr(startDate, endDate, dayLength) {
  function getTargetDate(date, dayLength) {
    dayLength = dayLength + 1;
    var tempDate = new Date(date);
    tempDate.setDate(tempDate.getDate() + dayLength);
    var year = tempDate.getFullYear();
    var month =
      tempDate.getMonth() + 1 < 10
        ? "0" + (tempDate.getMonth() + 1)
        : tempDate.getMonth() + 1;
    var day =
      tempDate.getDate() < 10 ? "0" + tempDate.getDate() : tempDate.getDate();
    return year + "-" + month + "-" + day;
  }
  var str = startDate;
  for (var i = 0; ; i++) {
    var getDate = getTargetDate(startDate, dayLength);
    startDate = getDate;
    if (getDate <= endDate) {
      str += "," + getDate;
    } else {
      break;
    }
  }
  return str;
}

// d1 : 开始时间  '2019-09-01'
// d2 : 结束时间
// 获取日期范围内的月份
export function getDateArry(d1, d2) {
  var dateArry = new Array();
  var s1 = d1.split("-");
  var s2 = d2.split("-");
  var mCount = 0;
  if (parseInt(s1[0]) < parseInt(s2[0])) {
    mCount =
      (parseInt(s2[0]) - parseInt(s1[0])) * 12 +
      parseInt(s2[1]) -
      parseInt(s1[1]) +
      1;
  } else {
    mCount = parseInt(s2[1]) - parseInt(s1[1]) + 1;
  }
  if (mCount > 0) {
    var startM = parseInt(s1[1]);
    var startY = parseInt(s1[0]);
    for (var i = 0; i < mCount; i++) {
      if (startM < 12) {
        dateArry[i] = startY + "-" + (startM > 9 ? startM : "0" + startM);
        startM += 1;
      } else {
        dateArry[i] = startY + "-" + (startM > 9 ? startM : "0" + startM);
        startM = 1;
        startY += 1;
      }
    }
  }
  return dateArry;
}