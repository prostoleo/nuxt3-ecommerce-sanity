<template>
  <div>
    <div class="product-detail-container">
      <!-- <div> -->
      <div class="image-container">
        <SanityImage
          :asset-id="product.image && product.image[imageIndex].asset._ref"
          auto="format"
          :alt="product.name"
          class="product-detail-image object-contain"
        />
        <div class="small-images-container">
          <SanityImage
            v-for="(image, i) in product.image"
            :key="image._key"
            :asset-id="image && image.asset._ref"
            auto="format"
            :alt="product.name"
            class="small-image object-contain"
            :class="imageIndex === i && 'selected-image'"
            @mouseover="imageIndex = i"
          />
          <!-- <img
						v-for="(image, i) in product.image"
						:src="imgUrl(image)"
						:key="image._key"
						:alt="product.name"
						class="small-image object-contain"
						:class="imageIndex === i && 'selected-image'"
						@mouseover="imageIndex = i"
					/> -->
        </div>
      </div>
      <div class="product-detail-desc">
        <h1>{{ product.name }}</h1>
        <div class="reviews">
          <!-- <ion-icon name="remove-outline"></ion-icon>
						<ion-icon name="add-outline"></ion-icon>
						<ion-icon name="star"></ion-icon>
						<ion-icon name="star-outline"></ion-icon> -->
          <div>
            <ion-icon name="star" v-for="index in 5" :key="index"></ion-icon>
          </div>
          <p>20</p>
        </div>
        <h4 class="details-title">Details</h4>
        <p>{{ product.details }}</p>
        <p class="price">${{ product.price }}</p>
        <div class="quantity">
          <h3>Quantity</h3>
          <p class="quantity-desc p-0 overflow-hidden !mt-1">
            <button
              class="minus bg-transparent px-3 py-2 border-none cursor-pointer"
              @click="cartStore.decQty"
            >
              <ion-icon name="remove-outline"></ion-icon>
            </button>
            <span class="num"> {{ cartStore.getQty }} </span>
            <button
              class="plus bg-transparent px-3 py-2 border-none cursor-pointer"
              @click="cartStore.incQty"
            >
              <ion-icon name="add-outline"></ion-icon>
            </button>
          </p>
        </div>
        <!-- ./quanity -->

        <div class="buttons">
          <button
            type="button"
            class="add-to-cart"
            @click="addProductToCart(product, cartStore.getQty)"
          >
            Add to cart
          </button>
          <button type="button" class="buy-now">Buy now</button>
        </div>
        <!-- ./buttons -->
      </div>
      <!-- ./curProduct-detail-desc -->
      <!-- </div> -->
    </div>
    <div class="maylike-products-wrapper">
      <h2>You may also like</h2>
      <div class="marquee">
        <div class="maylike-products-container track">
          <Product v-for="item in products" :key="item._id" :product="item" />
        </div>
      </div>
    </div>
    <ClientOnly>
      <notifications />
    </ClientOnly>
  </div>
</template>

<script setup>
import AWN from 'awesome-notifications';
import { routerKey } from 'vue-router';

import { useCartStore } from '~~/store/cart';

useNotifiersAfterPayment();

const slug = computed(() => route.params.slug);

/**
		* * sanity block

		*/

const query = `*[_type == "product" && slug.current == '${slug.value}'][0]`;
const productsQuery = `*[_type == "product" && slug.current != '${slug.value}']`;
// const productsQuery =

const sanity = useSanity();

const productData = await useAsyncData('product', () => sanity.fetch(query));
console.log('productData: ', productData);

if (!productData.data.value) {
  useRouter().replace('/not-found');
}

const productsData = await useAsyncData('products', () =>
  sanity.fetch(productsQuery)
);

const product = computed(() => productData.data.value);
console.log('product: ', product);
const products = computed(() => productsData.data.value);

/**
		* * images block

		*/

const imageIndex = useState('imageIndex', () => 0);

/**
		* * slug block

		*/
watchEffect(() => {
  const slugIn = route.params.slug;

  productData.refresh();
  productsData.refresh();
  imageIndex.value = 0;
});

/**
 * * store cart
 *  */
const cartStore = useCartStore();

function addProductToCart(product, quantity) {
  cartStore.addProductToCart(product, quantity);

  notifier.success(
    `<span><i>${quantity}</i> <b>${product.name}</b></span> was added to the cart`,
    {
      labels: {
        success: `Add to cart`,
      },
      // position: 'top-right',
    }
  );
}

/**
 * * useHead
 *  */

if (process.browser) {
  useHead({
    htmlAttrs: {
      lang: 'en',
    },
    title: `${product.value.name} | Headphones store`,
  });
}
</script>

<style lang="scss" scoped></style>
