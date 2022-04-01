import { createRouter, createWebHistory } from "vue-router";
import LandView from "../views/LandView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: LandView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
