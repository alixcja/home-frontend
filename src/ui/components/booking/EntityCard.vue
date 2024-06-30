<template>
  <v-card class="mr-6">
    <v-img
      width="175"
      height="175"
      src="https://www.movasis.com/wp-content/uploads/2017/01/image-placeholder-500x500.jpg"
    ></v-img>
    <div class="px-2 py-2" >
      <b>{{ props.entity.name }}</b>
      <p v-if="props.entity.consoleType">{{ props.entity.consoleType }}</p>
    </div>
  </v-card>
</template>
<script setup lang="ts">
const props = defineProps(["entity"]);
</script>
