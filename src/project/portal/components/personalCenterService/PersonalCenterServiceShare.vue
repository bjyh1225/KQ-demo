<template>
  <div :class="classMarkShare?'class-mark-share':'service-share'">
    <div class='outline-share' v-if='!hiddenState'>
      <i class='el-icon-warning'></i>
      <span> {{$t('management.Theresourceishidednow')}}</span>
    </div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane :label="$t('myCenter.Private')" name="open">
        <el-checkbox v-model="personalCheck">{{$t('myCenter.Onlyvisibletomyself')}}</el-checkbox>
      </el-tab-pane>
      <el-tab-pane :label="$t('myCenter.Sharetopublic')" name="group-owner">
        <el-checkbox-group v-model="checkList" @change="groupChange">
          <el-checkbox label="1">{{$t('myCenter.Allowquerybyallusers')}}</el-checkbox>
          <el-checkbox
            label="2"
            :disabled="groupywBrowseCheck"
          >{{$t('myCenter.Allowviewbyallusers')}}</el-checkbox>
          <el-checkbox
            label="3"
            :disabled="groupywEditCheck"
          >{{$t('myCenter.Alloweditbyallloggedinusers')}}</el-checkbox>
        </el-checkbox-group>
      </el-tab-pane>
      <el-tab-pane :label="$t('service.Partialauthorization')" name="part" class="user">
        <el-row :gutter="30">
          <el-col :span="8">
            <!-- 维度选择 -->
            <el-row class="dimension">
              <div class="dimension-head">
                <el-input :placeholder="$t('myCenter.Inputkeywordstofilter')" v-model="filterText"></el-input>
              </div>
              <div class="dimension-tail">
                <el-tree
                  :data="ShareTree"
                  show-checkbox
                  node-key="onlyId"
                  :default-expanded-keys="expandedKeys"
                  :default-checked-keys="checkedKey"
                  :props="defaultProps"
                  :render-content="renderContent"
                  :filter-node-method="filterNode"
                  @check-change="handleCheckChange"
                  ref="tree"
                ></el-tree>
              </div>
            </el-row>
          </el-col>
          <el-col :span="16">
            <el-table border :data="tableData" style="width: 100%">
              <el-table-column min-width="13%" prop="name">
                <template slot-scope slot="header">
                  <el-popover
                    placement="bottom"
                    :width="inputWidth"
                    trigger="click"
                    :visible-arrow="false"
                    v-model="visibleNames"
                    :popper-class="'login-dialog'"
                  >
                  <input v-model="nameSearch" class='inputs' ref='input'/>
                    <!-- <el-input
                      suffix-icon="el-icon-search"
                      v-model="nameSearch"
                      @input='blurInput'
                      ref='input'
                      :placeholder="$t('myCenter.PleaseEnterTheContent')"
                    ></el-input> -->
                    <div class="button-box">
                      <span @click="screenFun('name')">{{$t('myCenter.Filter')}}</span>
                      <span @click="resetFun('name')">{{$t('myCenter.Reset')}}</span>
                      <!-- <el-button
                        type="text"
                        v-bind:disabled="disabledName"
                        @click="screenFun('name')"
                        :class="darkDisabledName?'dark-sink':''"
                      >{{$t('myCenter.Filter')}}</el-button>
                      <el-button type="text" @click="resetFun('name')">{{$t('myCenter.Reset')}}</el-button> -->
                    </div>
                    <span slot="reference" :class="resetName?'reset-css':''">
                      {{$t('myCenter.Name')}}
                      <i class="el-icon-arrow-down"></i>
                    </span>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="department" :min-width="departmentWidth">
                <template slot="header" slot-scope>
                  <el-popover
                    placement="bottom"
                    :width="inputWidth"
                    trigger="click"
                    :visible-arrow="false"
                    v-model="visibleDepartment"
                    :popper-class="'login-dialog'"
                  >
                  <input v-model="departmentSearch" class='inputs' ref='inputdepart'/>
                    <!-- <el-input suffix-icon="el-icon-search" v-model="departmentSearch"></el-input> -->
                    <div class="button-box"><span @click="screenFun('department')">{{$t('myCenter.Filter')}}</span>
                      <span @click="resetFun('department')">{{$t('myCenter.Reset')}}</span>

                      <!-- <el-button
                        type="text"
                        :disabled="disabled"
                        @click="screenFun('department')"
                        :class="darkDisabled?'dark-sink':''"
                      >{{$t('myCenter.Filter')}}</el-button>
                      <el-button
                        type="text"
                        @click="resetFun('department')"
                      >{{$t('myCenter.Reset')}}</el-button> -->
                    </div>
                    <span slot="reference" :class="resetDepartment?'reset-css':''">
                      {{$t('myCenter.Department')}}
                      <i class="el-icon-arrow-down"></i>
                    </span>
                  </el-popover>
                </template>
                <template slot-scope="scope">
                  {{scope.row.department}}
                  <div v-if="scope.row.department==''?true:false" class="department-slash"></div>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('myCenter.Type')"
                min-width="13%"
                prop="type"
                :filters="[{text: this.$t('myCenter.Personal'), value: this.$t('myCenter.Personal')},{text: this.$t('myCenter.Group'), value: this.$t('myCenter.Group')}]"
                :filter-method="filterHandler"
              ></el-table-column>
              <el-table-column :min-width="ywSearchWidth">
                <template slot="header" slot-scope="scope">
                  <el-popover
                    placement="bottom"
                    :width="shareWidth"
                    trigger="click"
                    :visible-arrow="false"
                    v-model="visibleywSearch"
                    :popper-class="'login-dialog'"
                  >
                    <el-radio-group v-model="radioywSearch">
                      <el-radio :label="1">{{$t('myCenter.Allisretrievable')}}</el-radio>
                      <el-radio :label="0">{{$t('myCenter.Allisnotretrievable')}}</el-radio>
                    </el-radio-group>
                    <div class="button-box">
                      <el-button
                        type="text"
                        @click="saveRadio('ywSearch',scope)"
                      >{{$t('myCenter.Sure')}}</el-button>
                      <el-button
                        type="text"
                        @click="cancelRadio('ywSearch')"
                      >{{$t('myCenter.cancel')}}</el-button>
                    </div>
                    <span slot="reference">
                      {{$t('myCenter.Retrievable')}}
                      <i class="el-icon-arrow-down"></i>
                    </span>
                  </el-popover>
                </template>
                <template slot-scope="scope">
                  <i
                    data-id="1"
                    @click="retrievable(scope.row,'1')"
                    :class="[scope.row.ywSearchCheck?'el-icon-check':'el-icon-close',scope.row.ywSearchShow?'active':'prohibit']"
                  ></i>
                </template>
              </el-table-column>
              <el-table-column :min-width="ywBrowseWidth">
                <template slot="header" slot-scope="scope">
                  <el-popover
                    placement="bottom"
                    :width="shareWidth"
                    trigger="click"
                    :visible-arrow="false"
                    v-model="visibleywBrowse"
                    :popper-class="'login-dialog'"
                  >
                    <el-radio-group v-model="radioywBrowse">
                      <el-radio :label="1">{{$t('myCenter.Allisbrowsable')}}</el-radio>
                      <el-radio :label="0">{{$t('myCenter.Allisnotbrowsable')}}</el-radio>
                    </el-radio-group>
                    <div class="button-box">
                      <el-button
                        type="text"
                        @click="saveRadio('ywBrowse',scope)"
                      >{{$t('myCenter.Sure')}}</el-button>
                      <el-button
                        type="text"
                        @click="cancelRadio('ywBrowse')"
                      >{{$t('myCenter.cancel')}}</el-button>
                    </div>
                    <span slot="reference">
                      {{$t('myCenter.Browsable')}}
                      <i class="el-icon-arrow-down"></i>
                    </span>
                  </el-popover>
                </template>
                <template slot-scope="scope">
                  <i
                    data-id="2"
                    @click="retrievable(scope.row,'2')"
                    :class="[scope.row.ywBrowseCheck?'el-icon-check':'el-icon-close',scope.row.ywBrowseShow?'active':'prohibit']"
                  ></i>
                </template>
              </el-table-column>
              <el-table-column :min-width="ywEditWidth">
                <template slot="header" slot-scope="scope">
                  <el-popover
                    placement="bottom"
                    :width="shareWidth"
                    trigger="click"
                    :visible-arrow="false"
                    v-model="visibleywEdit"
                    :popper-class="'login-dialog'"
                  >
                    <el-radio-group v-model="radioywEdit">
                      <el-radio :label="1">{{$t('myCenter.Alliseditable')}}</el-radio>
                      <el-radio :label="0">{{$t('myCenter.Allisnoteditable')}}</el-radio>
                    </el-radio-group>
                    <div class="button-box">
                      <el-button
                        type="text"
                        @click="saveRadio('ywEdit',scope)"
                      >{{$t('myCenter.Sure')}}</el-button>
                      <el-button
                        type="text"
                        @click="cancelRadio('ywEdit')"
                      >{{$t('myCenter.cancel')}}</el-button>
                    </div>
                    <span slot="reference">
                      {{$t('myCenter.Editable')}}
                      <i class="el-icon-arrow-down"></i>
                    </span>
                  </el-popover>
                </template>
                <template slot-scope="scope">
                  <i
                    data-id="3"
                    @click="retrievable(scope.row,'3')"
                    :class="[scope.row.ywEditCheck?'el-icon-check':'el-icon-close',scope.row.ywEditShow?'active':'prohibit']"
                  ></i>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getTree } from "@/utils/getTree.js";
