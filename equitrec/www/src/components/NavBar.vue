<template>
  <nav class="navbar navbar-dark bg-dark">
    <router-link class="linker" v-if="auth=='loggedin'" to=/competition>Home</router-link>
    <a class="linker" v-if="auth=='loggedin'" href="">Logout</a>
  </nav>
</template>
<script>
import EventBus from "./EventBus.vue"
export default {
  name: 'NavBar',
  data() {
    return {
      auth: '',
    }
  },
  mounted() {
    EventBus.$on('logged-in', status => {
      this.auth = status
    })
  }
};
</script>
<style scoped>
.linker {
  color: white;
}
</style>
