<template>
  <div>
    <div class="top">
      更新日志
    </div>
    <div class="main">
      <div class="main-top">
        <ul>
          <li class="main-left">2.1</li>
          <li class="main-right">2020-08-12</li>
        </ul>
      </div>
      <div class="main-botton">
        <ul>
          <li>1、新增功能权限配置</li>
          <li>2、新增文件代码级别覆盖portal默认路由、删除路由的机制。</li>
          <li>3、支持portal内置独立路由比如（登录、404）等功能的覆盖。</li>
          <li>4、前端二次开发手册已完善</li>
          <li>5、新增了tab页签，放入路由中配置的功能</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {

  }
</script>
<style lang="scss" scoped>
  * {
    margin: 0;
    padding: 0;
  }

  ul li {
    list-style: none;
  }

  .top {
    width: 90%;
    height: 120px;
    line-height: 120px;
    font-size: 24px;
    margin: 0 auto;
    color: #606266;
  }

  .main {
    width: 90%;
    min-height: 300px;
    margin: 0 auto;
    box-sizing: border-box;
    border: 1px solid #ccc;

    .main-top {
      width: 100%;
      height: 60px;
      border-bottom: 1px solid #ccc;

      ul {
        li {
          height: 60px;
          line-height: 60px;
          font-size: 16px;
          color: #606266;
        }

        .main-left {
          float: left;
          margin-left: 30px;
        }

        .main-right {
          float: right;
          margin-right: 30px;
        }
      }
    }

    .main-botton {
      ul {
        padding: 20px 40px;
        box-sizing: border-box;

        li {
          height: 40px;
          line-height: 40px;
          font-size: 16px;
          color: #606266;
        }
      }


    }
  }
</style>