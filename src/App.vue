<template>
  <v-app>
    <HomeHeader></HomeHeader>
    <v-main class="main">
      <v-dialog v-model="isBookingModuleActive" class="dialog">
        <BookingModal />
      </v-dialog>
      <v-dialog v-model="isReturnBookingModuleActive" class="dialog">
        <ReturnModal />
      </v-dialog>
      <v-dialog v-model="isCancelBookingModalActive" class="dialog">
        <CancelModal />
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
import CancelModal from "./ui/components/dashboard/CancelModal.vue";

const { isBookingModuleActive, isReturnBookingModuleActive, isCancelBookingModalActive } = storeToRefs(useBookingStore());

</script>
<style scoped>
</style>
