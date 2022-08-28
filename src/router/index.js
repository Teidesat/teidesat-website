import { createRouter, createWebHistory } from "vue-router";
import LandView from "../views/LandView.vue";
import OfferView from "../views/OfferView.vue";
import MissionView from "../views/MissionView.vue";
import NewsView from "../views/NewsView.vue";
import ContactView from "../views/ContactView.vue";

export const routes = [
  { path: "/", name: "home", component: LandView },
  { path: "/mision", name: "Misión", component: MissionView },
  { path: "/oferta", name: "Oferta Académica", component: OfferView },
  { path: "/novedades", name: "Novedades", component: NewsView },
  { path: "/contacto", name: "Contacto", component: ContactView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
