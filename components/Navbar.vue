<template>
  <div class="navbar-container">
    <p class="logo">
      <NuxtLink to="/">Cool Headphones</NuxtLink>
    </p>

    <button class="cart-icon" @click="openCart">
      <ion-icon name="cart"></ion-icon>
      <span class="cart-item-qty">{{ cartStore.getTotalQuantities }}</span>
    </button>

    <Cart></Cart>
  </div>
</template>

<script setup>
import { useCartStore } from '~~/store/cart';

const cartStore = useCartStore();

function openCart() {
  const body = document.body;

  body.style.overflow = 'hidden';

  cartStore.toggleShowCart(true);
}
</script>

<style lang="scss" scoped></style>
