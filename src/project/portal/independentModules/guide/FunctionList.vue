<template>
  <div class="function-list">
    <div v-show="showPage=='list'">
      <el-row class="search">
        <span class="title">功能函数&nbsp;&gt;</span>
        <el-input :placeholder="'请输入方法名'" v-model="searchKey" @keyup.enter.native="search">
          <i slot="suffix" class="el-input__icon el-icon-search" v-show="searchKey.length===0"></i>
        </el-input>
      </el-row>
      <el-row class="content">
        <el-table :data="functionList" border>
          <el-table-column prop="functionName" label="方法名"></el-table-column>
          <el-table-column prop="functionDesc" label="描述"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="show-doc">
                <span @click="showDoc(scope.row.doc)">查看文档</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
    <div class="doc" v-show="showPage=='doc'">
      <i class="el-icon-close" @click="closeDoc"></i>
      <div class="params">
        <span class="doc-title-icon">{{docInfo.paramsDescTitle}}</span>
        <el-table :data="docInfo.paramsDesc" border>
          <el-table-column prop="paramsName" label="参数名"></el-table-column>
          <el-table-column prop="paramsType" label="参数类型"></el-table-column>
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
  import functionListConf from 'portal/independentModules/guide/config/functionListConf.js'
  import {filterArrayByString} from '@/utils/filterUtils.js'
  export default {
    name: "FunctionList",
    data(){
      return {
        searchKey:"",
        functionList:functionListConf,
        allList:functionListConf,
        showPage:"list",
        docInfo:{}
      }
    },
    methods:{
      closeDoc(){
        this.showPage="list";
      },
      showDoc(info){
        this.docInfo=info;
        this.showPage="doc";
      },
      search(){
        if(this.searchKey==""){
          this.functionList=this.allList;
        }
        else{
          this.functionList=filterArrayByString(this.allList,this.searchKey,'functionName');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .function-list {
    padding-top: 15px;
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
  .content{
    .el-table{
      width:98%;
      margin:10px auto;
    }
    .show-doc{
      // text-align: center;
      span{
        color:#129dfa;
        cursor: pointer;
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
</style>
