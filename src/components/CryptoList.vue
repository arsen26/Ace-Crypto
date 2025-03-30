<template>
  <v-row class="justify-center align-center container">
    <v-col>
      <v-row class="justify-center align-center">
        <h1 class="crypto-list-title">Crypto List</h1>
      </v-row>
      <v-row class="justify-center align-center">
        <div class="crypto-list">
          <v-sheet border rounded>
            <v-data-table-virtual
              class="custom-table"
              :headers="cryptoList"
              density="compact"
              items-per-page="10"
              :items="items"
              fixed-header
              :loading="isLoading"
              :loading-text="spinner ? 'Loading...' : ''"
              height="500"
              :mobile="mobile"
              @click:row="sendToCryptoDetails"
            >
              <template #end>
                <v-container
                  class="d-flex align-center justify-center"
                  style="height: 500px"
                >
                  <flower-spinner
                    :animation-duration="2500"
                    :size="70"
                    color="#bcfc3c"
                  />
                </v-container>
              </template>

              <template v-slot:column.header="{ column }">
                <th class="my-header-style">
                  <span>{{ column.title }}</span>
                </th>
              </template>
              <template
                v-for="key in [
                  'SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD',
                  'SPOT_MOVING_7_DAY_CHANGE_PERCENTAGE_USD',
                  'SPOT_MOVING_30_DAY_CHANGE_PERCENTAGE_USD',
                ]"
                v-slot:[`item.${key}`]="{ item }"
              >
                <span
                  :class="{
                    'text-green': item?.[key] > 0,
                    'text-red': item?.[key] < 0,
                  }"
                >
                  {{ item[key]?.toFixed(2) }}
                </span>
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
import { ref, onMounted, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useDisplay } from "vuetify";
import { FlowerSpinner } from "epic-spinners";
import { useCryptoDetailsStore } from "../../store/CryptoDetails";
import { ChaikinMoneyFlow } from "@amcharts/amcharts5/.internal/charts/stock/indicators/ChaikinMoneyFlow";

const cryptoDetailsStore = useCryptoDetailsStore();
const router = useRouter();
const { mobile } = useDisplay();
const spinner = ref(false);
const isLoading = ref(false);
const route = useRoute();
const cryptoList = ref([
  { title: "#", value: "number", width: "20px", class: "my-header-style" },
  { title: "Name", value: "name", width: "200px", class: "my-header-style" },
  { title: "Symbol", value: "symbol", class: "my-header-style" },
  {
    title: "24h %",
    value: "SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD",
    class: "my-header-style",
  },
  {
    title: "7d %",
    value: "SPOT_MOVING_7_DAY_CHANGE_PERCENTAGE_USD",
    class: "my-header-style",
  },
  {
    title: "30d %",
    value: "SPOT_MOVING_30_DAY_CHANGE_PERCENTAGE_USD",
    class: "my-header-style",
  },
  { title: "Max Supply", value: "max_supply", class: "my-header-style" },
  { title: "Market Cap", value: "market_cap", class: "my-header-style" },
  { title: "Price", value: "price", class: "my-header-style" },
]);

const items = ref([]);

const getData = async () => {
  spinner.value = true;
  isLoading.value = true;
  try {
    const res = await axios.get("http://localhost:5000/crypto");
    console.log(res.data.data, "=-=>> res data data");
    items.value = res.data.data.map((item) => ({
      name: item.name,
      symbol: item.symbol,
      max_supply: item.max_supply ? formatMarketCap(item.max_supply) : "N/A",
      market_cap: formatMarketCap(item.quote.USD.market_cap),
      price: Number(item.quote.USD.price).toFixed(2),
    }));
    spinner.value = false;
    isLoading.value = false;
    await getCardInfo();
    // console.log(items.value, "Loaded crypto data");
  } catch (error) {
    spinner.value = false;
    isLoading.value = false;
    console.error("Error fetching data:", error);
  }
};
const getCardInfo = async () => {
  spinner.value = true;
  isLoading.value = true;
  try {
    for (const item of items.value) {
      const response = await axios.get(
        `https://data-api.coindesk.com/asset/v2/metadata?assets=${item.symbol}&asset_lookup_priority=SYMBOL&quote_asset=USD`,
      );
      Object.assign(item, {
        logoUrl: response.data.Data?.[item.symbol].LOGO_URL,
        statistics: response.data.Data[item.symbol],
      });
      item.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD =
        item.statistics?.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD;
      item.SPOT_MOVING_7_DAY_CHANGE_PERCENTAGE_USD =
        item.statistics?.SPOT_MOVING_7_DAY_CHANGE_PERCENTAGE_USD;
      item.SPOT_MOVING_30_DAY_CHANGE_PERCENTAGE_USD =
        item.statistics?.SPOT_MOVING_30_DAY_CHANGE_PERCENTAGE_USD;
    }
    items.value = items.value.map((item, index) => ({
      ...item,
      number: index + 1,
    }));
    cryptoDetailsStore.setCryptoList(items.value);
    console.log(items.value, "=-=>> items value");
    spinner.value = false;
    isLoading.value = false;
  } catch (error) {
    spinner.value = false;
    isLoading.value = false;
    console.error(error);
  }
};

const sendToCryptoDetails = (item, row) => {
  router.push({ name: "DetailsCrypto", query: { symbol: row.item.symbol } });
};

const formatMarketCap = (value) => {
  if (value >= 1e12) return (value / 1e12).toFixed(1) + "T";
  if (value >= 1e9) return (value / 1e9).toFixed(1) + "B";
  if (value >= 1e6) return (value / 1e6).toFixed(1) + "M";
  return value.toFixed(2);
};
onMounted(async () => {
  if (cryptoDetailsStore.cryptoList.length == 0) {
    await getData();
  } else {
    items.value = cryptoDetailsStore.cryptoList;
    console.log(
      cryptoDetailsStore.cryptoList,
      "=-=>> cryptoDetailsStore.cryptoList",
    );
  }
});
</script>

<style scoped>
.spinner-overlay {
  position: static;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  margin-top: 60px;
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
