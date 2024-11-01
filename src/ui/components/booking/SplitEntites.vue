<template>
  <div class="splitter">
    <v-icon
    :icon="iconType"
      class="mr-2"
      @click="$emit('toggleView')"
    ></v-icon>
  
    <p class="text-h5 w-auto">{{ props.entity }}</p>
    <hr class="w-100 ml-4" />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps(["entity", "isToggled"]);

const iconType = computed(() => props.isToggled ? 'mdi-chevron-up' : 'mdi-chevron-down')
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
