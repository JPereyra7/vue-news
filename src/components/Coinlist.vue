<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";

interface ICoinPrice {
  usd: number;
  usd_market_cap: number;
  usd_24h_vol: number;
  usd_24h_change: number;
  last_updated_at: number;
}

const coinAbbreviations: Record<string, string> = {
  bitcoin: "BTC",
  ethereum: "ETH",
  binancecoin: "BNB",
  dogecoin: "DOGE",
  cardano: "ADA",
  shiba: "SHIB",
  polkadot: "DOT",
}

const coinPrices = ref<Record<string, ICoinPrice>>({});

const roundPercentage = (percentage: number): string => {
  return percentage.toFixed(0);
}

const fetchCoinPrices = async () => {
  try {
    const response = await axios.get(
  "https://api.coingecko.com/api/v3/simple/price",
  {
    params: {
      ids: "bitcoin,ethereum,binancecoin,dogecoin,cardano,shiba,polkadot",
      vs_currencies: "usd",
      include_24hr_change: true,
          include_last_updated_at: false,
    },
  }
);
    coinPrices.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching coin prices:", error);
  }
};

onMounted(fetchCoinPrices);
</script>

<template>
  <div>
    <div v-if="Object.keys(coinPrices).length === 0">Loading...</div>
    <div v-else class="coin-prices">
      <div v-for="(price, coinId) in coinPrices" :key="coinId" class="coin-price">
        <h3 class="cryptoNames">{{ coinAbbreviations[coinId] }}</h3>
        <p class="cryptoPrice">${{ price.usd }}</p>
        <p :class="{ 'green': price.usd_24h_change >= 0, 'red': price.usd_24h_change < 0 }">{{ roundPercentage(price.usd_24h_change) }}%</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

.cryptoNames {
  font-size: .8rem;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
}

.cryptoNames:hover {
  font-weight: 600;
  cursor: pointer;
}

.cryptoPrice {
  font-size: .875rem;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
}

.cryptoPrice:hover {
  color: rgb(27, 175, 27);
  cursor: pointer;
}

.cryptoPercentages {
  /* font-size: .6rem; */
  font-weight: 00;
  font-family: "Poppins", sans-serif;
}

.coin-prices {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(44, 44, 44, 0.13);
  gap: 1em;
}

.coin-price {
  display: flex;
  margin: 10px;
  padding: 10px;
  display: flex; 
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
}

.coin-price h3 {
  margin-right: 10px;
}

.coin-price p {
  margin: 0;
}

.green {
  color: rgb(27, 175, 27);
  font-family: "Poppins", sans-serif;
  font-size: .9rem;
}

.red {
  color: rgb(207, 0, 0);
  font-family: "Poppins", sans-serif;
  font-size: .9rem;
}

</style>
