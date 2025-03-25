<template>
  <tradingViewChart :symbol="cryptoSymbol" />
</template>

<script setup>
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import tradingViewChart from "@/components/reusableComponent/tradingViewChart.vue";
const route = useRoute();
const cryptoSymbol = route.query.symbol;
console.log(cryptoSymbol);

watch(
  () => route.query.symbol,
  (newSymbol) => {
    console.log("Crypto symbol updated:", newSymbol);
  },
);
</script>

<style scoped></style>
