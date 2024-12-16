<template>
  <HomeMenuButton :iconType="'mdi-home'" :redirect="'/dashboard'" />
  <HomeMenuButton :iconType="'mdi-calendar-blank'" :redirect="'/booking'" />
  <HomeMenuButton
    :iconType="'mdi-silverware-fork-knife'"
    :redirect="'/restaurant'"
  />
  <hr class="divider" />
  <HomeMenuButton :iconType="'mdi-account'" :redirect="'/profile'" class="mr-4"/>
</template>
<script lang="ts" setup>
import HomeMenuButton from "./HomeMenuButton.vue";
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
