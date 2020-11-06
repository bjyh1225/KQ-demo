/**
 * pmWorker short summary.
 * PM2.5 数据请求
 * @author liuyimeng
 * date 2018/5/17 上午 10:37
 */

/**
 * modify by https://github.com/pasu/ExamplesforCesium
 * get pm index from waqi data
 */

function isNumber(obj) {
    return typeof obj === 'number' && !isNaN(obj)
}
function jskeyOld() {
    return (function () {
        var u = "";
        decodeURIComponent("%603Z3F%7BWS%3AnNyBdITtKTySXYnmecFV0MUeSGoh%5BMh%3E%3E").split('').forEach(function (c) {
            u += String.fromCharCode(c.charCodeAt(0) - 1);
        });
        return u;
    })()
}

function jskey() {
    return (function () {
        var u = "";
        decodeURIComponent("%603Z3F%7BWS%3A3BSBdIRlJTySXYnmecFR%2CF%7BeSGHhkMh%3E%3E").split('').forEach(function (c) {
            u += String.fromCharCode(c.charCodeAt(0) - 1);
        });
        return u;
    })()
}

//var url = "https://wind.waqi.info/mapq/bounds/?bounds={RECTANGLE}&inc=placeholders&k={KEY}&_={DATA}";
var url = "https://api.waqi.info/mapq/bounds/?bounds={RECTANGLE}&inc=placeholders&k={KEY}&_={DATA}";
var strKey = jskey();

var table = [];
var tableTitle = {};

/**
 *
 * @type {{}}
 */
var tableTitleRelationship = {};
tableTitleRelationship['zh-CN'] = {
    AQI: 'AQI',
    level: '等级',
    influence: '影响',
    suggestion: '建议'
};
tableTitleRelationship['en'] = {
    AQI: 'AQI',
    level: 'Level',
    influence: 'Influence',
    suggestion: 'Suggestion'
};
/**
 * AQI 等级描述
 * @type {{}}
 */
var AQILevelRelationship = {};
AQILevelRelationship['zh-CN'] = [
    {
        level: "一级（优）",
        influence: "空气质量令人满意，基本无空气污染",
        suggestion: "	各类人群可正常活动"
    }, {
        level: "二级（良）",
        influence: "空气质量可接受，但某些污染物可能对极少数异常敏感人群健康有较弱影响",
        suggestion: "心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状"
    }, {
        level: "三级（轻度污染）",
        influence: "易感人群症状有轻度加剧，健康人群出现刺激症状",
        suggestion: "儿童、老年人及心脏病、呼吸系统疾病患者应减少长时间、高强度的户外锻炼"
    }, {
        level: "四级（中度污染）",
        influence: "易感人群症状有轻度加剧，健康人群出现刺激症状",
        suggestion: "儿童、老年人及心脏病、呼吸系统疾病患者避免长时间、高强度的户外锻炼，一般人群适量减少户外运动"
    }, {
        level: "五级（重度污染）",
        influence: "心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状",
        suggestion: "儿童、老年人及心脏病、肺病患者应停留在室内，停止户外运动，一般人群减少户外运动"
    }, {
        level: "六级（严重污染）",
        influence: "心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状",
        suggestion: "儿童、老年人和病人应停留在室内，避免体力消耗，一般人群避免户外活动"
    }
];
AQILevelRelationship['en'] = [
    {
        level: "Level1（Good）",
        influence: "No health implications",
        suggestion: "Enjoy your usual outdoor activities."
    }, {
        level: "Level2（Moderate）",
        influence: "Air quality is acceptable, but some contaminants may has a weak effect on a handful of unusually sensitive to people health",
        suggestion: "Heart disease and pulmonary disease symptoms significantly intensified, reduced exercise tolerance, healthy people common symptoms"
    }, {
        level: "Level3（Lightly Polluted）",
        influence: "Susceptible symptoms are mild, healthy people to stimulate symptoms",
        suggestion: "Children, the elderly and patients with heart disease, respiratory disease should be reduced for a long time, high strength of outdoor exercise"
    }, {
        level: "Level4（Moderately Polluted）",
        influence: "Susceptible symptoms are mild, healthy people to stimulate symptoms",
        suggestion: "Children, the elderly and patients with heart disease, respiratory disease to avoid long time, high strength of outdoor exercise, moderate decrease in the general population in the outdoors"
    }, {
        level: "Level5（Heavily Polluted）",
        influence: "Heart disease and pulmonary disease symptoms significantly intensified, reduced exercise tolerance, healthy people common symptoms",
        suggestion: "Children, the elderly and patients with heart disease, lung disease should stay indoors, stop the outdoors, in the general population to reduce outdoor sports"
    }, {
        level: "Level6（Severely Polluted）",
        influence: "Heart disease and pulmonary disease symptoms significantly intensified, reduced exercise tolerance, healthy people common symptoms",
        suggestion: "Children, the elderly and patients should stay indoors and avoid physical exertion, the general population to avoid outdoor activities"
    }
];

