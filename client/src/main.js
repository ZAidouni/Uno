import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import store from "./components/stores/store";
import "@egjs/vue3-flicking/dist/flicking.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserSecret, faHandHoldingMedical, faArrowsSpin, faBan, faStar, faRightFromBracket, faUser, faUserPen, faPlus, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";

library.add(faUserSecret, faHandHoldingMedical, faArrowsSpin, faBan, faStar, faRightFromBracket, faUser, faUserPen, faPlus, faCircleChevronRight);

const app = createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(store);

app.use(Toast, {
  // Paramètres de Toastification, si nécessaire
});

app.mount("#app");
