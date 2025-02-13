<template>
  <HomeMenuButton
    :iconType="'mdi-home'"
    :redirect="'/dashboard'"
    class="mr-4"
  />
  <HomeMenuButton :iconType="'mdi-calendar-blank'" :redirect="'/booking'" />
  <!--   <HomeMenuButton
    :iconType="'mdi-silverware-fork-knife'"
    :redirect="'/restaurant'"
  /> -->
  <hr class="divider" />
  <HomeMenuButton
    :iconType="'mdi-account'"
    :redirect="'/profile'"
    class="mr-4"
  />
  <HomeMenuButton
    v-if="currentUser.isHomeAdmin"
    :iconType="'mdi-cog'"
    :redirect="'/settings'"
    class="mr-4"
  />
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import HomeMenuButton from "./HomeMenuButton.vue";
import { useAuthStore } from "@/data/store/AuthStore";

const { currentUser } = storeToRefs(useAuthStore());
</script>
<style scoped>
.divider {
  margin: 12px;
  color: #f6f4f1;
  height: 60%;
}
</style>

<!-- 
<template>
    <HomeMenuButton :iconType="mdi-calendar-blank" :redirect="/booking"/>
</template>
<script lang="ts" setup>
</script> -->
