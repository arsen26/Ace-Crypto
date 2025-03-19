<template>
  <v-row class="justify-center align-center container">
    <v-col>
      <v-row class="justify-center align-center">
        <h1 class="crypto-list-title">Crypto List</h1>
      </v-row>
      <v-row class="justify-center align-center">
        <div class="crypto-list">
          <v-sheet border rounded
            ><v-data-table-virtual
              class="custom-table"
              :headers="cryptoList"
              density="compact"
              items-per-page="10"
              :items="items"
              height="500"
              fixed-header
            >
              <template v-slot:column.header="{ column }">
                <th class="my-header-style">
                  <span>{{ column.title }}</span>
                </th>
              </template>
              <template v-slot:item="{ item }">
                <tr @click="testFunction(item)" class="clickable-row">
                  <td>{{ item.name }}</td>
                  <td>{{ item.symbol }}</td>
                  <td>{{ item.max_supply }}</td>
                  <td>{{ item.market_cap }}</td>
                  <td>{{ item.price }}</td>
                </tr>
              </template>
              <template v-slot:item.name="{ item }">
                <!-- <v-avatar size="30" class="mr-2">
                  <img :src="item.iconUrl" :alt="item.name" />
                </v-avatar> -->
                <span @click="testFunction">{{ item.name }}</span>
              </template>
            </v-data-table-virtual>
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
  { title: "Name", value: "name", width: "200px", class: "my-header-style" },
  { title: "Symbol", value: "symbol", class: "my-header-style" },
  { title: "Max Supply", value: "max_supply", class: "my-header-style" },
  { title: "Market Cap", value: "market_cap", class: "my-header-style" },
  { title: "Price", value: "price", class: "my-header-style" },
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
const testFunction = (item) => {
  console.log(item, "test");
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
  background-color: #080d0f;
}
.crypto-list-title {
  font-family: "Tektur", sans-serif;
  font-size: 40px;
  font-weight: 900;
  padding-bottom: 50px;
  text-align: center;
  color: #ffffff;
}
.crypto-list {
  padding-bottom: 100px;
  width: 90%;
}
.clickable-row {
  cursor: pointer;
}
.clickable-row:hover {
  background-color: #080d0f;
  color: #bcfc3c;
}
</style>
