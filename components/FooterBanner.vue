<template>
  <div class="footer-banner-container">
    <div class="banner-desc">
      <div class="left">
        <p class="uppercase">{{ data.discount }} off</p>
        <h3 class="uppercase">{{ data.largeText1 }}</h3>
        <h3 class="uppercase">{{ data.largeText2 }}</h3>
        <p>{{ data.saleTime }}</p>
      </div>
      <div class="right">
        <p>{{ data.smallText }}</p>
        <h3>{{ data.midText }}</h3>
        <p>{{ data.description }}</p>
        <NuxtLink :to="`/product/${data.product.toLowerCase()}`">
          <button>{{ data.buttonText }}</button>
        </NuxtLink>
      </div>

      <SanityImage
        :asset-id="data.image.asset._ref"
        auto="format"
        :alt="data.smallText"
        class="footer-banner-image object-contain pointer-events-none"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
