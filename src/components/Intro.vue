<template>
    <v-row class="hero-containter">
      <v-col cols="6">
        <h3 class="hero-moto">Follow your crypto investment</h3>
        <h1 class="hero-title">
          Ace Crypto best website for <br />
          <span id="typed"> </span>
        </h1>
        <v-divider color="#bcfc3c"></v-divider>
        <!-- Përdor ikonen që kthen funksioni getIcon -->
        <v-avatar :image="iconUrl"></v-avatar>
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
  const iconUrl = ref(""); // Ruaj URL-në e ikonës këtu
  
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
  
  const getIcon = async (symbol) => {
    try {
      const response = await axios.get(`https://data-api.coindesk.com/asset/v2/metadata?assets=${symbol}&asset_lookup_priority=SYMBOL&quote_asset=USD`);
      console.log(response.data.Data)
      iconUrl.value = response.data[0]?.icon_url || ''
    } catch (error) {
      console.error("Error fetching icon:", error);
    }
  };
  
  onMounted(() => {
    getIcon("BTC"); 
    transition();
  });
  </script>
  
  <style scoped>
  .hero-moto {
    font-family: "Tektur", sans-serif;
    font-optical-sizing: auto;
    font-size: 22px;
    font-weight: 700;
    font-style: normal;
    margin-bottom: -10px;
    color: #9c9ea2;
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
  