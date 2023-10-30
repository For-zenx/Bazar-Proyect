<template>
  <div>
    <div v-if="productKeyword.length === 0">
      No se encontraron coincidencias
    </div>
    <div v-else>
      <h2>
        Resultados de la búsqueda: {{ productKeyword }}, totales:
        {{ filteredProducts?.length }}
      </h2>
      <div v-if="filteredProducts?.length === 0">
        No se encontraron coincidencias
      </div>
      <ul v-if="!pending">
        <li v-for="result in filteredProducts" :key="result.id">
          {{ result.title }}
        </li>
      </ul>
      <ul v-else>
        <li
          v-for="index in filteredProducts?.length"
          class="h-3 bg-slate-500 rounded-lg w-36 mb-3 animate-pulse"
        ></li>
      </ul>
    </div>
    <nuxt-link to="/" class="text-blue-300 underline">Go to home</nuxt-link>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const productKeyword = route.query.product
  ? route.query.product.toLowerCase()
  : "";

const { data: products, pending } = await useLazyAsyncData("products", () =>
  $fetch("/api/product")
);

const filteredProducts = products.value?.products.filter((product) => {
  const productTitle = product.title.toLowerCase();
  const productCategory = product.category.toLowerCase();

  return (
    productTitle.includes(`${productKeyword}`) ||
    productCategory.includes(`${productKeyword}`)
  );
});
</script>
