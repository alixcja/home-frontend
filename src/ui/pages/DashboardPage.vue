<template>
  <div class="ma-6">
    <div class="d-flex flex-row mb-4">
      <p class="title">
        Willkommen zurück,<span class="title-bold ml-2">{{ currentUser.firstName }} {{ currentUser.lastName }}</span>
      </p>
    </div>
    <OverdueBookingsSection v-if="hasBookingsOverdue" />
    <CurrentBookingsSection v-if="hasCurrentOrFutureBookings" />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import CurrentBookingsSection from "../components/dashboard/dashboardpage/CurrentBookingsSection.vue";
import OverdueBookingsSection from "../components/dashboard/dashboardpage/OverdueBookingsSection.vue";
import { useBookingStore } from "@/data/store/BookingStore";
import { useAuthStore } from "@/data/store/AuthStore";
import { onMounted } from "vue";

const bookingStore = useBookingStore();
const { hasBookingsOverdue, hasCurrentOrFutureBookings } =
  storeToRefs(bookingStore);
const { currentUser } = storeToRefs(useAuthStore());

onMounted(() => {
  bookingStore.fetchAllBookings();
});
</script>
<style lang="sass"></style>