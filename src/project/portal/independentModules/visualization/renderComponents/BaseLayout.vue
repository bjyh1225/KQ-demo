<template>
  <el-row class="layout">
    <el-col v-for="el in current.componentsList" :key="el.id" :span="el.colSpan">
      <div v-for="(cel,ix) in el.componentsList" :key="cel.id">
        <base-layout v-if="cel.componentName=='BaseLayout'" :current="cel" :parentList="el.componentsList" :currentix="ix" :pageStatus="'preview'"  :styleConf="cel.styleConf"
      :propsConf="cel.propsConf"></base-layout>
        <component v-bind:is="cel.componentName" :current="cel" :parentList="el.componentsList" :currentix="ix" :pageStatus="'preview'"  :styleConf="cel.styleConf"
      :propsConf="cel.propsConf"
          v-else></component>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import excludeLayout from 'portal/independentModules/visualization/config/previewAllExcludeLayout.js'
  export default {
    name: "BaseLayout",
    components: {
      ...excludeLayout
    },
    props: {
      current: {
        type: Object,
        default: () => {
          return {}
        }
      },
      parentList: {
        type: Array,
        default: () => {
          return []
        }
      },
      currentix: {
        type: Number,
        default: 0
      }
    }
  };
</script>

<style lang='scss' scoped>
</style>