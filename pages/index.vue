<script lang="ts" setup>
useHead({
  title: "Bazar Online",
  meta: [
    {
      hid: "page-index",
      name: "page-index",
      content: "My custom description",
    },
  ],
});
definePageMeta({
  layout: "default",
});
</script>
<template>
  <div class="flex items-center h-screen justify-center">
    <Hero />
  </div>
</template>
