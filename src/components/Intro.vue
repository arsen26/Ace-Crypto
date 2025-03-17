<template>
  <v-row class="hero-containter">
    <v-col cols="6">
      <h3 class="hero-moto">Follow your crypto investment</h3>
      <h1 class="hero-title">
        Ace Crypto best website for <br />
        <span id="typed"> </span>
      </h1>
      <v-divider color="#bcfc3c"></v-divider>
      <br /> <br>
      <v-avatar
        v-for="crypto in cryptoIcons"
        :key="crypto.symbol"
        :image="crypto.iconUrl"
        size="50"
        class="crypto-icons"
      ></v-avatar>
      <v-avatar  size="50"
      class="crypto-icons-last-one">
    +48
    </v-avatar>
      <br /><br>
      <v-divider color="#bcfc3c"></v-divider>
    </v-col>
    <v-col cols="4">
      <v-img :src="image"> </v-img>
    </v-col>
  </v-row>
</template>

<script setup>
import HeroImg from "@/assets/Group 1.png";
import Typed from "typed.js";
import { ref, onMounted } from "vue";
import axios from "axios";

const image = ref(HeroImg);

const cryptoIcons = ref([
  { symbol: "BTC", iconUrl: "" },
  { symbol: "ETH", iconUrl: "" },
  { symbol: "ADA", iconUrl: "" },
  { symbol: "BNB", iconUrl: "" },
  { symbol: "DOGE", iconUrl: "" },
  { symbol: "XRP", iconUrl: "" },
  { symbol: "DOT", iconUrl: "" },
  { symbol: "UNI", iconUrl: "" },
  { symbol: "LTC", iconUrl: "" },
  { symbol: "LINK", iconUrl: "" },
]);

const getAllIcons = async () => {
  await Promise.all(
    cryptoIcons.value.map(async (crypto) => {
      try {
        const response = await axios.get(
          `https://data-api.coindesk.com/asset/v2/metadata?assets=${crypto.symbol}&asset_lookup_priority=SYMBOL&quote_asset=USD`,
        );
        crypto.iconUrl = response.data.Data?.[crypto.symbol]?.LOGO_URL || "";
      } catch (error) {
        console.error(`Error fetching icon for ${crypto.symbol}:`, error);
      }
    }),
  );
};

const transition = () => {
  new Typed("#typed", {
    strings: [
      "chasing crypto prices",
      "chasing crypto updates",
      "chasing crypto launches",
      "more about crypto",
    ],
    typeSpeed: 40,
    backSpeed: 50,
    loop: true,
  });
};

onMounted(() => {
  getAllIcons();
  transition();
});
</script>

<style scoped>
.crypto-icons-last-one{
  margin-left: -15px;
  margin-top: -40px;
  border: 1px solid #bcfc3c;
  background-color: #bcfc3c;
  color: black;
  font-family: "Tektur", sans-serif;
  cursor: pointer;

}
.crypto-icons-last-one:hover {
  transform: scale(1.2);
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

}
.crypto-icons {
  margin-left: -15px;
  margin-top: -40px;
  border: 1px solid #bcfc3c;
  background-color: #bcfc3c;
  cursor: pointer;

}
.crypto-icons:hover {
  transform: scale(1.2);
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

}
.hero-moto {
  font-family: "Tektur", sans-serif;
  font-optical-sizing: auto;
  font-size: 22px;
  font-weight: 700;
  font-style: normal;
  margin-bottom: -10px;
  color: #9c9ea2;
  cursor: pointer;
}
.hero-title,
#typed {
  font-family: "Tektur", sans-serif;
  font-optical-sizing: auto;
  font-weight: 900;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  color: white;
}
#typed {
  color: #bcfc3c;
}
.hero-containter {
  justify-content: center;
  align-items: center;
  margin-top: 200px;
}
</style>
