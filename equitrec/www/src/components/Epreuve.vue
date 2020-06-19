<template>
<section>
    
  <div class="container">
      <ul v-if="competitions.id === epreuves[0].competitionId">
        <div  v-for="epreuve in epreuves" :key="epreuve.nom">
        <button type="submit">{{ epreuve.nom }}</button>
        <br>
        </div>
    </ul>
  </div>

    
  </section>
</template>

<script>

import EventBus from "./EventBus.vue";
import Login from "./Login.vue";
import Home from "./Home.vue";



export default {
  
  name: "Epreuve",
  data() {
    return {
    epreuves: [
      {
        id: 1,
        nom: 'branches_basses_en_main',
        categorieId: 1,
        competitionId: 1,
        competiteurId: 1,
      },
      {
        id: 2,
        nom: 'escalier_descendant_en_selle',
        categorieId: 1,
        competitionId: 1,
        competiteurId: 1,
      },
      {
        id: 3,
        nom: 'slalom_a_une_main',
        categorieId: 1,
        competitionId: 1,
        competiteurId: 1, 
      }
    ],

competitions: {
      id: 1,
      nom: 'test',
      userId: 1,
    },
    };
  },

  components: {
  },
  methods: {

  },
};


</script>