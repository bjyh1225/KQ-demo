<template>
  <div class="kqgis-devlop">
    <div class="title">{{$t('visualization.AboutKQGISdevelopment')}}</div>
    <p class="desc">
      {{$t('visualization.BuildAPIsforthedevelopmentofprofessionalGIScapabilities')}}
    </p>
    <div class="img-area">
      <img :src="apiImgUrl">
    </div>
  </div>
</template>

<script>
export default {
  name:"KqgisDevlop",
  computed: {
    themeCode() {
      return this.$store.getters.themeCode;
    },
    language() {
      return this.$store.getters.language;
    }
  },
  watch:{
    themeCode(){
      if(this.themeCode=='green-theme'){
        this.apiImgUrl=require("img/index/kqgisDevlop/theme/greenTheme/api.jpg");
      }
      else if(this.themeCode=='navyblue-theme'){
        this.apiImgUrl=require("img/index/kqgisDevlop/theme/navyblueTheme/api.jpg");
      }
      else{
        this.apiImgUrl=require("img/index/kqgisDevlop/theme/defaultTheme/api.jpg");
      }
    }
  },
  data(){
    return {
      apiImgUrl:require("img/index/kqgisDevlop/theme/defaultTheme/api.jpg")
    }
  },
  mounted(){
    if(this.themeCode=='green-theme'){
      this.apiImgUrl=require("img/index/kqgisDevlop/theme/greenTheme/api.jpg");
    }
    else if(this.themeCode=='navyblue-theme'){
      this.apiImgUrl=require("img/index/kqgisDevlop/theme/navyblueTheme/api.jpg");
    }
    else{
      this.apiImgUrl=require("img/index/kqgisDevlop/theme/defaultTheme/api.jpg");
    }
  }
}
</script>

<style lang="scss" scoped>
  .kqgis-devlop{
    background:#fff;
    height:640px;
    box-sizing: border-box;
    padding-top:60px;
    .title{
      font-size:24px;
      color:#242424;
      text-align: center;
      margin-bottom:40px;
    }
    .desc{
      margin:0;
      padding:0;
      color:#4c4c4c;
      font-size:14px;
      text-align: center;
      margin-bottom:10px;
    }
    .img-area{
      text-align: center;
      img{
        max-width:90%;
      }
    }
  }
</style>