<template>
  <div class="copyright-footer">
    <div class="copyright-footer-top">
      <el-row class="copyright-footer-top-content">
        <el-col :span="4" class="copyright-footer-top-help">
          <div class="title">
            {{$t('visualization.Help')}}
          </div>
          <ul>
            <li><span class="go-to" @click="goTo('/helpcenter',{path:'whatsNew'})">What's New</span></li>
            <li><span class="go-to" @click="goTo('/helpcenter',{path:'installationAndDeployment'})">{{$t('visualization.Installationanddeployment')}}</span></li>
            <li><span class="go-to" @click="goTo('/helpcenter',{path:'quickStart'})">{{$t('visualization.Quicktour')}}</span></li>
            <li><span class="go-to" @click="goTo('/helpcenter',{path:'resourcesAndSharing'})">{{$t('visualization.Resourceandsharing')}}</span></li>
            <li><span class="go-to" @click="goTo('/helpcenter',{path:'developmentEnvironmentPreparation'})">{{$t('visualization.Developmentandextension')}}</span></li>
          </ul>
        </el-col>
        <el-col :span="16" class="copyright-footer-top-develop">
          <div class="develop-container">
            <div class="title">
              {{$t('visualization.Development')}}
            </div>
            <el-row>
              <el-col :span="8">
                <ul>
                  <li>{{$t('visualization.MapAPI')}}</li>
                  <li>{{$t('visualization.DataAPI')}}</li>
                  <li>{{$t('visualization.ThreeDAPI')}}</li>
                </ul>
              </el-col>
              <el-col :span="8">
                <ul>
                  <li>{{$t('visualization.Coordinatetransformation')}}</li>
                  <li>{{$t('visualization.Differenceanalysis')}}</li>
                  <li>{{$t('visualization.Symmetricdifference')}}</li>
                  <li>{{$t('visualization.Graphicscheck')}}</li>
                  <li>{{$t('visualization.Graphicscombination')}}</li>
                  <li>{{$t('visualization.Bufferanalysis')}}</li>
                </ul>
              </el-col>
              <el-col :span="8">
                <ul>
                  <li>SDK for JavaScript</li>
                  <li>SDK for Python</li>
                  <li>SDK for Andriod</li>
                  <li>SDK for IOS</li>
                </ul>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="4" class="copyright-footer-top-app">
          <div class="app-container">
            <div class="title">
              {{$t('webAppBuilder.Apps')}}
            </div>
            <ul>
              <li><span class="go-to" @click="goTo('/mapbuilder')">{{$t('management.Mapping')}}</span></li>
              <li><span class="go-to" @click="goTo('/sceneBuilder')">{{$t('visualization.ThreeDscene')}}</span></li>
              <li><span class="go-to" @click="goTo('/dashboardbuilder')">{{$t('indexPage.bigScreen')}}</span></li>
              <li><span class="go-to" @click="goTo('/appbuilder')">{{$t('visualization.Appcustomization')}}</span></li>
            </ul>
          </div>
        </el-col>
        <!-- <el-col :span="4" class="copyright-footer-top-contact">
          <div class="title">
            {{$t('visualization.Contactus')}}
          </div>
          <ul>
            <li>010-85271488</li>
            <li>
              <a href="http://www.kqgeo.com/Contact/index.aspx?nid=5" target="_blank">{{$t('visualization.Servicenetwork')}}</a>
            </li>
            <li>
              <a href="http://www.kqgeo.com/Contact/Recruit.aspx?nid=5&pid=40" target="_blank">{{$t('visualization.Joinus')}}</a>
            </li>
            <li>{{$t('visualization.Email')}}</li>
            <li>
              <a href="http://www.kqgps.com/" target="_blank">{{$t('visualization.OfficialwebsiteofKQGEOInstrumentCoLtd')}}</a>
            </li>
          </ul>
        </el-col> -->
      </el-row>
    </div>
    <div class="copyright-footer-bottom">
      <div class="copyright-footer-bottom-text">
        <div class="copyright-desc">
          <span v-if="!propsConf.copyRightText">
            <span>{{$t('visualization.CopyrightKQGEOTechnologiesAllrightsreserved')}}</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{$t('visualization.KQGEOTechnologiesCoLtd')}}</span>
            <el-divider direction="vertical" class="sep"></el-divider>
            <span>京ICP备05037423号</span>
          </span>
          <span v-else v-html="propsConf.copyRightText"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexCopyrightFooter",
  props:{
    propsConf:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  methods:{
    goTo(path,params){
      let to={};
      to.path=path;
      if(params){
        to.query=params;
      }
      this.$router.push(to);
    }
  }
};
//propsConf.copyRightText
</script>

<style lang='scss' scoped>
  
  .copyright-footer{
    background:#273142;
    height:370px;
    .copyright-footer-top{
      height:300px;
      box-sizing: border-box;
      padding-top:25px;
      .copyright-footer-top-content{
        width: 84%;
        height:250px;
        margin:0px auto;
        color:#fff;
        .el-col{
          height:250px;
          .title{
            font-size:18px;
            @include base-active-color();
          }
          ul{
            list-style: none;
            margin:0;
            padding:0;
            margin-top:10px;
            li{
              line-height:34px;
              font-size:14px;
              a{
                text-decoration: none;
                color:#fff;
                &:hover{
                  @include base-active-color();
                }
              }
            }
            .go-to{
              cursor: pointer;
              &:hover{
                @include base-active-color();
              }
            }
          }
        }
        .copyright-footer-top-help{
          border-right:1px solid rgba(255,255,255,.1);
          text-align: center;
        }
        .copyright-footer-top-develop{
          border-right:1px solid rgba(255,255,255,.1);
          .develop-container{
            width:80%;
            margin:0 auto;
          }
        }
        .copyright-footer-top-app{
          // border-right:1px solid rgba(255,255,255,.1);
          text-align:center;
          .app-container{
            text-align: left;
            display: inline-block;
          }
        }
        .copyright-footer-top-contact{
          text-align:right;
        }
      }
    }
    .copyright-footer-bottom{
      height:70px;
      .copyright-footer-bottom-text{
        display:table;
        box-sizing: border-box;
        height:70px;
        width:84%;
        margin:0 auto;
        border-top:1px solid rgba(255,255,255,.1);
        color:#fff;
        font-size:14px;
        .copyright-desc{
          display:table-cell;
          vertical-align: middle;
          text-align: center;
          .el-divider{
            margin:0 5%;
          }
        }
      }
    }
    // background: $indexFooterBg;
    // color:$baseFontColor;
    // border-top:1px solid #d4d4d4;
    // height:50px;
    // width: 100%;
    // display:table;
    // .copyright{
    //   display:table-cell;
    //   vertical-align: middle;
    //   text-align: center;
    //   font-size:14px;
    // }
  }
</style>