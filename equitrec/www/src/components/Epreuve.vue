<template>
  <section>
    <div class="container" style="margin-top: 50px; padding-left: 10%;">
      <div v-for="epreuve in epreuves" :key="epreuve.nom">
        <form v-on:submit.prevent="notation(epreuve)">
          <button
            type="submit"
            class="btn btn-primary btn-lg"
            style="width: 93.5%"
          >
            {{ epreuve }}
          </button>
          <br />
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import router from "../router";
import EventBus from "./EventBus.vue";
import Competition from "./Competition.vue";
import Notation from "./Notation.vue";

export default {
  name: "Epreuve",
  data() {
    return {
      epreuves: [],
    };
  },
  components: {
    Competition: Competition,
    Notation: Notation,
  },
  mounted: function() {
    this.getEpreuveByCompetitionName()
  },
  methods: {
    notation(nom) {
      localStorage.setItem("epreuveName", nom);
      router.push({ name: "Notation" });
    },
    getEpreuveByCompetitionName() {
      let currentCompetition = localStorage.getItem("currentCompetition");
      let competitionBDD = JSON.parse(localStorage.getItem("competitionBDD"));
      let epreuveBDD = JSON.parse(localStorage.getItem("epreuveBDD"));
      let competition = competitionBDD.find(el => (el = currentCompetition));
      for (let i = 0; i < epreuveBDD.length; i++) {
        if (epreuveBDD[i].competitionID == competition.competitionID) {
          this.epreuves.push(epreuveBDD[i].epreuve_nom);
        }
      }
    },
  },
};
</script>
