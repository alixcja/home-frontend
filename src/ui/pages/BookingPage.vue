<template>
  <div class="d-flex flex-row">
    <h1 class="header">Buchung</h1>
    <v-spacer />
    <v-btn color="#FF8200">Rückgabe</v-btn>
  </div>
  <SplitEntites entity="Favoriten" />
  <SplitEntites entity="Spiele" />
  <div class="d-flex flex-row ma-8">
    <div v-for="game in allGames">
      <EntityCard :entity="game"></EntityCard>
    </div>
  </div> 
  <SplitEntites entity="Konsolen" />
  <div class="d-flex flex-row ma-8">
    <div v-for="console in allConsoles">
      <EntityCard :entity="console"></EntityCard>
    </div>
  </div>
  <SplitEntites entity="Konsolen-Zubehör" />
  <div class="d-flex flex-row ma-8">
    <div v-for="accessory in allConsoleAccessories">
      <EntityCard :entity="accessory"></EntityCard>
    </div>
  </div>
</template>
<script setup lang="ts">
import SplitEntites from "../components/booking/SplitEntites.vue";
import { useEntityStore } from "../../data/store/entity/EntityStore";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import EntityCard from "../components/booking/EntityCard.vue";
import { Entity } from "../../ts/types/entity.types";

const selectedForBooking: Entity[] = [];

const { allGames, allConsoles, allConsoleAccessories } =
  storeToRefs(useEntityStore());

onMounted(() => {
  useEntityStore().getAllEntites();
  console.log(allConsoles.value);
});
</script>
<style>
.header {
  color: #1e1c1b;
  font-size: 32;
  font-weight: 700;
}

.button {
  font-size: 28px;
}
</style>
