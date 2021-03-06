import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import "@fortawesome/fontawesome-free/js/all";
import "@fontsource/nunito";

createApp(App).use(router).mount("#app");
