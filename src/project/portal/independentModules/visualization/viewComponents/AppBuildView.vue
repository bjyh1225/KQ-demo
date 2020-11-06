<template>
  <div class="app-build" :class="{'app-build-mini':pageStatus=='drag'}">
    <div class="title">{{$t('visualization.Createapp')}}</div>
    <div class="display-area">
      <div class="box">
        <div class="front">
          <div class="front-img">
            <div class="front-icon map-icon"></div>
          </div>
          <p class="front-title">{{$t('myCenter.Createmap')}}</p>
          <div class="front-desc">
            <span>{{$t('visualization.Youcanviewonyourbrowserdesktopandmobiledevice')}}</span>
          </div>
        </div>
        <div class="back">
          <p class="back-title">{{$t('myCenter.Createmap')}}</p>
          <div class="back-desc">
            <span>{{$t('visualization.Youcanviewonyourbrowserdesktopandmobiledevice')}}</span>
          </div>
          <div class="back-button">
            <el-button class="base-linear-btn">{{$t('management.ViewDetails')}}</el-button>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="front">
          <div class="front-img">
            <div class="front-icon scene-icon"></div>
          </div>
          <p class="front-title">{{$t('myCenter.Addscene')}}</p>
          <div class="front-desc">
            <span>{{$t('visualization.Addyourowndatatothescene')}}</span>
          </div>
        </div>
        <div class="back">
          <p class="back-title">{{$t('myCenter.Addscene')}}</p>
          <div class="back-desc">
            <span>{{$t('visualization.Addyourowndatatothescene')}}</span>
          </div>
          <div class="back-button">
            <el-button class="base-linear-btn">{{$t('management.ViewDetails')}}</el-button>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="front">
          <div class="front-img">
            <div class="front-icon screen-icon"></div>
          </div>
          <p class="front-title">{{$t('myCenter.Makebigscreen')}}</p>
          <div class="front-desc">
            <span>{{$t('visualization.Makeyourownbigscreenofdataandstatistics')}}</span>
          </div>
        </div>
        <div class="back">
          <p class="back-title">{{$t('myCenter.Makebigscreen')}}</p>
          <div class="back-desc">
            <span>{{$t('visualization.Makeyourownbigscreenofdataandstatistics')}}</span>
          </div>
          <div class="back-button">
            <el-button class="base-linear-btn">{{$t('management.ViewDetails')}}</el-button>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="front">
          <div class="front-img">
            <div class="front-icon app-icon"></div>
          </div>
          <p class="front-title">{{$t('webAppBuilder.CustomApplication')}}</p>
          <div class="front-desc">
            <span>{{$t('visualization.Createyourownappsfromyourdata')}}</span>
          </div>
        </div>
        <div class="back">
          <p class="back-title">{{$t('webAppBuilder.CustomApplication')}}</p>
          <div class="back-desc">
            <span>{{$t('visualization.Createyourownappsfromyourdata')}}</span>
          </div>
          <div class="back-button">
            <el-button class="base-linear-btn">{{$t('management.ViewDetails')}}</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"AppBuildView",
  props: {
    pageStatus: {
      type: String,
      default: "real"
    }
  },
}
</script>

