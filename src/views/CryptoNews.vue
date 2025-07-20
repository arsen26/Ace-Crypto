<template>
  <div class="crypto-news-container">
    <v-row class="justify-center align-center">
      <v-col cols="12" md="10" sm="10" lg="11" class="text-center">
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
      </v-col>
    </v-row>
    <v-row class="justify-center align-center">
      <v-col cols="2" md="2" sm="2" lg="" class="text-center">
        <h2>Quick links:</h2></v-col
      >
      <v-col cols="10" md="10" sm="10" lg="10" class="text-start">
        <v-btn
          v-for="(button, index) in buttons"
          variant="text"
          @click="searchTerm = button.title"
        >
          {{ button.title }}</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="mx-auto card-style" max-width="400">
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
        <v-card class="card-style">
          <v-img :src="mainSelectedNews.urlToImage" cover> </v-img>
          <v-card-title> test </v-card-title>
          <v-card-text> test2 </v-card-text>
        </v-card>
        <v-card class="card-style">
          <v-card-title> test </v-card-title>
          <v-card-text> test2 </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <div v-for="(item, index) in cryptoNewsStore.cryptoNews" :key="index">
          <v-avatar>
            <v-icon color="#bcfc3c"> radio_button_checked </v-icon>
          </v-avatar>
          <span class="date-time-published-style">{{ item.publishedAt }}</span>
          <br />
          <a class="link-to-news" :href="item.url" target="_blank">{{
            item.title
          }}</a>
          <v-divider color="#bcfc3c"></v-divider>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { FlowerSpinner } from "epic-spinners";
import { useCryptoNewsStore } from "../../store/CryptoNews";
import { useDate } from "vuetify";

const formatDate = useDate();
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
      `https://newsapi.org/v2/everything?q=${searchTerm.value}&from=2025-03-28&language=en&sortBy=publishedAt&apiKey=22b6185b96b8452eb38323140dcd6f86`,
    );
    mainSelectedNews.value = res.data.articles[0];
    console.log(mainSelectedNews.value, "=-mainSelectedNews");
    console.log(res.data.articles, "=-res.articles");
    res.data.articles.forEach((item) => {
      item.publishedAt = formatDate.format(item.publishedAt, "fullDateTime24h");
    });
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
.date-time-published-style {
  color: #bcfc3c;
  font-size: 15px;
  opacity: 0.9;
}
.link-to-news {
  color: white;
  text-decoration: none;
  font-weight: 900;
}
.card-style {
  background-color: transparent;
  color: white;
}
.search-bar {
  color: #bcfc3c;
}
.crypto-news-container {
  margin-top: 200px;
  color: white;
}
</style>
