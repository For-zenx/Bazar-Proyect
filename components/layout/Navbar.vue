<script setup lang="ts">
import { useMouseInElement } from "@vueuse/core";
const router = useRouter();
const route = useRoute();
const target = ref(null);
const { isOutside } = useMouseInElement(target);
const searchQuery = ref(route.query.product || "");
const handleSubmit = () => {
  if (searchQuery.value.length > 0) {
    router.push({ path: "/items", query: { product: searchQuery.value } });
    setTimeout(() => {
      window.location.reload();
    }, 10);
  }
};
</script>
<template>
  <nav
    class="w-full bg-black bg-opacity-[0.83] h-16 px-16 shadow-md text-gray-300"
  >
    <div class="flex justify-center items-center pt-1.5">
      <NuxtImg src="/img/logo.webp" height="50" />
      <div class="flex ml-6 mr-12 bg-black">
        <input
          type="text"
          placeholder="Search products and more..."
          v-model="searchQuery"
          @keyup.enter="handleSubmit"
          class="rounded-l bg-black bg-opacity-60 w-60 px-4 h-12 border-y-2 border-l-2 border-gray-700 focus:outline focus:border-gray-600"
        />
        <div
          ref="target"
          class="h-12 rounded-r flex items-center px-2 cursor-pointer duration-300"
          :class="!isOutside ? 'bg-gray-600' : 'bg-gray-700'"
          @click="handleSubmit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            :class="!isOutside ? 'scale-105' : ''"
            class="w-6 h-6 duration-200"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>
    </div>
  </nav>
</template>
