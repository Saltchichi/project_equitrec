import Vue from "vue";
import Router from "vue-router";
import Competition from "../components/Competition.vue";
import Login from "../components/Login.vue";
import Epreuve from "../components/Epreuve.vue";
import Notation from "../components/Notation.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/competition",
      name: "Competition",
      component: Competition,
    },
    {
      path: "/epreuve",
      name: "Epreuve",
      component: Epreuve,
    },
    {
      path: "/notation",
      name: "Notation",
      component: Notation,
    },
  ],
});
