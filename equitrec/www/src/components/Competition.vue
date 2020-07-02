<template>
  <section>
    <div class="container" style="margin-top: 50px;">
      <ul v-if="mockUsers.id === competitions.userId">
        <form v-on:submit="epreuve">
          <button type="submit" class="btn btn-primary btn-lg btn-block">{{ competitions.nom }}</button>
        </form>
      </ul>
    </div>
  </section>
</template>

<script>
import router from "../router";
import EventBus from "./EventBus.vue";
import Login from "./Login.vue";
import Epreuve from "./Epreuve.vue";

export default {
  name: "Competition",
  data() {
    return {
      message: "",
      mockUsers: {
        id: 1,
        email: "user@gmail.com",
        password: "user",
      },
      competitions: {
        id: 1,
        nom: "test",
        userId: 1,
      },
      isError: true,
    };
  },
  components: {
    Login: Login,
    Epreuve: Epreuve,
  },
  methods: {
    epreuve() {
      router.push({ name: "Epreuve" });
    },
  },
};
</script>

<style scoped>

</style>