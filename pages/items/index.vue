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
  productKeyword.length === 0
    ? (filteredProducts = [])
    : (filteredProducts = products.value.products.filter((product) => {
        const productTitle = product.title.toLowerCase();
        const productCategory = product.category.toLowerCase();
        const productBrand = product.brand.toLowerCase();
        return (
          productTitle.includes(`${productKeyword}`) ||
          productCategory.includes(`${productKeyword}`) ||
          productBrand.includes(`${productKeyword}`)
        );
      }));
}
useHead({
  title: `Bazar Online - Search for: ${productKeyword}`,
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
    <div class="flex justify-center">
      <div
        class="flex flex-col mt-24 text-xl font-semibold"
        v-if="filteredProducts.length === 0"
      >
        <div class="flex justify-center">
          <NuxtImg
            src="/svg/mars.svg"
            class="animate-spin"
            height="200"
            width="200"
          />
        </div>
        No products found, try search other brands
      </div>
    </div>
    <ItemCategory :items="filteredProducts" />
    <ItemCard :items="filteredProducts" />
    <InterestSection />
  </div>
</template>
<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 40s linear infinite;
}
</style>
