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
    const productBrand = product.brand.toLowerCase();
    return (
      productTitle.includes(`${productKeyword}`) ||
      productCategory.includes(`${productKeyword}`) ||
      productBrand.includes(`${productKeyword}`)
    );
  });
}
useHead({
  title: `Search for: ${productKeyword}`,
  meta: [
    {
      hid: "page-items",
      name: "page-items",
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
    <div class="text-xl">
      Results for search "<span class="font-semibold underline text-gray-100">{{
        productKeyword
      }}</span
      >", total items "<span class="font-semibold underline text-gray-100">{{
        filteredProducts.length
      }}</span
      >"
    </div>
    <ItemCategory :items="filteredProducts" />
    <ItemCard :items="filteredProducts" />
  </div>
</template>
