<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { INews } from "../models/INews.ts";

const APIKEYNEWS = import.meta.env.VITE_API_KEY_NEWS;

const news = ref<INews[]>([]);

const fetchNews = async () => {
  try {
    const response = await axios.get<{ articles: INews[] }>(
      `https://newsapi.org/v2/everything?domains=techcrunch.com&apiKey=${APIKEYNEWS}`
    );
    news.value = response.data.articles;
    console.log(response.data.articles);
  } catch (e) {
    console.error("Could not fetch news");
  }
};

const clickedArticle = (articleUrl: string) => {
  window.open(articleUrl, "_blank");
};

onMounted(fetchNews);
</script>

<template>
  <div class="newsContainer">
    <div v-if="news.length === 0">Loading...</div>
    <div v-else>
      <div class="big-article" v-if="news.length > 0">
        <div
          class="article"
          :key="news[0].url"
          @click="clickedArticle(news[0].url)"
        >
          <h1 class="articleTitleArticles">{{ news[0].title }}</h1>
          <p class="pDescription">{{ news[0].description }}</p>
          <img
            :src="news[0].urlToImage"
            alt="Article Image"
            v-if="news[0].urlToImage"
          />
          <a class="readMoreText" :href="news[0].url" target="_blank">Read more</a>
        </div>
      </div>
      <div class="article-grid" v-if="news.length > 1">
        <div
          v-for="article in news.slice(1)"
          :key="article.url"
          class="article"
          @click="clickedArticle(article.url)"
        >
          <h3 class="articleTitleArticles">{{ article.title }}</h3>
          <p class="pDescription">{{ article.description }}</p>
          <img
            :src="article.urlToImage"
            alt="Article Image"
            v-if="article.urlToImage"
          />
          <a class="readMoreText" :href="article.url" target="_blank">Read more</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.newsContainer {
  /* margin-top: 2em; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 100%;
}

.articleTitleArticles {
  max-width: 80%;
  cursor: pointer;
  font-family: Poppins,sans-serif;
  font-size: 1.3em;
}

.articleTitleArticles:hover {
  color: rgb(77, 77, 77);
}

img {
  width: 50%;
  cursor: pointer;
}

img:hover {
  opacity: 80%;
}

.article {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  gap: 1em;
}

.pDescription {
  max-width: 60%;
  cursor: pointer;
  font-family: Poppins,sans-serif;
  font-size: 0.8em;
}

.pDescription:hover {
  color: rgb(77, 77, 77);
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
}

.big-article {
  width: 100%;
  margin-bottom: 1.3em;
}

.readMoreText {
    color: black;
    font-family: Poppins, sans-serif;
    font-size: 0.8em;
    text-decoration: none;
}

@media (max-width: 768px) {
  .big-article {
    width: 50%;
  }
  .article-grid {
    grid-template-columns: repeat(1, 1fr);
    max-width: 100%;
  }
  .article {
    /* Removed margin-right */
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    gap: 1em;
    max-width: 100%;
  }
  .big-article {
    max-width: 100%;
    display: none;
    /* margin-left: 5em; */
    font-size: 1em;
  }
  .articleTitleArticles {
    max-width: 100%;
    font-size: 1.3em;
  }
  .pDescription {
    max-width: 80%;
    color: rgb(95, 95, 95);
  }
  img {
  width: 100%;
  cursor: pointer;
}
}
</style>
