<template>
  <v-card class="card elevation-24 rounded-xl">
    <div class="d-flex flex-row">
      <v-img
        width="40%"
        src="https://www.movasis.com/wp-content/uploads/2017/01/image-placeholder-500x500.jpg"
      ></v-img>
      <div>
        <h3>{{ props.booking.bookedBookingEntity.name }}</h3>
        <p>
          Das Spiel gehört vom {{ props.booking.startDate }} bis
          {{ props.booking.endDate }} nur dir!
        </p>
        <div width="100% d-flex justify-end">
            <v-btn>Rückgabe</v-btn>

        </div>
      </div>
    </div>
  </v-card>
</template>
<script lang="ts" setup>
const props = defineProps(["booking"]);
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
