import imageUrlBuilder from '@sanity/image-url';
// console.log('imageUrlBuilder: ', imageUrlBuilder);

export default defineNuxtPlugin(() => {
	const builder = imageUrlBuilder(useSanity().config);
	function urlForImg(source) {
		return builder.image(source).auto('format');
	}
	return {
		provide: { urlForImg },
	};
});
