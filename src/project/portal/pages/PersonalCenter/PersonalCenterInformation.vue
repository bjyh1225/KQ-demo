<template>
  <div class="personal-content">
    <personal-center-my-information></personal-center-my-information>
  </div>
</template>

<script>
import PersonalCenterMyInformation from 'components/personalCenterMyInformation/PersonalCenterMyInformation'
export default {
  name: "PersonalCenterInformation",
  components:{
    PersonalCenterMyInformation
  }
};
</script>

<style lang='scss' scoped>
  
  .personal-content{
    min-height: 700px;
    padding:0;
  }
</style>