import { filterTreeArrayByString } from "@/utils/filterUtils.js";
import { setTimeout } from "timers";
export default {
  name: "PersonalCenterServiceShare",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    batchDialogVisible: {
      type: Boolean,
      default: false
    },
    sharingDialogVisible: {
      type: Boolean,
      default: false
    },
    classMarkShare: {
      //应用定制的类
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  data() {
    return {
      hiddenState:true,//是否为隐藏状态
      ywEditWidth: "15%",
      ywBrowseWidth: "15%",
      ywSearchWidth: "15%",
      departmentWidth: "25%",
      inputWidth: 100,
      shareWidth: 100,
      openReset: false, //开启重置
      inputScreen: "", //inp框填入的内容
      resetName: false, //名称重置样式
      resetDepartment: false, //部门重置样式
      filterText: "", //搜索框值
      activeName: "open", //top栏
      personalCheck: true, //仅个人可见复选
      ShareTree: [], //整树
      expandedKeys: [], //默认展开的节点
      checkedKey: [], //默认选中的节点
      personnelDetailDtoList: [], //个人 人员
      personnelGroupDtoList: [], //群组 人员
      nameSearch: "",
      departmentSearch: "",
      groupywBrowseCheck: true, //公开  复选框禁用
      groupywEditCheck: true,
      disabled: true, //筛选禁用
      disabledName: true,
      darkDisabled: true, //筛选样式
      darkDisabledName: true,
      visibleDepartment: false, //弹框隐藏
      visibleNames: false,
      visibleywSearch: false,
      visibleywBrowse: false,
      visibleywEdit: false,
      radioywBrowse: 1, //表头单选框 1  2
      radioywEdit: 1,
      radioywSearch: 1,
      ywBrowse: 1, // 可浏览
      ywSearch: 1,
      ywEdit: 0,
      ywSearchCheck: true, //可检索默认叉
      ywBrowseCheck: true,
      ywEditCheck: false,
      ywSearchShow: true, //是否可点击
      ywBrowseShow: true,
      ywEditShow: true,
      scope: "Private",
      arr: [1, 2, 3],
      index: 0,
      checkList: [], //公开复选框
      tableData: [],
      returnName: [], //筛选复制tableData的值
      checkArray: [],
      checkBigData: [], //复选框每次选中的节点ID汇总
      sharingOldData: [], //共享设置初始数据渲染
      defaultProps: {
        children: "children",
        label: "name"
      },
      organizationTree:[],
      recordState:'open',//记录共享设置tab
      userId:null//我的部门共享设置
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    dialogVisible() {
      if (this.dialogVisible) {
        this.personalCheck = true;
      } else {
        this.filterText = "";
        this.resetName = false;
        this.resetDepartment = false;
        this.departmentSearch = "";
        this.nameSearch = "";
        this.scope= "Private";
        this.recordState='open';
      }
    },
    sharingDialogVisible() {
      if (!this.sharingDialogVisible) {
        this.filterText = "";
        this.resetName = false;
        this.resetDepartment = false;
        this.departmentSearch = "";
        this.nameSearch = "";
        this.scope= "Private";
        this.recordState='open';
        this.checkBigData = [];
      this.activeName = "open";
      this.personalCheck = false;
      this.checkList = [];
      this.tableData = [];
      this.$refs.tree.setCheckedKeys(this.ShareTree);
      }
    },
    batchDialogVisible() {
      if (this.batchDialogVisible) {
        this.personalCheck = true;
      } else {
        this.filterText = "";
        this.resetName = false;
        this.resetDepartment = false;
        this.departmentSearch = "";
        this.nameSearch = "";
        this.scope= "Private";
        this.recordState='open';
      }
    },
    nameSearch() {
      this.$refs.input.value = this.nameSearch; 
      if (this.nameSearch) {
        this.disabledName = false;
        this.darkDisabledName = false;
      } else {
        this.disabledName = true;
        this.darkDisabledName = true;
      }
    },
    departmentSearch() {     
      this.$refs.inputdepart.value = this.departmentSearch; 
      if (this.departmentSearch) {
        this.disabled = false;
        this.darkDisabled = false;
      } else {
        this.disabled = true;
        this.darkDisabled = true;
      }
    }
  },
  mounted() {
    
    //国际化样式处理
    if (this.$store.getters.language == "english") {
      this.departmentWidth = "20%";
      this.ywEditWidth = "16%";
      this.ywBrowseWidth = "19%";
      this.ywSearchWidth = "20%";
      this.inputWidth = "200";
      this.shareWidth = "170";
    } else {
      this.ywEditWidth = "15%";
      this.ywBrowseWidth = "15%";
      this.ywSearchWidth = "15%";
      this.departmentWidth = "25%";
      this.inputWidth = "100";
      this.shareWidth = "100";
    }
  },
  methods: {
    blurInput(){
      this.$nextTick(() => {
      this.$refs.input.value = this.nameSearch;})
     if (this.nameSearch) {
        this.disabledName = false;
        this.darkDisabledName = false;
      } else {
        this.disabledName = true;
        this.darkDisabledName = true;
      }
    },
    // 树添加字体图标
    renderContent(h, { node, data }) {
      return (
        <span class="custom-tree-node">
          <i class={data.className}></i>
          <span style="margin-left:5px;">{node.label}</span>
        </span>
      );
    },
    // 勾叉
    retrievable(row, eq) {
      // var eq =Event.prototype.__defineGetter__("toElement", element_prototype_get_toElement);
      // 可搜索
      if (eq == 1) {
        row.ywSearchCheck = !row.ywSearchCheck;
        row.ywBrowseShow = !row.ywBrowseShow;
        if (!row.ywSearchCheck) {
          row.ywBrowseCheck = false;
          row.ywBrowseShow = false;
          row.ywEditCheck = false;
          row.ywEditShow = false;
        }
      } else if (eq == 2 && row.ywBrowseShow) {
        // 可浏览
        row.ywBrowseCheck = !row.ywBrowseCheck;
        row.ywEditShow = !row.ywEditShow;
        if (!row.ywBrowseCheck) {
          row.ywEditCheck = false;
          row.ywEditShow = false;
        }
      } else if (eq == 3 && row.ywEditShow) {
        // 可编辑
        row.ywEditCheck = !row.ywEditCheck;
      } else {
        return;
      }
      this.$forceUpdate();
    },
    // 确定 0 不可   1可
    saveRadio(val) {
      if (val == "ywSearch") {
        // 可搜索
        this.tableData.forEach(element => {
          this.ywSearch = this.radioywSearch;
          if (this.ywSearch == 0) {
            element.ywSearchCheck = false;
            element.ywBrowseCheck = false;
            element.ywEditCheck = false;
            element.ywBrowseShow = false;
            element.ywEditShow = false;
          } else {
            element.ywSearchCheck = true;
            element.ywBrowseShow = true;
          }
        });
        this.visibleywSearch = false;
      } else if (val == "ywBrowse") {
        // 可浏览  判断可搜索是否为1
        this.tableData.forEach(element => {
          if (element.ywSearchCheck) {
            this.ywBrowse = this.radioywBrowse;
            if (this.ywBrowse == 0) {
              element.ywBrowseCheck = false;
              element.ywEditCheck = false;
              element.ywEditShow = false;
            } else {
              element.ywBrowseCheck = true;
              element.ywEditShow = true;
            }
          } else {
            return;
          }
        });
        this.visibleywBrowse = false;
      } else {
        // 可编辑 判断可可浏览是否为1
        this.tableData.forEach(element => {
          if (element.ywBrowseCheck) {
            this.ywEdit = this.radioywEdit;
            if (this.ywEdit == 0) {
              element.ywEditCheck = false;
            } else {
              element.ywEditCheck = true;
            }
          } else {
            return;
          }
        });
        this.visibleywEdit = false;
      }
      this.$forceUpdate();
    },
    // 取消
    cancelRadio(val) {
      if (val == "ywSearch") {
        this.visibleywSearch = false;
      } else if (val == "ywBrowse") {
        this.visibleywBrowse = false;
      } else {
        this.visibleywEdit = false;
      }
    },
    // 重置
    resetFun(field) {
      if (field == "name") {
        this.resetName = false;
        this.visibleNames = false;
        this.nameSearch = "";
      } else {
        this.departmentSearch = "";
        this.resetDepartment = false;
        this.visibleDepartment = false;
      }
      if (this.openReset) {
        if (this.nameSearch || this.departmentSearch) {
          if (this.nameSearch) {
            var searchDataName = filterTreeArrayByString(
              this.returnName,
              this.nameSearch,
              "name",
              "children",
              true,
              false
            );
            this.tableData = searchDataName;
          } else {
            var searchDataDepartment = filterTreeArrayByString(
              this.returnName,
              this.departmentSearch,
              "department",
              "children",
              true,
              false
            );
            this.tableData = searchDataDepartment;
          }
        } else {
          this.handleCheckChange();
          this.openReset = false;
        }
      } else {
        return;
      }
    },
    // 筛选
    screenFun(field) {
      this.inputScreen = field;
      if (!this.nameSearch && !this.departmentSearch) {
        this.$message({
          message: this.$t("myCenter.Pleaseinputcontenttosearch"),
          type: "warning"
        });
        return;
      }
      var queryField = "";
      if (field == "name") {
        this.resetName = true;
        this.visibleNames = false;
        queryField = this.nameSearch;
      } else {
        this.resetDepartment = true;
        this.visibleDepartment = false;
        queryField = this.departmentSearch;
      }
      this.tableData.forEach(element => {
        if (!element.department) {
          element.department = "";
        }
      });
      var searchData = filterTreeArrayByString(
        this.tableData,
        queryField,
        field,
        "children",
        true,
        false
      );
      this.openReset = true;
      this.tableData = searchData;
    },
    // 共享提交请求数据
    sharedSubmission(val) {
      var params = [];
      if (this.scope == "Private") {
        params = [];
      } else if (this.scope == "Public") {
        params = [];
        var objPublic = {};
        if (this.checkList.length == 1) {
          objPublic.ywSearch = 1;
          objPublic.ywBrowse = 0;
          objPublic.ywEdit = 0;
        } else if (this.checkList.length == 2) {
          objPublic.ywSearch = 1;
          objPublic.ywBrowse = 1;
          objPublic.ywEdit = 0;
        } else {
          objPublic.ywSearch = 1;
          objPublic.ywBrowse = 1;
          objPublic.ywEdit = 1;
        }
        if (this.checkList.length == 0) {
          params = [];
        } else {
          objPublic.grantType = "Public";
          objPublic.grantId = "/**";
          objPublic.createBy = this.$store.getters.userInfo.id;
          params.push(objPublic);
        }
      } else {
        
        params = [];
        this.tableData.forEach(element => {
          var obj = {};
          obj.grantId = element.id;
          if (element.type == this.$t("myCenter.Personal")) {
            obj.grantType = "Personal";
            obj.departmentId = element.orgId;
          } else if (element.type == this.$t("myCenter.Group")) {
            obj.grantType = "Group";
            obj.departmentId = "";
          }
          if (element.ywSearchCheck) {
            this.ywSearch = 1;
          } else {
            this.ywSearch = 0;
          }
          if (element.ywBrowseCheck) {
            this.ywBrowse = 1;
          } else {
            this.ywBrowse = 0;
          }
          if (element.ywEditCheck) {
            this.ywEdit = 1;
          } else {
            this.ywEdit = 0;
          }
          obj.ywSearch = this.ywSearch;
          obj.ywBrowse = this.ywBrowse;
          obj.ywEdit = this.ywEdit;
          obj.createBy = this.$store.getters.userInfo.id;
          params.push(obj);
        });
      }
      params.forEach(item => {
        item.ywType = val.ywType;
        item.sourceId = val.sourceId;
      });
      // 批量注册服务
      this.$emit("permissionListDataBatchFun", {
        permissionListData: params,
        scope: this.scope
      });
      // 注册服务
      this.$emit("permissionListDataFun", {
        permissionListData: params,
        scope: this.scope
      });
      this.$emit("personalCheckData", this.personalCheck);
      // 共享设置
      this.$emit("sharingNewData", {
        scope: this.scope,
        permissionListDatas: params
      });
    },
    // 树  
    getAuthTree() {
      this.$api.personalCenterServiceApi
        .getAuthTree({userId:this.userId},{ loadingText: this.$t("service.searching") })
        .then(res => {
          this.personnelDetailDtoList=res.data.data.personnelDetailDtoList;//用户数据
          let orgData=res.data.data.organizationDtoList;//组织机构数据
          this.personnelGroupDtoList=res.data.data.personnelGroupDtoList;//群组数据
          orgData.forEach(element=>{
            element.orgId=-1;
            element.f_orgId=element.id;
          })
          this.personnelDetailDtoList.forEach(element => {
            element.onlyId = element.orgId + "-" + element.id;
            element.className = "el-icon-portal-yonghu";
            element.type = this.$t("myCenter.Personal");
            element.ywSearchCheck = this.ywSearchCheck;
            element.ywBrowseCheck = this.ywBrowseCheck;
            element.ywEditCheck = this.ywEditCheck;
            element.ywBrowseShow = this.ywBrowseShow;
            element.ywSearchShow = this.ywSearchShow;
            element.ywEditShow = this.ywEditShow;
          });
          let createTreeList=JSON.parse(JSON.stringify(this.personnelDetailDtoList)).concat(JSON.parse(JSON.stringify(orgData)));
          let personOrgTree=getTree(
            createTreeList,
            "f_orgId",
            "orgId",
            "children"
           );
           let finalTree=getTree(
            personOrgTree,
            "id",
            "parentId",
            "children"
           );
//           this.personnelDetailDtoList = res.data.data.personnelDetailDtoList;
//           this.personnelGroupDtoList = res.data.data.personnelGroupDtoList;
//           // 部门
//           res.data.data.organizationDtoList.forEach(list=>{
//             if(list.parentId!=0){
// list.f_id=list.id;
//             }
//           })
//           res.data.data.personnelDetailDtoList.forEach(element => {
//             element.onlyId = element.orgId + "-" + element.id;
//             element.className = "el-icon-portal-yonghu";
//             element.type = this.$t("myCenter.Personal");
//             element.ywSearchCheck = this.ywSearchCheck;
//             element.ywBrowseCheck = this.ywBrowseCheck;
//             element.ywEditCheck = this.ywEditCheck;
//             element.ywBrowseShow = this.ywBrowseShow;
//             element.ywSearchShow = this.ywSearchShow;
//             element.ywEditShow = this.ywEditShow;
//             res.data.data.organizationDtoList.push(element);
//           });
//           //人和部门
//           this.organizationTree = getTree(
//             res.data.data.organizationDtoList,
//             "f_id",
//             "orgId",
//             "children"
//           );
//           var data =[];
//           data = JSON.parse(JSON.stringify(this.organizationTree));
          var result = [];
          var map = {};
          finalTree.forEach(item => {
            item.onlyId = item.id;
            item.type = this.$t("myCenter.Personal");
            map[item.id] = item;
          });

          finalTree.forEach(item => {
            var parent = map[item.parentId];
            if (parent) {
              (parent.children || (parent.children = [])).push(item);
            } else {
              result.push(item);
            }
          });
          result.forEach(element => {
            element.userId = -1;
          });
          result.push({
            onlyId: -1,
            id: -1,
            name: this.$t("myCenter.Userlist")
          });
          res.data.data.personnelGroupDtoList.forEach(element => {
            element.userId = -2;
            element.onlyId = element.id;
            element.className = "el-icon-portal-qunzu1";
            element.type = this.$t("myCenter.Group");
            element.ywSearchCheck = this.ywSearchCheck;
            element.ywBrowseCheck = this.ywBrowseCheck;
            element.ywEditCheck = this.ywEditCheck;
            element.ywBrowseShow = this.ywBrowseShow;
            element.ywSearchShow = this.ywSearchShow;
            element.ywEditShow = this.ywEditShow;
          });
          res.data.data.personnelGroupDtoList.push({
            onlyId: -2,
            id: -2,
            groupName: this.$t("myCenter.Grouplist")
          });
          var array = [];
          result.forEach(list => {
            array.push(list);
          });
          res.data.data.personnelGroupDtoList.forEach(list => {
            list.name = list.groupName;
            array.push(list);
          });
          this.ShareTree = getTree(array, "id", "userId", "children");
        });
    },
    // 导航头的选择
    handleClick(tab) {
      if(tab.name!=this.recordState){
      // 私有
      this.recordState=tab.name;
      if (tab.name == "open") {
        this.scope = "Private";
        if (this.checkList.length > 0)
          return (
            (this.personalCheck = false),
            (this.tableData = []),
            this.$refs.tree.setCheckedKeys(this.ShareTree)
          );
        if (this.tableData.length > 0)
          return (
            (this.personalCheck = false),
            (this.checkList = []),
            (this.groupywBrowseCheck = true),
            (this.groupywEditCheck = true)
          );
      } else if (tab.name == "group-owner") {
        this.scope = "Public";
        // 公开
        if (this.personalCheck)
          return (
            (this.checkList = []),
            (this.groupywBrowseCheck = true),
            (this.groupywEditCheck = true),
            (this.tableData = []),
            this.$refs.tree.setCheckedKeys(this.ShareTree)
          );
        if (this.tableData.length > 0)
          return (
            (this.personalCheck = false),
            (this.checkList = []),
            (this.groupywBrowseCheck = true),
            (this.groupywEditCheck = true)
          );
      } else {
        this.scope = "Partial";
        // 部分
       
        if (this.checkList.length > 0)
          return (
            (this.personalCheck = false),
            (this.tableData = []),
            this.$refs.tree.setCheckedKeys(this.ShareTree)
          );
        if (this.personalCheck)
          return (
            (this.checkList = []),
            (this.groupywBrowseCheck = true),
            (this.groupywEditCheck = true),
            (this.tableData = []),
            this.$refs.tree.setCheckedKeys(this.ShareTree)
          );
      }
      
      }
    },
    // 触发页面显示配置的筛选
    filterNode(value, data, node) {
      this.checkBigData = [];
      if (!value) return true;
      if (data.name.indexOf(value) !== -1) {
        return true;
      }
      return this.checkBelongToChooseNode(value, data, node);
    },
    checkBelongToChooseNode(value, data, node) {
      const level = node.level;
      if (level === 1) {
        return false;
      }
      let parentData = node.parent;
      let index = 0;
      while (index < level - 1) {
        if (parentData.data.name.indexOf(value) !== -1) {
          return true;
        }
        parentData = parentData.parent;
        index++;
      }
      return false;
    },
    // 共享数据清空
    dataClearedFun() {
      this.checkBigData = [];
      this.activeName = "open";
      this.personalCheck = false;
      this.checkList = [];
      this.tableData = [];
      this.$refs.tree.setCheckedKeys(this.ShareTree);
    },
    // 复选框选中
    handleCheckChange() {
      this.checkArray = [];
      if (this.$refs.tree.getCheckedNodes(true, true).length == 0) {
        this.checkArray = [];
      }
      var onlyArr = [];
      this.$refs.tree.getCheckedNodes(true, true).forEach(element => {
        var isExist = false;
        this.tableData.forEach(item => {
          if (element.id == item.id) {
            element.ywSearchCheck = item.ywSearchCheck;
            element.ywBrowseCheck = item.ywBrowseCheck;
            element.ywEditCheck = item.ywEditCheck;
            element.ywBrowseShow = item.ywBrowseShow;
            element.ywSearchShow = item.ywSearchShow;
            element.ywEditShow = item.ywEditShow;
            isExist = true;
            return false;
          }
        }); 
        if (!isExist) {
          if (element.orgId) {
            var screen = filterTreeArrayByString(
              this.ShareTree,
              element.orgId,
              "id",
              "children",
              false,
              false
            );
            element.department = screen[0].name;
            element.ywSearchCheck = this.ywSearchCheck;
            element.ywBrowseCheck = this.ywBrowseCheck;
            element.ywEditCheck = this.ywEditCheck;
            element.index = this.index;
            element.ywBrowseShow = this.ywBrowseShow;
            element.ywSearchShow = this.ywSearchShow;
            element.ywEditShow = this.ywEditShow;
            onlyArr.push(element);
          }
          // 群组
          if (element.userId == -2) {
            element.department = "";
            element.ywSearchCheck = this.ywSearchCheck;
            element.ywBrowseCheck = this.ywBrowseCheck;
            element.ywEditCheck = this.ywEditCheck;
            element.index = this.index;
            element.ywBrowseShow = this.ywBrowseShow;
            element.ywSearchShow = this.ywSearchShow;
            element.ywEditShow = this.ywEditShow;
            onlyArr.push(element);
          }
        } else {
          if (element.orgId) {
            var screens = filterTreeArrayByString(
              this.ShareTree,
              element.orgId,
              "id",
              "children",
              false,
              false
            );
            element.department = screens[0].name;
          } else {
            element.department = "";
          }
          this.checkArray.push(element);
        }
      });
      // 筛选选中

      if (this.resetName || this.resetDepartment) {
        this.tableData = this.checkArray.concat(onlyArr);
        if (this.nameSearch || this.departmentSearch) {
          this.screenFun(this.inputScreen);
        }
      } else {
        this.tableData = this.checkArray.concat(onlyArr);
        this.returnName = this.checkArray.concat(onlyArr);
      }
    },
    //筛选数据是否显示  类型
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    // 公开复选框互斥
    groupChange(val) {
      if (val[0] == 1) {
        this.groupywBrowseCheck = false;
        this.groupywEditCheck = true;
      }
      if (val[1] == 2) {
        this.groupywBrowseCheck = false;
        this.groupywEditCheck = false;
      }
      if (val == "") {
        this.groupywBrowseCheck = true;
        this.groupywEditCheck = true;
      }
      if (val[0] == 1 && val[1] == 3) {
        this.groupywBrowseCheck = false;
        this.groupywEditCheck = true;
        this.checkList = ["1"];
      }
      if (val[0] == 2 && val[1] == 3) {
        this.groupywBrowseCheck = true;
        this.groupywEditCheck = true;
        this.checkList = [];
      }
    },
    // 共享设置初始数据
    privateDataFuns(val) {
      this.tableData = [];
      this.userId=val.serviceListSharing.personnelId;
      this.getAuthTree();
      this.sharingOldData = val.sharingOldData;
      this.scope = val.serviceListSharing.scope;
      if(val.serviceListSharing.fileStatus==false){
        this.hiddenState =val.serviceListSharing.fileStatus;
      }else if(val.serviceListSharing.serviceStatus==false){
        this.hiddenState = val.serviceListSharing.serviceStatus;
      }else{
      this.hiddenState =true;
      }
      // 私有
      if (this.scope == null) {
        this.scope = "Private";
      }
      if (this.scope == "Private") {
        this.activeName = "open";
        this.personalCheck = true;
      } else if (this.scope == "Partial") {
        // 部分
        this.personalCheck = false;
        this.checkedKey = [];
        this.activeName = "part";
        val.data.forEach(item => {
          if (item.ywEditCheck && item.ywBrowseCheck && item.ywSearchCheck) {
            item.ywSearchShow = true;
            item.ywBrowseShow = true;
            item.ywEditShow = true;
          } else if (
            !item.ywEditCheck &&
            item.ywBrowseCheck &&
            item.ywSearchCheck
          ) {
            item.ywSearchShow = true;
            item.ywBrowseShow = true;
            item.ywEditShow = true;
          } else if (
            !item.ywEditCheck &&
            !item.ywBrowseCheck &&
            item.ywSearchCheck
          ) {
            item.ywSearchShow = true;
            item.ywBrowseShow = true;
            item.ywEditShow = false;
          } else if (
            !item.ywEditCheck &&
            !item.ywBrowseCheck &&
            !item.ywSearchCheck
          ) {
            item.ywSearchShow = true;
            item.ywBrowseShow = false;
            item.ywEditShow = false;
          }
          
          // 根据部门ID和人员ID去找复选框的勾选值
          if (item.type == "群组") {
            this.checkedKey.push(item.id.toString());
          } else {
            this.checkedKey.push(item.onlyId.toString());
            val.checkList.forEach(list=>{
              if(list.C_DEPARTMENT_ID==item.onlyId.split('-')[0]){
                item.orgId=item.onlyId.split('-')[0];
                item.department=list.DEPARTMENTNAME;
              }
            })
          }
          this.tableData.push(item);
        });
        // 展开的节点id
        if (val.parentId) {
          this.expandedKeys.push(val.parentId);
          return false;
        } else if (val.userId) {
          this.expandedKeys.push(val.userId);
          return false;
        } else {
          this.expandedKeys.push(val.orgId);
        }
      } else {
        // 公开
        this.activeName = "group-owner";
        val.checkList.forEach(item => {
          if (item.C_GRANT_TYPE == "Public") {
            var num =
              Number(item.C_YW_BROWSE) +
              Number(item.C_YW_EDIT) +
              Number(item.C_YW_SEARCH);
            if (num == 1) {
              this.checkList = ["1"];
            } else if (num == 2) {
              this.checkList = ["1", "2"];
            } else {
              this.checkList = ["1", "2", "3"];
            }
            this.groupChange(this.checkList);
          }
        });
      }
      this.recordState=this.activeName;
    }
  }
};
</script>
<style lang="scss" scope>

.outline-share {
    float: right;
    margin: 15px 15px 0 0;
    i{
      color:#e6a23c;
    }
}
.class-mark-share {
  .reset-css {
    color: #3691e9;
  }
  .department-slash {
    width: 157px;
    border: 1px solid #ebeef5;
    transform: rotate(-25deg) scaleY(0.2);
    -webkit-transform: rotate(-25deg) scaleY(0.2);
    position: absolute;
    text-align: center;
    left: -4px;
  }
  /deep/.el-tabs.el-tabs--card.el-tabs--top {
    .el-tabs__header.is-top {
      margin: 0;
      .el-tabs__nav.is-top {
        border-radius: 0;
        .is-active {
          color: #fff;
          background: #3691e9;
          border-bottom: 1px solid #c8ceda;
        }
        .is-disabled {
          cursor: no-drop;
        }
      }
    }
  }
  /deep/.el-checkbox {
    display: block;
  }
  /deep/.el-table__header {
    width: 500px;
    th > .cell.highlight {
      color: #3691e9;
      .el-table__column-filter-trigger i {
        color: #3691e9;
      }
    }
    .el-table__column-filter-trigger {
      .el-icon-arrow-down {
        font-size: 14px;
        -webkit-transform: none;
        transform: none;
        padding-left: 2px;
      }
    }
  }
  /deep/.el-table__body-wrapper.is-scrolling-none {
    height: 241px;
    overflow-y: auto;
    .active:hover {
      cursor: pointer;
    }
    .prohibit:hover {
      cursor: no-drop;
    }
  }

  /deep/.login-dialog {
    padding: 0;
    .el-input {
      width: 84%;
      padding: 12px;
    }
    .button-box {
      border-top: 1px solid #ebeef5;
      padding-left: 12px;
      
      /deep/.el-button.el-button--text {
        font-size: 13px;
        color: #606266;
      }
      /deep/.el-button.el-button--text.is-disabled {
        color: #c0c4cc;
      }
      /deep/.el-button.el-button--text:hover {
        color: #3691e9;
      }
      /deep/.el-button.el-button--text.is-disabled:hover {
        color: #c0c4cc;
      }
    }
  }

  .el-tabs__content {
    border: 1px solid #ebeef5;
    border-top: none;
    height: 300px;
    padding: 10px 20px;
    #pane-open {
      padding: 10px;
      .el-checkbox {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ebeef5;
        .el-checkbox__input {
          padding-left: 10px;
        }
        .el-checkbox__label:hover {
          color: #3691e9;
        }
      }
      .el-checkbox.is-checked {
        .el-checkbox__label {
          color: #3691e9;
        }
      }
      .el-checkbox:last-child {
        border: none;
      }
    }
    #pane-group-owner {
      padding: 10px;
      .el-checkbox {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ebeef5;
        width: 100%;
        .el-checkbox__input {
          padding-left: 10px;
        }
        .el-checkbox__label:hover {
          color: #3691e9;
          &:focus {
            color: #3691e9;
          }
        }
      }
      .el-checkbox.is-checked {
        .el-checkbox__label {
          color: #3691e9;
        }
      }
      .el-checkbox:last-child {
        border: none;
      }
    }
    #pane-part {
      .el-col-8 {
        .dimension {
          @include manage-border();
          height: 300px;
          .dimension-head {
            @include manage-border(
              $types: (
                "bottom"
              )
            );
            padding: 5px;
            .el-autocomplete {
              width: 100%;
              .el-icon-search {
                height: 40px;
                line-height: 40px;
              }
            }
          }
          .dimension-tail {
            height: 247px;
            overflow: auto;
          }
        }
      }
    }
  }
}

