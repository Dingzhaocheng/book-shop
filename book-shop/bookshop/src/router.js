import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/shoplist",
      name: "shoplist",
      component: () =>
        import( "./views/ShopList.vue")
    },
    {
      path: "/success",
      name: "success",
      component: () =>
        import( "./views/Success.vue")
    }
  ]
});
