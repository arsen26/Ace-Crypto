<template>
  <div class="content" fluid>
    <v-row class="d-flex justify-center align-center">
      <v-col cols="12" sm="4" class="text-center justify-center align-center">
        <v-img :width="300" aspect-ratio="1/1" cover :src="image"> </v-img>
      </v-col>
      <v-divider vertical class="hidden-sm-and-down"></v-divider>

      <v-col cols="12" sm="4" class="justify-center align-center">
        <v-list class="v-list-style" lines="one">
          <v-list-item
            @click="sector.functionToCall"
            v-for="sector in services"
            :key="sector.action"
            variant="plain"
            :title="sector.title"
            class="list-style"
          >
            <template v-slot:prepend>
              <v-icon
                @click="sector.functionToCall"
                class="contacts-icons"
                :icon="sector.icon"
              ></v-icon>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
      <v-divider vertical class="hidden-sm-and-down"></v-divider>

      <v-col cols="12" sm="4" class="justify-center align-center">
        <v-list class="v-list-style" lines="one">
          <v-list-item
            @click="developer.functionToCall"
            v-for="developer in developer"
            :key="developer.action"
            variant="plain"
            :title="developer.title"
            class="list-style"
          >
            <template v-slot:prepend>
              <v-icon
                @click="developer.functionToCall"
                class="contacts-icons"
                :icon="developer.icon"
              ></v-icon>
            </template>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import aceCryptoLogo2 from "@/assets/AceCryptoNewLogoTransparent.png";

const services = ref([
  {
    title: "Crypto Info",
    icon: "currency_bitcoin",
    functionToCall: () => {
      router.push("/CryptoList");
    },
  },
  {
    title: "Crypto News",
    icon: "newspaper",
    functionToCall: () => {
      router.push("/News");
    },
  },
  {
    title: "Crypto Api docs",
    icon: "settings",
    functionToCall: () => {
      router.push("/Settings");
    },
  },
]);

const developer = ref([
  {
    title: "Developer",
    icon: "account_circle",
    functionToCall: () => {
      router.push("/Developer");
    },
  },
]);

const image = ref(aceCryptoLogo2);
</script>

<style scoped>
.content {
  height: 100%;
  background-color: black;
}
.v-list-style {
  background-color: black;
  color: #bcfc3c;
}
</style>
