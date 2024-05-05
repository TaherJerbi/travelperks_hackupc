import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import "./style.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primeflex/themes/primeone-light.css";
import "primevue/resources/themes/aura-light-indigo/theme.css";

const app = createApp(App);

app.use(PrimeVue);
app.mount("#app");
