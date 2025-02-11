<template>
  <v-app-bar class="title" color="#1e1c1b" :elevation="2">
    <img
      src="@/assets/exp-home-logo.svg"
      class="logo"
      @click="directToDashboard"
    />
    <v-spacer />
    <HomeMenu v-if="!route.meta.hideHeader" />
  </v-app-bar>
</template>
<script setup lang="ts">
import HomeMenu from "./HomeMenu.vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();

function directToDashboard() {
  router.push("/dashboard");
}
</script>
<style scoped lang="scss">
.title {
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
