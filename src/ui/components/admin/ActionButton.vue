<template>
  <v-btn size="small" class="primary-button" @click="$emit('action')">{{
    props.buttonText
  }}</v-btn>
</template>
<script lang="ts" setup>
const props = defineProps({ buttonText: String });
</script>