.service-share {
  .reset-css {
    @include base-active-color();
  }
  .department-slash {
    width: 157px;
    border: 1px solid #ebeef5;
    transform: rotate(-25deg) scaleY(0.2);
    -webkit-transform: rotate(-25deg) scaleY(0.2);
    position: absolute;
    text-align: center;
    left: -4px;
  }
  /deep/.el-tabs.el-tabs--card.el-tabs--top {
    .el-tabs__header.is-top {
      margin: 0;
      .el-tabs__nav.is-top {
        border-radius: 0;
        .is-active {
          @include base-bg-font();
          border-bottom: 1px solid #c8ceda;
        }
        .is-disabled {
          cursor: no-drop;
        }
      }
    }
  }
  /deep/.el-checkbox {
    display: block;
  }
  /deep/.el-table__header {
    width: 500px;
    th > .cell.highlight {
      @include base-active-color();
      .el-table__column-filter-trigger i {
        @include base-active-color();
      }
    }
    .el-table__column-filter-trigger {
      .el-icon-arrow-down {
        font-size: 14px;
        -webkit-transform: none;
        transform: none;
        padding-left: 2px;
      }
    }
  }
  /deep/.el-table__body-wrapper.is-scrolling-none {
    height: 241px;
    overflow-y: auto;
    .active:hover {
      cursor: pointer;
    }
    .prohibit:hover {
      cursor: no-drop;
    }
  }

  /deep/.login-dialog {
    padding: 0;
    .el-input {
      width: 84%;
      padding: 12px;
    }
    .button-box {
      border-top: 1px solid #ebeef5;
      padding-left: 12px;
      /deep/.el-button.el-button--text {
        font-size: 13px;
        color: #606266;
      }
      /deep/.el-button.el-button--text.is-disabled {
        color: #c0c4cc;
      }
      /deep/.el-button.el-button--text:hover {
        @include base-active-color();
      }
      /deep/.el-button.el-button--text.is-disabled:hover {
        color: #c0c4cc;
      }
    }
  }
  .el-tabs__content {
    border: 1px solid #ebeef5;
    border-top: none;
    height: 300px;
    padding: 10px 20px;
    #pane-open {
      padding: 10px;
      .el-checkbox {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ebeef5;
        .el-checkbox__input {
          padding-left: 10px;
        }
      }

      .el-checkbox:last-child {
        border: none;
      }
    }
    #pane-group-owner {
      padding: 10px;
      .el-checkbox {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ebeef5;
        width: 100%;
        .el-checkbox__input {
          padding-left: 10px;
        }
      }
      .el-checkbox:last-child {
        border: none;
      }
    }
    #pane-part {
      .el-col-8 {
        .dimension {
          @include manage-border();
          height: 300px;
          .dimension-head {
            @include manage-border(
              $types: (
                "bottom"
              )
            );
            padding: 5px;
            .el-autocomplete {
              width: 100%;
              .el-icon-search {
                height: 40px;
                line-height: 40px;
              }
            }
          }
          .dimension-tail {
            height: 247px;
            overflow: auto;
          }
        }
      }
    }
  }
}

