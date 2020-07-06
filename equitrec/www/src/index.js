import Vue from "vue";
import App from "./views/App.vue";
import router from "./router";
import axios from "axios";

require("../node_modules/bootstrap/dist/css/bootstrap.css");

Vue.config.productionTip = false;

const app = new Vue({
  el: "#app",
  router,
  render: h => h(App),
});

let utilisateursBDD;
let jugerBDD;
let competitionBDD;
let epreuveBDD;
let competiteurBDD;
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
  localStorage.clear();
  localStorage.setItem("utilisateursBDD", JSON.stringify(utilisateursBDD));
  localStorage.setItem("jugerBDD", JSON.stringify(jugerBDD));
  localStorage.setItem("competitionBDD", JSON.stringify(competitionBDD));
  localStorage.setItem("epreuveBDD", JSON.stringify(epreuveBDD));
  localStorage.setItem("competiteurBDD", JSON.stringify(competiteurBDD));
  localStorage.setItem("j", 0);
}
