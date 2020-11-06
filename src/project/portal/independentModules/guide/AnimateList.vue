<template>
  <div class="animate-list">
    <div v-show="showPage=='list'">
      <el-row class="search">
        <span class="title">动画效果&nbsp;&gt;</span>
        <el-input :placeholder="'请输入动画名'" v-model="searchKey" @keyup.enter.native="search">
          <i slot="suffix" class="el-input__icon el-icon-search" v-show="searchKey.length===0"></i>
        </el-input>
      </el-row>
      <el-row>
        <el-col :span="6" v-for="(item,ix) in animateList" :key="ix" :class='{"animate-list-row":ix>3?true:false}'>
          <div class="container">
            <div class="img-container" :style="'background:'+item.imgBorderColor+';'">
              <el-image :src="item.img" :fit="'cover'">
                <div slot="placeholder" class="image-slot">
                  <span class="text">{{$t('myCenter.Loading')}}...</span>
                </div>
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline text"></i>
                </div>
              </el-image>
            </div>
            <div class="title">{{item.animateName}}</div>
            <div class="desc">{{item.animateDesc}}</div>
            <div class="btn-group">
              <i class="el-icon-view" @click="showPreview(item)">预览</i>
              <i class="el-icon-portal-wenjian1" @click="showDoc(item.doc)">文档</i>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="doc" v-show="showPage=='doc'">
      <i class="el-icon-close" @click="closeDoc"></i>
      <div class="params">
        <span class="doc-title-icon">{{docInfo.paramsDescTitle}}</span>
        <el-table :data="docInfo.paramsDesc" border>
          <el-table-column prop="paramsName" label="参数名"></el-table-column>
          <el-table-column prop="defalutValue" label="默认值"></el-table-column>
          <el-table-column prop="desc" label="说明"></el-table-column>
        </el-table>
      </div>
      <div class="import-path">
        <span class="doc-title-icon">{{docInfo.importPathTitle}}</span>
        <div>{{docInfo.importPath}}</div>
      </div>
      <div>
        <span class="doc-title-icon">{{docInfo.codeTitle}}</span>
        <div v-html="docInfo.code" class="code"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import animateListConf from 'portal/independentModules/guide/config/animateListConf.js'
  import {filterArrayByString} from '@/utils/filterUtils.js'
  export default {
    name: "AnimateList",
    data() {
      return {
        img: require('img/guide/lizi.png'),
        searchKey: "",
        animateList: animateListConf,
        allList:animateListConf,
        docInfo:{},
        docTableData: [],
        showPage:"list"
      }
    },
    methods: {
      search() {
        if(this.searchKey==""){
          this.animateList=this.allList;
        }
        else{
          this.animateList=filterArrayByString(this.allList,this.searchKey,'animateName');
        }
      },
      showDoc(doc){
        this.showPage="doc";
        this.docInfo=doc;
      },
      closeDoc(){
        this.showPage="list";
      },
      showPreview(info){
        this.$emit('showPreview',info);
      }
    }
  };
</script>
<style lang="scss" scoped>
  .animate-list {
    padding-top: 15px;
  }

  .container {
    margin: 0 auto;
    width: 90%;
    height: 280px;
    background: #fff;
    border-radius: 4px;
    .img-container {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      height: 150px;
      padding: 5%;
      .el-image {
        height: 100%;
        width: 100%;
      }
    }
    .title {
      height: 30px;
      line-height: 30px;
      color: #60BDE8;
      font-size: 15px;
      font-weight: bold;
      padding-left: 15px;
      margin-top: 6px;
      margin-bottom: 4px;
    }
    .desc {
      color: #838383;
      font-size: 14px;
      padding-left: 15px;
    }
  } 
  .animate-list-row{
    margin-top:24px;
  }
  //图片默认
  .image-slot {
    background: #f5f7fa;
    width: 100%;
    height: 100%;
    line-height: 100%;
    text-align: center;
    display: table;
    .text {
      font-size: 14px;
      color: #909399;
      display: table-cell;
      vertical-align: middle;
    }
    .el-icon-picture-outline {
      font-size: 26px;
    }
  }

  .btn-group {
    text-align: right;
    margin-top: 16px;
    i {
      font-size: 14px;
      margin-right: 10px;
      color: #909399;
      cursor: pointer;
      &:hover {
        color: #60BDE8;
      }
    }
  }

  .doc {
    width: 90%;
    margin: 0 auto;
    background: #fff;
    border-radius: 6px;
    position: relative;
    padding:0 2% 20px 2%;
    .doc-title-icon{
      border-left:4px solid #129dfa;
      display: inline-block;
      height:24px;
      line-height:24px;
      color:#129dfa;
      padding-left:10px;
      margin:18px 0;
      font-size:16px;
    }
    .el-icon-close{
      position: absolute;
      right:2%;
      top:18px;
      font-size:22px;
      color:#129dfa;
      font-weight: bold;
      cursor: pointer;
      &:hover{
        color:rgba(18, 157, 250,0.8);
      }
    }
    .import-path{
      color:#606266;
    }
  }

  .search {
    padding-left:14px;
    margin-bottom: 10px;
    height:40px;
    line-height: 40px;
    .title{
      font-size:16px;
      color:#242424;
    }
    .el-input {
      float:right;
      width: 300px;
    }
  }
</style>