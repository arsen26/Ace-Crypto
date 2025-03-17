<template>
  <Intro />
  <CryptoList />

</template>

<script setup>
import Intro from "@/components/Intro.vue";
import CryptoList from "@/components/CryptoList.vue";
import { ref, onMounted } from "vue";

onMounted(() => {
  console.log("Home component is mounted");
});
</script>

<style scoped></style>
