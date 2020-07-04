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
            <div class="response_div">{{ cap }}</div>
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
      <br /><br />
    </form>
    <form v-on:submit.prevent="getResultLocal">
      <button class="btn btn-primary" style="margin-left: 40%;" type="submit">
        get
      </button>
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
      bddlocal: {},
    };
  },
  components: {
    Epreuve: Epreuve,
  },
  mounted: function() {
    this.bddlocal = this.$parent.$parent;
    import(
      "../json_files/" + localStorage.getItem("epreuveName") + ".json"
    ).then(epreuveData => {
      this.data = epreuveData;
    });
  },
  methods: {
    send() {
      if (this.dossard !== "") {
        if (this.cap !== "") {
          let connexion = this.checkConnection();
          // let connexion = "wifi";
          if (
            connexion == "wifi" ||
            connexion == "ethernet" ||
            connexion == "4g" ||
            connexion == "3g"
          ) {
            alert(
              "Vous avez de la connexion: " +
                connexion +
                ". Vos données vont être envoyer",
            );
            this.setResult(
              this.dossard,
              this.cap,
              this.observation,
              this.chute,
              this.erreur,
            );
          } else {
            alert(
              "Vous n'avez pas deconnexion. Vos données vont être stocké en local",
            );
            this.setResultLocal(
              this.dossard,
              this.cap,
              this.observation,
              this.chute,
              this.erreur,
            );
          }
        } else {
          alert("Problème: Résultat final");
        }
      } else {
        alert("Problème: Dossard");
      }
    },
    checkConnection() {
      return navigator.connection.type;
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
        });
    },
    setResultLocal(dossard, cap, observation, chute, erreur) {
      this.bddlocal.bddlocale.transaction(function(tx) {
        if (observation == "") {
          observation = "RAS";
        }
        if (chute == false) {
          chute = "false";
        }
        if (erreur == false) {
          erreur = "false";
        }
        let addResultLocal =
          "INSERT INTO resultats(resultat_final, observations, chute, erreur_de_parcours) VALUES(" +
          cap +
          ", '" +
          observation +
          "', '" +
          chute +
          "', '" +
          erreur +
          "')";
        // console.log(addResultLocal);
        tx.executeSql(addResultLocal);
      });
    },
    getResultLocal() {
      this.bddlocal.bddlocale.transaction(function(tx) {
        let query = "SELECT * FROM resultats";
        tx.executeSql(
          query,
          [],
          function(tx, results) {
            let len = results.rows.length,
              i;
            for (i = 0; i < len; i++) {
              alert("Vous avez " + results.rows[i].length + " résultat(s) stocké en local");
            }
          },
          null,
        );
      });
    },
    updateResult(val, critere) {
      document.getElementById(critere).innerHTML = val;
      this.chuteOrErreur();
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
        this.cap += parseInt(document.getElementById(el).innerText);
      });
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
  margin-left: 40%;
}
.response_checkbox {
  margin-left: 40%;
}
.response_div {
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
