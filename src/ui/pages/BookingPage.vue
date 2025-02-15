<template class="wrapper">
  <v-expand-x-transition>
    <BookButton
      v-show="isAnyEntitySelected"
      @toggleBookingModule="toggleBookingModule"
    />
  </v-expand-x-transition>
  <div class="position-relative overflow-y-auto ma-6">
    <h1 class="header">Buchung</h1>
    <div v-for="(section, index) in entitySections" :key="index">
      <Divider
        :entity="section.label"
        @toggle-view="toggleView(section.key)"
        :isToggled="section.toggleState"
      />
      <!--     <v-expand-transition>
 -->
      <div v-if="section.toggleState" class="d-flex flex-row pa-8">
        <div v-for="entity in section.entities">
          <EntityCard
            :entity="entity"
            :selectedEntities="selectedForBooking"
            @handle-selection="() => handleSelectionForEntity(entity)"
          ></EntityCard>
        </div>
      </div>
      <!--     </v-expand-transition>
 -->
    </div>
  </div>
</template>
<script setup lang="ts">
import Divider from "@/ui/components/booking/bookingpage/Divider.vue";
import { useEntityStore } from "../../data/store/entity/EntityStore";
import { useBookingStore } from "../../data/store/BookingStore";
import { onMounted, computed, ref, Ref } from "vue";
import { storeToRefs } from "pinia";
import EntityCard from "../components/booking/bookingpage/BookingCard.vue";
import BookButton from "../components/booking/bookingpage/BookButton.vue";

let selectedForBooking: Ref<BookingEntity[]> = ref([]);
let toggleGames = ref(true);
let toggleConsoles = ref(true);
let toggleAccessories = ref(true);

const { allGames, allConsoles, allAccessories } = storeToRefs(useEntityStore());
const bookingStore = useBookingStore();

onMounted(() => {
  useEntityStore().getAllEntites();
});

const isAnyEntitySelected = computed(() => {
  return selectedForBooking.value.length > 0;
});

const entitySections = computed(() => [
  {
    label: "Spiele",
    key: "game",
    entities: allGames.value,
    toggleState: toggleGames.value,
  },
  {
    label: "Konsolen",
    key: "console",
    entities: allConsoles.value,
    toggleState: toggleConsoles.value,
  },
  {
    label: "Zubehör",
    key: "accessory",
    entities: allAccessories.value,
    toggleState: toggleAccessories.value,
  },
]);

function handleSelectionForEntity(selectedEntity: BookingEntity) {
  const exists = selectedForBooking.value.some(
    (entity) => entity.id === selectedEntity.id
  );

  selectedForBooking.value = exists
    ? selectedForBooking.value.filter(
        (entity) => entity.id !== selectedEntity.id
      )
    : [...selectedForBooking.value, selectedEntity];
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

.button {
  font-size: 28px;
}

.active-button {
  background-color: #ff8200 !important;
  color: white !important;
  cursor: pointer;
}
</style>
