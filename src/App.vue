<template>
  <v-app class="app-style">
    <Menu />
    <v-main>
      <router-view></router-view>
    </v-main>
    <Foooter />
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Menu from "./components/Menu.vue";
import { useRoute, useRouter } from "vue-router";
import Footer from "./components/Footer.vue";

const router = useRouter();
const route = useRoute();

onMounted(() => {
  router.push("/Home");
});
</script>

<style scoped>
.app-style {
  background-color: #080d0f;
  width: 100vw;
  height: 100vh;
}
</style>
