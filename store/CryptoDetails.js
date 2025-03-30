import { ref } from "vue";
import { defineStore } from "pinia";

export const useCryptoDetailsStore = defineStore("crypto-details", () => {
  const cryptoList = ref([]);
  const cryptoDetails = ref([]);

  const setCryptoList = (list) => {
    cryptoList.value = list;
  };

  return {
    cryptoList,
    setCryptoList,
    cryptoDetails,
  };
});
