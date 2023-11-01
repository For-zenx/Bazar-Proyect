<script setup lang="ts">
import { useRoute } from "vue-router";
import { ProductData } from "types";
const route = useRoute();
const productKeyword = route.query.product
  ? `${route.query.product}`.toLowerCase()
  : "";

const { data: products, pending } = await useLazyAsyncData("products", () =>
  $fetch("/api/product")
);

let filteredProducts: ProductData[];

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
  <div>
    <div v-if="productKeyword.length === 0 || filteredProducts.length === 0">
      No se encontraron coincidencias
    </div>
    <ItemCard v-else :loading="pending" :items="filteredProducts" />
  </div>
</template>
