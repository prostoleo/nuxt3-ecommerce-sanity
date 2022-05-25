<template>
  <div class="navbar-container">
    <p class="logo">
      <NuxtLink to="/">Cool Headphones</NuxtLink>
    </p>

    <button class="cart-icon" @click="cartStore.toggleShowCart(true)">
      <ion-icon name="cart"></ion-icon>
      <span class="cart-item-qty">{{ cartStore.getTotalQuantities }}</span>
    </button>

    <Cart v-if="cartStore.getShowCart"></Cart>
  </div>
</template>

<script setup>
import { useCartStore } from '~~/store/cart';

const cartStore = useCartStore();
</script>

<style lang="scss" scoped></style>
