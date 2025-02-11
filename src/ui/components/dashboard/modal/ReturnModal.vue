<template>
  <v-card class="card">
    <p class="title">Abgabe</p>
    <hr class="divider" />
    <EntitySection
      :entity="bookingToReturn.bookingEntity"
    />
    <div class="d-flex flex-row ml-8 mb-6">
      <v-icon icon="mdi-information" class="info-icon" color="#c2b5ad"></v-icon>
      <p class="information-text">Hiermit bestätige ich, dass ich das Spiel zurückgegeben habe.</p>
    </div>
    <hr class="divider" />
    <ActionButtons @return="returnBooking" @cancel="toggleReturnBookingModule" />
  </v-card>
</template>
<script lang="ts" setup>
import { useBookingStore } from "../../../../data/store/BookingStore";
import { storeToRefs } from "pinia";
import EntitySection from "@/ui/components/booking/bookingmodule/EntitySection.vue";
import ActionButtons from "./ActionButtons.vue";

const bookingStore = useBookingStore();
const { bookingToReturn } = storeToRefs(useBookingStore());

function toggleReturnBookingModule() {
  bookingStore.triggerReturnBookingModule();
}

function returnBooking() {
  bookingStore.returnBooking();
}
</script>
<style scoped>
.card::-webkit-scrollbar {
  display: none;
}
.card {
  background-color: #1e1c1b;
  z-index: 10;
  padding: 16px;
  display: flex;
  width: 100% !important;
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
