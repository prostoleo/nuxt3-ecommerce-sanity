<template>
  <div class="hero-banner-container">
    <!-- <div v-if="!bannerData">loading...</div> -->
    <!-- v-else -->
    <div>
      <p class="beats-solo uppercase">{{ bannerData?.smallText }}</p>
      <h3 class="uppercase">{{ bannerData?.midText }}</h3>
      <h1>{{ bannerData?.largeText1 }}</h1>
      <!-- <img
				:src="$urlFor(bannerData.image).size(440)"
				:alt="bannerData.smallText"
				loading="lazy"
				class="hero-banner-image"
			/> -->
      <SanityImage
        :asset-id="bannerData?.image.asset._ref"
        auto="format"
        :alt="bannerData?.smallText"
        class="hero-banner-image object-contain"
      />
      <div>
        <NuxtLink :to="`/product/${bannerData?.product.toLowerCase()}`">
          <button type="button" class="uppercase">
            {{ bannerData?.buttonText }}
          </button>
          <div class="desc">
            <h5>Description</h5>
            <p class="">{{ bannerData?.description }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useBannerStore } from '~~/store/banner';

const store = useBannerStore();

const { bannerData } = storeToRefs(store);
console.log('bannerData: ', bannerData);
</script>

<style lang="scss" scoped></style>
