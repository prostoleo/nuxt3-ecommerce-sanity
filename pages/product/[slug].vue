<template>
  <transition>
    <div :key="route.fullPath">
      <div class="product-detail-container">
        <!-- <div> -->
        <div class="image-container">
          <SanityImage
            :asset-id="product.image[imageIndex].asset._ref"
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
              @pointerover="imageIndex = i"
            />
          </div>
        </div>
        <div class="product-detail-desc">
          <h1>{{ product.name }}</h1>
          <!-- <div class="reviews">
            <div>
              <ion-icon name="star" v-for="index in 5" :key="index"></ion-icon>
            </div>
            <p>20</p>
          </div> -->
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
            <button
              type="button"
              class="buy-now"
              @click="buyNowHandler(product, cartStore.getQty)"
            >
              Buy now
            </button>
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
  </transition>
</template>

<script setup>
import AWN from 'awesome-notifications';
import { routerKey } from 'vue-router';

import { useCartStore } from '~~/store/cart';

const notifier = new AWN({
  position: 'top-left',
});
useNotifiersAfterPayment();

const route = useRoute();
const slugComp = computed(() => route.params.slug);

/**
 * * scrollToTop
 */
function scrollToTop() {
  if ('scrollBehavior' in document.documentElement.style) {
    return window?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  } else {
    return window?.scrollTo(0, 0);
  }
}

scrollToTop();

/**
		* * sanity block

		*/

const productQuery = `*[_type == "product" && slug.current == '${slugComp.value}'][0]`;
const productsQuery = `*[_type == "product" && slug.current != '${slugComp.value}']`;

const sanity = useSanity();

const [
  { data: product, refresh: refreshProduct },
  { data: products, refresh: refreshProducts },
] = await Promise.all([
  useAsyncData('product', () => sanity.fetch(productQuery)),
  useAsyncData('products', () => sanity.fetch(productsQuery)),
]);
if (!product.value) {
  useRouter().replace('/error.html');
}

/**
		* * images block

		*/

const imageIndex = useState('imageIndex', () => 0);

/**
		* * slug block

		*/
/* watchEffect(() => {
  const slugIn = route.params.slug;

  // productData.refresh();
  // productsData.refresh();
  refreshProduct();
  refreshProducts();
  imageIndex.value = 0;
}); */
const slugUnwatch = watch(
  slugComp,
  (newVal, oldVal) => {
    if (newVal && newVal !== oldVal) {
      console.log('slug changed !');
      console.log('newVal, oldVal: ', newVal, oldVal);
      // console.log('refreshProduct: ', refreshProduct);
      refreshProduct();
      refreshProducts();
      scrollToTop();
      imageIndex.value = 0;
    }
  },
  {
    immediate: true,
    // deep: true,
  }
);

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
    }
  );
}

/**
 * * buyNowHandler
 *  */
const showSpinner = useState('showSpinner');

const config = useRuntimeConfig();
async function buyNowHandler(product, qty) {
  console.log('slugUnwatch: ', slugUnwatch);
  slugUnwatch();
  await useHandlePaymentClient('single', { ...product, quantity: qty }, config);
}

/**
 * * useHead
 *  */

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  title: `${product.value.name} | Headphones store`,
  meta: [
    {
      name: 'description',
      content: `Buy device great device - ${product.value.name}: ${product.value.details}`,
    },
  ],
  pageTransition: {
    name: 'page',
    mode: 'out-in',
  },
});
</script>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.45s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
}
</style>
