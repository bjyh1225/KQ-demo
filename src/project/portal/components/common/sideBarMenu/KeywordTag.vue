<template>
  <el-row class="tag-keyword">
    <el-col class="tag-title">
      <i class="el-icon-portal-biaoqian2"></i>
      <span>{{$t('service.label')}}</span>
      <el-checkbox v-model="checked" class="checked-class" v-if="checkList.length>0">{{$t('group.Multiselection')}}</el-checkbox>
    </el-col>
    <el-col class="tag-class">
      <el-scrollbar class="scroll">
        <el-checkbox-group v-model="checkValue" @change="bindCheckBox" size="medium">
          <el-checkbox-button
            v-for="keywork in screenCheckList"
            :key="keywork.name"
            :label="keywork.name"
          >{{keywork.name}}({{keywork.num}})</el-checkbox-button>
        </el-checkbox-group>
      </el-scrollbar>
    </el-col>
    <el-col class="tag-tail" v-show="tailVisible">
      <div @click="itemShow=!itemShow">
        <i :class="itemShow?'go':'aa'" class="el-icon-d-arrow-left"></i>&nbsp;
        <span>{{itemShow?$t('group.Collapse'):$t('group.More')}}</span>
      </div>
    </el-col>
    <el-col v-if="checkList.length<=0" class="no-data">
      <span>{{$t('webAppBuilder.NoData')}}</span>
    </el-col>
  </el-row>
</template>
 
<script>
export default {
  name: "KeywordTag",
  props: {
    checkList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      checked: false,
      itemShow: false,
      checkValue: [],
      tailVisible: false
    };
  },
  computed: {
    screenCheckList() {
      if (!this.itemShow && this.checkList.length > 10) {
        this.tailVisible = true;
        return this.checkList.slice(0, 10);
      } else if (this.itemShow) {
        this.tailVisible = true;
        return this.checkList;
      } else {
        this.tailVisible = false;
        return this.checkList;
      }
    }
  },
  watch: {
    checked() {
      if (!this.checked) {
        this.checkValue = [];
        this.$emit("checkValueChanger", "");
      }
    }
  },
  methods: {
    bindCheckBox(value) {
      if (this.checkValue.length > 1 && !this.checked) {
        this.checkValue.splice(0, 1);
      }
      this.$emit("checkValueChanger", this.checkValue.toString());
    }
  }
};
</script>
<style lang="scss" scoped>

.tag-keyword {
  font-size: 14px;
  margin: 50px 0 20px;
  border: 1px solid #ebebeb;
  background: #fff;
  position: relative;
  .tag-title {
    padding-left: 20px;
    border-bottom: 1px solid #ebebeb;
    height: 36px;
    line-height: 36px;
    i {
      @include base-active-color();
    }
    span {
      padding-left: 8px;
    }
  }
  /deep/.checked-class {
    position: absolute;
    right: 20px;
    top: 0;
  }
  .tag-class {
    max-height: 490px;
    padding: 20px 20px 8px;
    .scroll {
      max-height: 470px;
    }
    /deep/ .el-scrollbar .el-scrollbar__wrap {
      max-height: 470px;
      overflow-x: hidden;
    }
    /deep/.el-checkbox-group {
      .el-checkbox-button {
        &.is-checked {
          border-radius: 4px;
          .el-checkbox-button__inner {
            @include base-radio-button();
          }
        }
        &.el-checkbox-button--medium {
          margin-right: 10px;
          margin-bottom: 15px;
          .el-checkbox-button__inner {
            padding: 8px;
            border-radius: 4px;
            background: #fff;
            border: 1px solid #dcdfe6;
            white-space: normal;
            word-break: break-word;
          }
        }
      }
      .el-checkbox-button:not(.is-checked) .el-checkbox-button__inner:hover {
        @include base-active-color();
        @include base-active-underline();
      }
    }
  }
  .tag-tail {
    padding: 0px 5px 10px;
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;
    text-align: center;
    .aa {
      transform: rotate(-90deg);
      transition: all 0.2s;
    }
    .go {
      transform: rotate(-270deg);
      transition: all 0.2s;
    }
    &:hover {
      @include base-active-color();
    }
  }
  .no-data {
    position: relative;
    height: 80px;
    color: #909399;
    line-height: 60px;
    text-align: center;
    font-size: 14px;
  }
}
</style>
