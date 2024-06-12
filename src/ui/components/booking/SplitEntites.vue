<template>
  <div class="splitter">
    <v-icon icon="mdi-chevron-up"></v-icon>
    <p>{{ props.entity }}</p>
    <hr class="w-100"/>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(["entity"]);
</script>
<style>
.splitter {
    display: flex;
    flex-direction: flex-row;
    width: 90%
}
</style>
