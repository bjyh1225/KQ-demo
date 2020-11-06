<template>
  <div class="personal-content">
    <personal-center-my-verify @menuChange="menuChange"></personal-center-my-verify>
  </div>
</template>

<script>
import PersonalCenterMyVerify from 'components/personalCenterMyVerify/PersonalCenterMyVerify'
export default {
  name: "PersonalCenterVerify",
  components:{
    PersonalCenterMyVerify
  },
  methods:{
    menuChange(){

    }
  }
};
</script>

<style lang='scss' scoped>
  .personal-content{
    min-height: 700px;
  }
</style>