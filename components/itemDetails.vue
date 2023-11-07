<script setup lang="ts">
import { ProductData } from "types";
import { useBreakpoints, breakpointsTailwind, useImage } from "@vueuse/core";
const breakpoints = useBreakpoints(breakpointsTailwind);

const md = breakpoints.greaterOrEqual("md");

const props = defineProps({
  id: {
    type: [String, Array] as PropType<string | string[]>,
    default: true,
  },
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
  <div v-for="item in items">
    <div v-if="`${item.id}` === id" class="flex justify-center">
      <div class="container mt-16 rounded max-w-[450px]">
        <div class="flex justify-center items-center gap-x-6 sm:mr-10 md:mr-24">
          <div class="flex flex-col">
            <div v-if="md" v-for="(image, index) in item.images" :key="image">
              <div
                v-if="getImageLoadingState(item).isLoading"
                class="rounded-full w-16 h-16 mb-2 bg-gray-400 animate-pulse"
              />
              <NuxtImg
                v-else
                :src="image"
                class="rounded-full w-16 h-16 mb-1 md:mb-2"
                v-if="index < 3"
              />
            </div>
          </div>
          <NuxtImg :src="item.thumbnail" class="rounded-full w-52 h-52 mb-4" />
        </div>
        <div class="flex justify-center text-2xl font-semibold mt-4">
          {{ item.title }}
        </div>
        <div class="flex justify-center">
          <div class="flex justify-between mt-4 gap-x-32 md:gap-x-60">
            <div class="flex-col">
              <div class="text-lg font-semibold">{{ item.price }}$</div>
              <div class="-ml-4 text-sm text-gray-400">
                {{ item.stock }} in Stock
              </div>
            </div>
            <div class="flex mt-4">
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
        <div class="text-center mt-4 text-sm">
          {{ item.description }}
        </div>
        <div class="flex justify-center mt-14 md:mt-4">
          <div
            class="cursor-pointer flex gap-x-12 py-2 w-full justify-center rounded bg-blue-700 hover:-translate-y-[2px] bg-opacity-90 hover:bg-opacity-100 duration-200 ease-in-out"
          >
            <p class="font-semibold">Buy product</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
