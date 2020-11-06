<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import "@/style/base.scss";
  export default {
    name: "IndependentApp",
    components: {
    },
    data() {
      return {
      }
    },
    methods: {
    },
    mounted() {
      document.getElementById("preloader").style.display = "none";
      this.$store.dispatch("homepage/setHomePageHeaderHeight", 80);
      document.body.setAttribute("data-theme", "default-theme");
    }
  }
</script>