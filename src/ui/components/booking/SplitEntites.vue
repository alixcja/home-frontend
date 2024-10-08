<template>
  <div class="splitter">
    <v-icon icon="mdi-chevron-up" class="mr-2"></v-icon>
    <p class="text-h5">{{ props.entity }}</p>
    <hr class="w-100 ml-4"/>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(["entity"]);
</script>
<style>
.splitter {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    margin-bottom: 15px;
    margin-top: 15px;
}
</style>
