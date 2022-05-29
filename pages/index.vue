<template>
  <div>
    <HeroBanner :data="bannerData[0]" />

    <div class="products-heading">
      <h2>Best selling products</h2>
      <p>Speakers of many variations</p>
    </div>

    <div class="products-container">
      <Product
        v-for="product in products"
        :key="product._id"
        :product="product"
      />
    </div>

    <FooterBanner :data="bannerData[0]" />
  </div>
</template>

<script setup>
import AWN from 'awesome-notifications';
const notifier = new AWN({
  position: 'top-left',
});
useNotifiersAfterPayment();

const sanity = useSanity();

const query = '*[_type == "product"]';
const bannerQuery = '*[_type == "banner"]';

const [{ data: products }, { data: bannerData }] = await Promise.all([
  useAsyncData('products', () => sanity.fetch(query)),
  useAsyncData('banner', () => sanity.fetch(bannerQuery)),
]);

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
