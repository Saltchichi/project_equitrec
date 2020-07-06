<template>
  <section>
    <br />
    <span class="title">{{ data.epreuve_nom }}</span>
    <br />
    <form v-on:submit.prevent="send">
      <table class="notation_table">
        <tr></tr>
        <tr>
          <td></td>
          <td>Dossard</td>
          <td>
            <input type="number" class="response_input" v-model="dossard" />
          </td>
        </tr>

        <template v-for="(criteres, nomCriteres) in data.notations">
          <tr>
            <td style="color: Green; background-color: yellow;">
              {{ nomCriteres }}
            </td>
            <td style="background-color: yellow;"></td>
            <td style="background-color: yellow;"></td>
          </tr>
          <tr v-for="(value, critere) in criteres" :key="value">
            <td>{{ critere }}</td>
            <td>{{ value }}</td>
            <td
              v-if="
                critere == 'Total_S' ||
                  critere == 'Total_C' ||
                  critere == 'Total_A' ||
                  critere == 'Total_P'
              "
            >
              <div class="response_div" :id="nomCriteres">0</div>
            </td>
            <td v-else>
              <input
                type="radio"
                class="response_radio"
                :name="nomCriteres"
                v-on:click="updateResult(value, nomCriteres)"
              />
            </td>
          </tr>
        </template>
        <tr>
          <td style="background-color: grey;"></td>
          <td style="background-color: grey;">{{ data.Total }}</td>
          <td style="background-color: grey;">
            <div class="response_div2">{{ cap }}</div>
          </td>
        </tr>
        <tr>
          <td>Observation</td>
          <td></td>
          <td>
            <input type="text" class="response_input" v-model="observation" />
          </td>
        </tr>
        <tr>
          <td style="background-color: orange;">PENALITES PTV</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Chute</td>
          <td>{{ data.Chute }}</td>
          <td>
            <input
              class="response_checkbox"
              type="checkbox"
              v-model="chute"
              true-value="true"
              false-value="false"
              v-on:change="chuteOrErreur"
            />
          </td>
        </tr>
        <tr>
          <td>Erreur de parcours non rectifiée</td>
          <td>{{ data.Erreur_de_parcours }}</td>
          <td>
            <input
              class="response_checkbox"
              type="checkbox"
              v-model="erreur"
              true-value="true"
              false-value="false"
              v-on:change="chuteOrErreur"
            />
          </td>
        </tr>
      </table>

      <br />
      <button class="btn btn-primary" style="margin-left: 40%;" type="submit">
        Envoyer
      </button>
      <button class="btn btn-primary" type="button" v-on:click="reset">
        Reset
      </button>
      <br /><br />
    </form>
  </section>
</template>

<script>
import router from "../router";
import EventBus from "./EventBus.vue";
import Epreuve from "./Epreuve.vue";
import axios from "axios";

