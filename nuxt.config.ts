// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@@/assets/tailwind.css"],
  imports: {
    dirs: [..."types"],
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
        { charset: "utf-8" },
        { hid: "keyword", name: "keyword", content: "yoyo" },
        { hid: "description", name: "description", content: "2M&B project" },
      ],
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "nuxt-swiper",
  ],
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    strategy: "prefix_except_default",
    defaultDirection: "ltr",
    detectBrowserLanguage: {
      alwaysRedirect: false,
      redirectOn: "root",
      useCookie: true,
      cookieCrossOrigin: false,
      cookieDomain: null,
      cookieKey: "i18n_redirected",
      cookieSecure: false,
    },
    vueI18n: {
      messages: {
        en: {
          welcome: "Welcome",
        },
        es: {
          welcome: "Bienvenido",
        },
      },
    },
  },
  image: {
    inject: true,
    quality: 1,
    format: ["avif", "webp", "svg", "png", "jpg"],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
  },
});
