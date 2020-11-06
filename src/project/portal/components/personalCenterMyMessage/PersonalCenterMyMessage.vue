<template>
  <el-row :gutter="40">
    <el-col :span="6">
      <personal-center-my-message-menu
      @menuChange="menuChange"
      ></personal-center-my-message-menu>
    </el-col>
    <el-col :span="18">
      <personal-center-my-message-publish v-show="active=='publish'" :active="active"></personal-center-my-message-publish>
      <personal-center-my-message-notification v-show="active=='notification'" :active="active" :action="messageAction"></personal-center-my-message-notification>
    </el-col>
  </el-row>
</template>

<script>
import PersonalCenterMyMessageMenu from 'components/personalCenterMyMessage/PersonalCenterMyMessageMenu'
import PersonalCenterMyMessageNotification from 'components/personalCenterMyMessage/PersonalCenterMyMessageNotification'
import PersonalCenterMyMessagePublish from 'components/personalCenterMyMessage/PersonalCenterMyMessagePublish'
export default {
  name: "PersonalCenterMyMessage",
  components:{
    PersonalCenterMyMessageMenu,
    PersonalCenterMyMessageNotification,
    PersonalCenterMyMessagePublish
  },
  methods:{
    menuChange(menu,messageAction){
      this.active=menu;
      if(messageAction){
        this.messageAction=messageAction;
      }
    }
  },
  data(){
    return {
      active:"publish",
      messageAction:{}
    }
  }
};
</script>

<style lang='scss' scoped>
</style>