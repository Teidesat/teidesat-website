import { createRouter, createWebHistory } from "vue-router";
import LandView from "../views/LandView.vue";
import OfferView from "../views/OfferView.vue";
import ContactView from "../views/ContactView.vue";
// import MissionView from "../views/MissionView.vue";
// import NewsView from "../views/NewsView.vue";

export const routes = [
  { path: "/", name: "Home", component: LandView },
  { path: "/oferta", name: "Oferta Académica", component: OfferView },
  { path: "/contacto", name: "Contacto", component: ContactView },
  // { path: "/mision", name: "Misión", component: MissionView },
  // { path: "/novedades", name: "Novedades", component: NewsView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    to;
    from;
    return savedPosition ? savedPosition : { top: 0 };
  },
});

export default router;
