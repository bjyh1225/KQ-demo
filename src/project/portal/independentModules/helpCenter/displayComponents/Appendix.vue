<template>
  <div>
    <p class="desc">本附录为广大用户提供一些辅助参考信息，帮助用户更好的理解和使用KQGIS Portal，该附录会随产品的更新逐步进行增加:</p>
    <span @click="openKQGISPortalDevelopment" class="external-link">KQGISPortal前端二次开发手册<i class="el-icon-download"></i></span>
  </div>
</template>

<script>
export default {
  name:"Appendix",
  methods:{
    openKQGISPortalDevelopment(){
      window.open("/doc/portal前端二次开发手册/KQGISPortal前端二次开发手册.docx","_blank");
    }
  }
}
</script>

<style lang='scss' scoped>
  
  .desc{
    font-size:14px;
  }
  .external-link{
    padding-left:20px;
    cursor: pointer;
    color:#606266;
    &:hover{
      @include base-active-color();
    }
  }
</style>