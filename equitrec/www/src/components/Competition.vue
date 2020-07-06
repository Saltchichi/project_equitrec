<template>
  <section>
    <div class="container" style="margin-top: 50px; padding-left: 10%;">
      <div v-for="competition in compet" :key="competition.competition_nom">
        <form v-on:submit="epreuve(competition)">
          <button type="submit" class="btn btn-primary btn-lg">
            {{ competition }}
          </button>
        </form>
      </div>
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
      compet: [],
    };
  },
  components: {
    Login: Login,
    Epreuve: Epreuve,
  },
  mounted: function() {
    this.getCompetitionByUser();
  },
  methods: {
    epreuve(nom) {
      localStorage.setItem("currentCompetition", nom);
      router.push({ name: "Epreuve" });
    },
    getCompetitionByUser() {
      let currentUser = localStorage.getItem("currentUser");
      let utilisateursBDD = JSON.parse(localStorage.getItem("utilisateursBDD"));
      let jugerBDD = JSON.parse(localStorage.getItem("jugerBDD"));
      let competitionBDD = JSON.parse(localStorage.getItem("competitionBDD"));
      let user = utilisateursBDD.find(el => (el = currentUser));
      let juger = jugerBDD.find(el => (el = user.utilisateurID));
      let competition = competitionBDD.find(el => (el = juger.competitionID));
      if (
        user.utilisateurID == juger.utilisateurID &&
        juger.competitionID == competition.competitionID
      ) {
        this.compet.push(competition.competition_nom);
      }
    },
  },
};
</script>

<style scoped></style>
