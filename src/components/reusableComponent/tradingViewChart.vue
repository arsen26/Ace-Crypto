<template>
  <div>
    <div v-if="spinner" class="spinner-overlay">
      <flower-spinner :animation-duration="2500" :size="70" color="#bcfc3c" />
    </div>
    <v-row class="justify-center align-center chart-container">
      <v-divider class="border-opacity-100" color="white"></v-divider>
      <CryptoDetails
        :crypto="selectedCrypto"
        :infoArray="cryptoInformationArr"
        :circulatingSupply="circulatingSupply"
        :isUp="isUpPrice"
      />
      <v-col cols="12" lg="8" md="6" sm="12">
        <div ref="widgetContainer" class="tradingview-widget-container">
          <div class="tradingview-widget-container__widget"></div>
          <div class="tradingview-widget-copyright">
            <a
              href="https://www.tradingview.com/"
              rel="noopener nofollow"
              target="_blank"
            >
            </a>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import { FlowerSpinner } from "epic-spinners";
import CryptoDetails from "@/components/reusableComponent/CryptoDetails.vue";

const widgetContainer = ref(null);
const props = defineProps({ symbol: String });
const selectedCrypto = ref(null);
const spinner = ref(true);
const isUpPrice = ref(false);
const marketCapital = computed(() => {
  return formatMarketCap(selectedCrypto.value?.CIRCULATING_MKT_CAP_USD);
});
const Volume24 = computed(() => {
  return formatMarketCap(
    selectedCrypto.value?.SPOT_MOVING_24_HOUR_QUOTE_VOLUME_USD,
  );
});
const totalSupply = computed(() => {
  return formatMarketCap(selectedCrypto.value?.SUPPLY_TOTAL);
});
const maxSupply = computed(() => {
  return formatMarketCap(selectedCrypto.value?.SUPPLY_MAX);
});
const circulatingSupply = computed(() => {
  return formatMarketCap(selectedCrypto.value?.SUPPLY_CIRCULATING);
});
const formatMarketCap = (value) => {
  if (value >= 1e12) return (value / 1e12).toFixed(2) + "T";
  if (value >= 1e9) return (value / 1e9).toFixed(2) + "B";
  if (value >= 1e6) return (value / 1e6).toFixed(2) + "M";
  return value?.toFixed(2);
};
const cryptoInformationArr = ref([
  [
    {
      title: "Market Cap",
      value: marketCapital,
    },
    {
      title: "Volume (24h)",
      value: Volume24,
    },
  ],
  [
    {
      title: "FDV",
      value: "test",
    },
    {
      title: "MKT Cap(24h)",
      value: "test",
    },
  ],
  [
    {
      title: "Total Supply",
      value: totalSupply,
    },
    {
      title: "Max Supply",
      value: maxSupply,
    },
  ],
]);

const getCardInfo = async () => {
  spinner.value = true;
  try {
    const response = await axios.get(
      `https://data-api.coindesk.com/asset/v2/metadata?assets=${props.symbol}&asset_lookup_priority=SYMBOL&quote_asset=USD`,
    );
    selectedCrypto.value = response.data.Data?.[props.symbol];
    console.log(selectedCrypto.value, "=->  selectedCrypto.value");
    if (
      selectedCrypto.value.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_CONVERSION > 0
    ) {
      isUpPrice.value = true;
    } else {
      isUpPrice.value = false;
    }
  } catch (error) {
    console.error(error);
  } finally {
    spinner.value = false;
  }
};
const getCoinMartketCapInfo = async () => {
  spinner.value = true;
  try {
    const response = await axios.get(
      `http://localhost:5000/crypto/${props.symbol}`,
    );

    console.log(response, "=---->  .response");
  } catch (error) {
    console.error(error);
  } finally {
    spinner.value = false;
  }
};
onMounted(() => {
  spinner.value = true;

  if (widgetContainer.value) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `${props.symbol}USD`,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: false,
      support_host: "https://www.tradingview.com",
    });

    widgetContainer.value.appendChild(script);
  }
  spinner.value = false;

  getCardInfo();
  getCoinMartketCapInfo();
});
</script>

<style scoped>
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.tradingview-widget-container {
  margin-top: 30px;
  height: 593px !important;
  width: 100% !important;
}

.chart-container {
  margin-top: 120px;
}
</style>
