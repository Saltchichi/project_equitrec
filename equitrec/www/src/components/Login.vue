<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form v-on:submit.prevent="login">
          <h1 class="h3 mb-3 font-weight-normal">EQUITREC</h1>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" class="form-control" v-model="email" />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" class="form-control" v-model="password" />
          </div>
          <button type="submit" class="btn btn-lg btn-primary btn-block">
            Sign In
          </button>
        </form>
        <!-- <form v-on:submit.prevent="localStorageDatabase">
          <button type="submit" class="btn btn-lg btn-primary btn-block">
            localStorageDatabase
          </button>
        </form> -->
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";
import EventBus from "./EventBus.vue";
import Competition from "./Competition.vue";
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      utilisateursBDD: [],
      utilisateurBDD: "",
      roleBDD: [],
      competitionBDD: [],
      epreuveBDD: [],
      competiteurBDD: [],
      localDb: {},
    };
  },
  components: {
    Competition: Competition,
  },
  created: function() {
    this.getRoles();
    this.getUtilisateurs();
    this.getCompetitions();
    this.getEpreuves();
    this.getCompetiteurs();
  },
  // mounted: function() {
  //   this.createDatabase();
  // },
  methods: {
    login() {
      if (this.email != "" && this.password != "") {
        this.getUtilisateurByEmail(this.email, this.password);
      } else {
        alert("Please fill email/password");
      }
    },
    getUtilisateurs() {
      axios
        .get("http://192.168.1.37/api_equitrec/utilisateur")
        .then(response => {
          this.utilisateursBDD = response.data;
          // console.log(this.utilisateursBDD);
        });
    },
    getUtilisateurByEmail(email, motdepasse) {
      axios
        .post("http://192.168.1.37/api_equitrec/utilisateur", {
          email: email,
          motdepasse: motdepasse,
        })
        .then(response => {
          if (response.data == true) {
            router.push({ name: "Competition" });
            this.emitMethod();
          } else {
            alert("The email and/or password is incorrect");
          }
        });
    },
    getRoles() {
      axios.get("http://192.168.1.37/api_equitrec/role").then(response => {
        this.roleBDD = response.data;
        // console.log(this.roleBDD);
      });
    },
    getCompetitions() {
      axios
        .get("http://192.168.1.37/api_equitrec/competition")
        .then(response => {
          this.competitionBDD = response.data;
          // console.log(this.competitionBDD);
        });
    },
    getEpreuves() {
      axios.get("http://192.168.1.37/api_equitrec/epreuve").then(response => {
        this.epreuveBDD = response.data;
        // console.log(this.epreuveBDD);
      });
    },
    getCompetiteurs() {
      axios
        .get("http://192.168.1.37/api_equitrec/competiteur")
        .then(response => {
          this.competiteurBDD = response.data;
          // console.log(this.competiteurBDD);
        });
    },
    createDatabase() {
      var db = openDatabase(
        "equitrec_local",
        "1.0",
        "local database of equitrec",
        2 * 1024 * 1024,
      );
      this.localDb = db;
      var users = this.utilisateursBDD;
      var roles = this.roleBDD;
      var competitions = this.competitionBDD;
      var epreuves = this.epreuveBDD;
      var competiteurs = this.competiteurBDD;

      this.localDb.transaction(function(tx) {
        tx.executeSql("DROP TABLE IF EXISTS utilisateurs");
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS utilisateurs (utilisateurID, roleID, email, motdepasse)",
        );
        for (var i = 0; i < users.length; i++) {
          tx.executeSql(
            "INSERT INTO utilisateurs(utilisateurID, roleID, email, motdepasse) VALUES(" +
              users[i].utilisateurID +
              ", " +
              users[i].roleID +
              ", '" +
              users[i].email +
              "', '" +
              users[i].motdepasse +
              "')",
          );
        }
      });
      db.transaction(function(tx) {
        tx.executeSql("DROP TABLE IF EXISTS roles");
        tx.executeSql("CREATE TABLE IF NOT EXISTS roles(roleID, role_nom)");
        for (var i = 0; i < roles.length; i++) {
          tx.executeSql(
            "INSERT INTO roles(roleID, role_nom) VALUES(" +
              roles[i].roleID +
              ",'" +
              roles[i].role_nom +
              "')",
          );
        }
      });
      db.transaction(function(tx) {
        tx.executeSql("DROP TABLE IF EXISTS competitions");
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS competitions(competitionID, competition_nom)",
        );
        for (var i = 0; i < competitions.length; i++) {
          tx.executeSql(
            "INSERT INTO roles(roleID, role_nom) VALUES(" +
              competitions[i].competitionID +
              ",'" +
              competitions[i].competition_nom +
              "')",
          );
        }
      });
      db.transaction(function(tx) {
        tx.executeSql("DROP TABLE IF EXISTS epreuves");
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS epreuves(epreuveID, epreuve_nom, competitionID)",
        );
        for (var i = 0; i < epreuves.length; i++) {
          tx.executeSql(
            "INSERT INTO epreuves(epreuveID, epreuve_nom, competitionID) VALUES(" +
              epreuves[i].epreuve_ID +
              ", '" +
              epreuves[i].epreuve_nom +
              "', " +
              epreuves[i].competitionID +
              ")",
          );
        }
      });
      db.transaction(function(tx) {
        tx.executeSql("DROP TABLE IF EXISTS competiteurs");
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS competiteurs(competiteurID, num_dossard, nom_competiteur, prenom_competiteur)",
        );
        for (var i = 0; i < competiteurs.length; i++) {
          tx.executeSql(
            "INSERT INTO competiteurs(competiteurID, num_dossard, nom_competiteur, prenom_competiteur) VALUES(" +
              competiteurs[i].competiteurID +
              "," +
              competiteurs[i].num_dossard +
              ", '" +
              competiteurs[i].nom_competiteur +
              "', '" +
              competiteurs[i].prenom_competiteur +
              "')",
          );
        }
      });
      console.log("BDD created");
    },
    selectUser(email) {
      this.localDb.transaction(function(tx) {
        tx.executeSql(
          "SELECT * FROM utilisateurs WHERE email = " + email,
          [],
          function(tx, results) {
            var len = results.rows.length,
              i;
            for (i = 0; i < len; i++) {
              console.log(results.rows[i]);
            }
          },
          null,
        );
      });
    },
    localStorageDatabase() {
      localStorage.clear();
      for (var i = 0; i < this.roleBDD.length; i++) {
        // console.log(this.roleBDD[i]);
        localStorage.setItem("role_ID_" + i, this.roleBDD[i].roleID);
        localStorage.setItem("role_nom_" + i, this.roleBDD[i].role_nom);
      }
      for (var i = 0; i < this.utilisateursBDD.length; i++) {
        // console.log(this.utilisateursBDD[i]);
        localStorage.setItem(
          "utilisateur_ID_" + i,
          this.utilisateursBDD[i].utilisateurID,
        );
        localStorage.setItem(
          "utilisateur_email_" + i,
          this.utilisateursBDD[i].email,
        );
        localStorage.setItem(
          "utilisateur_pass_" + i,
          this.utilisateursBDD[i].motdepasse,
        );
        localStorage.setItem(
          "utilisateur_roleID" + i,
          this.utilisateursBDD[i].roleID,
        );
      }
      for (var i = 0; i < this.competitionBDD.length; i++) {
        // console.log(this.competitionBDD[i]);
        localStorage.setItem(
          "competition_ID_" + i,
          this.competitionBDD[i].competitionID,
        );
        localStorage.setItem(
          "competition_Nom" + i,
          this.competitionBDD[i].competition_nom,
        );
      }
      for (var i = 0; i < this.epreuveBDD.length; i++) {
        // console.log(this.epreuveBDD[i]);
        localStorage.setItem("epreuve_ID_" + i, this.epreuveBDD[i].epreuve_ID);
        localStorage.setItem(
          "epreuve_Nom_" + i,
          this.epreuveBDD[i].epreuve_nom,
        );
        localStorage.setItem(
          "epreuve_CompetitionID_" + i,
          this.epreuveBDD[i].competitionID,
        );
      }
      for (var i = 0; i < this.competiteurBDD.length; i++) {
        // console.log(this.competiteurBDD[i]);
        localStorage.setItem(
          "competiteur_dossard_" + i,
          this.competiteurBDD[i].Num_dossard,
        );
        localStorage.setItem(
          "competiteur_ID_" + i,
          this.competiteurBDD[i].competiteurID,
        );
        localStorage.setItem(
          "competiteur_nom_" + i,
          this.competiteurBDD[i].nom_competiteur,
        );
        localStorage.setItem(
          "competiteur_prenom_" + i,
          this.competiteurBDD[i].prenom_competiteur,
        );
      }
      alert(localStorage.getItem("competiteur_nom_0"));
    },
    emitMethod() {
      EventBus.$emit("logged-in", "loggedin");
    },
  },
};
</script>
