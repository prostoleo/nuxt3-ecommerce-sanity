import { defineStore } from 'pinia';

export const useBannerStore = defineStore({
	id: 'banner-store',
	state: () => {
		return {
			bannerData: null,
		};
	},
	getters: {
		getBannerData: (state) => {
			return state.bannerData;
		},
	},
	actions: {
		async loadBannerData() {
			const bannerQuery = '*[_type == "banner"]';

			const sanity = useSanity();

			const { data, error, pending } = await useAsyncData('banner', () =>
				sanity.fetch(bannerQuery)
			);
			// console.log('data: ', data);
			console.log('data.value[0]: ', data.value[0]);

			this.bannerData = data.value[0];
		},
	},
});