<style lang="scss" scoped>
  
  .app-build{
    height:460px;
    background: #f8f8f8;
    box-sizing: border-box;
    padding-top:60px;
    .title{
      font-size:24px;
      color:#242424;
      text-align: center;
      margin-bottom:40px;
    }
    .display-area{
      text-align: center;
      .box{
        display: inline-block;
        height:260px;
        width:220px;
        background: #f8f8f8;
        position: relative;
        vertical-align: middle;
        cursor: pointer;
        .front{
          height: 100%;
          width:100%;
          background: #fff;
          transition: transform 1s;
          @include base-active-underline($width:2px,$types:('bottom'));
          .front-img{
            height:126px;
            line-height: 126px;
            background: #fff;
            text-align: center;
            .front-icon{
              display: inline-block;
              vertical-align: middle;
              width: 126px; 
              height: 108px;
              @include home-app-build-icon();
            }
            .map-icon{
              background-position:-156px -10px;
            }
            .app-icon{
              background-position:-10px -10px;
            }
            .scene-icon{
              background-position:-10px -138px;
            }
            .screen-icon{
              background-position:-156px -138px;
            }
          }
          .front-title{
            padding:0;
            margin:0;
            height:38px;
            line-height:38px;
            text-align: center;
            font-size:18px;
            @include base-active-color();
          }
          .front-desc{
            font-size:13px;
            color:#4c4c4c;
            padding:0 18px;
            line-height:24px;
          }
        }
        .back{
          height: 100%;
          width:100%;
          background: #fff;
          position: absolute;
          top:0;
          left:0;
          z-index:1;
          transition: transform 1s;
          transform: rotateY(-180deg);
          backface-visibility: hidden;
          @include base-active-underline($width:2px,$types:('bottom'));
          .back-title{
            padding:0;
            margin:0;
            padding-top:40px;
            height:38px;
            line-height:38px;
            text-align: center;
            font-size:18px;
            @include base-active-color();
          }
          .back-desc{
            font-size:13px;
            color:#4c4c4c;
            padding:0 18px;
            line-height:24px;
          }
          .back-button{
            margin-top:26px;
            .el-button{
              width:120px;
              height:34px;
              line-height: 32px;
              padding:0;
              text-align: center;
            }
          }
        }
        &:hover{
          .front{
            transform: rotateY(180deg);
          }
          .back{
            transform: rotateY(0deg);
          }
        }
      }
      .box:nth-child(1){
        margin-right:70px;
      }
      .box:nth-child(2){
        margin-right:70px;
      }
      .box:nth-child(3){
        margin-right:70px;
      }
    }
  }

  //迷你视图
  .app-build-mini{
    height:460px;
    background: #f8f8f8;
    box-sizing: border-box;
    padding-top:60px;
    .title{
      font-size:24px;
      color:#242424;
      text-align: center;
      margin-bottom:40px;
    }
    .display-area{
      text-align: center;
      .box{
        display: inline-block;
        height:260px;
        width:200px;
        background: #f8f8f8;
        position: relative;
        vertical-align: middle;
        cursor: pointer;
        .front{
          height: 100%;
          width:100%;
          background: #fff;
          transition: transform 1s;
          @include base-active-underline($width:2px,$types:('bottom'));
          .front-img{
            height:126px;
            line-height: 126px;
            background: #fff;
            text-align: center;
            .front-icon{
              display: inline-block;
              vertical-align: middle;
              width: 126px; 
              height: 108px;
              @include home-app-build-icon();
            }
            .map-icon{
              background-position:-156px -10px;
            }
            .app-icon{
              background-position:-10px -10px;
            }
            .scene-icon{
              background-position:-10px -138px;
            }
            .screen-icon{
              background-position:-156px -138px;
            }
          }
          .front-title{
            padding:0;
            margin:0;
            height:38px;
            line-height:38px;
            text-align: center;
            font-size:18px;
            @include base-active-color();
          }
          .front-desc{
            font-size:13px;
            color:#4c4c4c;
            padding:0 18px;
            line-height:24px;
          }
        }
        .back{
          height: 100%;
          width:100%;
          background: #fff;
          position: absolute;
          top:0;
          left:0;
          z-index:1;
          transition: transform 1s;
          transform: rotateY(-180deg);
          backface-visibility: hidden;
          @include base-active-underline($width:2px,$types:('bottom'));
          .back-title{
            padding:0;
            margin:0;
            padding-top:40px;
            height:38px;
            line-height:38px;
            text-align: center;
            font-size:18px;
            @include base-active-color();
          }
          .back-desc{
            font-size:13px;
            color:#4c4c4c;
            padding:0 18px;
            line-height:24px;
          }
          .back-button{
            margin-top:26px;
            .el-button{
              width:120px;
              height:34px;
              line-height: 32px;
              padding:0;
              text-align: center;
            }
          }
        }
        &:hover{
          .front{
            transform: rotateY(180deg);
          }
          .back{
            transform: rotateY(0deg);
          }
        }
      }
      .box:nth-child(1){
        margin-right:40px;
      }
      .box:nth-child(2){
        margin-right:40px;
      }
      .box:nth-child(3){
        margin-right:40px;
      }
    }
  }
</style>