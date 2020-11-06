<template>
  <div :style="'margin-top:'+homePageHeaderHeight+'px'">
    <group-content></group-content>
  </div>
</template>

<script>
import GroupContent from 'components/group/Group'
export default {
  name:"Group",
  components:{
    GroupContent
  },
  computed:{
    homePageHeaderHeight(){
      return this.$store.getters.homePageHeaderHeight;
    }
  }
}
</script>