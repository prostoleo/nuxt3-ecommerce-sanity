<template>
	<div
		class="cart-wrapper"
		cart-wrapper
		@click.self="cartStore.toggleShowCart(false)"
	>
		<!-- <ion-icon name="remove-outline"></ion-icon>
						<ion-icon name="add-outline"></ion-icon>
						<ion-icon name="star"></ion-icon>
						<ion-icon name="star-outline"></ion-icon> -->
		<!-- <ion-icon name="card-outline"></ion-icon> -->
		<!-- <ion-icon name="close-circle-outline"></ion-icon> -->
		<div class="cart-container">
			<button
				type="button"
				class="cart-heading"
				@click="cartStore.toggleShowCart(false)"
			>
				<ion-icon name="chevron-back-outline"></ion-icon>
				<span class="heading">Your Cart</span>
				<span class="cart-num-items"
					>({{ cartStore.totalQuantities }} items)</span
				>
			</button>

			<div class="empty-cart" v-if="cartStore.getCartItems.length === 0">
				<ion-icon name="card-outline"></ion-icon>
				<h3>Your shopping bag is empty</h3>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useCartStore } from '~~/store/cart';

	const cartStore = useCartStore();
</script>

<style lang="scss" scoped></style>
