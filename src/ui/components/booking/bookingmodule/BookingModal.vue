<template>
  <HomeBaseModal
    title="Buchung"
    confirm-button-title="Buchen"
    :entities="selectedEntitiesForBooking"
    @confirm="book"
    @cancel="toggleBookingModule"
  >
    <v-date-input
      bg-color="#f6f4f1"
      prepend-icon=""
      prepend-inner-icon="$calendar"
      multiple="range"
      class="mt-6 mx-8"
      v-model="selectedTimeRange"
    ></v-date-input>
    <div class="d-flex flex-row ml-8 mb-6">
      <v-icon icon="mdi-information" class="info-icon" color="#c2b5ad"></v-icon>
      <p class="information-text">Max. Ausleihdauer: Sieben Tage</p>
    </div>
  </HomeBaseModal>
</template>
<script lang="ts" setup>
import { ref, Ref } from "vue";
import { useBookingStore } from "../../../../data/store/BookingStore";
import { storeToRefs } from "pinia";
import { VDateInput } from "vuetify/labs/VDateInput";
import HomeBaseModal from "../../base/modal/BaseModal.vue";

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
}
</script>
<style scoped>
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

.information-text {
  color: #c2b5ad;
  font-size: 16px;
}
</style>
