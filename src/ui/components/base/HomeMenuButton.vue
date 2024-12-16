<template>
  <v-icon :icon="props.iconType" class="ma-1" @click="redirect" size="28px"> </v-icon>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
const props = defineProps(["iconType", "redirect"]);
const router = useRouter();

function redirect() {
  router.push(props.redirect);
}
</script>
