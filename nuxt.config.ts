import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	// '@nuxtjs/sanity'
	buildmodules: ['@pinia/nuxt'],
	modules: ['@unocss/nuxt', '@nuxtjs/sanity', '@vuestic/nuxt'],

	// target: 'static',
	ssr: false,

	head: {
		link: [
			// {
			// 	rel: 'icon',
			// 	type: 'image/x-icon',
			// 	href: '/favicon.svg',
			// },
		],

		script: [
			/* {
				type: 'module',
				src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js',
			},
			{
				nomodule: true,
				src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js',
			}, */
			// <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
			// <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
		],
	},

	runtimeConfig: {
		secretKey: '', // variable that can only be accessed on the server side
		public: {
			SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID, // variable that can also be accessed on the client side
			SANITY_DATASET: process.env.SANITY_DATASET, // variable that can also be accessed on the client side
		},
	},

	css: ['uno.css', '~/assets/css/globals.css'],

	unocss: {
		icons: true,
		wind: true,
	},

	sanity: {
		projectId: process.env.SANITY_PROJECT_ID,
		dataset: process.env.SANITY_DATASET,
		useCdn: true,
		token: process.env.PUBLIC_SANITY_TOKEN,

		// imageHelper: true,
		// contentHelper: true,
	},

	vuestic: {
		config: {},
	},

	// '~/plugins/sanity-image-builder'
	// '~/plugins/vuestic-ui'

	plugins: ['~/plugins/pinia'],
});
