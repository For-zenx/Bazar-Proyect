<script setup lang="ts">
import { ProductData } from "../types/index";
type CategoryCounts = Record<string, number>;
const props = defineProps({
  items: {
    type: Array as PropType<ProductData[]>,
    required: true,
  },
});
const categoryCounts = ref<CategoryCounts>({});
const calculateCategoryCounts = () => {
  for (const item of props.items) {
    const category = item.category;
    categoryCounts.value[category] = (categoryCounts.value[category] || 0) + 1;
  }
};
const displayCategories = computed(() => {
  calculateCategoryCounts();

  const result = Object.keys(categoryCounts.value).map((category) => {
    if (categoryCounts.value[category] > 1) {
      return `(${categoryCounts.value[category]}) ${category}`;
    } else {
      return category;
    }
  });
  return result;
});
</script>
<template>
  <div class="py-4">
    <span
      v-for="(category, index) in displayCategories"
      :key="index"
      class="inline-block px-2 py-0.5 rounded mr-2 mt-1 text-white text-sm"
      :class="{
        'bg-orange-700  ': category.includes('smartphones'),
        'bg-red-700  ': category.includes('laptops'),
        'bg-yellow-700  ': category.includes('fragrances'),
        'bg-green-700  ': category.includes('skincare'),
        'bg-blue-700  ': category.includes('groceries'),
        'bg-indigo-700  ': category.includes('home-decoration'),
      }"
    >
      {{ category }}
    </span>
  </div>
</template>
