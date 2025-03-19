<template>
  <v-row class="justify-center align-center">
    <v-col>
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
    <v-col>
      <v-card class="mx-auto">
        <v-card-item>
          <div>
            <div class="text-overline mb-1"></div>
            <div class="text-h6 mb-1">test</div>
            <div class="text-caption">test</div>
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

const widgetContainer = ref(null);

onMounted(() => {
  if (widgetContainer.value) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "BTCUSD",
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: true,
      support_host: "https://www.tradingview.com",
    });

    widgetContainer.value.appendChild(script);
  }
});
</script>

<style scoped>
.tradingview-widget-container {
  height: 600px !important;
  width: 800px !important;
}
</style>
