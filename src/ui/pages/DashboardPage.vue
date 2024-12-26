<template>
  <div class="ma-6">
    <div class="d-flex flex-row">
      <p class="title">
        Willkommen zurück, <span class="title-bold ml-2">Alicja Pater!</span>
      </p>
    </div>
    <OverdueBookingsSection v-if="hasBookingsOverdue" />
    <CurrentBookingsSection v-if="hasCurrentOrFutureBookings" />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import CurrentBookingsSection from "../components/dashboard/CurrentBookingsSection.vue";
import OverdueBookingsSection from "../components/dashboard/OverdueBookingsSection.vue";
import { useBookingStore } from "@/data/store/BookingStore";
import { onMounted } from "vue";

const bookingStore = useBookingStore();
const { hasBookingsOverdue, hasCurrentOrFutureBookings } =
  storeToRefs(bookingStore);

onMounted(() => {
  bookingStore.fetchAllBookings();
});
</script>
