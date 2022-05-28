<template>
  <div>
    <HeroBanner v-if="store.getBannerData" />

    <!-- <Test /> -->

    <div class="products-heading">
      <h2>Best selling products</h2>
      <p>Speakers of many variations</p>
    </div>

    <div class="products-container">
      <Product v-for="product in data" :key="product._id" :product="product" />
    </div>

    <FooterBanner v-if="store.getBannerData" />
  </div>
</template>

<script setup>
import { useBannerStore } from '~~/store/banner';

const query = '*[_type == "product"]';

useNotifiersAfterPayment();

const sanity = useSanity();

const { data } = await useAsyncData('products', () => sanity.fetch(query));

const store = useBannerStore();

onMounted(async () => {
  await store.loadBannerData();
});

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  title: 'Headphones store | Ecommerce',
});

definePageMeta({
  layout: 'default',
});
</script>

<style lang="scss" scoped></style>
