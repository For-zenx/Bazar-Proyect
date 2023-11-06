<script setup lang="ts">
import { ProductData } from "types";
const route = useRoute();
const { id } = route.params;
const { data: products } = await useAsyncData("products", () =>
  $fetch("/api/product/")
);
const allProducts = <ProductData[]>products.value?.products;
</script>
<template>
  <div class="px-2 md:px-6 lg:px-16 py-4">
    <ItemDetails :id="id" :items="allProducts" />
  </div>
</template>
