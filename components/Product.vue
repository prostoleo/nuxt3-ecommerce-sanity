<template>
  <NuxtLink :to="`/product/${product.slug.current}`">
    <div class="product-card">
      <SanityImage
        v-if="product.image"
        :asset-id="product.image[0].asset._ref"
        auto="format"
        :alt="product.name"
        width="250"
        height="250"
        class="product-image"
      />
      <p class="product-name">{{ product.name }}</p>
      <p class="product-price">${{ product.price }}</p>
    </div>
  </NuxtLink>
  <!-- <pre>{{ product }}</pre> -->
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
