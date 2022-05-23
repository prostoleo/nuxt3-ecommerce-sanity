import AWN from 'awesome-notifications';

export default defineNuxtPlugin((nuxtApp) => {
	const notifier = new AWN({});

	nuxtApp.vueApp.use('$notifier', notifier);
});
