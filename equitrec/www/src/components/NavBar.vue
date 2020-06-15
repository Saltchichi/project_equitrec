<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark rounded">
    <ul class="navbar-nav">
      <li v-if="auth=='loggedin'" class="nav-item">
        <router-link class="nav-link" to=/home>Home</router-link>
      </li>
      <li v-if="auth=='loggedin'" class="nav-item">
        <a class="nav-link" href="">Logout</a>
      </li>
    </ul>
  </nav>
</template>
<script>
import EventBus from "./EventBus.vue"

EventBus.$on('logged-in', test => {
  console.log(test)
})
export default {
  name: 'NavBar',
  data() {
    return {
      auth: '',
    }
  },
  methods: {
  },
  mounted() {
    EventBus.$on('logged-in', status => {
      this.auth = status
    })
  }
};
</script>
<style scoped></style>
