<template>
  <tradingViewChart :symbol="cryptoSymbol" />
</template>

<script setup>
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import tradingViewChart from "@/components/reusableComponent/tradingViewChart.vue";

const route = useRoute();
const cryptoSymbol = computed(() => route.params.id || "BTC");

watch(
  () => route.params.id,
  (newId) => {
    console.log("Crypto symbol updated:", newId);
  },
);
</script>

<style scoped></style>
