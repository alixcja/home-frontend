<template>
  <p class="subtitle">Aktuelle Buchungen</p>
  <div class="d-flex flex-wrap">
    <div v-for="booking in currentBookings">
      <Card :booking="booking" :overdue="false" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useBookingStore } from "@/data/store/BookingStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import Card from "@/ui/components/dashboard/dashboardpage/BookingCard.vue";

const bookingStore = useBookingStore();
const { currentBookings } = storeToRefs(bookingStore);

onMounted(() => {
  bookingStore.fetchAllCurrentBookings();
});
</script>
