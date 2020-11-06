<template>
  <div class="personal-content">
    <personal-center-recycle></personal-center-recycle>
  </div>
</template>
<script>
import PersonalCenterRecycle from "components/personalCenterRecycleBin/PersonalCenterRecycle";
export default {
  name: "PersonalCenterRecycleBin",
  components: {
    PersonalCenterRecycle
  }
};
</script>
<style lang='scss' scoped>

.personal-content {
  min-height: 700px;
}
</style>