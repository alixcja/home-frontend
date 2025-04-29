<template>
  <div class="px-2 py-2">
    <b class="selected">{{ props.entity.name }}</b>
    <p v-if="props.entity.consoleType">{{ props.entity.consoleType }}</p>
    <p
      v-if="props.entity.description && (props.entity.type === 'game') == false"
    >
      {{ props.entity.description }}
    </p>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps(["entity"]);
</script>
