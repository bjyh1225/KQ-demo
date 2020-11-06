<template>
  <div class="personal-content">
    <personal-center-my-apply></personal-center-my-apply>
  </div>
</template>

<script>
import PersonalCenterMyApply from 'components/personalCenterMyApply/PersonalCenterMyApply'
export default {
  name: "PersonalCenterMessage",
  components:{
    PersonalCenterMyApply
  }
};
</script>

<style lang='scss' scoped>
  .personal-content{
    min-height: 700px;
  }
</style>