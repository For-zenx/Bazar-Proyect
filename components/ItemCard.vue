<script setup lang="ts">
import { ProductData } from "../types/index";
import { useBreakpoints, breakpointsTailwind, useImage } from "@vueuse/core";
const breakpoints = useBreakpoints(breakpointsTailwind);

const md = breakpoints.smallerOrEqual("md");
const router = useRouter();
const props = defineProps({
  items: {
    type: Array as PropType<ProductData[]>,
    required: true,
  },
});

const imageLoadingStates = ref<Record<string, ReturnType<typeof useImage>>>({});

const getImageLoadingState = (item: ProductData) => {
  if (!imageLoadingStates.value[item.id]) {
    imageLoadingStates.value[item.id] = useImage({ src: item.thumbnail });
  }
  return imageLoadingStates.value[item.id];
};
</script>
<template>
  <!-- Current card -->
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
    <div
      v-for="item in props.items"
      class="container bg-gray-700 bg-opacity-50 p-4 rounded min-w-full cursor-pointer hover:-translate-y-[2px] duration-200 hover:bg-opacity-60"
      @click="router.push(`items/${item.id}`)"
    >
      <div :class="md ? 'flex items-center' : ''">
        <div class="md:flex md:justify-center">
          <div
            v-if="getImageLoadingState(item).isLoading"
            class="rounded-full h-20 w-28 sm:h-24 sm:w-24 md:h-28 md:w-28 bg-gray-400 animate-pulse"
          />
          <NuxtImg
            v-else
            :src="item.thumbnail"
            width="100"
            height="100"
            class="rounded-full h-20 w-28 sm:h-24 sm:w-24 md:h-28 md:w-28"
          />
        </div>
        <div class="pl-6 md:pl-0 md:mt-4 w-full">
          <div class="mt-2 font-semibold text-lg">{{ item.title }}</div>
          <div class="line-clamp-1 mt-1">{{ item.description }}</div>
          <div :class="md ? 'mt-8' : 'mt-4'" class="flex justify-between">
            <span class="font-semibold">{{ item.price }}$</span>
            <div class="flex">
              <div v-for="index in 5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#222220"
                  :class="[
                    index <= Math.floor(item.rating)
                      ? 'text-red-700'
                      : 'text-gray-500',
                  ]"
                  class="w-5 h-5 text-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
