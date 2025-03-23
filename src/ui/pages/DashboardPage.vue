<template>
  <div class="ma-6">
    <div class="d-flex flex-row mb-4">
      <p class="title">
        Willkommen zurück,<span class="title-bold ml-2"
          >{{ currentUser.firstName }} {{ currentUser.lastName }}</span
        >
      </p>
    </div>
    <NewsSection v-if="hasNews" />
    <OverdueBookingsSection v-if="hasBookingsOverdue" />
    <CurrentBookingsSection v-if="hasCurrentOrFutureBookings" />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import CurrentBookingsSection from "../components/dashboard/dashboardpage/CurrentBookingsSection.vue";
import OverdueBookingsSection from "../components/dashboard/dashboardpage/OverdueBookingsSection.vue";
import NewsSection from "../components/dashboard/dashboardpage/NewsSection.vue"
import { useBookingStore } from "@/data/store/BookingStore";
import { useAuthStore } from "@/data/store/AuthStore";
import { onMounted } from "vue";
import { useNewsStore } from "@/data/store/NewsStore";

const bookingStore = useBookingStore();
const newsStore = useNewsStore();

const { hasBookingsOverdue, hasCurrentOrFutureBookings } =
  storeToRefs(bookingStore);
const { hasNews } = storeToRefs(newsStore);
const { currentUser } = storeToRefs(useAuthStore());

onMounted(() => {
  bookingStore.fetchAllBookings();
  newsStore.getAllNews()
});
</script>
<style lang="sass"></style>
