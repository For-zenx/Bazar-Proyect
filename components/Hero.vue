<script lang="ts" setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { useMouseInElement } from "@vueuse/core";

const route = useRoute();
const router = useRouter();
const show = ref(false);
const x = ref(0);
const searchQuery = ref(route.query.product || "");
const targetButton = ref(null);

const { isOutside } = useMouseInElement(targetButton);

const handleSubmit = () => {
  if (searchQuery.value.length > 0) {
    router.push({ path: "/items", query: { product: searchQuery.value } });
  }
};

function onMousemove(e: MouseEvent) {
  x.value = e.clientX;
}

onMounted(() => {
  show.value = true;
});
</script>

<template>
  <div class="main-container -mt-20">
    <div v-if="!show" class="spacer h-52"></div>
    <Transition name="nested">
      <div v-if="show" class="outer mb-2 mr-2 flex justify-center">
        <nuxt-img
          alt="Bazar logo"
          src="/img/logo.webp"
          height="200"
          width="200"
        />
      </div>
    </Transition>
    <div v-if="!show" class="spacer h-3 mb-10"></div>
    <Transition name="bounce">
      <p v-if="show" class="intro-text mb-6 text-center text-2xl font-semibold">
        Bazar Online
      </p>
    </Transition>
    <input
      ref="targetInput"
      type="text"
      placeholder="Search products, categories and more..."
      v-model="searchQuery"
      @keyup.enter="handleSubmit"
      :class="
        searchQuery.length > 0
          ? 'border-gray-400 bg-opacity-50'
          : 'border-gray-600'
      "
      class="rounded bg-black bg-opacity-30 focus:bg-opacity-50 focus:border-gray-400 border ease-in-out duration-100 transition-colors hover:bg-opacity-40 outline-none p-2 placeholder-gray-500 focus:placeholder-gray-400 w-80 text-gray-300"
    />
    <div class="flex justify-center mt-6">
      <button
        ref="targetButton"
        aria-label="Search button"
        class="search-button py-2 px-4 bg-blue-700 bg-opacity-90 rounded hover:-translate-y-[1px] hover:bg-opacity-100 transition-all duration-200 font-semibold"
        @mousemove="onMousemove"
        :class="isOutside ? 'bg-blue-700' : ' shadow-xl'"
        :style="isOutside ? {} : { backgroundColor: `hsl(${x}, 50%, 30%)` }"
        @click="handleSubmit"
      >
        Find product
      </button>
    </div>
  </div>
</template>

<style scoped>
/* image intro */
.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s;
}
.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateX(-300px);
  opacity: 0;
}

.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}
.nested-enter-active .inner {
  transition-delay: 0.25s;
}

/* Bounce intro text  */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
/* Button transitioncolors */
.movearea {
  transition: 1s background-color ease;
}
</style>
