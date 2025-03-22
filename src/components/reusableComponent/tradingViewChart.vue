<template>
  <v-row class="justify-center align-center chart-container">
    <v-col cols="12" lg="8" md="6" sm="12">
      <div ref="widgetContainer" class="tradingview-widget-container">
        <div class="tradingview-widget-container__widget"></div>
        <div class="tradingview-widget-copyright">
          <a
            href="https://www.tradingview.com/"
            rel="noopener nofollow"
            target="_blank"
          >
            <span class="blue-text">Track all markets on TradingView</span>
          </a>
        </div>
      </div>
    </v-col>
    <v-col cols="12" lg="4" md="6" sm="12">
      <v-card class="mx-auto card-content">
        <v-card-item>
          <div>
            <div class="text-overline mb-1"></div>
            <div class="text-h6 mb-1">{{ selectedCrypto.NAME }}</div>
            <div class="text-caption">
              {{ selectedCrypto.ASSET_DESCRIPTION_SNIPPET }}
            </div>
          </div>
        </v-card-item>

        <v-card-actions>
          <v-btn>
            Learn more
            <v-icon>arrow_forward</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const widgetContainer = ref(null);
const props = defineProps({ symbol: String });
const selectedCrypto = ref(null);

const getCardInfo = async () => {
  try {
    const response = await axios.get(
      `https://data-api.coindesk.com/asset/v2/metadata?assets=${props.symbol}&asset_lookup_priority=SYMBOL&quote_asset=USD`,
    );
    selectedCrypto.value = response.data.Data?.[props.symbol];
    console.log(props.symbol, "symbol");
    console.log(selectedCrypto.value, "response");
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
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
  getCardInfo();
});
</script>

<style scoped>
.tradingview-widget-container {
  margin-top: 100px;
  height: 600px !important;
  width: 100% !important;
}

.chart-container {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-content {
  max-width: 350px;
  text-align: center;
}
</style>
