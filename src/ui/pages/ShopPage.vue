<template>
  <div class="position-relative overflow-y-auto ma-6">
    <h1 class="header">Restaurants</h1>
      <AllShopsOverview />
  </div>
</template>
<script lang="ts" setup>
import { useShopStore } from "@/data/store/ShopStore";
import { onMounted } from "vue";
import AllShopsOverview from "@/ui/components/shop/AllShopsOverview.vue";

onMounted(() => {
  useShopStore().getAllShops();
});
</script>
