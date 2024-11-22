<template>
  <v-app>
    <HomeHeader></HomeHeader>
    <v-main class="main">
      <v-dialog v-model="isBookingModuleActive">
        <BookingModule />
      </v-dialog>
      <BookingPage />
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import HomeHeader from "./ui/components/base/HomeHeader.vue";
import BookingPage from "./ui/pages/BookingPage.vue";
import BookingModule from "./ui/components/booking/bookingmodule/BookingModal.vue";
import { useBookingStore } from "./data/store/BookingStore";
import { storeToRefs } from "pinia";

const { isBookingModuleActive } = storeToRefs(useBookingStore());
</script>
<style scoped>
.v-dialog {
    display: flex;
    align-items: center;
}
</style>
