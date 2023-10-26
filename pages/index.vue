import { Title } from '../.nuxt/components';
<script lang="ts" setup>
useHead({
  title: "home",
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
<template><div>Hello</div></template>
