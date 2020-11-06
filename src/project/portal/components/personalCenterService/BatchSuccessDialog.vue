<template>
  <div class="batch-success-dialog">
    <el-dialog
    :title="$t('myCenter.Batchregistrationsucceed')"
      :visible.sync="batchSuccessVisible"
      width="26%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      custom-class="dialog-custom-class"
    >
    <div class="check-text">
        <i class="el-icon-success"></i>
        {{$t('myCenter.Youhaveregistered')}} <span class="description-class">{{batchSuccessDescription}}</span> {{$t('myCenter.servicessuccessfully')}} </div>
   <div class="list">
            <div class="title" @click="toggle($event)" :class="itemShow?'bath':''">
  <i :class="itemShow?'go':'aa'" class='el-icon-d-arrow-left'></i>
  {{itemShow?$t('myCenter.Hide'):$t('myCenter.Display')}}{{$t('myCenter.Theservicesjustregistered')}}</div>
  <transition name="sub-menu">
            <ul class="item" v-show="itemShow">
                <li v-for="(item,key) in batchSuccessName" :key="key">{{item}}</li>
            </ul>
</transition>
        </div>
        </el-dialog>
  </div>
</template>
<script>
export default {
    name: "BatchSuccessDialog",
      props: {
    batchSuccessVisible: {
      type: Boolean,
      default: false
    },
    batchSuccessDescription:{
      type: String,
      default: ''
    },
    batchSuccessName:{
      type: Array,
      default: () => {
        return [];
      }
    }
    },
    data(){
      return{
itemShow:false
      }
    },
    methods:{
        handleClose(){
            this.$emit("handleClose");
        },
          toggle(ev){
          this.itemShow=!this.itemShow;
                }
    }
}
</script>
<style lang="scss">


.batch-success-dialog{
      max-height: 300px;
      .el-dialog__title{
        font-size: 16px;
      }
  /deep/.el-dialog__body{
        padding: 0px 20px 20px;
        .check-text{
        height: 40px;
    line-height: 30px;
    .el-icon-success{
      color: #67c23a;
      font-size: 16px;
    }
    .description-class{
      @include base-active-color();
      font-size: 22px;
    }
  }
 .list{     
 .title{
padding: 10px 5px;
cursor: pointer;
-webkit-user-select: none;
user-select: none;
text-align: center;
&.bath{
border-bottom: 1px solid #ccc;
    margin-bottom: 14px;
}
    .aa{
        transform:rotate(-90deg);
        transition: all .2s;
    }
    .go{
        transform:rotate(-270deg);
        transition: all .2s;
    }
}
  li{
            padding-left: 10px;
            line-height: 2;
            list-style: none;
        }
 .site-menu-sub {
    padding: 0px;
  }
  .sub-menu-enter-active,
  .sub-menu-leave-active {
    transition: all .2s ease;
    max-height: 130px;
  }
  .sub-menu-enter,
  .sub-menu-leave-to
  {
    opacity: 0;
    height: 0px;
  }
 .item{
   padding: 0;
      max-height: 130px;
   overflow: auto;
   margin: 0px;
        }
        }
  } 
}
</style>