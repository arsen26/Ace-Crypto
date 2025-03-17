<template>
  <v-row class="justify-center align-center container">
    <v-col>
      <v-row class="justify-center align-center">
        <h2 class="crypto-list-title">Crypto List</h2>
      </v-row>
      <v-row class="justify-center align-center">
        <div class="crypto-list">
          <v-sheet border rounded
            ><v-data-table
              class="custom-table"
              :headers="cryptoList"
              items-per-page="10"
              :items="items"
              :items-per-page="10"
              fixed-header
              :items-length="items.length"
            >
              <template v-slot:item.name="{ item }">
                <!-- <v-avatar size="30" class="mr-2">
                  <img :src="item.iconUrl" :alt="item.name" />
                </v-avatar> -->
                <span>{{ item.name }}</span>
              </template>
            </v-data-table>
          </v-sheet>
        </div>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const cryptoList = ref([
  { title: "Name", value: "name" },
  { title: "Symbol", value: "symbol" },
  { title: "Max Supply", value: "max_supply" },
  { title: "Market Cap", value: "market_cap" },
  { title: "Price", value: "price" },
]);

const items = ref([]);

const getData = async () => {
  try {
    const res = await axios.get("http://localhost:5000/crypto");
    items.value = res.data.data.map((item) => ({
      name: item.name,
      symbol: item.symbol,
      max_supply: item.max_supply
        ? formatMarketCap(item.max_supply)
        : item.max_supply,
      market_cap: formatMarketCap(item.quote.USD.market_cap),
      price: Number(item.quote.USD.price).toFixed(2),
    }));
    console.log(items.value, "Loaded crypto data");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const formatMarketCap = (value) => {
  if (value >= 1e12) return (value / 1e12).toFixed(1) + "T";
  if (value >= 1e9) return (value / 1e9).toFixed(1) + "B";
  if (value >= 1e6) return (value / 1e6).toFixed(1) + "M";
  return value.toFixed(2);
};
onMounted(() => {
  getData();
});
</script>

<style scoped>
.container {
  margin-top: 260px;
  background-color: #ffffff;
}
.crypto-list-title {
  font-family: "Tektur", sans-serif;
  font-size: 22px;
  font-weight: 900;
  padding-bottom: 50px;
  text-align: center;
  color: #080d0f;
}
.crypto-list {
  padding-bottom: 100px;
  width: 90%;
}
</style>
