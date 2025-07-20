<!-- src/components/CryptoDetails.vue -->
<template>
  <v-col class="details-style" cols="12" lg="3" md="5" sm="12">
    <div>
      <div class="text-h6 mb-1 crypto-title">
        <v-avatar :image="crypto?.LOGO_URL" size="30"></v-avatar>
        {{ crypto?.NAME }}

        <span class="crypto-symbol">
          {{ crypto?.SYMBOL }}
          <v-icon size="30" :color="isUp ? '#bcfc3c' : '#ff0000'">
            {{ isUp ? "arrow_drop_up" : "arrow_drop_down" }}
          </v-icon>
          {{
            crypto?.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_CONVERSION?.toFixed(
              2,
            )
          }}%
        </span>
        <h3>$ {{ crypto?.PRICE_USD?.toFixed(4) }}</h3>
      </div>
      <div class="text-caption">
        {{ crypto?.ASSET_DESCRIPTION_SNIPPET }}
      </div>
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
    </v-card>
  </v-col>
</template>

<script setup>
defineProps({
  crypto: Object,
  infoArray: Array,
  circulatingSupply: String,
  isUp: Boolean,
});
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
.details-style {
  border: 1px solid #e0e0e0;
  color: white;
}
</style>
