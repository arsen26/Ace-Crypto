<template>
  <v-container class="crypto-news-container">
    <v-row>
      <v-text-field
        label="Search for news"
        variant="outlined"
        class="search-bar"
        append-inner-icon="search"
        rounded
        v-model="searchTerm"
        clearable
        @keyup.enter="searchForNews"
        @click:append-inner="searchForNews"
      />
    </v-row>
    <v-row>
      <h2>Quick links:</h2>
      <v-btn
        v-for="(button, index) in buttons"
        variant="text"
        @click="searchTerm = button.title"
      >
        {{ button.title }}</v-btn
      >
    </v-row>
    <v-row>
      <v-col>
        <v-card class="mx-auto" max-width="400">
          <v-img :src="mainSelectedNews.urlToImage" cover> </v-img>
          <v-card-title>
            {{ mainSelectedNews.title }}
          </v-card-title>
          <v-card-text>
            {{ mainSelectedNews.description }}
          </v-card-text>
          <v-card-actions>
            <v-btn @click="sendToNews(mainSelectedNews.url)"> Read more </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card> </v-card>
        <v-card> </v-card>
      </v-col>
      <v-col>
        <a href=""></a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { FlowerSpinner } from "epic-spinners";
import { useCryptoNewsStore } from "../../store/CryptoNews";

const cryptoNewsStore = useCryptoNewsStore();
const buttons = ref([
  {
    title: "Bitcoin",
  },
  {
    title: "Litecoin",
  },
  {
    title: "Ethereum",
  },
  {
    title: "Binance",
  },
]);
const searchTerm = ref("");
const mainSelectedNews = ref({});
const searchForNews = async () => {
  try {
    const res = await axios.get(
      `https://newsapi.org/v2/everything?q=${searchTerm.value}&from=2025-02-28&language=en&sortBy=publishedAt&apiKey=22b6185b96b8452eb38323140dcd6f86`,
    );
    mainSelectedNews.value = res.data.articles[0];
    console.log(mainSelectedNews.value, "=-mainSelectedNews");
    console.log(res.data.articles, "=-res.articles");
    cryptoNewsStore.setCryptoNews(res.data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};
const sendToNews = (url) => {
  window.open(url, "_blank");
};
</script>

<style scoped>
.search-bar {
  color: #bcfc3c;
}
.crypto-news-container {
  margin-top: 200px;
  color: white;
}
</style>
