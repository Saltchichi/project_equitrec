<template>
  <section>
    <br />
    <span class="title">Epreuves amateur 1 et Amateur Elite</span>
    <br />
    <table class="notation_table">
      <tr></tr>
      <tr>
        <td></td>
        <td>Dossard</td>
        <td><input type="text" class="response_input"/></td>
      </tr>

      <template v-for="(criteres, parent) in data.notations">
        <tr>
          <td style="color: Green; background-color: yellow;">{{ parent }}</td>
          <td style="background-color: yellow;"></td>
          <td style="background-color: yellow;"></td>
        </tr>
        <tr v-for="(value, critere) in criteres" :key="value">
          <td>{{ critere }}</td>
          <td>{{ value }}</td>
          <td><input type="text" class="response_input"/></td>
        </tr>
      </template>
      <tr v-for="(value, total) in data.resultat" :key="total">
        <td style="background-color: grey;"></td>
        <td style="background-color: grey;">{{ value }}</td>
        <td style="background-color: grey;"><input type="text" class="response_input"/></td>
      </tr>
      <tr v-for="(value, critere) in data.others" :key="value">
        <td>{{ critere }}</td>
        <td>{{ value }}</td>
        <td><input type="text" class="response_input"/></td>
      </tr>

    </table>
    <br />
    <button class="btn btn-primary" style="margin-left: 40%;" type="submit">Enregistrer</button>
    <br /><br />
  </section>
</template>

<script>
import router from "../router";
import EventBus from "./EventBus.vue";
import Epreuve from "./Epreuve.vue";
import data from "../json_files/branches_basses_en_main.json";

export default {
  name: "Notation",
  data: function() {
    return {
      data: data,
    };
  },
  components: {
    Epreuve: Epreuve,
  },
  methods: {},
};
</script>

<style>
.notation_table {
  width: 50%;
  margin-left: 10%;
  position: center;
}
.response_input {
  border: 1px;
}
.title {
  display: block;
  width: 100%;
  text-align: center;
  color: #66ff07;
}
.critereParent {
  color: darkgreen;
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
  padding: 5px;
}
</style>
