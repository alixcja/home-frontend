<template class="wrapper">
  <v-expand-x-transition>
    <div
      v-show="isAnyEntitySelected"
      class="book-button-background-active rounded-s-lg"
    >
      <v-btn class="book-button" @click="toggleBookingModule()">Buchen</v-btn>
    </div>
  </v-expand-x-transition>
  <div class="position-relative overflow-y-auto ma-6">
    <div class="d-flex flex-row">
      <h1 class="header">Buchung</h1>
      <v-spacer />
      <v-btn>Rückgabe</v-btn>
    </div>
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
import { useBookingStore } from "../../data/store/BookingStore";
import { onMounted, computed, ref, Ref } from "vue";
import { storeToRefs } from "pinia";
import EntityCard from "../components/booking/EntityCard.vue";

let selectedForBooking: Ref<BookingEntity[]> = ref([]);
let toggleGames = ref(true);
let toggleConsoles = ref(true);
let toggleAccessories = ref(true);

const { allGames, allConsoles, allConsoleAccessories } =
  storeToRefs(useEntityStore());
const bookingStore = useBookingStore();

onMounted(() => {
  useEntityStore().getAllEntites();
});

const isAnyEntitySelected = computed(() => {
  return selectedForBooking.value.length > 0;
});

function handleSelectionForEntity(selectedEntity: BookingEntity) {
  const exists = selectedForBooking.value.some(
    (entity) => entity.id === selectedEntity.id
  );

  if (exists) {
    selectedForBooking.value = selectedForBooking.value.filter(
      (entity) => entity.id !== selectedEntity.id
    );
  } else {
    selectedForBooking.value.push(selectedEntity);
  }
}

function toggleBookingModule() {
  bookingStore.setEntitesForBooking(selectedForBooking.value);
  bookingStore.triggerBookingModule();
}

function toggleView(entity: string) {
  switch (entity) {
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
<style scoped>
.wrapper {
  position: relative;
}

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
  z-index: 10;
  background-color: #ff8200 !important;
  width: 40%;
  height: 30%;
  margin-left: 16px;
}

.book-button-background-active {
  position: fixed;
  bottom: 20px;
  right: 0px;
  z-index: 10;
  width: 15%;
  background-color: #1e1c1b;
  height: 7%;
  display: flex;
  align-items: center;
}
</style>
