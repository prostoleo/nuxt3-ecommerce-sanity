<template>
  <div
    class="cart-wrapper"
    cart-wrapper
    @click.self="cartStore.toggleShowCart(false)"
  >
    <div class="cart-container">
      <button
        type="button"
        class="cart-heading"
        @click="cartStore.toggleShowCart(false)"
      >
        <ion-icon name="chevron-back-outline"></ion-icon>

        <span class="heading">Your Cart</span>
        <span class="cart-num-items"
          >({{ cartStore.getTotalQuantities }} items)</span
        >
      </button>

      <div class="empty-cart" v-if="cartStore.getCartItems.length === 0">
        <ion-icon name="card-outline"></ion-icon>
        <h3>Your shopping bag is empty</h3>
        <NuxtLink to="/">
          <button
            type="button"
            class="btn"
            @click="cartStore.toggleShowCart(false)"
          >
            Continue shopping
          </button>
        </NuxtLink>
      </div>

      <div class="product-container" v-else>
        <div
          class="product"
          v-for="item in cartStore.getCartItems"
          :key="item._id"
        >
          <SanityImage
            :asset-id="item?.image[0].asset._ref"
            auto="format"
            :alt="item?.smallText"
            class="cart-product-image object-contain"
          />
          <div class="item-desc">
            <div class="flex top">
              <h5>{{ item.name }}</h5>
              <h4>${{ item.price }}</h4>
            </div>
            <div class="flex bottom">
              <div>
                <p class="quantity-desc p-0 overflow-hidden !mt-1">
                  <button
                    class="minus bg-transparent px-3 py-2 border-none cursor-pointer"
                    @click="cartStore.decreaseQtyOnProdId(item._id)"
                  >
                    <ion-icon name="remove-outline"></ion-icon>
                  </button>
                  <span class="num"> {{ item.quantity }} </span>
                  <button
                    class="plus bg-transparent px-3 py-2 border-none cursor-pointer"
                    @click="cartStore.increaseQtyOnProdId(item._id)"
                  >
                    <ion-icon name="add-outline"></ion-icon>
                  </button>
                </p>
              </div>
              <button
                class="remove-item"
                @click="cartStore.removeProdOnId(item._id)"
              >
                <ion-icon name="close-circle-outline"></ion-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-bottom" v-if="cartStore.getCartItems.length >= 1">
        <div class="total">
          <h3>Subtotal</h3>
          <h3>${{ cartStore.getTotalPrice }}</h3>
        </div>
        <div class="btn-container">
          <button class="btn" @click="handleCheckoutV2()">
            Pay with Stripe
          </button>
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

import { loadStripe } from '@stripe/stripe-js';
import { useCartStore } from '~~/store/cart';

const notifier = new AWN({
  position: 'top-left',
});

const config = useRuntimeConfig();
// console.log('config: ', config);
const stripePromise = loadStripe(config.STRIPE_PUBLISHABLE_KEY);
// console.log('stripePromise: ', stripePromise);

const cartStore = useCartStore();

const showSpinner = useState('showSpinner');

// "image-35e17b7e9f56353113d132314cd085d0c1f5e0b6-555x555-png"
/* function test() {
  const img = useTransformImgUrl(
    'image-35e17b7e9f56353113d132314cd085d0c1f5e0b6-555x555-png'
  );

  console.log('img: ', img);
} */

// async function handleCheckout() {
//   // console.log('to checkout');
//   try {
//     /** get all items from cart */
//     const localCartItems = cartStore.getCartItems.map((item) => {
//       return {
//         name: item.name,
//         price: item.price,
//         quantity: item.quantity,
//       };
//     });
//     console.log('localCartItems: ', localCartItems);

//     // showSpinner
//     showSpinner.value = true;
//     /**
//      * * [connectWithStripe, getAllProductsFromStripe] */
//     const [stripePromiseResolved, productsStripe] = await Promise.all([
//       stripePromise,
//       useGetProductsFromStripe(),
//     ]);

//     /**
//      * * transform to neccessary view - all products from stripe
//      */
//     const sameProducts = productsStripe.value.data.reduce(
//       (returnedVal, product) => {
//         /**
//          * * for each product trying to find exact match in cart by name  */

//         const foundedProduct = localCartItems.find(
//           (lp) => lp.name === product.name
//         );

//         /**
//          * * if found - add neccessary info to arr  */
//         if (foundedProduct) {
//           returnedVal.push({
//             price: product.default_price,
//             quantity: foundedProduct.quantity,
//           });
//         }

//         /**
//          * * else - return the same  */
//         return returnedVal;
//       },
//       []
//     );
//     console.log('sameProducts: ', sameProducts);

//     const { error } = await stripePromiseResolved.redirectToCheckout({
//       submitType: 'pay',
//       mode: 'payment',

//       billingAddressCollection: 'auto',
//       lineItems: sameProducts,
//       cancelUrl: window.location.origin,
//       successUrl: window.location.origin,
//     });

//     showSpinner.value = false;

//     if (error) {
//       setStripeError(error);
//       return;
//     }

//     cartStore.$reset();
//     cartStore.clearLocalStorage();
//   } catch (error) {
//     console.error(error);
//   }
// }

async function handleCheckoutV2() {
  // console.log('to checkout');
  try {
    /** get all items from cart */
    const lineItems = cartStore.getCartItems.map((item) => {
      return {
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: useTransformImgUrl(item.image[0].asset._ref),
      };
    });
    const currency = 'usd';
    console.log('lineItems: ', lineItems);

    // showSpinner
    showSpinner.value = true;
    /**
     * * [connectWithStripe, getAllProductsFromStripe] */
    // const payment = await usePaymentWithStripe(lineItems, currency);
    const config = useRuntimeConfig();
    console.log('config: ', config);

    const response = await fetch(config.STRIPE_PAYMENTS, {
      method: 'POST',
      headers: {
        // 'Access-Control-Origin': '*',
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({
        lineItems,
        currency,
        successUrl: `${window.location.href}/?paymentSuccess=true`,
        cancelUrl: `${window.location.href}/?paymentSuccess=false`,
      }),
    });
    console.log('response: ', response);

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    const result = await response.json();
    console.log('result: ', result);

    cartStore.$reset();
    cartStore.clearLocalStorage();
    window.location.href = result.url;

    showSpinner.value = false;

    notifier.success('Payment succeeded!');
  } catch (error) {
    console.error(error);
    showSpinner.value = false;
    notifier.alert('An error occurred, try again later');
  }
}
</script>

<style lang="scss" scoped></style>
