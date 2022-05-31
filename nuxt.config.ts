import { defineNuxtConfig } from 'nuxt';
console.log(process.env.STRIPE_PAYMENTS);

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildmodules: ['@pinia/nuxt'],
  modules: ['@unocss/nuxt', '@nuxtjs/sanity'],

  target: 'static',
  ssr: false,

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/product/speaker'],
      // routes:
    },
  },

  runtimeConfig: {
    secretKey: '', // variable that can only be accessed on the server side
    public: {
      SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID, // variable that can also be accessed on the client side
      SANITY_DATASET: process.env.SANITY_DATASET, // variable that can also be accessed on the client side
      STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
      STRIPE_PRODUCTS: process.env.STRIPE_PRODUCTS,
      STRIPE_PAYMENTS: process.env.STRIPE_PAYMENTS,
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
    projectId: process.env.SANITY_PROJECT_ID ?? 'ftw533h0',
    dataset: process.env.SANITY_DATASET ?? 'production',
    useCdn: true,
    token: process.env.PUBLIC_SANITY_TOKEN,

    // imageHelper: true,
    // contentHelper: true,
  },

  // '~/plugins/sanity-image-builder'
  // '~/plugins/vuestic-ui'
  //

  plugins: ['~/plugins/pinia', '~/plugins/notifier'],
});
