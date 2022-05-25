import { defineNuxtConfig } from 'nuxt';
/* import useGetAllProductsPaths from './composables/useGetAllProductsPaths';

const data = useGetAllProductsPaths();
console.log('data: ', data); */

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildmodules: ['@pinia/nuxt'],
  modules: ['@unocss/nuxt', '@nuxtjs/sanity'],

  // target: 'server',
  // ssr: true,
  target: 'static',
  ssr: false,

  /* nitro: {
    alias: {
      'vue/server-renderer': path.resolve(
        __dirname,
        '../../../node_modules/vue/server-renderer'
      ),
      'vue/compiler-sfc': path.resolve(
        __dirname,
        '../../../node_modules/vue/compiler-sfc'
      ),
    },
    // prerender: {
    //   routes: ['/', '/test'],
    // },
  }, */

  /* generate: {
    crawler: true,
  }, */

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/product/speaker'],
    },
  },

  runtimeConfig: {
    secretKey: '', // variable that can only be accessed on the server side
    public: {
      SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID, // variable that can also be accessed on the client side
      SANITY_DATASET: process.env.SANITY_DATASET, // variable that can also be accessed on the client side
      STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
      STRIPE_PRODUCTS: process.env.STRIPE_PRODUCTS,
    },
  },

  css: [
    'uno.css',
    '~/assets/scss/awesome-notifications.scss',
    '~/assets/css/globals.css',
  ],

  unocss: {
    icons: true,
    wind: true,
  },

  sanity: {
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    useCdn: true,
    token: process.env.PUBLIC_SANITY_TOKEN,

    // imageHelper: true,
    // contentHelper: true,
  },

  // '~/plugins/sanity-image-builder'
  // '~/plugins/vuestic-ui'
  // '~/plugins/notifier'

  plugins: ['~/plugins/pinia'],
});
