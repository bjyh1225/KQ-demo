<template>
  <div class="system-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="1000px"
      :modal="true"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>缓存管理</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <el-row class="service-name">
          <span>
            服务名称：
            <span class="name">{{serviceInfo.name}}</span>
          </span>
          <span class="alias-name">
            服务别名：
            <span class="name">{{serviceInfo.aliasName}}</span>
          </span>
        </el-row>
        <el-row>
          <el-divider content-position="left">矢量缓存</el-divider>
          <el-row class="vector-cache">
            <el-col :span="4">
              <el-button
                type="primary"
                class="base-btn"
                :disabled="!serviceInfo.hasVectorCache"
                @click="runVectorCache"
                v-if="!vectorCacheStatus"
              >启用矢量缓存</el-button>
              <el-button type="danger" class="base-del-btn" v-else @click="stopVectorCache">停止矢量缓存</el-button>
            </el-col>
            <el-col :span="20">
              <span>进程数：</span>
              <el-select
                v-model="vectorCacheTaskNum"
                placeholder="请选择"
                :disabled="!serviceInfo.hasVectorCache"
              >
                <el-option :label="1" :value="1"></el-option>
                <el-option :label="2" :value="2"></el-option>
                <el-option :label="3" :value="3"></el-option>
                <el-option :label="4" :value="4"></el-option>
                <el-option :label="5" :value="5"></el-option>
              </el-select>
              <el-checkbox
                v-model="vectorCacheDistribute"
                :disabled="!serviceInfo.hasVectorCache"
              >使用分布式模式</el-checkbox>
              <el-checkbox
                v-model="vectorCacheDataCache"
                :disabled="!serviceInfo.hasVectorCache"
              >使用数据缓存</el-checkbox>
            </el-col>
          </el-row>
          <el-row class="progress">
            <el-col :span="2">进度：</el-col>
            <el-col :span="22">
              <el-progress
                :text-inside="true"
                :stroke-width="26"
                :percentage="vectorCacheProcess"
                status="success"
              ></el-progress>
            </el-col>
          </el-row>
          <el-table :data="vectorCacheList" border>
            <el-table-column
              :prop="item.prop"
              :label="item.label"
              :min-width="item.minWidth"
              v-for="(item,ix) in tableCol"
              :key="ix"
            ></el-table-column>
          </el-table>
        </el-row>
        <el-row>
          <el-divider content-position="left">影像缓存</el-divider>
          <el-row class="image-cache">
            <el-col :span="4">
              <el-button
                type="primary"
                class="base-btn"
                :disabled="!serviceInfo.hasImageCache"
                @click="runImageCache"
                v-if="!imageCacheStatus"
              >启用影像缓存</el-button>
              <el-button type="danger" class="base-del-btn" v-else @click="stopImageCache">停止影像缓存</el-button>
            </el-col>
            <el-col :span="20">
              <span>进程数：</span>
              <el-select
                v-model="imageCacheTaskNum"
                placeholder="请选择"
                :disabled="!serviceInfo.hasImageCache"
              >
                <el-option :label="1" :value="1"></el-option>
                <el-option :label="2" :value="2"></el-option>
                <el-option :label="3" :value="3"></el-option>
                <el-option :label="4" :value="4"></el-option>
                <el-option :label="5" :value="5"></el-option>
              </el-select>
              <el-checkbox
                v-model="imageCacheDistribute"
                :disabled="!serviceInfo.hasImageCache"
              >使用分布式模式</el-checkbox>
            </el-col>
          </el-row>
          <el-row class="progress">
            <el-col :span="2">进度：</el-col>
            <el-col :span="22">
              <el-progress
                :text-inside="true"
                :stroke-width="26"
                :percentage="imageCacheProcess"
                status="success"
              ></el-progress>
            </el-col>
          </el-row>
          <el-table :data="imageCacheList" border>
            <el-table-column
              :prop="item.prop"
              :label="item.label"
              :min-width="item.minWidth"
              v-for="(item,ix) in tableCol"
              :key="ix"
            ></el-table-column>
          </el-table>
        </el-row>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-white-btn" @click="handleClose">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ServerManagerCacheDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    serviceInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    dialogVisible() {
      if (this.dialogVisible) {
        this.cacheList = [];
        this.resetStatus();
        this.getCacheStatusWithProcess(0);
        this.getCacheStatusWithProcess(1);
      }
    },
  },
  data() {
    return {
      disableStatus: false,
      vectorCacheProcess: 0,
      imageCacheProcess: 0,
      vectorCacheList: [],
      imageCacheList: [],
      vectorCacheStatus: false,
      imageCacheStatus: false,
      vectorCacheTimestamp: null,
      imageCacheTimestamp: null,
      vectorCacheTaskNum: 1,
      imageCacheTaskNum: 1,
      vectorCacheDistribute: false,
      vectorCacheDataCache: false,
      imageCacheDistribute: false,
      tableCol: [
        {
          prop: "finishedcount",
          label: "切片数量",
          minWidth: "10%",
        },
        {
          prop: "allcount",
          label: "总切片数量",
          minWidth: "10%",
        },
        {
          prop: "starttime",
          label: "启动时间",
          minWidth: "20%",
        },
        {
          prop: "endtime",
          label: "完成时间",
          minWidth: "20%",
        },
        {
          prop: "timecost",
          label: "任务耗时",
          minWidth: "20%",
        },
        {
          prop: "isfinished",
          label: "完成状态",
          minWidth: "10%",
        },
      ],
    };
  },
  methods: {
    handleClose() {
      this.resetTimestamp();
      this.$emit("dialogClose");
    },
    getCacheProcess(type) {
      let date = new Date();
      if (type == 0) {
        this.vectorCacheTimestamp = date;
      } else {
        this.imageCacheTimestamp = date;
      }
      let count = 0;
      let task = setInterval(() => {
        let state = false;
        if (type == 0) {
          if (date == this.vectorCacheTimestamp) {
            state = true;
          }
        } else {
          if (date == this.imageCacheTimestamp) {
            state = true;
          }
        }
        if (state) {
          if (count > 500) {
            clearInterval(task);
          }
          count = count + 1;
          this.getCacheStatus(type, true)
            .then((cacheInfo) => {
              if (cacheInfo.isfinishedValue) {
                clearInterval(task);
              }
            })
            .catch(() => {
              clearInterval(task);
            });
        } else {
          clearInterval(task);
        }
      }, 3000);
    },
    startCache(type) {
      let data = {
        name: this.serviceInfo.name,
        useResume: true,
        type: type,
      };
      if (type == 0) {
        data.taskNum = this.vectorCacheTaskNum;
        data.distribute = this.vectorCacheDistribute;
        data.datacache = this.vectorCacheDataCache;
      } else {
        data.taskNum = this.imageCacheTaskNum;
        data.distribute = this.imageCacheDistribute;
      }
      this.$api.serverManageApi
        .startCacheProcess(data, {
          loadingText: "启用缓存中",
        })
        .then(() => {
          if (type == 0) {
            this.vectorCacheStatus = true;
            this.$message({
              type: "success",
              message: "启用矢量缓存成功",
            });
          } else {
            this.imageCacheStatus = true;
            this.$message({
              type: "success",
              message: "启用影像缓存成功",
            });
          }
          this.getCacheStatusWithProcess(type);
        });
    },
    stopCache(type) {
      this.$api.serverManageApi
        .stopCacheProcess(
          {
            name: this.serviceInfo.name,
            type: type,
          },
          {
            loadingText: "停止缓存中",
          }
        )
        .then(() => {
          this.resetTimestamp(type);
          if (type == 0) {
            this.vectorCacheStatus = false;
            this.$message({
              type: "success",
              message: "停止矢量缓存成功",
            });
          } else {
            this.vectorCacheStatus = false;
            this.$message({
              type: "success",
              message: "停止影像缓存成功",
            });
          }
          this.getCacheStatusWithProcess(type);
        });
    },
    runVectorCache() {
      this.startCache(0);
    },
    runImageCache() {
      this.startCache(1);
    },
    stopVectorCache() {
      this.stopCache(0);
    },
    stopImageCache() {
      this.stopCache(1);
    },
    getCacheStatusWithProcess(type) {
      this.getCacheStatus(type).then((cacheInfo) => {
        if (cacheInfo.isfinishedValue === false) {
          if (type == 0) {
            this.vectorCacheStatus = true;
          } else {
            this.imageCacheStatus = true;
          }
          this.getCacheProcess(type);
        }
      });
    },
    getCacheStatus(type, closeloading) {
      return new Promise((resolve, reject) => {
        this.$api.serverManageApi
          .queryCacheStatus(
            {
              name: this.serviceInfo.name,
              type: type,
            },
            {
              noLoading: true,
            }
          )
          .then((res) => {
            let data = res.data.data;
            let cacheInfo = {};
            if (data[0] && data[0].result) {
              let cacheResult = data[0].result;
              if (cacheResult.status == 0) {
                cacheInfo = {
                  name: this.serviceInfo.name,
                  cacheType: type,
                  type: type == 0 ? "矢量" : "影像",
                  starttime: cacheResult.starttime,
                  timecost: this.globalMethods.formatDuring(
                    cacheResult.timecost
                  ),
                  finishedcount: cacheResult.finishedcount,
                  allcount: cacheResult.allcount,
                  isfinishedValue: cacheResult.isfinished,
                  isfinished: cacheResult.isfinished ? "已完成" : "未完成",
                  endtime: cacheResult.endtime,
                };
                if (cacheInfo.isfinishedValue) {
                  if (type == 0) {
                    this.vectorCacheStatus = false;
                  } else {
                    this.imageCacheStatus = false;
                  }
                }
                if (cacheInfo.finishedcount && cacheInfo.allcount) {
                  cacheInfo.process = Number(
                    (
                      (cacheInfo.finishedcount / cacheInfo.allcount) *
                      100
                    ).toFixed(2)
                  );
                } else {
                  cacheInfo.process = 0;
                }
                if (type == 0) {
                  this.vectorCacheProcess = cacheInfo.process;
                  this.vectorCacheList = [cacheInfo];
                  this.vectorCacheTaskNum = cacheResult.taskNum;
                  this.vectorCacheDistribute = cacheResult.distribute;
                  this.vectorCacheDataCache = cacheResult.datacache;
                } else {
                  this.imageCacheProcess = cacheInfo.process;
                  this.imageCacheList = [cacheInfo];
                  this.imageCacheTaskNum = cacheResult.taskNum;
                  this.imageCacheDistribute = cacheResult.distribute;
                }
              } else {
                if (type == 0) {
                  this.vectorCacheList = [];
                  this.vectorCacheStatus = false;
                  this.vectorCacheProcess = 0;
                } else {
                  this.imageCacheList = [];
                  this.imageCacheStatus = false;
                  this.imageCacheProcess = 0;
                }
              }
            }
            resolve(cacheInfo);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    resetStatus() {
      this.vectorCacheStatus = false;
      this.imageCacheStatus = false;
      this.vectorCacheTaskNum = 1;
      this.imageCacheTaskNum = 1;
      this.vectorCacheDistribute = false;
      this.vectorCacheDataCache = false;
      this.imageCacheDistribute = false;
    },
    resetTimestamp(type) {
      if (type === 0) {
        this.vectorCacheTimestamp = new Date();
      } else if (type === 1) {
        this.imageCacheTimestamp = new Date();
      } else {
        this.vectorCacheTimestamp = new Date();
        this.imageCacheTimestamp = new Date();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.system-dialog {
  .dialog-title {
    border-bottom: 1px solid #ebeef5;
    padding-bottom: 20px;
    span {
      padding-bottom: 18px;
      box-shadow: #1890ff 0px 2px 0px;
    }
  }
  .dialog-body {
    padding: 0 20px;
    border-bottom: 1px solid #ebeef5;
    .service-name {
      font-size: 14px;
      color: #606266;
      margin-bottom: 10px;
      .alias-name {
        margin-left: 20px;
      }
      .name {
        color: #3691e9;
      }
    }
    .vector-cache {
      margin-bottom: 20px;
      .el-select {
        margin-right: 20px;
      }
    }
    .progress {
      .el-col {
        height: 26px;
        line-height: 26px;
      }
      .el-col:nth-child(1) {
        text-align: right;
      }
      margin-bottom: 20px;
    }
    .image-cache {
      margin-bottom: 20px;
      .el-select {
        margin-right: 20px;
      }
    }
    .el-table {
      margin-bottom: 20px;
    }
  }
  /deep/.el-dialog__body {
    border: none;
    padding: 10px 20px;
  }
}
</style>
