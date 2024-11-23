<template>
  <div class="book-button-background-active rounded-s-lg">
    <v-btn class="book-button primary-button" @click="$emit('toggleBookingModule')"
      >Buchen</v-btn
    >
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss">
.book-button {
  z-index: 10;
  width: 40%;
  height: 60%;
  margin-left: 16px;
}

.book-button-background-active {
  position: fixed;
  bottom: 20px;
  right: 0px;
  z-index: 10;
  width: 15%;
  background-color: #1e1c1b;
  height: 7%;
  display: flex;
  align-items: center;
}
</style>
