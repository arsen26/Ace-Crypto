import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);

app.use(vuetify);
app.use(pinia);
app.use(router);
app.mount("#app");