var xmlHttpRequest;
var nWidth = 500;
var date;
//请求数据
function requestJson(bounds, imgData, rDate) {
    if (typeof rDate == 'undefined')
        rDate = (new Date).getTime();
    date = rDate;
    var nowUrl = url
        .replace('{RECTANGLE}', bounds)
        .replace('{KEY}', strKey)
        .replace('{DATA}', date);

    xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.timeout = 5000;
    //2.设置回调函数
    xmlHttpRequest.onreadystatechange = function () {
        callback(bounds, imgData, date);
    };
    xmlHttpRequest.ontimeout = function () {
        timeoutCallback(imgData, date);
    };
    //3.初始化XMLHttpRequest组建
    xmlHttpRequest.open("POST", nowUrl, true);
    xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //4.发送请求
    xmlHttpRequest.send(null);
}
function callback(bounds, imgData, date) {
    if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
        var entityTable = [];
        ////////////////////////////////////////////////////
        var currentData = JSON.parse(xmlHttpRequest.responseText);
        var postData = getPostMessageByRespondData(currentData, imgData, date);
        postData.ok = true;
        //////////////////////////////////////////////////////
        self.postMessage(postData);
        self.close();
    } else if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 0) {
        var postData = getPostMessageByRespondData(heatmapDataTest, imgData, date);
        postData.ok = false;
        self.postMessage(postData);
        self.close();
    }
};

//响应超时事件
function timeoutCallback(imgData, date) {
    var postData = getPostMessageByRespondData(heatmapDataTest, imgData, date);
    postData.ok = false;
    self.postMessage(postData);
    self.close();
};

/**
 * 获取传递数据
 * @param respondData 请求返回的数据
 * @param imgData 图例图像
 * @param date 时间，毫秒
 * @returns {{date: , min: number, max: number, entityTable: Array}}
 */
function getPostMessageByRespondData(respondData, imgData, date) {
    var entityTable = [];
    ////////////////////////////////////////////////////
    var currentData = respondData;
    var minValue = undefined,
        maxValue = undefined;
    for (var i = currentData.length - 1; i >= 0; i--) {
        var color = null;
        var aqi = parseInt(currentData[i].aqi);
        if (!isNumber(aqi))
            continue;
        var level = 0;
        if (aqi > nWidth) {
            color = {red: 126 / 255.0, green: 0.0, blue: 35 / 255.0};
            level = 5;
            aqi = nWidth - 1;
        } else {
            color = {
                red: imgData[aqi * 4] / 255.0,
                green: imgData[aqi * 4 + 1] / 255.0,
                blue: imgData[aqi * 4 + 2] / 255.0
            };
            if (aqi > 300) {
                level = 5;
            } else if (aqi > 200) {
                level = 4;
            } else if (aqi > 150) {
                level = 3;
            } else if (aqi > 100) {
                level = 2;
            } else if (aqi > 50) {
                level = 1;
            }
        }
        if (color) {
            //var result=currentData[i].city.replace(/[ 　]+(?=[\u4e00-\u9fa5])/g,"");
            var des = '<table class="cesium-infoBox-defaultTable"><tbody>';
            des += '<tr><th>' + tableTitle.AQI + '</th><td>' + currentData[i].aqi + '</td></tr>';
            des += '<tr><th>' + tableTitle.level + '</th><td>' + table[level].level + '</td></tr>';
            des += '<tr><th>' + tableTitle.influence + '</th><td>' + table[level].influence + '</td></tr>';
            des += '<tr><th>' + tableTitle.suggestion  + '</th><td>' + table[level].suggestion + '</td></tr>';
            des += '</tbody></table>';
            var entity = {
                lon: currentData[i].lon,
                lat: currentData[i].lat,
                color: color,
                name: currentData[i].city,
                description: des,
                aqiValue: aqi,
                utime: currentData[i].utime || date
            };
            entityTable.push(entity);
            if (typeof minValue == 'undefined') {
                minValue = aqi;
                maxValue = aqi;
            }
            (minValue > aqi) && (minValue = aqi);
            (maxValue < aqi) && (maxValue = aqi);
        }
    }
    return {
        date: date,
        min: minValue,
        max: maxValue,
        entityTable: entityTable
    };
};

onmessage = function (e) {
    if (e.data.lang) {
        table = AQILevelRelationship[e.data.lang] || AQILevelRelationship['zh-CN'];
        tableTitle = tableTitleRelationship[e.data.lang] || tableTitleRelationship['zh-CN'];
    }
    requestJson(e.data.bounds, e.data.imgData, e.data.date);
};

