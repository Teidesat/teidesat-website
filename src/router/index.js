import { createRouter, createWebHistory } from "vue-router";
import LandView from "../views/LandView.vue";
import OfferView from "../views/OfferView.vue";
import MissionView from "../views/MissionView.vue";
import NewsView from "../views/NewsView.vue";
import ContactView from "../views/ContactView.vue";

export const routes = [
  { path: "/", name: "home", component: LandView },
  { path: "/oferta", name: "oferta", component: OfferView },
  { path: "/mision", name: "mision", component: MissionView },
  { path: "/novedades", name: "novedades", component: NewsView },
  { path: "/contacto", name: "contacto", component: ContactView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
