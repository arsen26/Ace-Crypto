<template>
  <v-row class="justify-center alifn-center container-text">
    <div>
      <span class="your-style">Your</span>
      <span class="trusted-style"> trusted</span>
      <span class="partner-style"> partner of cryptocurrency</span>
    </div>
  </v-row>
  <v-row class="container">
    <v-col v-for="(card, i) in cardsItems" :key="i" cols="12" lg="3" md="6">
      <v-card
        :color="card.color"
        class="mx-auto card-style"
        :style="cardStyle(i)"
      >
        <v-card-item>
          <div>
            <div class="text-overline mb-1">{{ card.number }}</div>
            <div class="text-h6 mb-1 card-title-style">
              {{ card.title }}
            </div>
            <div class="text-caption">{{ card.description }}</div>
          </div>
        </v-card-item>

        <v-card-actions>
          <v-btn>
            Learn More
            <v-icon>arrow_forward</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <tradingViewChart />
  </v-row>
</template>

<script setup>
import tradingViewChart from "./reusableComponent/tradingViewChart.vue";
import { ref, onMounted } from "vue";

const cardsItems = ref([
  {
    number: "01",
    title: "Price Chart History",
    description:
      "View historical price trends and analyze past market movements.",
    color: "#9c9ea2",
  },
  {
    number: "02",
    title: "Live Chart Data",
    description:
      "Access real-time data updates and monitor the latest market fluctuations.",
    color: "#bcfc3c",
  },
  {
    number: "03",
    title: "Latest News",
    description:
      "Stay informed with the latest financial and market-related news.",
    color: "#9c9ea2",
  },
]);
const cardStyle = (i) => {
  return {
    "box-shadow": `0 0 15px 2px ${cardsItems.value[i].color}`, // Përdor cardsItems.value për të aksesuar vlerat
    height: i === 1 ? "300px" : "auto",
    "margin-left": i === 2 ? "-30px !important" : "0",
    "z-index": i === 1 ? "1" : "0",
    "margin-right": i === 0 ? "-30px !important" : "0",
    "z-index": i === 1 ? "1" : "0",
  };
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 200px;
  background-color: #080d0f;
}
.card-style {
  opacity: 1;
  transition:
    opacity 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
  background-color: #222;
  color: white;
  padding: 20px;
  border-radius: 10px;
}

.card-title-style {
  font-family: "Tektur", sans-serif;
  font-size: 20px;
  font-weight: 600;
  margin-left:;
}
.container-text {
  background-color: #080d0f;
  padding-bottom: 60px;
}
.your-style {
  font-family: "Tektur", sans-serif;
  font-size: 40px;
  font-weight: 900;

  color: white;
}
.trusted-style {
  font-family: "Tektur", sans-serif;
  font-weight: 900;

  font-size: 30px;
  color: #bcfc3c;
}
.partner-style {
  font-family: "Tektur", sans-serif;
  font-size: 30px;
  font-weight: 900;

  color: #696969;
}
</style>
