<template>
  <div>
    <HeroBanner :data="bannerData[0]" />

    <!-- <Test /> -->

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
import { useBannerStore } from '~~/store/banner';

const query = '*[_type == "product"]';

useNotifiersAfterPayment();

const sanity = useSanity();

// const { data } = await useAsyncData('products', () => sanity.fetch(query));

const bannerQuery = '*[_type == "banner"]';

// const bannerData = await useAsyncData('banner', () =>
//   sanity.fetch(bannerQuery)
// );
// console.log('bannerData: ', bannerData);

const [{ data: products }, { data: bannerData }] = await Promise.all([
  useAsyncData('products', () => sanity.fetch(query)),
  useAsyncData('banner', () => sanity.fetch(bannerQuery)),
]);
/* const store = useBannerStore();

onMounted(async () => {
  await store.loadBannerData();
}); */

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
