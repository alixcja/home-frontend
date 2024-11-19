<template>
  <v-card class="card">
    <p class="title">Buchung</p>
    <hr class="divider" />
    <div class="overflow-y-auto">
      <div v-for="entity in selectedEntitiesForBooking">
        <div class="d-flex flex-row justify-start">
          <div class="ma-8">
            <v-img
              width="200px"
              height="200px"
              src="https://www.movasis.com/wp-content/uploads/2017/01/image-placeholder-500x500.jpg"
            ></v-img>
          </div>
          <div class="d-flex flex-column ml-4 justify-center">
            <p class="entity-title">{{ entity.name }}</p>
            <div class="d-flex flex-row">
              <p class="entity-text">{{ getType(entity.type) }}</p>
              <p class="entity-text" v-if="entity.consoleType">
                - {{ entity.consoleType }}
              </p>
            </div>
            <div class="d-flex flex-row">
              <v-icon
                icon="mdi-information"
                class="info-icon"
                color="#c2b5ad"
              ></v-icon>
              <p class="entity-text">Max. Ausleihdauer: Sieben Tage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-date-input
      bg-color="#f6f4f1"
      prepend-icon=""
      prepend-inner-icon="$calendar"
      multiple="range"
      class="mx-8"
      v-model="selectedTimeRange"
    ></v-date-input>
    <hr class="divider" />
    <div class="ma-8 d-flex flex-row">
      <v-btn @click="book" class="book-button">Buchen</v-btn>
      <v-spacer />
      <v-btn
        class="cancel-button"
        variant="outlined"
        @click="toggleBookingModule()"
        >Abbrechen</v-btn
      >
    </div>
  </v-card>
</template>
<script lang="ts" setup>
import { ref, Ref } from "vue";
import { useBookingStore } from "../../../data/store/BookingStore";
import { storeToRefs } from "pinia";
import { VDateInput } from "vuetify/labs/VDateInput";

const selectedTimeRange: Ref<Date[]> = ref([]);
const bookingStore = useBookingStore();
const { selectedEntitiesForBooking } = storeToRefs(useBookingStore());

function toggleBookingModule() {
  bookingStore.triggerBookingModule();
}

function book() {
  // entites
  // startDate
  // endDate

  const startDate = selectedTimeRange.value[0];
  const endDateIndex = selectedTimeRange.value.length - 1;
  const endDate = selectedTimeRange.value[endDateIndex];

  bookingStore.persistBooking(selectedEntitiesForBooking.value, startDate, endDate)

  console.log(selectedTimeRange.value);
}

function getType(type: string) {
  switch (type) {
    case "game":
      return "Spiel ";
    case "console":
      return "Konsole ";
    case "accessory":
      return "Konsolebn-Zubehör ";
  }
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

.book-button {
  width: 40%;
  background-color: #ff8200 !important;
}

.cancel-button {
  width: 40%;
  background-color: #1e1c1b !important;
  color: #f6f4f1;
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

.entity-title {
  color: #f6f4f1;
  font-size: 32px;
  font-weight: 600;
}

.entity-text {
  color: #c2b5ad;
  font-size: 24px;
}
</style>
