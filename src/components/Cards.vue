<template>
  <v-row class="container">
    <v-col v-for="(card, i) in cardsItems" :key="i" cols="12" lg="3" md="6">
      <v-card :color="card.color" class="mx-auto">
        <v-card-item>
          <div>
            <div class="text-overline mb-1"></div>
            <div class="text-h6 mb-1">
              {{ card.title }}
            </div>
            <div class="text-caption">{{ card.description }}</div>
          </div>
        </v-card-item>

        <v-card-actions>
          <v-btn>
            Learn more
            <v-icon>arrow_forward</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, onMounted } from "vue";
const cardsItems = ref([
  {
    number: 1,
    title: "Card 1",
    description: "Description 1",
    color: "#9c9ea2",
  },
  {
    number: 2,
    title: "Card 2",
    description: "Description 2",
    color: "#bcfc3c",
  },
  {
    number: 2,
    title: "Card 2",
    description: "Description 2",
    color: "#9c9ea2",
  },
]);
</script>

<style scoped>
.container {
  justify-content: center;
  align-items: center;
  padding-bottom: 200px;
  background-color: #080d0f;
}
</style>
