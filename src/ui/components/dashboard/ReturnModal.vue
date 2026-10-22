<template>
  <BaseModal
    title="Abgabe"
    confirm-button-title="Bestätigen"
    :entities="[bookingToReturn.bookingEntity]"
    info-text="Hiermit bestätige ich, dass ich das Spiel zurückgegeben habe."
    @confirm="returnBooking"
    @cancel="toggleReturnBookingModule"
  >
  </BaseModal>
</template>
<script lang="ts" setup>
import { useBookingStore } from "@/data/store/BookingStore";
import { useNewsStore } from "@/data/store/NewsStore";
import { storeToRefs } from "pinia";
import BaseModal from "@/ui/components/base/modal/BaseModal.vue";

const bookingStore = useBookingStore();
const newsStore = useNewsStore();
const { bookingToReturn } = storeToRefs(useBookingStore());

function toggleReturnBookingModule() {
  bookingStore.triggerReturnBookingModule();
  bookingToReturn.value = null;
  bookingStore.fetchAllBookings()
  newsStore.getAllNews();
}

async function returnBooking() {
  await bookingStore.returnBooking();
  toggleReturnBookingModule();
}
</script>
<style scoped>
</style>
