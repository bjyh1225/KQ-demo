<template>
  <div>
    <index-body-content></index-body-content>
    <index-footer></index-footer>
  </div>
</template>

<script>
import IndexBodyContent from 'app/serverManager/components/index/IndexBodyContent'
import IndexFooter from 'app/serverManager/components/index/IndexFooter'
export default {
  name:"IndexContent",
  components:{
    IndexBodyContent,
    IndexFooter
  }
}
</script>

<style>

</style>