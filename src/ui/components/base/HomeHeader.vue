<template>
  <v-app-bar class="header" color="#1e1c1b" :elevation="2">
    <img src="@/assets/exp-home-logo.svg" class="logo" />
  </v-app-bar>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.header {
  width: 100vw;
  display: flex;
  padding-left: 8px;
}

.logo {
  width: 110px !important;
  height: 35px !important;
  padding-right: 4 px;
}
</style>
