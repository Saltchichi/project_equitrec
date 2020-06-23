<template>
  <section>
    <div class="container" style="margin-top: 50px;">
      <ul v-if="competitions.id === epreuves[0].competitionId">
        <div v-for="epreuve in epreuves" :key="epreuve.nom">
          <form v-on:submit="notation">
            <button type="submit" class="btn btn-primary btn-lg btn-block">{{ epreuve.nom }}</button>
            <br />
          </form>
        </div>
      </ul>
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
      epreuves: [
        {
          id: 1,
          nom: "branches_basses_en_main",
          categorieId: 1,
          competitionId: 1,
          competiteurId: 1,
        },
        {
          id: 2,
          nom: "escalier_descendant_en_selle",
          categorieId: 1,
          competitionId: 1,
          competiteurId: 1,
        },
        {
          id: 3,
          nom: "slalom_a_une_main",
          categorieId: 1,
          competitionId: 1,
          competiteurId: 1,
        },
      ],

      competitions: {
        id: 1,
        nom: "test",
        userId: 1,
      },
    };
  },

  components: {
    Competition: Competition,
    Notation: Notation,
  },
  methods: {
    notation() {
      router.push({ name: "Notation" });
    },
  },
};
</script>
