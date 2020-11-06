<template>
  <div class="input-area" @click.stop="showCascaderPanel" :class="{'is-focus':treePanelShow}">
    <span class="input-area-icon" @mouseenter="closeAll" @mouseleave="closeAllHide">
      <i class="el-icon-arrow-up" v-if="treePanelShow&&!closeAllShow"></i>
      <i class="el-icon-arrow-down" v-else-if="!treePanelShow&&!closeAllShow"></i>
      <i class="el-icon-circle-close" v-else @click.stop="allTagRemove"></i>
    </span>
    <div class="tree-cascader-tags">
      <span v-for="(item,index) in resultData" :key="index" class="tree-cascader-tag">
        <span class="tree-cascader-tag-text">{{item.SPANDISPLAY}}</span>
        <i class="el-icon-close" @click.stop="tagRemove(item)"></i>
      </span>
    </div>
    <div class="cascader-area" v-show="treePanelShow">
      <div class="popper-arrow"></div>
      <div class="org-tree" :class="{'org-tree-when-child':childrenPanelShow}">
        <el-scrollbar class="tree_scroll">
          <el-tree
            ref="tree"
            :data="data"
            default-expand-all
            node-key="id"
            :expand-on-click-node="false"
            highlight-current
            @node-click="handleNodeClick"
            :props="treeDefaultProps"
          ></el-tree>
        </el-scrollbar>
      </div>
      <div class="position-area" v-show="childrenPanelShow" @click.stop="1==1">
        <el-scrollbar class="tree_scroll">
          <div v-if="checkList.length>0">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            >{{$t('management.selectAll')}}</el-checkbox>
            <el-checkbox-group v-model="checkedList" @change="handleCheckedChange">
              <el-checkbox
                v-for="checkInfo in checkList"
                :label="checkInfo"
                :key="checkInfo"
              >{{checkInfo}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div v-else class="no-data">
            <span>{{$t('myCenter.Nodatanow')}}</span>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
function getParentInfo(data, result, parentStr, parentLabel) {
  if (data.parent) {
    if (!parentStr.str) {
      parentStr.str = data.data[parentLabel];
    } else {
      parentStr.str = data.data[parentLabel] + "/" + parentStr.str;
    }
    result.push(data.data);
  }
  if (data.parent && data.isLeaf) {
    getParentInfo(data.parent, result, parentStr, parentLabel);
  } else {
    return;
  }
}

export default {
  name: "TreeSelectCascader",
  components: {},
  props: {
    value: {},
    props: {
      type: Object,
      default: () => {
        return {
          cascaderChildren: "children", //选择面板数据来源
          value: "value", //选择面板数据的值字段
          cascaderChildrenId: "", //选择面板数据id，唯一能确定面板数据的字段
          treeRelevanceId: "", //选择面板和树关联关系
          CascaderRelevanceId: "", //选择面板和树关联关系
          treeId: "", //树的id
          treeParentId: "" //树的父结构id
        };
      }
    },
    treeDefaultProps: {
      type: Object,
      default: () => {
        return {
          children: "children",
          label: "label"
        };
      }
    },
    data: {
      type: Array,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    data() {
      this.resultData = this.value;
      this.resetAll();
    }
  },
  methods: {
    closeAll() {
      if (this.resultData.length > 0) {
        this.closeAllShow = true;
      }
    },
    closeAllHide() {
      this.closeAllShow = false;
    },
    showCascaderPanel() {
      if (this.treePanelShow) {
        this.treePanelShow = false;
        this.childrenPanelShow = false;
        document.body.removeEventListener("click", closePop);
      } else {
        this.treePanelShow = true;
        var closePop = () => {
          this.treePanelShow = false;
          this.childrenPanelShow = false;
          document.body.removeEventListener("click", closePop);
        };
        document.body.addEventListener("click", closePop);
      }
    },
    handleNodeClick(node, parentNode) {
      this.reset();
      this.currentNode = node;
      var parentList = [];
      var parentStr = { str: "" };
      //获取树结构作为父结构
      getParentInfo(
        parentNode,
        parentList,
        parentStr,
        this.treeDefaultProps.label
      );
      this.currentParentNode = parentList;
      this.currentParentStr = parentStr.str
        ? parentStr.str + "/"
        : parentStr.str;
      //生成级联面板结构
      if (
        node[this.props.cascaderChildren] &&
        node[this.props.cascaderChildren] instanceof Array
      ) {
        this.cascaderChildren = node[this.props.cascaderChildren];
        this.cascaderChildren.forEach(item => {
          this.checkList.push(item[this.props.value]);
          if (item.checked) {
            this.checkedList.push(item[this.props.value]);
          }
        });
      }
      //写入已选择的
      this.resultData.forEach(item => {
        if (
          item[this.props.CascaderRelevanceId] ==
          node[this.props.treeRelevanceId]
        ) {
          this.checkedList.push(item[this.props.value]);
        }
      });
      this.checkedList = this.checkedList.filter(
        (value, index, arr) => arr.indexOf(value) === index
      );
      this.childrenPanelShow = true;
    },
    handleCheckAllChange(val) {
      this.checkedList = val ? this.checkList : [];
      this.isIndeterminate = false;
      this.handleData();
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checkedList.length;
      this.isIndeterminate =
        checkedCount >= 0 && checkedCount < this.checkList.length;
      this.handleData();
    },
    //操作数据
    handleData() {
      var cascaderList = JSON.parse(JSON.stringify(this.cascaderChildren));
      var result = JSON.parse(JSON.stringify(this.resultData));
      //筛选数据
      var list = cascaderList.filter(value => {
        if (this.checkedList.includes(value[this.props.value])) {
          value.SPANDISPLAY = this.currentParentStr + value[this.props.value];
          value.PARENTINFO = JSON.parse(JSON.stringify(this.currentParentNode));
          return true;
        } else {
          return false;
        }
      });
      //过滤当前tree选择全部数据
      this.resultData = result.filter(
        value =>
          value[this.props.CascaderRelevanceId] !=
          this.currentNode[this.props.treeRelevanceId]
      );
      //拼新数据
      this.resultData = this.resultData.concat(list);
      this.$emit("select-change", this.resultData);
    },
    //移除tag
    tagRemove(item) {
      //移除结果
      this.resultData = this.resultData.filter(
        value =>
          value[this.props.cascaderChildrenId] !=
          item[this.props.cascaderChildrenId]
      );
      //移除当前选中数据
      this.checkedList = this.checkedList.filter(
        value => value != item[this.props.value]
      );
      this.checkAll = this.checkList.length === this.checkedList.length;
      this.isIndeterminate =
        this.checkedList.length >= 0 &&
        this.checkedList.length < this.checkList.length;
      this.$emit("select-change", this.resultData);
    },
    allTagRemove() {
      this.checkedList = [];
      this.resultData = [];
      this.$emit("select-change", this.resultData);
    },
    reset() {
      this.currentNode = {};
      this.checkList = [];
      this.checkedList = [];
      this.isIndeterminate = true;
    },
    resetAll() {
      this.reset();
      this.resultData = [];
      this.childrenPanelShow = false;
      this.checkAll = false;
    }
  },
  data() {
    return {
      closeAllShow: false,
      treePanelShow: false, //树面板控制显示
      childrenPanelShow: false, //子面板显示控制
      checkAll: false, //全选
      checkedList: [], //已选择的数据-用于复选框
      checkList: [], //选择列表-用于复选框
      cascaderChildren: [], //选择列表的完整结构
      isIndeterminate: true, //控制全选样式
      currentNode: {}, //当前节点
      currentParentNode: {}, //当前节点的父信息
      resultData: [], //返回结果
      currentParentStr: "" //拼接父信息
    };
  }
};
</script>

<style lang='scss' scoped>

.input-area {
  box-sizing: border-box;
  // display: inline-block;
  min-height: 40px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  width: 100%;
  position: relative;
  padding-right: 30px;
  padding-top: 5px;
  cursor: pointer;
  &:hover {
    border: 1px solid #c0c4cc;
  }
  &.is-focus {
    @include input-focus-color();
  }
  .input-area-icon {
    width: 25px;
    height: 100%;
    text-align: center;
    position: absolute;
    top: 0;
    right: 5px;
    color: #dcdfe6;
    i {
      height: 14px;
      width: 14px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }
  .cascader-area {
    position: absolute;
    top: -225px;
    left: 0;
  }
  .popper-arrow {
    position: absolute;
    z-index: 2013;
    top: 210px;
    left: 35px;
    border: 8px solid;
    border-color: #fff transparent transparent transparent;
  }
  .org-tree {
    position: absolute;
    top: 0px;
    left: 0;
    height: 200px;
    width: 180px;
    color: #606266;
    border: 1px solid #e4e7ed;
    padding: 5px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 2012;
    background: #fff;
    transition: all 1s;
  }
  .org-tree-when-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .position-area {
    position: absolute;
    top: 0px;
    left: 192px;
    height: 200px;
    width: 170px;
    color: #606266;
    border-top: 1px solid #e4e7ed;
    border-bottom: 1px solid #e4e7ed;
    border-right: 1px solid #e4e7ed;
    padding: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 2012;
    background: #fff;
    transition: all 1s;
    .el-checkbox {
      display: block;
      margin-left: 20px;
      height: 26px;
      line-height: 26px;
    }
    .no-data {
      height: 26px;
      line-height: 26px;
      text-align: center;
    }
  }
  .tree_scroll {
    height: 100%;
  }
  /deep/ .el-scrollbar .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .tree-cascader-tags {
    line-height: 0px;
    .tree-cascader-tag {
      display: inline-block;
      max-width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      background: #f0f2f5;
      line-height: 22px;
      padding: 0 8px;
      height: 24px;
      border-radius: 4px;
      margin-left: 10px;
      margin-bottom: 4px;
      cursor: text;
      .tree-cascader-tag-text {
        overflow: hidden;
        text-overflow: ellipsis;
        color: #909399;
        line-height: 22px;
        font-size: 12px;
      }
      .el-icon-close {
        background-color: #c0c4cc;
        color: #fff;
        transform: scale(0.8);
        border-radius: 50%;
        text-align: center;
        position: relative;
        cursor: pointer;
        font-size: 12px;
        height: 16px;
        width: 16px;
        line-height: 16px;
        vertical-align: middle;
        top: -1px;
        right: -5px;
        &:hover {
          background-color: #909399;
        }
      }
    }
  }
}
.fade-enter-active {
  transition: opacity 0.5s; //类名：隐藏到显示过程所需要的时间
}
.fade-enter {
  // 类名:初始化状态
  opacity: 0;
}
</style>