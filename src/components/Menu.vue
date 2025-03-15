<template>
  <v-row class="desktop-menu" align="center" justify="center">
    <v-col cols="auto">
      <v-btn
      class="button-font"
        color="#bcfc3c"
        v-for="(button, index) in leftButtons"
        :key="'left' + index"
        variant="text"
      >
        {{ button.title }}
      </v-btn>
    </v-col>
    <v-col cols="auto">
      <v-img class="menu-logo" :width="120" aspect-ratio="4/3" cover :src="LogoMenu"></v-img>
    </v-col>
    <v-col cols="auto">
      <v-btn
        class="button-font"
        color="#bcfc3c"
        v-for="(button, index) in rightButtons"
        :key="'right' + index"
        variant="text"
      >
        {{ button.title }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import LogoMenuImport from "@/assets/aceCryptoLogo2.ico";

const LogoMenu = ref(LogoMenuImport);
// Lista e butonave të ndarë
const leftButtons = ref([
  { title: "Home", sendTo: "/" },
  { title: "About Developer", sendTo: "/about-developer" },
]);

const rightButtons = ref([
  { title: "Crypto list", sendTo: "/crypto-list" },
  { title: "Contact", sendTo: "/contact" },
]);
</script>

<style scoped>
.button-font {
  font-family: "Big Shoulders Stencil", sans-serif;
  font-optical-sizing: auto;
  font-size: 22px;
  font-weight: 900;
  font-style: normal;
  
}
.menu-logo{
  cursor: pointer;
}
.desktop-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #080d0f;
  z-index: 1000;
  padding: 10px 0;
}
</style>
