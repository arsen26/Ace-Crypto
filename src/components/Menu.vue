<template>
  <div>
    <v-row
      v-if="width > 800"
      class="desktop-menu"
      align="center"
      justify="center"
    >
      <v-col cols="auto">
        <v-btn
          class="button-font"
          color="#bcfc3c"
          v-for="(button, index) in leftButtons"
          :key="'left' + index"
          variant="text"
          @click="sendToPath(button.sendTo)"
        >
          {{ button.title }}
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <img
          class="menu-logo"
          :width="120"
          aspect-ratio="4/3"
          contain
          :src="LogoMenu"
        />
      </v-col>
      <v-col cols="auto">
        <v-btn
          class="button-font"
          color="#bcfc3c"
          v-for="(button, index) in rightButtons"
          :key="'right' + index"
          variant="text"
          @click="sendToPath(button.sendTo)"
        >
          {{ button.title }}
        </v-btn>
      </v-col>
    </v-row>
    <v-app-bar v-if="width < 800" color="#171a1e">
      <h2 class="name-style name-style-mobile">
        Ace
        <span class="last-name-style last-name-style-mobile">Crypto</span>
      </h2>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click.stop="drawer = !drawer"
        style="color: white"
        variant="text"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      style="background-color: #222831 !important; color: white"
      v-model="drawer"
      temporary
      location="right"
      ><img
        class="menu-logo"
        :width="120"
        aspect-ratio="4/3"
        contain
        :src="LogoMenu"
      />
      <v-list>
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          :title="item.title"
          link
          drawer="false;"
        >
          <template v-slot:prepend>
            <v-icon class="mobile-icons" :icon="item.icon"></v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import LogoMenuImport from "@/assets/aceCryptoLogo2.ico";
import { useRouter } from "vue-router";

const router = useRouter();
const LogoMenu = ref(LogoMenuImport);
const width = ref(window.innerWidth);
const drawer = ref(false);
// Lista e butonave të ndarë
const leftButtons = ref([
  { title: "Home", sendTo: "/Home" },
  { title: "About Developer", sendTo: "/about-developer" },
]);

const rightButtons = ref([
  { title: "Crypto News", sendTo: "/cryptocurrency-news" },
  { title: "Contact", sendTo: "/contact" },
]);
const menuItems = ref([...leftButtons.value, ...rightButtons.value]);

const measureWidth = () => {
  width.value = window.innerWidth;
};

const handleResize = () => {
  measureWidth();
};
const sendToPath = (path) => {
  console.log(path, "path");
  router.push(path);
};
onMounted(() => {
  measureWidth();
  window.addEventListener("resize", handleResize);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.button-font {
  font-family: "Big Shoulders Stencil", sans-serif;
  font-optical-sizing: auto;
  font-size: 22px;
  font-weight: 700;
  font-style: normal;
}
.menu-logo {
  cursor: pointer;
}
@media (max-width: 800px) {
  .name-style-mobile {
    color: #bcfc3c;
    animation: glow 2s infinite;
    animation-delay: 0s;
  }
  .last-name-style-mobile {
    animation: glowSurname 2s infinite;
    animation-delay: 1.5s;
  }
}
.desktop-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background-color: #080d0f;
 z-index: 9999; 
  padding: 10px 0;
}
</style>
