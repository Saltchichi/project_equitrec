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

        <template v-for="(criteres, parent) in data.notations">
          <tr>
            <td style="color: Green; background-color: yellow;">
              {{ parent }}
            </td>
            <td style="background-color: yellow;"></td>
            <td style="background-color: yellow;"></td>
          </tr>
          <tr v-for="(value, critere) in criteres" :key="value">
            <td>{{ critere }}</td>
            <td>{{ value }}</td>
            <td><input type="text" class="response_input" /></td>
          </tr>
        </template>
        <tr>
          <td style="background-color: grey;"></td>
          <td style="background-color: grey;">{{ data.Total }}</td>
          <td style="background-color: grey;">
            <input
              type="number"
              class="response_input"
              style="background-color: grey;"
              v-model="cap"
            />
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
              type="checkbox"
              v-model="chute"
              true-value="true"
              false-value="false"
            />
          </td>
        </tr>
        <tr>
          <td>Erreur de parcours non rectifiée</td>
          <td>{{ data.Erreur_de_parcours }}</td>
          <td>
            <input
              type="checkbox"
              v-model="erreur"
              true-value="true"
              false-value="false"
            />
          </td>
        </tr>
      </table>

      <br />
      <button class="btn btn-primary" style="margin-left: 40%;" type="submit">
        Enregistrer
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
import data from "../json_files/branches_basses_en_main.json";

export default {
  name: "Notation",
  data: function() {
    return {
      nom: "",
      data: data,
      dossard: "",
      cap: "",
      observation: "",
      chute: false,
      erreur: false,
    };
  },
  components: {
    Epreuve: Epreuve,
  },
  methods: {
    checkConnection() {
      var Connection = navigator.connection;
      var networkState = navigator.connection.type;
      var states = {};
      states[Connection.UNKNOWN] = "Unknown connection";
      states[Connection.ETHERNET] = "Ethernet connection";
      states[Connection.WIFI] = "WiFi connection";
      states[Connection.CELL_2G] = "Cell 2G connection";
      states[Connection.CELL_3G] = "Cell 3G connection";
      states[Connection.CELL_4G] = "Cell 4G connection";
      states[Connection.CELL] = "Cell generic connection";
      states[Connection.NONE] = "No network connection";
      alert("Connection type: " + states[networkState]);
    },
    send() {
      if (this.dossard !== "") {
        if (this.cap !== "") {
          this.checkConnection();
          this.setNewResult(
            this.dossard,
            this.cap,
            this.observation,
            this.chute,
            this.erreur,
          );
        } else {
          alert("Problème: Résultat final");
        }
      } else {
        alert("Problème: Dossard");
      }
    },
    setNewResult(dossard, cap, observation, chute, erreur) {
      axios
        .post("http://192.168.1.37/api_equitrec/resultat", {
          cap: cap,
          observation: observation,
          chute: chute,
          erreur: erreur,
        })
        .then(response => {
          console.log(response);
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
  padding: 2px;
}
</style>
