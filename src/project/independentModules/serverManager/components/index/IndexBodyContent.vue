<template>
  <div>
    <index-function-desc></index-function-desc>
    <index-online-manual></index-online-manual>
    <index-new-function></index-new-function>
  </div>
</template>

<script>
import IndexFunctionDesc from './IndexFunctionDesc'
import IndexOnlineManual from './IndexOnlineManual'
import IndexNewFunction from './IndexNewFunction'
export default {
  name:"IndexBodyContent",
  components:{
    IndexFunctionDesc,
    IndexOnlineManual,
    IndexNewFunction
  }
}
</script>

<style>

</style>