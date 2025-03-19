<template>
  <v-row class="content">
    <v-col> <v-img :src="image"> </v-img> </v-col>
    <v-divider vertical class="hidden-sm-and-down"></v-divider>

    <v-col>
      <v-list class="v-list-style" lines="one">
        <v-list-item
          @click="sector.functionToCall"
          v-for="sector in menu"
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

    <v-col> </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import aceCryptoLogo2 from "@/assets/aceCryptoLogo2.png";

const image = ref(aceCryptoLogo2);
</script>

<style scoped></style>
