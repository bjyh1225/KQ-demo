<template>
  <div class="SystemLogPage">
    <system-log></system-log>
  </div>
</template>

<script>
import SystemLog from "app/serverManager/components/systemLog/SystemLog";
export default {
  name: "SystemLogPage",
  components: {
    SystemLog,
  },
};
</script>

<style>
.SystemLogPage {
  min-height: calc(100vh - 130px);
  padding: 20px 0;
  box-sizing: border-box;
  background: #f5f5f5;
}
</style>