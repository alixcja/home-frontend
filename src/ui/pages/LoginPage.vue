<template>
  <div class="content d-flex flex-column w-100 h-100">
    <h1>Willkommen bei</h1>
    <img src="@/assets/exp-home-logo.svg" class="logo" />
    <div class="text-center pt-5">
      <h3>Bitte logge dich ein.</h3>
      <v-btn class="login-button primary-button">Login</v-btn>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss">
.logo {
  width: 15%;
}
.login-button {
  width: 5%;
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
