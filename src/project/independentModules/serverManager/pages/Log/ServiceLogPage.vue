<template>
  <div class="ServiceLogPage">
    <service-log></service-log>
  </div>
</template>

<script>
import ServiceLog from "app/serverManager/components/serviceLog/ServiceLog";
export default {
  name: "ServiceLogPage",
  components: {
    ServiceLog,
  },
};
</script>

<style>
.ServiceLogPage {
  min-height: calc(100vh - 130px);
  padding: 20px 0;
  box-sizing: border-box;
  background: #f5f5f5;
}
</style>