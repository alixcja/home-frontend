<template>
  <BaseModal
    title="Stornierung"
    confirm-button-title="Bestätigen"
    :entities="[bookingToCancel.bookingEntity]"
    info-text="Hiermit bestätige ich, dass ich diese Buchung stonieren möchte."
    @confirm="cancelBooking"
    @cancel="triggerCancelBookingModal"
  >
  </BaseModal>
</template>
<script lang="ts" setup>
import { useBookingStore } from "../../../data/store/BookingStore";
import { useNewsStore } from "../../../data/store/NewsStore";
import { storeToRefs } from "pinia";
import BaseModal from "@/ui/components/base/modal/BaseModal.vue";

const bookingStore = useBookingStore();
const newsStore = useNewsStore();
const { bookingToCancel } = storeToRefs(useBookingStore());

async function triggerCancelBookingModal() {
  bookingStore.triggerCancelBookingModal();
  bookingToCancel.value = null;
  await bookingStore.fetchAllBookings();
  newsStore.getAllNews();
}

async function cancelBooking() {
  await bookingStore.cancelBooking();
  bookingStore.triggerCancelBookingModal();
  bookingToCancel.value = null; 
  await bookingStore.fetchAllBookings()
  newsStore.getAllNews();
}
</script>
<style scoped>
</style>
