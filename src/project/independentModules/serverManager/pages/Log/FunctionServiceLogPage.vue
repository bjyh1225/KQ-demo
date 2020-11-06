<template>
  <div class="functionServiceLogPage">
    <function-service-log></function-service-log>
  </div>
</template>

<script>
import FunctionServiceLog from "app/serverManager/components/functionServiceLog/FunctionServiceLog";
export default {
  name: "FunctionServiceLogPage",
  components: {
    FunctionServiceLog,
  },
};
</script>

<style lang="scss" scoped>
.functionServiceLogPage {
  min-height: calc(100vh - 130px);
  padding: 20px 0;
  box-sizing: border-box;
  background: #f5f5f5;
}
</style>