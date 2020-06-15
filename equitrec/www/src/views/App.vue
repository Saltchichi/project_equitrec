<template>
  <section>
    <NavBar></NavBar>
    <router-view />
  </section>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar: NavBar,
  },
  data: function() {
    return {};
  },
};
</script>

<style></style>
