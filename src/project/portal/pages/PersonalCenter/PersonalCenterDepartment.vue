<template>
  <div class="personal-content">
    <personal-center-my-department></personal-center-my-department>
  </div>
</template>

<script>
import PersonalCenterMyDepartment from "components/personalCenterMyDepartment/PersonalCenterMyDepartment";
export default {
  name: "PersonalCenterDepartment",
  components: {
    PersonalCenterMyDepartment
  }
};
</script>

<style lang='scss' scoped>
.personal-content {
  padding: 0px;
}
</style>