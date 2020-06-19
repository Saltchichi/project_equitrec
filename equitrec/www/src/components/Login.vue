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
import Home from "./Home.vue";
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
   components: {
    Home: Home,
  },
  methods: {
    login() {
      debugger;
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
          router.push({ name: "Home" });
          this.emitMethod();
        } else {
          alert("The email and/or password is incorrect");
        }
      } else {
        alert("Please fill email/password");
      }
    },
    emitMethod() {
      EventBus.$emit("logged-in", "loggedin");
    },

  },
};
</script>
