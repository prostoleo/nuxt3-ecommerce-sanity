<template>
	<div class="footer-banner-container">
		<div class="banner-desc">
			<div class="left">
				<p class="uppercase">{{ bannerData.discount }} off</p>
				<h3 class="uppercase">{{ bannerData.largeText1 }}</h3>
				<h3 class="uppercase">{{ bannerData.largeText2 }}</h3>
				<p>{{ bannerData.saleTime }}</p>
			</div>
			<div class="right">
				<p>{{ bannerData.smallText }}</p>
				<h3>{{ bannerData.midText }}</h3>
				<p>{{ bannerData.description }}</p>
				<NuxtLink :to="`/product/${bannerData.product}`">
					<button>{{ bannerData.buttonText }}</button>
				</NuxtLink>
			</div>

			<SanityImage
				:asset-id="bannerData?.image.asset._ref"
				auto="format"
				:alt="bannerData?.smallText"
				class="footer-banner-image object-contain pointer-events-none"
			/>
		</div>
	</div>
</template>

<script setup>
	import { storeToRefs } from 'pinia';
	import { useBannerStore } from '~~/store/banner';

	const store = useBannerStore();

	const { bannerData } = storeToRefs(store);
</script>

<style lang="scss" scoped></style>
