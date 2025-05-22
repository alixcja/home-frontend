<template>
  <div class="splitter">
    <p class="text-h5 splitter-title">Alle Restaurants</p>
    <hr class="w-100 splitter-line" />
  </div>
  <div class="d-flex flex-row pa-8">
    <div v-for="shop in allShops">
      <EntityCard
        :entity="shop"
        @handle-selection="() => redirectToDetailsPage(shop.id)"
        :selectedEntities="undefined"
      ></EntityCard>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import EntityCard from "../base/entitycard/EntityCard.vue";
import { useShopStore } from "@/data/store/ShopStore";
import { storeToRefs } from "pinia";

const isToggled = ref(false);
const { allShops } = storeToRefs(useShopStore());

function redirectToDetailsPage() {
  isToggled.value = !isToggled.value;
}
</script>
<style lang="scss">
.splitter {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 15px;

  .splitter-title {
    margin: 0;
    white-space: nowrap;
  }

  .splitter-line {
    flex-grow: 1;
    margin-left: 1rem;
  }
}
</style>
