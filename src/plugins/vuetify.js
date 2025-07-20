// vuetify.js
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { h } from "vue";
import { aliases, mdi } from "vuetify/iconsets/mdi";

const vuetify = createVuetify({
  icons: {
    defaultSet: "material-symbols-outlined",
    aliases,
    sets: {
      mdi,
      "material-symbols-outlined": {
        component: (props) =>
          h("span", { class: "material-symbols-outlined" }, props.icon),
      },
    },
  },
});

export default vuetify;
