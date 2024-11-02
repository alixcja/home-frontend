<template>
  <v-app>
    <HomeHeader></HomeHeader>
    <v-main class="main">
      <BookingPage />
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import HomeHeader from "./ui/components/base/HomeHeader.vue";
import BookingPage from "./ui/pages/BookingPage.vue";
</script>
<style scoped>
.main {
}
</style>
