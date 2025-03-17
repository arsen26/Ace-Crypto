import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import Cryptoicon from "vue-cryptoicon";
import icon from "vue-cryptoicon/src/icons";
Cryptoicon.add(icon);

import { Btc, Eth, Xrp, Eos, Bnb } from "vue-cryptoicon/src/icons";
Cryptoicon.add([Btc, Eth, Xrp, Eos, Bnb]);

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.component("cryptoicon", Cryptoicon);
app.mount("#app");
