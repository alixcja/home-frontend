<template>
  <p class="subtitle">Aktuell</p>
  <div class="d-flex flex-wrap">
    <div v-for="news in newsList">
      <Card :news="news" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import Card from "@/ui/components/dashboard/dashboardpage/NewsCard.vue";
import { useNewsStore } from "@/data/store/NewsStore";

const newsStore = useNewsStore();
const { newsList } = storeToRefs(newsStore);
</script>
