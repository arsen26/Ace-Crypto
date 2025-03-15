<template>
  <v-app class="app-style">
    <Menu />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import Menu from "./components/Menu.vue";
</script>

<style scoped>
.app-style {
  background-color: #080d0f;
  width: 100vw;
  height: 100vh;
}
</style>
