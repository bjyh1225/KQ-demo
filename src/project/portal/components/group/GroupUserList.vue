<template>
  <div>
    <div class="header">
      <i class="el-icon-portal-qunzu"></i>
      <span>{{$t('group.Groupmembers')}}</span>
    </div>
    <div class="user-list">
      <el-scrollbar class="scroll">
        <ul>
          <li v-for="item in groupUserList" :key="item.id">
            <i class="user-list-icon" :class="item.isGroupOwner?'el-icon-portal-qunzhu':'el-icon-portal-yonghudefuben'"></i>
            <span class="name" :title="item.name">{{item.name}}</span>
            <i class="el-icon-delete" v-if="!item.isGroupOwner&&groupInfo.currentState==1" @click="kickOutOfGroup(item)"></i>
          </li>
        </ul>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name:"GroupUserList",
  props:{
    groupUserList:{
      type:Array,
      default:()=>{
        return []
      }
    },
    groupInfo:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  methods:{
    kickOutOfGroup(item){
      this.$confirm(this.$t('group.Areyousuretoremovethemember')+'？', this.$t('webAppBuilder.Tip'), {
        confirmButtonText: this.$t('myCenter.Sure'),
        cancelButtonText: this.$t('myCenter.cancel'),
        type: 'warning'
      }).then(() => {
        this.$emit('kickOutOfGroup',item.id);
      }).catch(() => {});   
    }
  }
}
</script>

<style lang="scss" scoped>
  
  .header{
    height:40px;
    line-height: 40px;
    border-bottom:1px solid #dfdfdf;
    font-size:15px;
    @include base-active-color();
    i{
      margin-right:4px;
      font-size:16px;
    }
  }
  .user-list{
    .scroll {
      height: 100%;
    }
    /deep/ .el-scrollbar .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    height:600px;
    ul{
      margin:0;
      padding:0;
      margin-top:10px;
      list-style: none;
      li{
        height: 30px;
        line-height: 30px;
        color:#7c7c7c;
        font-size:14px;
        position:relative;
        .name{
          display: inline-block;
          width:150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          vertical-align: middle;
        }
        .el-icon-portal-qunzhu{
          color:#FAB727;
        }
        .user-list-icon{
          margin-right:10px;
        }
        .el-icon-delete{
          cursor: pointer;
          position:absolute;
          right:20px;
          top:0;
          color:#f56c6c;
          font-size:14px;
          width:14px;
          height:14px;
          margin:auto;
          bottom:0;
          display: inline-block;
        }
      }
    }
  }
</style>