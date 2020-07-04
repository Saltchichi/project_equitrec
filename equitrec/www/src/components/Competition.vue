<template>
  <section>
    <div
      v-if="mockUsers.id === competitions.userId"
      class="container"
      style="margin-top: 50px;"
    >
      <form v-on:submit="epreuve">
        <button type="submit" class="btn btn-primary btn-lg">
          {{ competitions.nom }}
        </button>
      </form>
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
        email: "juge@gmail.com",
      },
      competitions: {
        id: 1,
        nom: "Competition Hivernale Auvergne-Rhone-Alpes",
        userId: 1,
      },
      // competitionLocal: [],
      // utilisateurLocal: [],
      // jugerLocal: [],
    };
  },
  components: {
    Login: Login,
    Epreuve: Epreuve,
  },
  mounted: function() {
    this.bddlocal = this.$parent.$parent;
  },
  methods: {
    epreuve() {
      router.push({ name: "Epreuve" });
    },
    getCompetitionByUser() {
      var that = this;
      this.bddlocal.bddlocale.transaction(function(tx) {
        let query = "SELECT * FROM competitions";
        tx.executeSql(
          query,
          [],
          function(tx, results) {
            let len = results.rows.length,
              i;
            for (i = 0; i < len; i++) {
              console.log(results.rows[i]);
              that.competitionLocal = results.rows[i];
            }
          },
          null,
        );
        let query2 =
          "SELECT * FROM Utilisateurs WHERE email = 'juge@gmail.com'";
        tx.executeSql(
          query2,
          [],
          function(tx, results) {
            let len = results.rows.length,
              i;
            for (i = 0; i < len; i++) {
              console.log(results.rows[i]);
              that.utilisateurLocal = results.rows[i];
            }
          },
          null,
        );
        let query3 = "SELECT * FROM juger";
        tx.executeSql(
          query3,
          [],
          function(tx, results) {
            let len = results.rows.length,
              i;
            for (i = 0; i < len; i++) {
              console.log(results.rows[i]);
              that.jugerLocal = results.rows[i];
            }
          },
          null,
        );
      });
    },
    get() {
      console.log(this.competitionLocal);
      console.log(this.utilisateurLocal);
      console.log(this.jugerLocal);
    },
  },
};
</script>

<style scoped></style>
