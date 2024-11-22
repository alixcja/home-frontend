<template>
  <v-card class="card">
    <p class="title">Buchung</p>
    <hr class="divider" />
    <div class="">
      <EntitySection
        v-for="entity in selectedEntitiesForBooking"
        :entity="entity"
      />
    </div>
    <v-date-input
      bg-color="#f6f4f1"
      prepend-icon=""
      prepend-inner-icon="$calendar"
      multiple="range"
      class="mx-8"
      v-model="selectedTimeRange"
    ></v-date-input>
    <div class="d-flex flex-row ml-8">
      <v-icon icon="mdi-information" class="info-icon" color="#c2b5ad"></v-icon>
      <p class="information-text">Max. Ausleihdauer: Sieben Tage</p>
    </div>
    <hr class="divider" />
    <ActionButtons @book="book" @cancel="toggleBookingModule" />
  </v-card>
</template>
<script lang="ts" setup>
import { ref, Ref } from "vue";
import { useBookingStore } from "../../../../data/store/BookingStore";
import { storeToRefs } from "pinia";
import { VDateInput } from "vuetify/labs/VDateInput";
import EntitySection from "../bookingmodule/EntitySection.vue";
import ActionButtons from "./ActionButtons.vue";

const selectedTimeRange: Ref<Date[]> = ref([]);
const bookingStore = useBookingStore();
const { selectedEntitiesForBooking } = storeToRefs(useBookingStore());

function toggleBookingModule() {
  bookingStore.triggerBookingModule();
}

function book() {
  const startDate = selectedTimeRange.value[0];
  const endDateIndex = selectedTimeRange.value.length - 1;
  const endDate = selectedTimeRange.value[endDateIndex];

  bookingStore.persistBooking(
    selectedEntitiesForBooking.value,
    startDate,
    endDate
  );

  console.log(selectedTimeRange.value);
}
</script>
<style scoped>
.card {
  background-color: #1e1c1b;
  width: 45vw;
  height: 100% !important;
  max-height: 70vh !important;
  z-index: 10;
  padding: 16px;
  display: flex;
}


.info-icon {
  margin-right: 16px;
  display: flex;
  align-self: center;
}

.title {
  font-size: 40px !important;
  color: #f6f4f1;
  font-weight: 600;
  text-align: center;
}

.divider {
  margin: 16px;
  color: #f6f4f1;
}

.information-text {
  color: #c2b5ad;
  font-size: 16px;
}
</style>
