<template>
  <div class="portal-online">
    <div class="index-header-carousel">
      <el-carousel trigger="click" height="620px">
        <el-carousel-item v-for="(item,index) in imgList" :key="index">
          <img :src="item.url" alt />
          <div class="carousel-img">
            <h1>{{item.title}}</h1>
            <p>{{item.describe}}</p>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="index-header-functions-services">
      <div class="title">功能与服务</div>
      <div class="functions-services-box">
        <div class="gis-cloud">
          <div class="storage-img">
            <img src="config/imageConfig/system/portalOnline/gisCloud/ycc.png" alt />
          </div>
          <p class="storage-title">GIS云储存</p>
          <div class="storage-desc">
            <span>在云端存储空间数据，并以地图切片、数据查询、编辑等方式，对空间数据进行在线管理和应用，省去本地管理的麻烦</span>
          </div>
        </div>
        <div class="gis-cloud">
          <div class="storage-img">
            <img src="config/imageConfig/system/portalOnline/gisCloud/yfx.png" alt />
          </div>
          <p class="storage-title">GIS云分析</p>
          <div class="storage-desc">
            <span>提供多种分析和算法模型，利用云端强大的数据计算运力，为商业选址、货物配送、经济统计、社会变迁等提供辅助决策分析</span>
          </div>
        </div>
        <div class="gis-cloud">
          <div class="storage-img">
            <img src="config/imageConfig/system/portalOnline/gisCloud/yyy.png" alt />
          </div>
          <p class="storage-title">GIS云应用</p>
          <div class="storage-desc">
            <span>数据上图/数据洞察/地图大屏/三维地球，在二三维地图上快速展示和分析您的数据；数据编辑，在线编辑更新数据</span>
          </div>
        </div>
      </div>
      <div class="separator">
        <i></i>
      </div>
      <div class="functions-services-box">
        <div class="gis-cloud">
          <div class="storage-img">
            <img src="config/imageConfig/system/portalOnline/gisCloud/dtyx.png" alt />
          </div>
          <p class="storage-title">地图影像</p>
          <div class="storage-desc">
            <span>更多精彩地理数据等你发现</span>
          </div>
        </div>
        <div class="gis-cloud">
          <div class="storage-img">
            <img src="config/imageConfig/system/portalOnline/gisCloud/zwdzk.png" alt />
          </div>
          <p class="storage-title">中文地址库</p>
          <div class="storage-desc">
            <span>直接在线使用，或定制私有化部署</span>
          </div>
        </div>
        <div class="gis-cloud">
          <div class="storage-img">
            <img src="config/imageConfig/system/portalOnline/gisCloud/dhsj.png" alt />
          </div>
          <p class="storage-title">导航数据</p>
          <div class="storage-desc">
            <span>直接在线使用，或定制私有</span>
          </div>
        </div>
      </div>

      <div class="index-header-development">
        <div class="title">开发</div>
        <div class="title-min">覆盖专业GIS功能的丰富的在线API和客户端SDK，助力多端应用开发</div>
        <div class="development-box">
          <div class="gis-cloud">
            <div class="development-title">
              <span>HTTP API--SuperMap GIS服务标准REST API</span>
            </div>
            <p class="storage-title">GIS云储存API</p>
            <div class="storage-desc">地图API</div>
            <div class="storage-desc">数据API</div>
            <div class="storage-desc">三维API</div>
          </div>
          <div class="gis-cloud">
            <div class="development-title">
              <span>HTTP API--SuperMap GIS服务标准REST API</span>
            </div>
            <p class="storage-title">GIS云分析API</p>
            <div class="storage-desc">路径导航</div>
            <div class="storage-desc">地理编码</div>
            <div class="storage-desc">逆地理编码</div>
            <div class="storage-desc">公交换乘</div>
          </div>
          <div class="gis-cloud">
            <div class="development-title">
              <span>HTTP API--SuperMap GIS服务标准REST API</span>
            </div>
            <p class="storage-title">GIS云应用API</p>
            <div class="storage-desc">坐标转换</div>
            <div class="storage-desc">本地搜索</div>
            <div class="storage-desc">标汇服务</div>
          </div>
        </div>
      </div>

      <div class="index-header-sdk">
        <div class="sdk-title">客户端SDK--多种SDK协助简化您的GIS开发</div>
        <div class="sdk-box">
          <div>FOR JAVASCRIPT SDK</div>
          <div>FOR PYTHON SDK</div>
          <div>CUSTOMERS</div>
          <div>FOR IOS SDK</div>
        </div>
      </div>
      <div class="index-header-footer">
        <div>Copyright © 2020 苍穹数码技术股份有限公司 All rights reserved</div>
      </div>
      <!-- <index-copyright-footer></index-copyright-footer> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexContent",
  data() {
    return {
      imgList: [
        {
          url:
            "config/imageConfig/system/portalOnline/theme/defaultTheme/chinese/carousel/carousel1.jpg",
          title: "苍穹在线GIS平台",
          describe:
            "基于KQGIS Portal打造，提供GIS数据智能服务，赋能合作伙伴共创在线GIS应用生态"
        },
        {
          url:
            "config/imageConfig/system/portalOnline/theme/defaultTheme/chinese/carousel/carousel2.jpg",
          title: "卫星遥感和数据增值服务解决方案",
          describe: "由阿里云基础设施提供支持"
        },
        {
          url:
            "config/imageConfig/system/portalOnline/theme/defaultTheme/chinese/carousel/carousel3.jpg",
          title: "云测数据：场景化、精细化、安全合规的数据助力AI落地",
          describe: "智能化时代已经到来，智慧化时代终将遇见"
        }
      ]
    };
  }
};
</script>