export default {
  name: "Notation",
  data: function() {
    return {
      nom: "",
      data: "",
      dossard: "",
      cap: 0,
      observation: "",
      chute: "false",
      erreur: "false",
      j: "",
      localResults: [],
    };
  },
  components: {
    Epreuve: Epreuve,
  },
  mounted: function() {
    import(
      "../json_files/" + localStorage.getItem("epreuveName") + ".json"
    ).then(epreuveData => {
      this.data = epreuveData;
    });
    document.addEventListener("online", this.getResultLocal, false);
    this.j = localStorage.getItem("j");
  },
  methods: {
    send() {
      if (this.dossard !== "") {
        let connexion = this.checkConnection();
        if (
          connexion == "wifi" ||
          connexion == "ethernet" ||
          connexion == "4g" ||
          connexion == "3g"
        ) {
          this.setResult(
            this.dossard,
            this.cap,
            this.observation,
            this.chute,
            this.erreur,
          );
        } else {
          alert(
            "Vous n'avez pas de connexion. Vos données vont être stocké en local",
          );
          this.setResultLocal(
            this.dossard,
            this.cap,
            this.observation,
            this.chute,
            this.erreur,
          );
        }
        this.dossard = "";
        this.cap = 0;
        this.observation = "";
        this.chute = "false";
        this.erreur = "false";
        this.reset();
      } else {
        alert("Problème: Dossard");
      }
    },
    setResult(dossard, cap, observation, chute, erreur) {
      axios
        .post("https://api.alexandremonschein.fr/resultat", {
          cap: cap,
          observation: observation,
          chute: chute,
          erreur: erreur,
        })
        .then(response => {
          console.log(response);
          let competiteurBDD = JSON.parse(
            localStorage.getItem("competiteurBDD"),
          );
          let epreuveBDD = JSON.parse(localStorage.getItem("epreuveBDD"));
          let competiteur = competiteurBDD.find(el => dossard);

          let epreuve = epreuveBDD.find(
            el => (el = localStorage.getItem("epreuveName")),
          );
          axios
            .post("https://api.alexandremonschein.fr/participer", {
              competiteurID: competiteur.competiteurID,
              epreuveID: epreuve.epreuve_ID,
            })
            .then(response2 => {
              console.log(response2);
              alert("Données envoyées avec succès");
            })
            .catch(err2 => {
              alert("err2: " + err2);
              alert(
                "Vous n'avez toujours pas la connexion necessaire pour envoyer les données stockées en local sur la BDD du site",
              );
            });
        })
        .catch(err => {
          alert("err: " + err);
          alert(
            "Vous n'avez toujours pas la connexion necessaire pour envoyer les données stockées en local sur la BDD du site",
          );
        });
    },
    setResultLocal(dossard, cap, observation, chute, erreur) {
      if (observation == "") {
        observation = "RAS";
      }
      if (chute == false) {
        chute = "false";
      }
      if (erreur == false) {
        erreur = "false";
      }
      let result =
        cap + "," + observation + "," + chute + "," + erreur + "," + dossard;
      localStorage.setItem("resultat_" + this.j, result);
      this.j++;
      localStorage.setItem("j", this.j);
    },
    getResultLocal() {
      let splitted = [];
      for (let i = 0; i < this.j; i++) {
        this.localResults.push(localStorage.getItem("resultat_" + i));
        let split = this.localResults[i].split(",");
        splitted.push(split);
        if (splitted.length !== 0) {
          axios
            .post("https://api.alexandremonschein.fr/resultat", {
              cap: splitted[i][0],
              observation: splitted[i][1],
              chute: splitted[i][2],
              erreur: splitted[i][3],
            })
            .then(response => {
              console.log(response);
              // localStorage.removeItem("resultat_" + i);
              let competiteurBDD = JSON.parse(
                localStorage.getItem("competiteurBDD"),
              );
              let epreuveBDD = JSON.parse(localStorage.getItem("epreuveBDD"));
              let competiteur = competiteurBDD.find(
                el => (el = splitted[i][4]),
              );

              let epreuve = epreuveBDD.find(
                el => (el = localStorage.getItem("epreuveName")),
              );
              axios
                .post("https://api.alexandremonschein.fr/participer", {
                  competiteurID: competiteur.competiteurID,
                  epreuveID: epreuve.epreuve_ID,
                })
                .then(response2 => {
                  console.log(response2);
                  localStorage.removeItem("resultat_" + i);
                })
                .catch(err2 => {
                  alert("err2: " + err2);
                });
            })
            .catch(err => {
              alert("err: " + err);
            });
        }
      }
      this.localResults = [];
      this.j = 0;
      localStorage.setItem("j", this.j);
    },
    updateResult(val, critere) {
      document.getElementById(critere).innerHTML = val;
      this.chuteOrErreur();
    },
    reset() {
      var allRadios = document.getElementsByClassName("response_radio");
      var allDiv = document.getElementsByClassName("response_div");
      var x = 0;
      var y = 0;
      for (x = 0; x < allRadios.length; x++) {
        allRadios[x].checked = false;
      }
      for (y = 0; y < allDiv.length; y++) {
        allDiv[y].innerHTML = "0";
      }
    },
    chuteOrErreur() {
      this.calculResult();
      if (this.chute == "true" || this.erreur == "true") {
        this.cap = 0;
      }
    },
    calculResult() {
      this.cap = 0;
      Object.keys(this.data.notations).forEach(el => {
        this.cap += parseInt(document.getElementById(el).innerHTML);
      });
    },
    checkConnection() {
      return navigator.connection.type;
    },
  },
};
</script>

<style>
.notation_table {
  width: 80%;
  margin-left: 10%;
  position: center;
}
.response_input {
  border: 1px;
  width: 100%;
  height: 100%;
  border: none;
}
.response_radio {
  margin-left: 44%;
}
.response_checkbox {
  margin-left: 44%;
}
.response_div {
  text-align: center;
}
.response_div2 {
  text-align: center;
}
.title {
  display: block;
  width: 100%;
  text-align: center;
  color: #66ff07;
}
table,
td,
th {
  border: 1px solid #ddd;
  text-align: left;
}
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  padding: 6px;
}
</style>
