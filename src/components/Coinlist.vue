<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";

const APIKEYCOINS = import.meta.env.VITE_API_KEY_COINS;

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
  tether: "USDT",
  cardano: "ADA",
  ripple: "XRP",
  solana: "SOL",
  polkadot: "DOT",
  dogecoin: "DOGE",
  usd_coin: "USDC",
  terra_luna: "LUNA",
  avalanche: "AVAX",
  shiba_inu: "SHIB",
  polygon: "MATIC",
  litecoin: "LTC",
  chainlink: "LINK",
  uniswap: "UNI",
  algorand: "ALGO",
  stellar: "XLM",
  vechain: "VET",
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
          ids: Object.keys(coinAbbreviations).join(","),
          vs_currencies: "usd",
          include_24hr_change: true,
          include_last_updated_at: false,
        },
        headers: {
          Authorization: `Bearer ${APIKEYCOINS}`,
        },
      }
    );
    coinPrices.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching coin prices:", error);
  }
};
onMounted(() => {
  fetchCoinPrices();
})
</script>

<template>
  <div class="scrolling-wrapper">
    <div v-if="Object.keys(coinPrices).length === 0">Loading...</div>
    <div v-else class="coin-prices-wrapper">
      <div class="coin-prices">
        <div v-for="(price, coinId) in coinPrices" :key="coinId + '-1'" class="coin-price">
          <h3 class="cryptoNames">{{ coinAbbreviations[coinId] }}</h3>
          <p class="cryptoPrice">${{ price.usd }}</p>
          <p :class="{ 'green': price.usd_24h_change >= 0, 'red': price.usd_24h_change < 0 }">{{ roundPercentage(price.usd_24h_change) }}%</p>
        </div>
        <div v-for="(price, coinId) in coinPrices" :key="coinId + '-2'" class="coin-price">
          <h3 class="cryptoNames">{{ coinAbbreviations[coinId] }}</h3>
          <p class="cryptoPrice">${{ price.usd }}</p>
          <p :class="{ 'green': price.usd_24h_change >= 0, 'red': price.usd_24h_change < 0 }">{{ roundPercentage(price.usd_24h_change) }}%</p>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.cryptoNames {
  font-size: 0.8rem;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
}

.cryptoNames:hover {
  font-weight: 600;
  cursor: pointer;
}

.cryptoPrice {
  font-size: 0.875rem;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
}

.cryptoPrice:hover {
  color: rgb(27, 175, 27);
  cursor: pointer;
}

.cryptoPercentages {
  font-weight: 500;
  font-family: "Poppins", sans-serif;
}

.coin-prices {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 1em;
  animation: scroll 40s linear infinite;
  background-color: rgba(52, 217, 246, 0.033);
  border-bottom: 1px solid rgba(44, 44, 44, 0.13);
}

.coin-price {
  display: flex;
  margin: 10px;
  padding: 10px;
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
  font-size: 0.9rem;
}

.red {
  color: rgb(207, 0, 0);
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem;
}

.scrolling-wrapper {
  display: flex;
  overflow: hidden;
  width: 100%;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-25%);
  }
}

@media (max-width: 768px) {
  .scrolling-wrapper {
  display: flex;
  overflow: hidden;
  max-width: 100%;
}
}
</style>
