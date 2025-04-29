<template>
  <div class="px-2 py-2">
    <b class="selected">{{ props.entity.name }}</b>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps(["entity"]);
</script>
