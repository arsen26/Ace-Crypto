<!-- src/components/CryptoDetails.vue -->
<template>
  <v-col class="details-style" cols="12" lg="3" md="5" sm="10" xs="6">
    <div class="text-h6 mb-1 crypto-title crypto-header">
      <v-avatar :image="crypto?.LOGO_URL" size="30"></v-avatar>
      {{ crypto?.NAME }}

      <span class="crypto-symbol">
        {{ crypto?.SYMBOL }}
        <v-icon size="30" :color="isUp ? '#bcfc3c' : '#ff0000'">
          {{ isUp ? "arrow_drop_up" : "arrow_drop_down" }}
        </v-icon>
        {{
          crypto?.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_CONVERSION?.toFixed(2)
        }}%
      </span>
      <h3>$ {{ crypto?.PRICE_USD?.toFixed(4) }}</h3>
    </div>
    <div class="text-caption">
      {{ crypto?.ASSET_DESCRIPTION_SNIPPET }}
    </div>

    <v-card class="mx-auto card-content" variant="outlined" color="white">
      <v-row
        v-for="(row, rowIndex) in infoArray"
        :key="rowIndex"
        class="mt-1 ml-0"
      >
        <v-col
          v-for="(item, colIndex) in row"
          :key="colIndex"
          cols="12"
          sm="6"
          md="6"
           xs="6"
          class="pd-0 pr-1"
        >
          <v-card class="mr-5 crypto-information-style" variant="outlined">
            <v-card-item>
              <span class="font-weight-bold card-title-style">
                {{ item.title }}
              </span>
              <v-card-text class="card-value-text-style">
                {{ item.value }}
              </v-card-text>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-1 ml-1">
        <v-col>
          <v-card class="mr-3 last-card-style" variant="outlined">
            <v-card-item>
              <span class="font-weight-bold"> Circulating supply </span>
              <v-card-text> {{ circulatingSupply }} </v-card-text>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>

      <v-card-actions>
        <v-btn>
          Learn more
          <v-icon>arrow_right</v-icon>
        </v-btn>
      </v-card-actions>
      <v-row class="justify-center align-center mb-2">
        <v-col cols="11" class="text-center">
          <h4>Convert {{ crypto?.NAME }} to USD</h4>
          <v-text-field
            variant="outlined"
            hide-details
            density="compact"
            :label="crypto?.NAME"
            v-model="cryptoAmount"
            @input="calculateConversion"
          >
          </v-text-field>
          <v-icon>compare_arrows</v-icon>
          <v-text-field
            variant="outlined"
            hide-details
            density="compact"
            label="USD"
            v-model="usdAmount"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  crypto: Object,
  infoArray: Array,
  circulatingSupply: String,
  isUp: Boolean,
});

const cryptoAmount = ref(0);
const usdAmount = ref(0);

const calculateConversion = () => {
  // console.log(props.crypto,'--crypto');
  if (crypto && cryptoAmount.value) {
    usdAmount.value = (cryptoAmount.value * props.crypto.PRICE_USD).toFixed(2);
  }
};
</script>

<style scoped>
.last-card-style {
  height: 80px;
}
.card-value-text-style {
  font-size: 12px;
  color: white;
  font-weight: bold;
  margin-top: -17px;
}
.card-title-style {
  font-size: 13.5px;
  color: #9c9ea2;
  font-weight: bold;
}
.crypto-information-style {
  height: 60px;
}
.crypto-title {
  font-size: 24px;
  font-weight: bold;
}
.crypto-symbol {
  font-size: 18px;
  font-weight: normal;
  color: #9c9ea2;
}
.crypto-header {
  position: sticky;
  top: -10px;
  z-index: 10;
  margin-top: 10px;
  background-color: #080d0f;
  padding-top: 0px;
  padding-bottom: 8px;
}
.details-style {
  height: 600px;
  overflow-y: auto;

  margin-top: -10px;
  margin-bottom: 40px;
  border: 1px solid #e0e0e0;
  color: white;
  scrollbar-width: thin;
  scrollbar-color: #bcfc3c #2c2c2c;
}

.details-style::-webkit-scrollbar {
  width: 8px;
}

.details-style::-webkit-scrollbar-track {
  background: #2c2c2c;
  border-radius: 4px;
}

.details-style::-webkit-scrollbar-thumb {
  background: #bcfc3c;
  border-radius: 4px;
  border: 2px solid #2c2c2c;
}

.details-style::-webkit-scrollbar-thumb:hover {
  background: #a5e632;
}
</style>
