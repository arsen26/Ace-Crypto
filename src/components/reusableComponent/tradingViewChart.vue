<template>
  <div>
    <div v-if="spinner" class="spinner-overlay">
      <flower-spinner :animation-duration="2500" :size="70" color="#bcfc3c" />
    </div>
    <v-row class="justify-center align-center chart-container">
      <v-divider></v-divider>
      <!-- First column will be informations about crypto-->
      <v-col class="details-style" cols="12" lg="3" md="5" sm="12">
        <div>
          <div class="text-h6 mb-1 crypto-title">
            <v-avatar :image="selectedCrypto?.LOGO_URL" size="30"></v-avatar>
            {{ selectedCrypto?.NAME }}

            <span class="crypto-symbol"
              >{{ selectedCrypto?.SYMBOL }}

              <v-icon size="30" :color="isUpPrice ? '#bcfc3c' : '#ff0000'">{{
                isUpPrice ? "arrow_drop_up" : "arrow_drop_down"
              }}</v-icon>
              {{
                selectedCrypto?.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_CONVERSION?.toFixed(
                  2,
                )
              }}%
            </span>
            <h3>$ {{ selectedCrypto?.PRICE_USD?.toFixed(4) }}</h3>
          </div>
          <div class="text-caption">
            {{ selectedCrypto?.ASSET_DESCRIPTION_SNIPPET }}
          </div>
        </div>
        <v-card class="mx-auto card-content" variant="outlined" color="white">
          <v-row class="mt-1 ml-1">
            <v-card-item>
              <v-card variant="outlined">
                <v-card-item>
                  <span> Market Cap. </span>
                  <v-card-text> test </v-card-text>
                </v-card-item>
              </v-card>
            </v-card-item>
            <v-card-item>
              <v-card variant="outlined">
                <v-card-item>
                  <span> Market Cap. </span>
                  <v-card-text> test </v-card-text>
                </v-card-item>
              </v-card>
            </v-card-item>
          </v-row>
          <v-row class="mt-1 ml-1">
            <v-card-item>
              <v-card variant="outlined">
                <v-card-item>
                  <span> Market Cap. </span>
                  <v-card-text> test </v-card-text>
                </v-card-item>
              </v-card>
            </v-card-item>
            <v-card-item>
              <v-card variant="outlined">
                <v-card-item>
                  <span> Market Cap. </span>
                  <v-card-text> test </v-card-text>
                </v-card-item>
              </v-card>
            </v-card-item>
          </v-row>
          <v-row class="mt-1 ml-1">
            <v-card-item>
              <v-card variant="outlined">
                <v-card-item>
                  <span> Market Cap. </span>
                  <v-card-text> test </v-card-text>
                </v-card-item>
              </v-card>
            </v-card-item>
            <v-card-item>
              <v-card variant="outlined">
                <v-card-item>
                  <span> Market Cap. </span>
                  <v-card-text> test </v-card-text>
                </v-card-item>
              </v-card>
            </v-card-item>
          </v-row>
          <v-row class="mt-1 ml-1">
            <v-card-item>
              <v-card variant="outlined">
                <v-card-item>
                  <span> Market Cap. </span>
                  <v-card-text> test </v-card-text>
                </v-card-item>
              </v-card>
            </v-card-item>           
          </v-row>

          <v-card-actions>
            <v-btn>
              Learn more
              <v-icon>arrow_forward</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" lg="8" md="6" sm="12">
        <div ref="widgetContainer" class="tradingview-widget-container">
          <div class="tradingview-widget-container__widget"></div>
          <div class="tradingview-widget-copyright">
            <a
              href="https://www.tradingview.com/"
              rel="noopener nofollow"
              target="_blank"
            >
              <!-- <span class="blue-text">Track all markets on TradingView</span> -->
            </a>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { FlowerSpinner } from "epic-spinners";
import { Title } from "chart.js";

const widgetContainer = ref(null);
const props = defineProps({ symbol: String });
const selectedCrypto = ref(null);
const spinner = ref(true);
const isUpPrice = ref(false);
const cryptoInformationArr = ref([{
  title: "Market Cap",
  value: "test",
},
{
  title: "Volume (24h)",
  value: "test",
},
{
  title: "FDV",
  value: "test",
},
{
  title: "Vol/MKT Cap (24h)",
  value: "test",
},
{
  title: "Total Supply",
  value: "test",
},
{
  title: "Max Supply",
  value: "test",
},
])




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
});
</script>

<style scoped>
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
  margin-top: 100px;
  height: 600px !important;
  width: 100% !important;
}

.chart-container {
  margin-top: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-content {
  max-width: 350px;
  text-align: center;
}
</style>
