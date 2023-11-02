<script setup lang="ts">
import { useRoute } from "vue-router";
import { ProductData } from "types";
const route = useRoute();
const productKeyword = route.query.product
  ? `${route.query.product}`.toLowerCase()
  : "";

const { data: products } = await useAsyncData("products", () =>
  $fetch("/api/product")
);

let filteredProducts: ProductData[] = [];

if (products.value) {
  filteredProducts = products.value.products.filter((product) => {
    const productTitle = product.title.toLowerCase();
    const productCategory = product.category.toLowerCase();
    return (
      productTitle.includes(`${productKeyword}`) ||
      productCategory.includes(`${productKeyword}`)
    );
  });
}
</script>
<template>
  <div class="px-2 md:px-6 lg:px-16">
    <ItemCategory :items="filteredProducts" />
    <ItemCard :items="filteredProducts" />
  </div>
</template>
