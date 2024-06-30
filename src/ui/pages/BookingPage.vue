<template>
  <div class="d-flex flex-row">
    <h2 class="header">Buchung</h2>
    <v-spacer />
    <v-btn color="#FF8200">Rückgabe</v-btn>
  </div>
  <SplitEntites entity="Favoriten" />
  <SplitEntites entity="Spiele" />
  <div class="d-flex flex-row">
    <div v-for="game in allGames" :key="game.id">
      <EntityCard :entity="game"></EntityCard>
    </div>
  </div>
  <SplitEntites entity="Konsolen" />
  <div class="d-flex flex-row">
    <div v-for="console in allConsoles" :key="console.id">
      <EntityCard :entity="console"></EntityCard>
    </div>
  </div>
  <SplitEntites entity="Konsolen-Zubehör" />
  <div class="d-flex flex-row">
    <div v-for="accessory in allConsoleAccessories">
      <EntityCard :entity="accessory"></EntityCard>
    </div>
  </div>
</template>
<script setup lang="ts">
import SplitEntites from "../components/booking/SplitEntites.vue";
import { useEntityStore } from "../../data/store/EntityStore";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import EntityCard from "../components/booking/EntityCard.vue";

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
  font-size: 28px;
  font-weight: 700;
}

.button {
  font-size: 28px;
}
</style>
