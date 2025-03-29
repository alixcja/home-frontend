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
import { storeToRefs } from "pinia";
import BaseModal from "@/ui/components/base/modal/BaseModal.vue";

const bookingStore = useBookingStore();
const { bookingToCancel } = storeToRefs(useBookingStore());

function triggerCancelBookingModal() {
  bookingStore.triggerCancelBookingModal();
  bookingToCancel.value = null;
}

function cancelBooking() {
  bookingStore.cancelBooking();
  bookingStore.triggerCancelBookingModal();
  bookingToCancel.value = null; 
}
</script>
<style scoped>
</style>
