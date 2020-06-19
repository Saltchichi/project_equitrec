import Vue from "vue";
import Router from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Epreuve from "../components/Epreuve.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
    },
    {
      path: "/epreuve",
      name: "Epreuve",
      component: Epreuve,
    },
  ],
});
