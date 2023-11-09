<script setup lang="ts">
import { ProductData } from "types";
const route = useRoute();
const { id } = route.params;

const { data: products } = await useAsyncData("products", () =>
  $fetch("/api/product/")
);

const allProducts = <ProductData[]>products.value?.products;
const productInfo = allProducts.find((item) => {
  return item.id === Number(route.params.id);
});
const headerTitle = productInfo?.title;

useHead({
  title: headerTitle,
  meta: [
    {
      hid: "Item-details",
      name: "Item-details",
      content: "My custom description",
    },
  ],
});
definePageMeta({
  layout: "default",
});
</script>
<template>
  <div class="px-2 md:px-6 lg:px-16 py-4">
    <ItemDetails :id="id" :items="allProducts" />
    <InterestSection />
  </div>
</template>
