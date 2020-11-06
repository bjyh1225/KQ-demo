<template>
  <div class="personal-content">
    <personal-center-my-collection></personal-center-my-collection>
  </div>
</template>

<script>
import PersonalCenterMyCollection from "components/personalCenterMyCollection/PersonalCenterMyCollection";
export default {
  name: "PersonalCenterCollection",
  components: {
    PersonalCenterMyCollection
  }
};
</script>

<style lang='scss' scoped>

.personal-content {
  min-height: 700px;
}
</style>