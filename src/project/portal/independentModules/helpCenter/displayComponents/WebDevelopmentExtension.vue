<template>
  <div style="padding:0 20px;">
    <div class="container">
      <div class="title">1、KQGIS Portal前端技术介绍</div>
      <div class="content">portal前端是基于es6+vue+elementui+sass进行开发的，使用的打包工具是webpack，与后端进行请求交互使用的是axios。具体版本与其他插件使用情况，请阅读package.json文件。</div>
    </div>
    <div class="container">
      <div class="title">2、基于KQGIS Portal开发前的说明</div>
      <div class="content">因portal是属于灵活化的二次开发框架，我们建议在进行二次开发时变量的命名最好标记上自己的项目，以免变量污染。如项目名：HelloWorld，新建一个新闻的路由，命名为：HelloWorldNews</div>
    </div>
    <div class="container">
      <div class="title">3、如何基于KQGIS Portal前端开始开发</div>
      <div class="content">新建一个文件夹在src/project/independentModules路径下，文件夹命名为项目名，如HelloWorld。不建议直接在src/project/portal文件夹内新建功能，修改功能，如果发生修改portal文件夹平台将不做更新</div>
    </div>
    <div class="container">
      <div class="title">4、如何启动KQGIS Portal 前端</div>
      <div class="content">
        ①初次启动使用npm install命令进行包的安装，如果遇到包安装失败，请安装淘宝镜像或使用手机4G网络开热点进行安装。<br>
        ②包安装完毕后，修改.env.development文件中的后端地址，然后使用npm run serve即可启动开发环境下的portal前端。
      </div>
    </div>
    <div class="container">
      <div class="title">5、如何打包KQGIS Portal 前端</div>
      <div class="content">包安装完毕后，修改.env.production文件中NODE_ENV = 'production'，然后使用npm run build进行打包，会在目录下生成dist文件夹，将dist文件夹部署至服务器即可，如使用nginx等需要配置后端代理地址。</div>
    </div>
    <div class="container">
      <div class="content">详细的KQGIS Portal前端的开发指南，<span class="inner-link" @click="innerGoTo">请查看附录<i class="el-icon-right"></i>KQGISPortal前端二次开发手册</span></div>
    </div>
  </div>
</template>
<script>
export default {
  name:"WebDevelopmentExtension",
  methods:{
    innerGoTo(){
      this.$emit("innerGoTo","appendix");
    }
  }
}
</script>
<style lang="scss" scoped>
  
  .container{
    margin-bottom:20px;
    .title{
      font-size:16px;
      font-weight: 400;
      color: #1f2f3d;
      margin-bottom:16px;
    }
    .content{
      font-size: 14px;
      color:#606266;
      line-height:24px;
    }
    .inner-link{
      cursor: pointer;
      @include base-active-color();
    }
  }
</style>
