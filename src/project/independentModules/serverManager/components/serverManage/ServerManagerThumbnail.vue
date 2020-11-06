<template>
  <div class="edit-thumburl">
    <iframe :src="serviceInfo.createthumburl" frameborder="0" width="100%" height="400px"></iframe>
  </div>
</template>

<script>
export default {
  name:"ServerManagerThumbnail",
  props:{
    serviceInfo:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  .edit-thumburl{
    min-height:500px;
  }
</style>