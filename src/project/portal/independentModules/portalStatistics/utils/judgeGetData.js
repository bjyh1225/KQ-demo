// import {judgeGetData} from 'portal/independentModules/portalStatistics/utils/judgeGetData.js'
// 获取所有日期后判断所有或选择并得到data数据
// dataServiceType:所有按钮标识  为'' 则表示所有按钮
// seriesDataArrSum:最终的需求数据
// data:后台返回的数据格式
// timeSlot:汇总时间段
// serviceStatistcsData:{} 3格 7格选择  开始结束时间 
// dataServiceName : 复选框选中地图名称
// dataUserId:''   下拉框选中用户ID
// dataUser:[{id:'',name:''}]下拉框选中用户ID NAME
export function judgeGetData(dataServiceType, seriesDataArrSum, data, timeSlot, serviceStatistcsData, dataServiceName, dataUserId, dataUser) {
    //时间正序函数
    function sortDownDate(a, b) {
        return Date.parse(a.NAME) - Date.parse(b.NAME);
    }
    // 所有
    if (dataServiceType == "") {
        seriesDataArrSum = [];
        data.forEach(element => {
            element.CHILDRENNAME = '所有地图';
        });
        timeSlot.forEach(item => {
            data.push({
                NAME: item,
                NUM: 0,
                CHILDRENNAME: '所有地图'
            });
        });
        // 去重并排序
        if (serviceStatistcsData.timeType == "HH") {
            var prevData = data.reduce(function (prev, element) {
                if (!prev.find(el => el.NAME == element.NAME)) {
                    prev.push(element);
                }
                return prev;
            }, []);
            prevData.forEach(ele => {
                ele.NAME = ele.NAME + ":00";
            });
            seriesDataArrSum = prevData.sort(sortDownDate);
        } else {
            seriesDataArrSum = data
                .reduce(function (prev, element) {
                    if (!prev.find(el => el.NAME == element.NAME)) {
                        prev.push(element);
                    }
                    return prev;
                }, [])
                .sort(sortDownDate);
        }
    } else if (dataServiceType == null) {
        //没有选择btn
        seriesDataArrSum = [];
        var childrenNameData = ['mapService', 'dataService', 'functionService', 'senceService', 'file', 'apps']
        childrenNameData.forEach(list => {
            var childrenNameArr = [];
            data.forEach(ele => {
                if (ele.CHILDRENNAME == list) {
                    childrenNameArr.push(ele);
                }
            });
            timeSlot.forEach(item => {
                childrenNameArr.push({
                    NAME: item,
                    NUM: 0,
                    CHILDRENNAME: list
                });
            });
            var arr1 = childrenNameArr
                .reduce(function (prev, element) {
                    if (!prev.find(el => el.NAME == element.NAME)) {
                        prev.push(element);
                    }
                    return prev;
                }, [])
                .sort(sortDownDate);
            // 获取上次数据的NUM 
            for (var i = 0; i < arr1.length; i++) {
                if (arr1[i].CHILDRENNAME == 'mapService') {
                    arr1[i].CHILDRENNAME = '地图服务'
                } else if (arr1[i].CHILDRENNAME == 'functionService') { arr1[i].CHILDRENNAME = '功能服务' } else if (arr1[i].CHILDRENNAME == 'senceService') { arr1[i].CHILDRENNAME = '三维服务' } else if (arr1[i].CHILDRENNAME == 'file') { arr1[i].CHILDRENNAME = '附件' } else if (arr1[i].CHILDRENNAME == 'apps') { arr1[i].CHILDRENNAME = '应用' } else if (arr1[i].CHILDRENNAME == 'dataService') { arr1[i].CHILDRENNAME = '数据服务' }
                if (serviceStatistcsData.timeType == "HH") {
                    arr1[i].NAME = arr1[i].NAME + ":00";
                    seriesDataArrSum.push(arr1[i]);
                } else {
                    seriesDataArrSum.push(arr1[i]);
                }
            }
        })
    } else {
        seriesDataArrSum = [];
        seriesDataArrSum[0] = {};
        // 选择 
        if (dataUserId == '') {
            dataUserId = 'noUser'
        }
        dataUserId.split(',').forEach(userId => {
            seriesDataArrSum[0][userId] = [];
            if (dataServiceName.length > 0) {
                dataServiceName.forEach(list => {
                    var childrenNameArr = [];
                    var userName = '';
                    data.forEach(ele => {
                        if (userId != 'noUser') {
                            if (ele.CHILDRENNAME == list && ele.CREATEBY == userId) {
                                childrenNameArr.push(ele);
                                userName = ele.USERNAME;
                            }
                        } else {
                            if (ele.CHILDRENNAME == list) {
                                childrenNameArr.push(ele);
                                userName = ele.USERNAME;
                            }
                        }
                    });
                    timeSlot.forEach(item => {
                        childrenNameArr.push({
                            NAME: item,
                            NUM: 0,
                            CHILDRENNAME: list,
                            CREATEBY: userId,
                            USERNAME: userName
                        });
                    });
                    var arr1 = childrenNameArr
                        .reduce(function (prev, element) {
                            if (!prev.find(el => el.NAME == element.NAME)) {
                                prev.push(element);
                            }
                            return prev;
                        }, [])
                        .sort(sortDownDate);
                    arr1.forEach(en => {
                        if (serviceStatistcsData.timeType == "HH") {
                            en.NAME = en.NAME + ":00";
                            seriesDataArrSum[0][userId].push(en);
                        } else {
                            seriesDataArrSum[0][userId].push(en);
                        }
                    });
                });
            } else {
                // 有值
                if (data.length > 0) {
                    var dataServiceNameFake = [];
                    data.forEach(ele => {
                        dataServiceNameFake.push(ele.CHILDRENNAME);
                    })
                    Array.from(new Set(dataServiceNameFake)).forEach(list => {
                        var childrenNameArr = [];
                        var userName = '';
                        data.forEach(ele => {
                            if (userId != 'noUser') {
                                if (ele.CHILDRENNAME == list && ele.CREATEBY == userId) {
                                    childrenNameArr.push(ele);
                                    userName = ele.USERNAME;
                                }
                            } else {
                                if (ele.CHILDRENNAME == list) {
                                    childrenNameArr.push(ele);
                                    userName = ele.USERNAME;
                                }
                            }
                        });
                        timeSlot.forEach(item => {
                            childrenNameArr.push({
                                NAME: item,
                                NUM: 0,
                                CHILDRENNAME: list,
                                CREATEBY: userId,
                                USERNAME: userName
                            });
                        });
                        var arr1 = childrenNameArr
                            .reduce(function (prev, element) {
                                if (!prev.find(el => el.NAME == element.NAME)) {
                                    prev.push(element);
                                }
                                return prev;
                            }, [])
                            .sort(sortDownDate);
                        arr1.forEach(en => {
                            if (serviceStatistcsData.timeType == "HH") {
                                en.NAME = en.NAME + ":00";
                                seriesDataArrSum[0][userId].push(en);
                            } else {
                                seriesDataArrSum[0][userId].push(en);
                            }
                        });
                    });
                } else {
                    //没值
                    dataUser.forEach(list => {
                        if (list.id == userId) {
                            var childrenNameArr = [];
                            timeSlot.forEach(item => {
                                childrenNameArr.push({
                                    NAME: item,
                                    NUM: 0,
                                    CHILDRENNAME: list.name,
                                    CREATEBY: list.id,
                                    USERNAME: '所有资源'
                                });
                            });
                            var arr1 = childrenNameArr
                                .reduce(function (prev, element) {
                                    if (!prev.find(el => el.NAME == element.NAME)) {
                                        prev.push(element);
                                    }
                                    return prev;
                                }, [])
                                .sort(sortDownDate);
                            arr1.forEach(en => {
                                if (serviceStatistcsData.timeType == "HH") {
                                    en.NAME = en.NAME + ":00";
                                    seriesDataArrSum.push(en);
                                } else {
                                    seriesDataArrSum.push(en);
                                }
                            });
                        }

                    });
                }

            }
        })

        console.log(seriesDataArrSum);
    }
    return seriesDataArrSum;
}