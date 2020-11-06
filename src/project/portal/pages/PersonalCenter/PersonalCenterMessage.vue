<template>
  <div class="personal-content">
    <personal-center-my-message></personal-center-my-message>
  </div>
</template>

<script>
import PersonalCenterMyMessage from 'components/personalCenterMyMessage/PersonalCenterMyMessage'
export default {
  name: "PersonalCenterMessage",
  components:{
    PersonalCenterMyMessage
  }
};
</script>

<style lang='scss' scoped>
  .personal-content{
    min-height: 700px;
  }
</style>