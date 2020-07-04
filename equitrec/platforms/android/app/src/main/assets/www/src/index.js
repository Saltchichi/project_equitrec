import Vue from "vue";
import App from "./views/App.vue";
import router from "./router";
import axios from "axios";

require("../node_modules/bootstrap/dist/css/bootstrap.css");

Vue.config.productionTip = false;

const app = new Vue({
  el: "#app",
  router,
  data: {
    bddlocale: null,
  },
  render: h => h(App),
});

let utilisateursBDD;
let jugerBDD;
let competitionBDD;
let epreuveBDD;
let competiteurBDD;
let db = null;
let count = 1;
axios
  .get("https://api.alexandremonschein.fr/utilisateur")
  .then(response => {
    utilisateursBDD = response.data;
    if (
      utilisateursBDD !== "undefined" &&
      jugerBDD !== "undefined" &&
      competitionBDD !== "undefined" &&
      epreuveBDD !== "undefined" &&
      competiteurBDD !== "undefined" &&
      count == 5
    ) {
      localDatabase();
    }
    if (count !== 5) {
      count++;
    }
  })
  .catch(error => {
    console.log(error);
    // handle error
  });
axios
  .get("https://api.alexandremonschein.fr/competition")
  .then(response => {
    competitionBDD = response.data;
    if (
      utilisateursBDD !== "undefined" &&
      jugerBDD !== "undefined" &&
      competitionBDD !== "undefined" &&
      epreuveBDD !== "undefined" &&
      competiteurBDD !== "undefined" &&
      count == 5
    ) {
      localDatabase();
    }
    if (count !== 5) {
      count++;
    }
  })
  .catch(error => {
    console.log(error);
    // handle error
  });
axios
  .get("https://api.alexandremonschein.fr/juger")
  .then(response => {
    jugerBDD = response.data;
    if (
      utilisateursBDD !== "undefined" &&
      jugerBDD !== "undefined" &&
      competitionBDD !== "undefined" &&
      epreuveBDD !== "undefined" &&
      competiteurBDD !== "undefined" &&
      count == 5
    ) {
      localDatabase();
    }
    if (count !== 5) {
      count++;
    }
  })
  .catch(error => {
    console.log(error);
    // handle error
  });
axios
  .get("https://api.alexandremonschein.fr/epreuve")
  .then(response => {
    epreuveBDD = response.data;
    if (
      utilisateursBDD !== "undefined" &&
      jugerBDD !== "undefined" &&
      competitionBDD !== "undefined" &&
      epreuveBDD !== "undefined" &&
      competiteurBDD !== "undefined" &&
      count == 5
    ) {
      localDatabase();
    }
    if (count !== 5) {
      count++;
    }
  })
  .catch(error => {
    console.log(error);
    // handle error
  });
axios
  .get("https://api.alexandremonschein.fr/competiteur")
  .then(response => {
    competiteurBDD = response.data;
    if (
      utilisateursBDD !== "undefined" &&
      jugerBDD !== "undefined" &&
      competitionBDD !== "undefined" &&
      epreuveBDD !== "undefined" &&
      competiteurBDD !== "undefined" &&
      count == 5
    ) {
      localDatabase();
    }
    if (count !== 5) {
      count++;
    }
  })
  .catch(error => {
    console.log(error);
    // handle error
  });

function localDatabase() {
  db = window.openDatabase(
    "equitrec_local",
    "1.0",
    "local_database_of_equitrec",
    2 * 1024 * 1024,
  );
  var users = utilisateursBDD;
  var juger = jugerBDD;
  var competitions = competitionBDD;
  var epreuves = epreuveBDD;
  var competiteurs = competiteurBDD;

  db.transaction(function(tx) {
    tx.executeSql("DROP TABLE IF EXISTS utilisateurs");
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS utilisateurs (utilisateurID, roleID, email, motdepasse)",
    );
    for (var i = 0; i < users.length; i++) {
      let addUtilisateurs =
        "INSERT INTO utilisateurs(utilisateurID, roleID, email, motdepasse) VALUES(" +
        users[i].utilisateurID +
        ", " +
        users[i].roleID +
        ", '" +
        users[i].email +
        "', '" +
        users[i].motdepasse +
        "')";
      // console.log(addUtilisateurs);
      tx.executeSql(addUtilisateurs);
    }
  });
  db.transaction(function(tx) {
    tx.executeSql("DROP TABLE IF EXISTS competitions");
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS competitions(competitionID, competition_nom)",
    );
    for (var i = 0; i < competitions.length; i++) {
      let addCompetitions =
        "INSERT INTO competitions(competitionID, competition_nom) VALUES(" +
        competitions[i].competitionID +
        ",'" +
        competitions[i].competition_nom +
        "')";
      // console.log(addCompetitions);
      tx.executeSql(addCompetitions);
    }
  });
  db.transaction(function(tx) {
    tx.executeSql("DROP TABLE IF EXISTS juger");
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS juger(utilisateurID, competitionID)",
    );
    for (var i = 0; i < juger.length; i++) {
      let addJuger =
        "INSERT INTO juger(utilisateurID, competitionID) VALUES(" +
        juger[i].utilisateurID +
        "," +
        juger[i].competitionID +
        ")";
      // console.log(addJuger);
      tx.executeSql(addJuger);
    }
  });
  db.transaction(function(tx) {
    tx.executeSql("DROP TABLE IF EXISTS epreuves");
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS epreuves(epreuveID, epreuve_nom, competitionID)",
    );
    for (var i = 0; i < epreuves.length; i++) {
      let addEpreuves =
        "INSERT INTO epreuves(epreuveID, epreuve_nom, competitionID) VALUES(" +
        epreuves[i].epreuve_ID +
        ", '" +
        epreuves[i].epreuve_nom +
        "', " +
        epreuves[i].competitionID +
        ")";
      // console.log(addEpreuves);
      tx.executeSql(addEpreuves);
    }
  });
  db.transaction(function(tx) {
    tx.executeSql("DROP TABLE IF EXISTS competiteurs");
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS competiteurs(competiteurID, num_dossard, nom_competiteur, prenom_competiteur)",
    );
    for (var i = 0; i < competiteurs.length; i++) {
      let addCompetiteurs =
        "INSERT INTO competiteurs(competiteurID, num_dossard, nom_competiteur, prenom_competiteur) VALUES(" +
        competiteurs[i].competiteurID +
        "," +
        competiteurs[i].Num_dossard +
        ", '" +
        competiteurs[i].nom_competiteur +
        "', '" +
        competiteurs[i].prenom_competiteur +
        "')";
      // console.log(addCompetiteurs);
      tx.executeSql(addCompetiteurs);
    }
  });
  db.transaction(function(tx) {
    tx.executeSql("DROP TABLE IF EXISTS participer");
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS participer(competiteurID, resultat_ID, epreuve_ID)",
    );
  });
  db.transaction(function(tx) {
    tx.executeSql("DROP TABLE IF EXISTS resultats");
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS resultats(resultat_final, observations, chute, erreur_de_parcours)",
    );
  });
  if (db !== null) {
    app.bddlocale = db;
    console.log("BDD created");

    // console.log(utilisateursBDD);
    // console.log(jugerBDD);
    // console.log(competitionBDD);
    // console.log(epreuveBDD);
    // console.log(competiteurBDD);
  }
}
