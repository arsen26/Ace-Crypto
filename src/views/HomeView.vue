<template>
  <Intro />
</template>

<script setup>
import Intro from "@/components/Intro.vue";
import { ref, onMounted } from "vue";

onMounted(() => {
  console.log("Home component is mounted");
});
</script>

<style scoped></style>
