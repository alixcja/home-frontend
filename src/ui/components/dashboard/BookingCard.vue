<template>
  <v-card class="card elevation-24 rounded-xl">
    <div class="d-flex flex-row">
      <v-img
        width="40%"
        src="https://www.movasis.com/wp-content/uploads/2017/01/image-placeholder-500x500.jpg"
      ></v-img>
      <div class="ma-4">
        <h3>{{ props.booking.bookingEntity.name }}</h3>
        <p class="mt-3">
          Das Spiel gehört vom {{ props.booking.startDate }} bis
          {{ props.booking.endDate }} nur dir!
        </p>
        <div width="100%" class="d-flex justify-end align-end mt-3">
          <v-btn @click="openReturnModal" class="login-button primary-button">Abgabe</v-btn>
        </div>
      </div>
  
    </div>
  </v-card>
</template>
<script lang="ts" setup>
import { useBookingStore } from '@/data/store/BookingStore';

const props = defineProps(["booking"]);
const bookingStore = useBookingStore();

function openReturnModal() {
  console.log(props.booking)
  useBookingStore().setBookingToReturn(props.booking)
  bookingStore.triggerReturnBookingModule()
}
</script>
<style scoped>
.card {
  width: 25vw;
  height: 20vh;
  margin-top: 16px;
  margin-bottom: 16px;
  margin-right: 24px;
}
</style>
