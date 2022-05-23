export default async function useGetBannerData() {
	const bannerQuery = '*[_type == "banner"]';

	const sanity = useSanity();

	const { data, error, pending } = await useAsyncData('banner', () =>
		sanity.fetch(bannerQuery)
	);
	console.log('data: ', data);

	return {
		// bannerData: data?.[0],
		bannerData: computed(() => data?.[0]),
		// bannerError: error,
		bannerError: computed(() => error),
		// bannerPending: pending,
		bannerPending: computed(() => pending),
	};
}
