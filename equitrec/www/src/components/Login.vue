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
      roleBDD: [],
      competitionBDD: [],
      epreuveBDD: [],
      competiteurBDD: [],
    };
  },
  components: {
    Competition: Competition,
  },
  created: function() {
    this.getUtilisateurs();
    this.getRoles();
    this.getCompetitions();
    this.getEpreuves();
    this.getCompetiteurs();
  },
  methods: {
    login() {
      const mockUser = {
        id: 1,
        email: "user@gmail.com",
        password: "user",
      };
      if (this.email != "" && this.password != "") {
        if (
          this.email == mockUser.email &&
          this.password == mockUser.password
        ) {
          router.push({ name: "Competition" });
          this.emitMethod();
        } else {
          alert("The email and/or password is incorrect");
        }
      } else {
        alert("Please fill email/password");
      }
    },
    getUtilisateurs() {
      axios.get("http://localhost/api_equitrec/utilisateur").then(response => {
        this.utilisateursBDD = response.data;
        console.log(this.utilisateursBDD);
      });
    },
    getRoles() {
      axios.get("http://localhost/api_equitrec/role").then(response => {
        this.roleBDD = response.data;
        console.log(this.roleBDD);
      });
    },
    getCompetitions() {
      axios.get("http://localhost/api_equitrec/competition").then(response => {
        this.competitionBDD = response.data;
        console.log(this.competitionBDD);
      });
    },
    getEpreuves() {
      axios.get("http://localhost/api_equitrec/epreuve").then(response => {
        this.epreuveBDD = response.data;
        console.log(this.epreuveBDD);
      });
    },
    getCompetiteurs() {
      axios.get("http://localhost/api_equitrec/competiteur").then(response => {
        this.competiteurBDD = response.data;
        console.log(this.competiteurBDD);
      });
    },
    emitMethod() {
      EventBus.$emit("logged-in", "loggedin");
    },
  },
};
</script>