<style lang='scss' scoped>
.portal-online {
  /deep/.el-carousel {
    overflow: hidden;
    position: relative;
    img {
      height: 620px;
      position: absolute;
      left: 50%;
      margin-left: -960px;
      width: 1920px;
    }
    .el-carousel__button {
      background-color: #f0ae51;
      width: 38px;
      height: 6px;
    }
    .carousel-img {
      position: absolute;
      top: 240px;
      left: 100px;
      width: 400px;
      h1 {
        color: #f0ae51;
      }
      p {
        color: #fff;
        line-height: 28px;
        font-size: 18px;
      }
    }
  }
  .index-header-functions-services {
    height: 860px;
    box-sizing: border-box;
    padding-top: 192px;
    .title {
      font-size: 24px;
      color: #242424;
      text-align: center;
      font-weight: 600;
    }
    .functions-services-box {
      margin-top: 90px;
      text-align: center;
      .gis-cloud {
        display: inline-block;
        height: 300px;
        width: 372px;
        vertical-align: middle;
        cursor: pointer;
        .storage-img {
          img {
            width: 100px;
            height: 100px;
          }
        }
        .storage-title {
          padding: 0;
          margin: 10px 0 0;
          height: 38px;
          line-height: 38px;
          text-align: center;
          font-size: 18px;
        }
        .storage-desc {
          font-size: 13px;
          color: #4c4c4c;
          padding: 0 18px;
          line-height: 24px;
        }
      }
    }
    .separator {
      text-align: center;
      i {
        display: inline-block;
        height: 1px;
        width: 1072px;
        background: #e7e7e9;
        vertical-align: middle;
      }
    }
  }
  .index-header-development {
    height: 800px;
    box-sizing: border-box;
    padding-top: 100px;
    .title {
      font-size: 24px;
      color: #242424;
      text-align: center;
    }
    .title-min {
      color: #242424;
      text-align: center;
      margin-top: 26px;
      font-size: 13px;
    }
    .development-box {
      margin-top: 90px;
      text-align: center;
      .gis-cloud {
        border: 2px solid #666666;
        border-radius: 4px;
        background-color: #3b3b3b;
        color: #fff;
        display: inline-block;
        height: 448px;
        width: 344px;
        vertical-align: middle;
        margin: 0 15px;
        .storage-desc {
          padding: 18px 18px 0;
        }
        .development-title {
          padding: 54px 24px 36px;
          text-align: center;
          color: #f0ae51;
          line-height: 24px;
        }
        p.storage-title {
          margin: 0 0 50px;
          font-weight: 900;
          font-size: 43px;
        }
      }
    }
  }
  .index-header-sdk {
    height: 182px;
    box-sizing: border-box;
    background-color: #3b3b3b;
    margin-bottom: 120px;
    color: #fff;
    .sdk-title {
      padding: 52px 0 42px 18px;
      color: #f0ae51;
    }
    .sdk-box {
      text-align: center;
      div {
        padding: 0 71px;
        display: inline-block;
      }
    }
  }
  .index-header-footer {
    height: 120px;
    line-height: 120px;
    text-align: center;
    box-sizing: border-box;
    background-color: #3b3b3b;
    color: #fff;
  }
}
</style>