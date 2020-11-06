<template>
  <el-row>
    <draggable :list="dataList" :sort="true" tag="ul" :handle="'.visualization-move-symbol'">
      <li v-for="item in dataList" :key="item.id">
        <div v-if="item.componentName!='layoutcol'">
          <div v-if="item.componentsList&&item.componentsList.length>0?false:true" class="li-title no-icon"
            @mouseenter="btnShow"
            @mouseleave="btnHide"
            >
            {{$t(item.text)}}
            <i class="el-icon-portal-liebiao3 visualization-move-symbol li-btn" v-if="outside"></i>
          </div>
          <div v-else>
            <div @click="showOrHide" class="li-title is-active"           
            @mouseenter="btnShow"
            @mouseleave="btnHide">
              <i class="el-icon-caret-right pannel-arrow"></i>{{$t(item.text)}}
              <i class="el-icon-portal-liebiao3 visualization-move-symbol li-btn" v-if="outside"></i>
            </div>
            <selected-component-list :dataList="item.componentsList" class="child-list" style="display:block;"></selected-component-list>
          </div>
        </div>
        <div v-else>
          <selected-component-list :dataList="item.componentsList" class="child-list" style="display:block;"></selected-component-list>
        </div>
      </li>
    </draggable>
  </el-row>
</template>

<script>
  export default {
    name: "SelectedComponentList",
    props: {
      dataList: {
        type: Array,
        default: () => {
          return []
        }
      },
      outside:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      showOrHide(e){
        var status=e.currentTarget.parentNode.getElementsByClassName("child-list")[0].style.display;
        if(status=='none'){
          e.currentTarget.classList.add("is-active");
          e.currentTarget.parentNode.getElementsByClassName("child-list")[0].style.display='block';
        }
        else{
          e.currentTarget.classList.remove("is-active");
          e.currentTarget.parentNode.getElementsByClassName("child-list")[0].style.display='none';
        }
      },
      btnShow(e){
        if(e.currentTarget.getElementsByClassName("li-btn")){
          e.currentTarget.getElementsByClassName("li-btn")[0].style.display = "block";
        }
      },
      btnHide(e){
        if(e.currentTarget.getElementsByClassName("li-btn")){
          e.currentTarget.getElementsByClassName("li-btn")[0].style.display = "none";
        }
      }
    }
  };
</script>

<style lang='scss' scoped>
  
  ul{
    list-style: none;
    margin:0;
    padding-left:10px;
    .li-title{
      cursor: pointer;
      height:30px;
      line-height:30px;
      color:#4c4c4c;
      font-size:15px;
      position: relative;
      // &:hover{
      //   @include base-bg-font();
      // }
      .visualization-move-symbol{
        display: inline-block;
        font-size: 15px;
        width: 15px;
        height: 15px;
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        margin: auto;
      }
      .li-btn{
        display: none;
        &:hover{
          @include base-active-color();
        }
      }
      .visualization-move-symbol{
        cursor:move;
      }
    }
    .no-icon{
      margin-left:18px;
    }
  }
  .pannel-arrow {
    color: #b3bcbf;
    transition: transform .3s;
    margin-right:4px;
  }
  .is-active .pannel-arrow {
    transform: rotate(90deg);
  }
</style>