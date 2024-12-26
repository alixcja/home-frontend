<template>
  <v-app>
    <HomeHeader></HomeHeader>
    <v-main class="main">
      <v-dialog v-model="isBookingModuleActive" class="booking-dialog">
        <BookingModal />
      </v-dialog>
      <router-view />
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import HomeHeader from "./ui/components/base/HomeHeader.vue";
import BookingModal from "./ui/components/booking/bookingmodule/BookingModal.vue";
import { useBookingStore } from "./data/store/BookingStore";
import { storeToRefs } from "pinia";

const { isBookingModuleActive } = storeToRefs(useBookingStore());
</script>
<style scoped>
.booking-dialog {
  width: 40vw;
  height: 100% !important;
  max-height: 70vh !important;
}
</style>
