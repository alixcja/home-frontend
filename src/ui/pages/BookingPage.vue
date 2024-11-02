<template>
  <v-expand-x-transition>
    <div
      v-show="isAnyEntitySelected"
      class="book-button-background-active rounded-s-lg postition-fixed"
    >
      <v-btn class="book-button">Buchen</v-btn>
    </div>
  </v-expand-x-transition>
  <!--  <div :class="[isAnyEntitySelected ? 'book-button-background-active' : 'book-button-background-inactive']" 
  class=" rounded-s-lg postition-fixed">
    <v-btn class="book-button">Buchen</v-btn>
  </div> -->
  <div class="position-relative overflow-y-auto ma-6">
    <div class="d-flex flex-row">
      <h1 class="header">Buchung</h1>
      <v-spacer />
      <v-btn>Rückgabe</v-btn>
    </div>
    <SplitEntites
      entity="Favoriten"
      @toggle-view="toggleView('favorite')"
      :isToggled="toggleFavorites"
    />
    <SplitEntites
      entity="Spiele"
      @toggle-view="toggleView('game')"
      :isToggled="toggleGames"
    />
    <div v-if="toggleGames" class="d-flex flex-row ma-8">
      <div v-for="game in allGames">
        <EntityCard
          :entity="game"
          :selectedEntities="selectedForBooking"
          @handle-selection="handleSelectionForEntity(game)"
        ></EntityCard>
      </div>
    </div>
    <SplitEntites
      entity="Konsolen"
      @toggle-view="toggleView('console')"
      :isToggled="toggleConsoles"
    />
    <div v-if="toggleConsoles" class="d-flex flex-row ma-8">
      <div v-for="console in allConsoles">
        <EntityCard
          :entity="console"
          :selectedEntities="selectedForBooking"
          @handle-selection="handleSelectionForEntity(console)"
        ></EntityCard>
      </div>
    </div>
    <SplitEntites
      entity="Konsolen-Zubehör"
      @toggle-view="toggleView('accessory')"
      :isToggled="toggleAccessories"
    />
    <div v-if="toggleAccessories" class="d-flex flex-row ma-8">
      <div v-for="accessory in allConsoleAccessories">
        <EntityCard
          :entity="accessory"
          :selectedEntities="selectedForBooking"
          @handle-selection="handleSelectionForEntity(accessory)"
        ></EntityCard>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SplitEntites from "../components/booking/SplitEntites.vue";
import { useEntityStore } from "../../data/store/entity/EntityStore";
import { onMounted, computed, ref, Ref } from "vue";
import { storeToRefs } from "pinia";
import EntityCard from "../components/booking/EntityCard.vue";
import { Entity } from "../../ts/types/entity.types";

let selectedForBooking: Ref<number[]> = ref([]);
let toggleFavorites = ref(false);
let toggleGames = ref(true);
let toggleConsoles = ref(true);
let toggleAccessories = ref(true);

const { allGames, allConsoles, allConsoleAccessories } =
  storeToRefs(useEntityStore());

onMounted(() => {
  useEntityStore().getAllEntites();
});

const isAnyEntitySelected = computed(() => {
  return selectedForBooking.value.length > 0;
});

function handleSelectionForEntity(entity: Entity) {
  if (selectedForBooking.value.includes(entity.id)) {
    selectedForBooking.value = selectedForBooking.value.filter(
      (id) => id != entity.id
    );
  } else {
    selectedForBooking.value.push(entity.id);
  }
}

function toggleView(entity: string) {
  switch (entity) {
    case "favorite":
      break;
    case "game":
      toggleGames.value = !toggleGames.value;
      break;
    case "console":
      toggleConsoles.value = !toggleConsoles.value;
      break;
    case "accessory":
      toggleAccessories.value = !toggleAccessories.value;
      break;
  }
}
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

.active-button {
  background-color: #ff8200 !important;
  color: white !important;
  cursor: pointer;
}

.book-button {
  top: 20px;
  z-index: 10;
  background-color: #ff8200 !important;
  width: 40%;
  height: 30%;
  margin-left: 16px
}

.book-button-background-active {
  position: sticky;
  z-index: 10;
  width: 15%;
  height: 5%;
  background-color: #1e1c1b;
  left: 100%;
  top: 90%;
}

</style>
