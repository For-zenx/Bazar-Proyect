<script setup lang="ts">
import { ProductData } from "types";
import { breakpointsTailwind } from "@vueuse/core";

const { data: products } = await useAsyncData("products", () =>
  $fetch("/api/product")
);
const shuffledProducts = ref<ProductData[]>([]);
const router = useRouter();
const route = useRoute();
onBeforeMount(() => {
  const originalProducts = products.value?.products
    ? [...products.value.products]
    : [];
  for (let i = originalProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [originalProducts[i], originalProducts[j]] = [
      originalProducts[j],
      originalProducts[i],
    ];
  }
  shuffledProducts.value = originalProducts;
});

const breakpoints = useBreakpoints(breakpointsTailwind);
const sm = breakpoints.smallerOrEqual("sm");
const md = breakpoints.smallerOrEqual("lg");
const lg = breakpoints.between("lg", "xl");
const slideSize = computed<number>(() =>
  sm.value ? 1.1 : md.value ? 2.1 : lg.value ? 3 : 3.1
);
</script>

<template>
  <div class="mt-8 mb-4 text-xl text-gray-200 font-semibold underline">
    Products you might like
  </div>
  <Swiper
    ref="candidates"
    :modules="[SwiperAutoplay, SwiperNavigation]"
    :slides-per-view="slideSize"
    :navigation="md ? false : true"
    :space-between="16"
  >
    <SwiperSlide
      v-for="(product, index) in shuffledProducts.slice(0, 8)"
      :key="index"
    >
      <div
        class="container bg-gray-700 bg-opacity-50 p-4 rounded min-w-full cursor-pointer hover:-translate-y-[2px] duration-200 hover:bg-opacity-60"
        @click="router.push(`/items/${product.id}`)"
      >
        <div :class="md ? 'flex items-center' : ''">
          <div class="md:flex md:justify-center mr-4">
            <NuxtImg
              :src="product.thumbnail"
              width="100"
              height="100"
              class="rounded-full h-20 w-28 sm:h-24 sm:w-24 md:h-28 md:w-28"
            />
          </div>
          <div class="pl-6 md:pl-0 md:mt-8 w-full">
            <div class="mt-2 font-semibold text-lg line-clamp-1">
              {{ product.title }}
            </div>
            <div class="line-clamp-1 mt-1">{{ product.description }}</div>
            <div :class="md ? 'mt-8' : 'mt-4'" class="flex justify-between">
              <span class="font-semibold">{{ product.price }}$</span>
              <div class="flex">
                <div v-for="index in 5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#222220"
                    :class="[
                      index <= Math.floor(product.rating)
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
    </SwiperSlide>
  </Swiper>
</template>
<style scoped>
.nav-position {
  position: absolute;
  top: 30%;
  z-index: 2;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
}
</style>
