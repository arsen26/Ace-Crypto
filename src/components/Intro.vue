<template>
  <v-row class="hero-container">
    <v-col cols="6">
      <h3 class="hero-motto">Track your crypto investments</h3>
      <h1 class="hero-title">
        Ace Crypto – The best platform for <br />
        <span id="typed"></span>
      </h1>
      <v-divider color="#bcfc3c"></v-divider>
      <br /><br />
      <v-avatar
        v-for="crypto in cryptoIcons"
        :key="crypto.symbol"
        :image="crypto.iconUrl"
        size="50"
        class="crypto-icon"
        @click="getDetailsInfo(crypto.symbol)"
      ></v-avatar>
      <v-avatar size="50" class="crypto-icons-last-one"> +48 </v-avatar>
      <br /><br />
      <v-divider color="#bcfc3c"></v-divider>
      <h3 class="hero-motto">
        Click on an icon above to get the latest updates
      </h3>
    </v-col>
    <v-col cols="4">
      <v-img :src="image"></v-img>
    </v-col>
  </v-row>
</template>

<script setup>
import HeroImg from "@/assets/Group 1.png";
import Typed from "typed.js";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute;
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

const fetchCryptoIcons = async () => {
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
const getDetailsInfo = (item) => {
  console.log("Getting details for:", item);
  router.push({ name: "DetailsCrypto", query: { symbol: item } });
};
const initTypedAnimation = () => {
  new Typed("#typed", {
    strings: [
      "tracking crypto prices",
      "staying updated on crypto",
      "following new crypto launches",
      "exploring more about crypto",
    ],
    typeSpeed: 40,
    backSpeed: 50,
    loop: true,
  });
};

onMounted(() => {
  fetchCryptoIcons();
  initTypedAnimation();
});
</script>

<style scoped>
.crypto-icons-last-one {
  margin-left: -15px;
  margin-top: -40px;
  border: 1px solid #bcfc3c;
  background-color: #bcfc3c;
  color: black;
  font-family: "Tektur", sans-serif;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}
.crypto-icons-last-one:hover {
  transform: scale(1.2);
}

.crypto-icon {
  margin-left: -15px;
  margin-top: -40px;
  border: 1px solid #bcfc3c;
  background-color: #bcfc3c;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}
.crypto-icon:hover {
  transform: scale(1.2);
}

.hero-motto {
  font-family: "Tektur", sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #9c9ea2;
  cursor: pointer;
  margin-bottom: -10px;
}

.hero-title,
#typed {
  font-family: "Tektur", sans-serif;
  font-weight: 900;
  color: white;
}

#typed {
  color: #bcfc3c;
}

.hero-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
}
</style>
