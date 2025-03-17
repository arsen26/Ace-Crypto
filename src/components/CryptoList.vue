<template>
    <div>
      <v-data-table-server
        :headers="cryptoList"      
        :items="items"
        :items-per-page="10"
    >

    </v-data-table-server>  
    </div>
</template> 

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
const cryptoList = ref([
    {title:"name", value:"name"},
    {title:"symbol", value:"symbol"},
    {title:"Max Supply", value:"max_supply"},
    {title:"Market Cap", value:"market_cap"},
    {title:"Price", value:"price"},
]);

const items = ref([]);

const getData = async () => {
    try {
        const res = await axios.get("http://localhost:5000/crypto");
        items.value = res.data.data;
        items.value = items.value.map((item) => {
            return {
                name: item.name,
                symbol: item.symbol,
                max_supply: item.max_supply,
                market_cap: Number(item.quote.USD.market_cap).toFixed(2),
                price: Number(item.quote.USD.price).toFixed(2),
            };
        });
        console.log(res.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

onMounted(() => {
    getData();
});
</script>


<style>

</style>