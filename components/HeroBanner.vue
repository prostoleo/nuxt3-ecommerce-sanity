<template>
  <div class="hero-banner-container">
    <div>
      <p class="beats-solo uppercase">{{ data.smallText }}</p>
      <h3 class="uppercase">{{ data.midText }}</h3>
      <h1>{{ data.largeText1 }}</h1>
      <SanityImage
        :asset-id="data.image.asset._ref"
        auto="format"
        :alt="data.smallText"
        class="hero-banner-image object-contain"
      />
      <div>
        <NuxtLink :to="`/product/${data.product.toLowerCase()}`">
          <button type="button" class="uppercase">
            {{ data.buttonText }}
          </button>
          <div class="desc">
            <h5>Description</h5>
            <p class="">{{ data.description }}</p>
          </div>
        </NuxtLink>
      </div>
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