var heatmapDataTest = [{
    lon: -67.882566,
    lat: 46.228731,
    aqi: 27
}, {
    lon: -52.7952,
    lat: 47.50485,
    aqi: 26
}, {
    lon: 18.057500839233,
    lat: 59.316940307617,
    aqi: 19
}, {
    lon: -70.921497482453,
    lat: -53.158295492238,
    aqi: 16
}, {
    lon: -73.902199,
    lat: 40.816101,
    aqi: 380
}, {
    lon: 126.987168,
    lat: 37.79239,
    aqi: 176
}, {
    lon: -120.856111,
    lat: 56.244722,
    aqi: 41
}, {
    lon: 124.1186,
    lat: 50.4269,
    aqi: 34
}, {
    lon: -102.072945,
    lat: 50.649787,
    aqi: 151
}, {
    lon: -100.287269,
    lat: 44.373786,
    aqi: 39
}, {
    lon: -66.1584437,
    lat: -17.4125902,
    aqi: 33
}, {
    lon: 32.049242,
    lat: -28.756224,
    aqi: 33
}, {
    lon: 5.3395257,
    lat: 60.3765042,
    aqi: 25
}, {
    lon: 82.9739144,
    lat: 25.3176452,
    aqi: 125
}, {
    lon: -105.37028,
    lat: 45.440295,
    aqi: 99
}, {
    lon: -101.877555,
    lat: 54.7686,
    aqi: 41
}, {
    lon: 88.109737,
    lat: 22.06047,
    aqi: 29
}, {
    lon: 123.945,
    lat: 47.2988,
    aqi: 99
}, {
    lon: -97.4938295,
    lat: 25.8925176,
    aqi: 19
}, {
    lon: 9.6127694,
    lat: 59.1881606,
    aqi: 20
}, {
    lon: 8.8202777777777,
    lat: 41.964444444445,
    aqi: 20
}, {
    lon: 101.718637,
    lat: 26.582347,
    aqi: 155
}, {
    lon: 101.4477793,
    lat: .5070677,
    aqi: 59
}, {
    lon: 127.528287,
    lat: 50.245146,
    aqi: 42
}, {
    lon: 110.388883,
    lat: 1.562172,
    aqi: 26
}, {
    lon: 22.4158,
    lat: 41.9139,
    aqi: 40
}, {
    lon: -50.4394393,
    lat: -21.1860297,
    aqi: 30
}, {
    lon: -158.0886127,
    lat: 21.32374479,
    aqi: 30
}, {
    lon: -97.128802,
    lat: 44.89965,
    aqi: 57
}, {
    lon: 88.1214,
    lat: 47.9047,
    aqi: 30
}, {
    lon: 20.9681,
    lat: 42.0044,
    aqi: 148
}, {
    lon: -96.752166666667,
    lat: 17.094666666667,
    aqi: 87
}, {
    lon: -5.6677534,
    lat: 43.5354166,
    aqi: 68
}, {
    lon: -92.051389,
    lat: 30.2175,
    aqi: 64
}, {
    lon: -63.573689,
    lat: 44.647175,
    aqi: 50
}, {
    lon: 87.4754,
    lat: 43.9469,
    aqi: 181
}, {
    lon: 90.9798,
    lat: 29.6588,
    aqi: 124
}, {
    lon: 105.8188748,
    lat: 21.0215063,
    aqi: 115
}, {
    lon: -106.4027843,
    lat: 31.7467425,
    aqi: 67
}, {
    lon: -98.428802,
    lat: 34.632999,
    aqi: 35
}, {
    lon: 101.9603,
    lat: 30.0475,
    aqi: 34
}, {
    lon: -133.714063,
    lat: 68.356994,
    aqi: 25
}, {
    lon: -118.17525,
    lat: 33.7924,
    aqi: 13
}, {
    lon: 105.896872,
    lat: 29.356178,
    aqi: 180
}, {
    lon: 104.398021,
    lat: 31.126856,
    aqi: 165
}, {
    lon: 21.277222222222,
    lat: 50.428888888889,
    aqi: 159
}, {
    lon: 75.9225076,
    lat: 17.6806752,
    aqi: 154
}, {
    lon: 1.4682473,
    lat: 43.6438938,
    aqi: 51
}, {
    lon: -93.9090282,
    lat: 29.9229186,
    aqi: 46
}, {
    lon: 75.244935,
    lat: 19.840204,
    aqi: 115
}, {
    lon: -72.049964505825,
    lat: -45.579045667164,
    aqi: 94
}, {
    lon: -106.6832385,
    lat: 52.1333972,
    aqi: 72
}, {
    lon: -106.48982,
    lat: 45.366151,
    aqi: 63
}, {
    lon: 9.9683548191614,
    lat: 53.564486155459,
    aqi: 55
}, {
    lon: -94.1674569,
    lat: 32.6689873,
    aqi: 52
}, {
    lon: 38.761642,
    lat: 9.058498,
    aqi: 46
}, {
    lon: 144.37027,
    lat: -38.17345,
    aqi: 31
}, {
    lon: 126.4047,
    lat: 41.9206,
    aqi: 165
}, {
    lon: 4.0916667,
    lat: 43.6777778,
    aqi: 155
}, {
    lon: 114.9367,
    lat: 25.8664,
    aqi: 137
}, {
    lon: 100.19024,
    lat: 19.687157,
    aqi: 59
}, {
    lon: -51.4053949,
    lat: -22.1205834,
    aqi: 25
}, {
    lon: -122.9611,
    lat: 50.1438,
    aqi: 21
}, {
    lon: 100.87513981078,
    lat: 14.683085094818,
    aqi: 151
}, {
    lon: 100.4497,
    lat: 38.9389,
    aqi: 117
}, {
    lon: -75.6386261,
    lat: 6.0990806,
    aqi: 109
}, {
    lon: 32.516311,
    lat: 37.868194,
    aqi: 83
}, {
    lon: 118.6961111,
    lat: 37.43444444,
    aqi: 362
}, {
    lon: 121.7769,
    lat: 39.0511,
    aqi: 192
}, {
    lon: 106.7704,
    lat: 39.2282,
    aqi: 185
}, {
    lon: 30.39692,
    lat: 40.79072,
    aqi: 175
}, {
    lon: -6.0749468,
    lat: 43.383156,
    aqi: 57
}, {
    lon: -1.6536803,
    lat: 42.8051351,
    aqi: 39
}, {
    lon: -75.4960308,
    lat: 46.5504129,
    aqi: 22
}, {
    lon: -126.812887,
    lat: 65.279676,
    aqi: 11
}, {
    lon: 109.415953,
    lat: 24.325502,
    aqi: 137
}, {
    lon: 126.500055,
    lat: 33.48863,
    aqi: 55
}, {
    lon: 80.2956,
    lat: 41.1933,
    aqi: 91
}, {
    lon: -89.20011667,
    lat: 13.70630556,
    aqi: 82
}, {
    lon: 80.1161,
    lat: 32.5,
    aqi: 65
}, {
    lon: -70.100192427636,
    lat: -20.290466881209,
    aqi: 48
}, {
    lon: 117.70715,
    lat: 39.03431667,
    aqi: 213
}, {
    lon: 106.79324,
    lat: -6.236704,
    aqi: 134
}, {
    lon: 100.7939,
    lat: 22.0019,
    aqi: 127
}, {
    lon: 101.834,
    lat: 36.5819,
    aqi: 124
}, {
    lon: -79.959,
    lat: 32.791,
    aqi: 46
}, {
    lon: 27.366996,
    lat: 42.5179008,
    aqi: 41
}, {
    lon: 138.4978273,
    lat: -34.7915261,
    aqi: 36
}, {
    lon: 6.149482,
    lat: 62.4722284,
    aqi: 6
}, {
    lon: -45.890235,
    lat: -23.2253559,
    aqi: 21
}, {
    lon: 139.5001094,
    lat: -20.7255087,
    aqi: 8
}, {
    lon: 131.1651,
    lat: 46.619,
    aqi: 262
}, {
    lon: -73.118693,
    lat: -36.735998,
    aqi: 59
}, {
    lon: 172.6790455,
    lat: -43.5473746,
    aqi: 28
}, {
    lon: 148.0588171,
    lat: -22.0054795,
    aqi: 22
}, {
    lon: 10.622759,
    lat: 44.69955,
    aqi: 169
}, {
    lon: 85.6931,
    lat: 46.0872,
    aqi: 59
}, {
    lon: 146.927,
    lat: -43.1689,
    aqi: 5
}, {
    lon: 77.3156791,
    lat: 28.6506678,
    aqi: 499
}, {
    lon: 78.0046892,
    lat: 27.2002131,
    aqi: 232
}, {
    lon: -86.815,
    lat: 33.5531,
    aqi: 72
}, {
    lon: 130.94853,
    lat: -12.50779,
    aqi: 29
}, {
    lon: 119.015288,
    lat: 33.61036,
    aqi: 195
}, {
    lon: -86.21487,
    lat: 37.04926,
    aqi: 75
}, {
    lon: 115.3446115,
    lat: -33.6499446,
    aqi: 67
}, {
    lon: 146.9164693,
    lat: -36.0807785,
    aqi: 32
}, {
    lon: 14.1520537,
    lat: 66.3111229,
    aqi: 29
}, {
    lon: -58.342538,
    lat: -34.657988,
    aqi: 25
}, {
    lon: -112.11805555556,
    lat: 33.426388888889,
    aqi: 113
}, {
    lon: 106.700711,
    lat: 10.782978,
    aqi: 102
}, {
    lon: -82.414597,
    lat: 34.843899,
    aqi: 69
}, {
    lon: 4.3202367,
    lat: 51.393289,
    aqi: 42
}, {
    lon: 18.551453,
    lat: 49.863796,
    aqi: 178
}, {
    lon: 92.0657,
    lat: 31.4846,
    aqi: 164
}, {
    lon: 113.0116,
    lat: 25.8226,
    aqi: 151
}, {
    lon: -49.3981148,
    lat: -20.7846581,
    aqi: 59
}, {
    lon: 122.3135,
    lat: 29.95378,
    aqi: 53
}, {
    lon: -127.1775,
    lat: 54.783,
    aqi: 44
}, {
    lon: -60.172575,
    lat: 46.142317,
    aqi: 17
}, {
    lon: -5.353585,
    lat: 36.140751,
    aqi: 9
}, {
    lon: -80.8669,
    lat: 35.1514,
    aqi: 97
}, {
    lon: 85.315704,
    lat: 27.712463,
    aqi: 95
}, {
    lon: 137.0564268,
    lat: 36.7939702,
    aqi: 63
}, {
    lon: -78.8783689,
    lat: 42.8864468,
    aqi: 59
}, {
    lon: -80.482777777778,
    lat: 25.471944444444,
    aqi: 27
}, {
    lon: 114.992509,
    lat: 27.113443,
    aqi: 144
}, {
    lon: -.10451562633788,
    lat: 51.514525336231,
    aqi: 65
}, {
    lon: -96.881880555556,
    lat: 19.530094444444,
    aqi: 48
}, {
    lon: -6.2655052,
    lat: 53.3218816,
    aqi: 27
}, {
    lon: 38.3985642,
    lat: 40.914445,
    aqi: 302
}, {
    lon: 106.9893,
    lat: 33.1842,
    aqi: 155
}, {
    lon: 110.46556,
    lat: 19.26529,
    aqi: 107
}, {
    lon: 120.5940777,
    lat: 18.0460318,
    aqi: 63
}, {
    lon: 102.172653,
    lat: 2.25861,
    aqi: 50
}, {
    lon: -97.873528,
    lat: 55.747194,
    aqi: 9
}, {
    lon: 105.9512,
    lat: 38.6016,
    aqi: 156
}, {
    lon: 16.115972222222,
    lat: 43.031333333333,
    aqi: 88
}, {
    lon: -86.2147,
    lat: 39.7889,
    aqi: 87
}, {
    lon: 84.8983,
    lat: 44.3336,
    aqi: 82
}, {
    lon: -61.362122,
    lat: 45.614028,
    aqi: 12
}, {
    lon: 138.4834635,
    lat: 35.043415,
    aqi: 78
}, {
    lon: -71.3612884,
    lat: 46.7860396,
    aqi: 78
}, {
    lon: 122.1222222,
    lat: 30.02027778,
    aqi: 46
}, {
    lon: 1.41426,
    lat: 38.913819999475,
    aqi: 22
}, {
    lon: 112.8564,
    lat: 35.4883,
    aqi: 187
}, {
    lon: 83.309521,
    lat: 17.720234,
    aqi: 156
}, {
    lon: 79.9117,
    lat: 37.1013,
    aqi: 137
}, {
    lon: -109.455315,
    lat: 47.048537,
    aqi: 31
}, {
    lon: 76.853180555556,
    lat: 30.7057778,
    aqi: 91
}, {
    lon: -92.3283,
    lat: 34.6811,
    aqi: 67
}, {
    lon: -122.7305,
    lat: 44.3958,
    aqi: 54
}, {
    lon: 140.9984472,
    lat: 42.3223252,
    aqi: 46
}, {
    lon: 112.4078,
    lat: 39.3265,
    aqi: 193
}, {
    lon: 111.6794,
    lat: 29.0381,
    aqi: 160
}, {
    lon: 102.638,
    lat: 25.0359,
    aqi: 109
}, {
    lon: -84.394952,
    lat: 39.472436,
    aqi: 92
}, {
    lon: -118.4391,
    lat: 49.0311,
    aqi: 28
}, {
    lon: 149.5810314,
    lat: -33.4176529,
    aqi: 4
}, {
    lon: 55.57995,
    lat: -21.202894444444,
    aqi: 24
}, {
    lon: -113.4987608,
    lat: 53.5444364,
    aqi: 21
}, {
    lon: -3.770822,
    lat: 51.58395,
    aqi: 65
}, {
    lon: -3.747222222,
    lat: 40.41916667,
    aqi: 59
}, {
    lon: -94.858333,
    lat: 39.741667,
    aqi: 53
}, {
    lon: -111.893377,
    lat: 60.004486,
    aqi: 25
}, {
    lon: -13.848975156333,
    lat: 28.506155889377,
    aqi: 34
}, {
    lon: 114.9516869,
    lat: 4.9311206,
    aqi: 25
}, {
    lon: 79.3002518,
    lat: 19.9599146,
    aqi: 166
}, {
    lon: 119.7594,
    lat: 49.2261,
    aqi: 87
}, {
    lon: -104.61136111111,
    lat: 24.051555555556,
    aqi: 76
}, {
    lon: -119.2698,
    lat: 52.8324,
    aqi: 52
}, {
    lon: -114.364031,
    lat: 62.452084,
    aqi: 21
}, {
    lon: 78.443493,
    lat: 17.457121,
    aqi: 169
}, {
    lon: -101.907034,
    lat: 49.596804,
    aqi: 128
}, {
    lon: -108.43729,
    lat: 54.126035,
    aqi: 55
}, {
    lon: -62.286891,
    lat: -38.757463,
    aqi: 34
}, {
    lon: -101.78698,
    lat: 33.58553,
    aqi: 44
}, {
    lon: -128.650768,
    lat: 53.973228,
    aqi: 38
}, {
    lon: 29.7634,
    lat: 62.59909,
    aqi: 34
}, {
    lon: 137.5753107,
    lat: -33.0379671,
    aqi: 10
}, {
    lon: 77.528263,
    lat: 13.0353386,
    aqi: 96
}, {
    lon: 5.820804563356,
    lat: 46.072356553098,
    aqi: 68
}, {
    lon: -97.1465,
    lat: 49.89798,
    aqi: 64
}, {
    lon: -123.715833,
    lat: 48.785,
    aqi: 59
}, {
    lon: -52.3134531,
    lat: 4.92242,
    aqi: 27
}, {
    lon: 113.594631,
    lat: 33.4376178,
    aqi: 162
}, {
    lon: -78.51,
    lat: -.22,
    aqi: 109
}, {
    lon: 125.2879675,
    lat: 24.8035377,
    aqi: 46
}, {
    lon: 3.02705,
    lat: 39.839619999472,
    aqi: 42
}, {
    lon: 106.888629,
    lat: 47.929732,
    aqi: 191
}, {
    lon: -90.688451,
    lat: 41.467236,
    aqi: 81
}, {
    lon: -76.1408,
    lat: 38.5876,
    aqi: 70
}, {
    lon: -102.3347563,
    lat: 31.8702534,
    aqi: 38
}, {
    lon: -75.225,
    lat: 43.0994,
    aqi: 41
}, {
    lon: -6.250873,
    lat: 54.861595,
    aqi: 35
}, {
    lon: -106.03883333333,
    lat: 28.632583333333,
    aqi: 26
}, {
    lon: -134.565556,
    lat: 58.388889,
    aqi: 5
}, {
    lon: -102.026768,
    lat: 49.894413,
    aqi: 246
}, {
    lon: 116.9677,
    lat: 33.6284,
    aqi: 223
}, {
    lon: 0,
    lat: 0,
    aqi: 57
}, {
    lon: 150.8131919,
    lat: -34.0677741,
    aqi: 44
}, {
    lon: -77.40027,
    lat: 37.55652,
    aqi: 54
}, {
    lon: 16.125,
    lat: 38.876,
    aqi: 35
}, {
    lon: 10.4718062,
    lat: 61.114761,
    aqi: 31
}, {
    lon: 138.0038727,
    lat: -33.1886253,
    aqi: 7
}, {
    lon: 73.037911111111,
    lat: 26.2920639,
    aqi: 368
}, {
    lon: 37.2802703,
    lat: 41.1214417,
    aqi: 295
}, {
    lon: 103.698064,
    lat: 1.3880078,
    aqi: 89
}, {
    lon: 18.620277777778,
    lat: 54.380277777778,
    aqi: 56
}, {
    lon: -95.794128,
    lat: 34.906082,
    aqi: 56
}, {
    lon: 43.7387312,
    lat: 37.574391,
    aqi: 28
}, {
    lon: 90.424614,
    lat: 23.796373,
    aqi: 50
}, {
    lon: 28.3031,
    lat: 68.47701,
    aqi: 24
}, {
    lon: -83.2110375,
    lat: 42.2575385,
    aqi: 65
}, {
    lon: -120.18459,
    lat: 39.32782,
    aqi: 63
}, {
    lon: -93.2139,
    lat: 45.1425,
    aqi: 60
}, {
    lon: 26.7547,
    lat: 58.701433,
    aqi: 57
}, {
    lon: 112.9586863,
    lat: -2.5394654,
    aqi: 36
}, {
    lon: -15.563856165254,
    lat: 27.763636423723,
    aqi: 34
}, {
    lon: 17.634700775146,
    lat: 59.201301574707,
    aqi: 9
}, {
    lon: 122.12042,
    lat: 37.513068,
    aqi: 160
}, {
    lon: 97.3731,
    lat: 37.3753,
    aqi: 160
}, {
    lon: -147.72727,
    lat: 64.8458,
    aqi: 62
}, {
    lon: 174.92087073,
    lat: -41.21260048,
    aqi: 48
}, {
    lon: -71.336038250122,
    lat: -29.970390235273,
    aqi: 55
}, {
    lon: -28.631388888889,
    lat: 38.605,
    aqi: 46
}, {
    lon: 114.8103181,
    lat: -3.4572422,
    aqi: 32
}, {
    lon: -100.5265,
    lat: 28.707666666667,
    aqi: 499
}, {
    lon: 13.997873,
    lat: 50.683124,
    aqi: 137
}, {
    lon: 116.1042,
    lat: 43.9317,
    aqi: 102
}, {
    lon: 93.5128,
    lat: 42.8172,
    aqi: 83
}, {
    lon: 16.626944,
    lat: 49.188889,
    aqi: 129
}, {
    lon: -110.4029329,
    lat: 40.1632913,
    aqi: 42
}, {
    lon: -112.046535,
    lat: 43.464717,
    aqi: 30
}, {
    lon: -1.358547,
    lat: 54.516667,
    aqi: 30
}, {
    lon: -149.569707,
    lat: 61.3267,
    aqi: 35
}, {
    lon: 12.657,
    lat: 37.571,
    aqi: 30
}, {
    lon: 101.1818364,
    lat: 12.7053545,
    aqi: 123
}, {
    lon: 101.823568,
    lat: 6.427698,
    aqi: 63
}, {
    lon: 133.985925,
    lat: 34.6842025,
    aqi: 55
}, {
    lon: -82.700555555556,
    lat: 28.09,
    aqi: 38
}, {
    lon: 117.5897222,
    lat: 34.82,
    aqi: 263
}, {
    lon: 48.04768,
    lat: 29.292316,
    aqi: 72
}, {
    lon: -7.3975,
    lat: 38.615,
    aqi: 65
}, {
    lon: 166.4529914,
    lat: -22.2789865,
    aqi: 23
}, {
    lon: 13.352594,
    lat: 49.692786,
    aqi: 137
}, {
    lon: .087222,
    lat: 52.225556,
    aqi: 55
}, {
    lon: -2.095348,
    lat: 57.169738,
    aqi: 46
}, {
    lon: 134.6414558,
    lat: 33.9636504,
    aqi: 38
}, {
    lon: -71.0597732,
    lat: 42.3584308,
    aqi: 74
}, {
    lon: -122.52011,
    lat: 37.9723,
    aqi: 65
}, {
    lon: -85.9465471,
    lat: 46.3454921,
    aqi: 61
}, {
    lon: -68.932546346863,
    lat: -22.44283906304,
    aqi: 53
}, {
    lon: 126.549572,
    lat: 43.837883,
    aqi: 149
}, {
    lon: 35.08511,
    lat: 32.78866,
    aqi: 119
}, {
    lon: 130.9467,
    lat: 45.8309,
    aqi: 109
}, {
    lon: -61.065272,
    lat: 14.606111,
    aqi: 81
}, {
    lon: -2.7638891,
    lat: 47.64889,
    aqi: 45
}, {
    lon: 22.936034,
    lat: 54.118099,
    aqi: 38
}, {
    lon: 144.3651532,
    lat: 43.0160229,
    aqi: 17
}, {
    lon: -80.663333333333,
    lat: 26.724166666667,
    aqi: 45
}, {
    lon: -122.29883,
    lat: 40.45318,
    aqi: 35
}, {
    lon: 35.15492147454,
    lat: 42.029567706212,
    aqi: 33
}, {
    lon: -98.77799,
    lat: 20.07687,
    aqi: 151
}, {
    lon: 81.2815,
    lat: 43.9404,
    aqi: 151
}, {
    lon: 86.1461,
    lat: 41.7511,
    aqi: 104
}, {
    lon: 101.811376,
    lat: 2.82169,
    aqi: 58
}, {
    lon: 22.570467,
    lat: 51.258828,
    aqi: 79
}, {
    lon: -85.992653,
    lat: 33.991341,
    aqi: 62
}, {
    lon: 120.9842195,
    lat: 14.5995124,
    aqi: 35
}, {
    lon: 126.9934,
    lat: 46.6384,
    aqi: 30
}, {
    lon: 73.852306,
    lat: 18.459869,
    aqi: 397
}, {
    lon: 72.6029661,
    lat: 22.9987886,
    aqi: 173
}, {
    lon: 107.370277,
    lat: 29.701944,
    aqi: 162
}, {
    lon: 103.831,
    lat: 36.0464,
    aqi: 157
}, {
    lon: 146.424454,
    lat: -38.229393,
    aqi: 30
}, {
    lon: 113.041214,
    lat: 3.177106,
    aqi: 20
}, {
    lon: -74.14855,
    lat: 4.5958,
    aqi: 129
}, {
    lon: 125.456693,
    lat: 7.186512,
    aqi: 87
}, {
    lon: 1.8699999999998,
    lat: 46.17,
    aqi: 41
}, {
    lon: 128.1779073,
    lat: 26.745635,
    aqi: 46
}, {
    lon: 10.4104482,
    lat: 63.4328172,
    aqi: 11
}, {
    lon: 121.670324,
    lat: 42.021619,
    aqi: 162
}, {
    lon: 124.3711,
    lat: 43.1594,
    aqi: 154
}, {
    lon: 13.008060455322,
    lat: 55.583889007568,
    aqi: 83
}, {
    lon: -70.523326784061,
    lat: -33.37677352033,
    aqi: 72
}, {
    lon: 23.2376786,
    lat: 42.6310777,
    aqi: 40
}, {
    lon: 150.9266116,
    lat: -33.7990378,
    aqi: 38
}, {
    lon: 117.1436154,
    lat: -.4948232,
    aqi: 30
}, {
    lon: -99.7636,
    lat: 38.7703,
    aqi: 29
}, {
    lon: 24.24566,
    lat: 68.00049,
    aqi: 27
}, {
    lon: 117.8847286,
    lat: -35.0238227,
    aqi: 23
}, {
    lon: -100.99686111111,
    lat: 25.421472222222,
    aqi: 499
}, {
    lon: -116.3467,
    lat: 46.061322,
    aqi: 404
}, {
    lon: 108.3511,
    lat: 21.7631,
    aqi: 95
}, {
    lon: 23.04219,
    lat: 63.84157,
    aqi: 82
}, {
    lon: -116.966,
    lat: 51.2975,
    aqi: 88
}, {
    lon: 6.4835814681773,
    lat: 48.584835277494,
    aqi: 70
}, {
    lon: -92.166946,
    lat: 46.743889,
    aqi: 53
}, {
    lon: -115.972386,
    lat: 44.104498,
    aqi: 38
}, {
    lon: -79.8408815,
    lat: 40.3989579,
    aqi: 172
}, {
    lon: 50.57083,
    lat: 26.204697,
    aqi: 134
}, {
    lon: -70.210828,
    lat: -22.111064,
    aqi: 91
}, {
    lon: 21.4408,
    lat: 41.9992,
    aqi: 90
}, {
    lon: -1.93652,
    lat: 47.2473,
    aqi: 35
}, {
    lon: -57.92204,
    lat: 48.95223,
    aqi: 28
}, {
    lon: -119.77321,
    lat: 36.78538,
    aqi: 66
}, {
    lon: -7.9266666666667,
    lat: 37.015,
    aqi: 55
}, {
    lon: -108.761002,
    lat: 40.086941,
    aqi: 53
}, {
    lon: -121.131599,
    lat: 44.6306,
    aqi: 28
}, {
    lon: 29.4056842,
    lat: 38.6727501,
    aqi: 499
}, {
    lon: 120.348742,
    lat: 23.757547,
    aqi: 134
}, {
    lon: 51.35094,
    lat: 35.70227,
    aqi: 109
}, {
    lon: 28.357222,
    lat: 37.215833,
    aqi: 76
}, {
    lon: 18.9697816,
    lat: 69.6566879,
    aqi: 17
}, {
    lon: 141.1380681,
    lat: 39.7203866,
    aqi: 59
}, {
    lon: -81.003105,
    lat: 46.49194,
    aqi: 50
}, {
    lon: 118.091087,
    lat: 5.864477,
    aqi: 27
}, {
    lon: 9.693265,
    lat: 45.04884,
    aqi: 171
}, {
    lon: 17.02925,
    lat: 51.129378,
    aqi: 163
}, {
    lon: 12.5759027,
    lat: 41.8482263,
    aqi: 78
}, {
    lon: -67.060799,
    lat: 44.9636,
    aqi: 30
}, {
    lon: -114.614441,
    lat: 32.690277,
    aqi: 499
}, {
    lon: 131.3054731,
    lat: 32.7057849,
    aqi: 65
}, {
    lon: -94.3177999,
    lat: 29.8639525,
    aqi: 46
}, {
    lon: 142.2133115,
    lat: 37.0763074,
    aqi: 34
}, {
    lon: 40.224978275328,
    lat: 37.915300077844,
    aqi: 68
}, {
    lon: 97,
    lat: 33.0014,
    aqi: 61
}, {
    lon: 153.0353208,
    lat: -27.5005578,
    aqi: 30
}, {
    lon: 151.1546042,
    lat: -23.8130827,
    aqi: 20
}, {
    lon: -113.558611,
    lat: 34.243889,
    aqi: 146
}, {
    lon: -114.846298,
    lat: 35.978125,
    aqi: 114
}, {
    lon: -103.39873310432,
    lat: 20.680450840176,
    aqi: 86
}, {
    lon: 35.349142,
    lat: 36.854533,
    aqi: 70
}, {
    lon: 21.61832,
    lat: 63.09515,
    aqi: 17
}, {
    lon: 109.509786,
    lat: 34.499995,
    aqi: 193
}, {
    lon: 79.351217,
    lat: 13.672986,
    aqi: 112
}, {
    lon: -155.77813,
    lat: 19.117561,
    aqi: 50
}, {
    lon: 102.242937,
    lat: 6.13611,
    aqi: 24
}, {
    lon: 174.89,
    lat: -36.9,
    aqi: 14
}, {
    lon: 75.989755,
    lat: 39.4704,
    aqi: 147
}, {
    lon: 24.649218,
    lat: 59.414133,
    aqi: 86
}, {
    lon: -46.6482747,
    lat: -23.6186305,
    aqi: 82
}, {
    lon: -87.8111,
    lat: 42.5047,
    aqi: 70
}, {
    lon: -89.290167,
    lat: 48.379389,
    aqi: 61
}, {
    lon: -111.640504,
    lat: 57.189406,
    aqi: 38
}, {
    lon: 145.0306,
    lat: -37.7783165,
    aqi: 32
}, {
    lon: -111.987164,
    lat: 46.8505,
    aqi: 32
}, {
    lon: 123.766485,
    lat: 41.294176,
    aqi: 168
}, {
    lon: 119.212094,
    lat: 29.081875,
    aqi: 117
}, {
    lon: -.40833333333333,
    lat: 39.481111111111,
    aqi: 76
}, {
    lon: 16.17254444,
    lat: 54.19398611,
    aqi: 66
}, {
    lon: 149.166332,
    lat: -21.1539007,
    aqi: 19
}, {
    lon: 114.6096326,
    lat: -28.7732192,
    aqi: 17
}, {
    lon: -125.7643,
    lat: 54.2307,
    aqi: 9
}, {
    lon: 44.625607,
    lat: 39.795454,
    aqi: 114
}, {
    lon: -72.968755930145,
    lat: -41.4795069236,
    aqi: 86
}
];