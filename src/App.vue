<template>
  <v-app>
    <HomeHeader></HomeHeader>
    <v-main class="main">
      <v-dialog v-model="isBookingModuleActive" class="booking-dialog">
        <BookingModal />
      </v-dialog>
      <v-dialog v-model="isReturnBookingModuleActive" class="booking-dialog">
        <ReturnModal />
      </v-dialog>
      <router-view />
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import HomeHeader from "./ui/components/base/header/HomeHeader.vue";
import BookingModal from "./ui/components/booking/BookingModal.vue";
import { useBookingStore } from "./data/store/BookingStore";
import { storeToRefs } from "pinia";
import ReturnModal from "./ui/components/dashboard/ReturnModal.vue";

const { isBookingModuleActive, isReturnBookingModuleActive } = storeToRefs(useBookingStore());


</script>
<style scoped>
.booking-dialog {
  width: 40vw;
  height: 100% !important;
  max-height: 75vh !important;
}
</style>
