<template>
  <div class="container">
    <h1>WELCOME</h1>
    
  </div>
</template>
<script>
import { writeFileSync, readFileSync } from 'fs';
import fs from "fs";
export default {
  name: "Grid",
  data: function() {
    return {};
  },
  mounted: function() {
      this.convertJson()
  },
  methods: {
    convertJson() {
      let fs = require("fs");
      fs.readFile(
        "../src/json_files/branches_basses_en_main.json",
        "utf8",
        (err, jsonString) => {
          if (err) {
            console.log("Erreur lors de la lecture du fichier :", err);
            return;
          }
          try {
            let epreuve = JSON.parse(jsonString);
            console.log("nom de l'epreuve:", epreuve.epreuve);
          } catch (err) {
            console.log("Erreur lors de l'analyse de la chaîne JSON:", err);
          }
        }
      );
    }
  }
};
</script>