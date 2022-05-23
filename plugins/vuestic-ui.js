import { createVuestic } from 'vuestic-ui';
// console.log('VaToast: ', VaToast);

export default defineNuxtPlugin((nuxtApp) => {
	/* nuxtApp.vueApp.use(
		createVuesticEssential({
			components: {
				VaToast,
			},
		})
	); */
	nuxtApp.vueApp.use(createVuestic());
});
