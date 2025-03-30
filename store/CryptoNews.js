import { ref } from "vue";
import { defineStore } from "pinia";

export const useCryptoNewsStore = defineStore("crypto-news", () => {
  const cryptoNews = ref([]);
  const setCryptoNews = (news) => {
    cryptoNews.value = news;
  };
  return {
    cryptoNews,
    setCryptoNews,
  };
});
