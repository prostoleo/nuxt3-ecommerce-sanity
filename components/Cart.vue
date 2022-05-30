<template>
  <div
    class="cart-wrapper"
    cart-wrapper
    @click.self="cartStore.toggleShowCart(false)"
  >
    <transition name="cart">
      <div class="cart-container" v-if="cartStore.showCart">
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
            <button class="btn" @click="handleCheckoutV2">
              Pay with Stripe
            </button>
          </div>
        </div>
      </div>
    </transition>

    <ClientOnly>
      <notifications />
    </ClientOnly>
  </div>
</template>

<script setup>
// import AWN from 'awesome-notifications';

import { loadStripe } from '@stripe/stripe-js';
import { useCartStore } from '~~/store/cart';

/* const notifier = new AWN({
  position: 'top-left',
}); */

const config = useRuntimeConfig();
const stripePromise = loadStripe(config.STRIPE_PUBLISHABLE_KEY);

const cartStore = useCartStore();

const showSpinner = useState('showSpinner');

async function handleCheckoutV2() {
  await useHandlePaymentClient();
}
</script>

<style lang="scss" scoped>
.cart-enter-active,
.cart-leave-active {
  transition: transform 350ms ease;
}

.cart-enter-from,
.cart-leave-to {
  transform: translateX(120%);
  // transition: transform 350ms ease;
}

.cart-enter-to,
.cart-leave-from {
  transform: translateX(0%);
  // transition: transform 350ms ease;
}
</style>
