<template>
  <div class="filter-menu">
    <div class="title-font filter-can-join">
      <span class="filter-can-join-font">{{$t('group.OnlyshowthegroupsIcanjoin')}}</span>
      <el-switch v-model="whetherToJoin" @change="whetherToJoinChange"></el-switch>
    </div>
    <el-collapse v-model="activeNames">
      <el-collapse-item v-for="item in menuList" :name="item.name" :key="item.name">
        <template slot="title">
          <i class="el-icon-arrow-right title-font title-font-icon"></i>&nbsp;
          <span class="title-font">{{item.label}}</span>
        </template>
        <ul class="menu">
            <li v-for="citem in item.children" @click="menuClick(citem,item)" :key="citem.name" :class="{'is-active':filterActive.indexOf(citem.name)>-1}">
              {{citem.label}}
            </li>
          </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name:"GroupFilterMenu",
  props:{
    filterInfo:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  data(){
    return {
      activeNames:['owner','createTime'],
      whetherToJoin:false,
      filterActive:[],
      filterData:{},
      menuList:[
        {
          name:"owner",
          label:this.$t('portalStatistics.Owner'),
          field:"ownType",
          children:[
            {
              name:"ownerAll",
              type:"all",
              label:this.$t('portalStatistics.All'),
              value:""
            },
            {
              name:"ICreated",
              label:this.$t('group.ThegroupsIcreated'),
              value:"1"
            },
            {
              name:"IJoined",
              label:this.$t('group.ThegroupsIjoined'),
              value:"2"
            }
          ]
        },
        {
          name:"createTime",
          label:this.$t('group.Creationdate'),
          field:"days",
          children:[
            {
              name:"createTimeAll",
              type:"all",
              label:this.$t('portalStatistics.All'),
              value:""
            },
            {
              name:"today",
              label:this.$t('portalStatistics.Today'),
              value:"0"
            },
            {
              name:"yesterday",
              label:this.$t('group.Yesterday'),
              value:"1"
            },
            {
              name:"last7Days",
              label:this.$t('portalStatistics.LastWeek'),
              value:"7"
            },
            {
              name:"last30Days",
              label:this.$t('portalStatistics.LastMonth'),
              value:"30"
            }
          ]
        }
      ]
    }
  },
  methods:{
    menuClick(item,parent){
      this.filterData[parent.name]=item;
      this.filterInfo[parent.field]=item.value;
      this.setFilterActive();
      this.$emit('filterGroupList');
    },
    setFilterActive(){
      this.filterActive=[];
      Object.keys(this.filterData).forEach(key=>{
        this.filterActive.push(this.filterData[key].name);
      })
    },
    whetherToJoinChange(val){
      this.filterInfo.onlyEnter=val;
      this.$emit("filterGroupList");
    }
  },
  mounted(){
    this.menuList.forEach(item=>{
      item.children.forEach(citem=>{
        if(citem.type=='all'){
          this.filterData[item.name]=citem;
          this.filterActive.push(citem.name);
        }
      })
    })
    this.setFilterActive();
  }
}
</script>

<style lang="scss" scoped>
  
  .filter-menu{
    background: #fff;
    padding-bottom:40px;
    .title-font{
      font-size:14px;
      @include base-color();
    }
    .filter-can-join{
      height:54px;
      line-height: 54px;
      border-top:1px solid #dfdfdf;
      border-bottom:1px solid #dfdfdf;
      text-align: center;
      .filter-can-join-font{
        margin-right:10px;
      }
    }
    .el-collapse{
      border:none;
      .el-collapse-item{
        /deep/ .el-collapse-item__header{
          border-bottom:1px solid #dfdfdf;
          background: #fff;
          height:40px;
          line-height: 40px;
          .el-collapse-item__arrow{
            display: none;
          }
          .title-font-icon{
            margin-left:10px;
            transition: transform .3s;
          }
        }
        /deep/ .el-collapse-item__header.is-active{
          .title-font-icon{
            transform: rotate(90deg);
          }
        }
        /deep/ .el-collapse-item__wrap{
          background: #fff;
          border-bottom:1px solid #dfdfdf;
        }
        /deep/ .el-collapse-item__content{
          background: #fff;
          padding-bottom: 0px;
          font-size:14px;
          color:#4c4c4c;
        }
      }
    }
    .menu{
      list-style: none;
      margin:0 0 10px 30px;
      padding:0;
      li{
        cursor: pointer;
        height:30px;
        line-height: 30px;
        position:relative;
        &:hover{
          @include base-active-color();
          &::before{
            content: '';
            display:inline-block;
            width: 4px;
            height:4px;
            border-radius: 50%;
            @include base-bg-color();
            position: absolute;
            left:-12px;
            top:0;
            bottom:0;
            margin:auto;
          }
        }
      }
      li.is-active{
        @include base-active-color();
        &::before{
          content: '';
          display:inline-block;
          width: 4px;
          height:4px;
          border-radius: 50%;
          @include base-bg-color();
          position: absolute;
          left:-12px;
          top:0;
          bottom:0;
          margin:auto;
        }
      }
    }
  }
</style>