div:not(.class-mark-share) {
  /deep/.el-table-filter {
    .el-table-filter__bottom button:hover {
      @include base-active-color();
    }
    .el-table-filter__bottom button.is-disabled:hover {
      color: #c0c4cc;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
      @include base-active-color();
    }
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      @include check-box();
    }
    .el-checkbox__inner:hover {
      @include base-active-underline();
    }
  }
  /deep/ .login-dialog.el-popover.el-popper {
    .el-radio-group {
      .el-radio {
        .el-radio__input.is-checked .el-radio__inner {
          @include check-box();
        }
        .el-radio__input.is-checked + .el-radio__label {
          @include base-active-color();
        }
      }
    }
    .button-box {
      .el-button.el-button--text:hover {
        @include base-active-color();
      }
    }
    .el-input {
      .el-input__inner:focus {
        @include input-focus-color();
      }
    }
  }
}
.el-popup-parent--hidden {
  /deep/ .login-dialog.el-popover.el-popper {
    padding: 0;
    .el-radio-group {
      padding: 10px;
      border-bottom: 1px solid #ebeef5;
      .el-radio:first-child {
        padding-bottom: 8px;
      }
    }
    .button-box {
      padding:6px 8px;
      border-top: 1px solid #ebeef5;
      // 按钮
      span{
        font-size: 13px;
        color: #606266;
        margin:0 8px;
      }
      span:hover{
cursor: pointer;
      }
      .el-button.el-button--text.dark-sink {
        color: #c0c4cc;
      }
      .el-button.el-button--text {
        padding: 8px 3px;
        font-size: 13px;
        color: #606266;
      }

      .el-button + .el-button {
        margin-left: 0;
      }
    }
    .el-input {
      width: 87%;
      padding: 10px;
      border-bottom: 1px solid #ebeef5;
      .el-input__inner {
        padding-left: 8px;
      }
      .el-input__suffix {
        .el-input__icon {
          padding-right: 6px;
        }
      }
    }
    // input
     .inputs {
      width: 72%;
      padding: 10px;
      border: 1px solid #ebeef5;
      margin: 10px;
      background:none;  
	outline:none; 
      border-radius: 4px;
    }
  }
}
</style>