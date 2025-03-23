<template>
  <v-btn @click="$emit('function')" class="primary-button">{{ props.title }}</v-btn>
</template>
<script lang="ts" setup>
const props = defineProps(["title", "function"]);
</script>
<style lang="scss"></style>
