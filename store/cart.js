import { defineStore } from 'pinia';

export const useCartStore = defineStore({
	id: 'cart-store',
	state: () => {
		return {
			showCart: false,
			cartItems: [],
			totalPrice: 0,
			totalQuantities: 0,
			qty: 1,
		};
	},
	getters: {
		getShowCart: (state) => {
			return state.showCart;
		},
		getCartItems: (state) => {
			return state.cartItems;
		},
		getTotalPrice: (state) => {
			return state.totalPrice;
		},
		getTotalQuantities: (state) => {
			return state.totalQuantities;
		},
		getQty: (state) => {
			return state.qty;
		},
	},
	actions: {
		incQty() {
			this.qty++;
		},
		decQty() {
			if (this.qty <= 1) {
				return (this.qty = 1);
			}
			this.qty--;
		},

		toggleShowCart(newState) {
			console.log('click');
			// const newShowCart = ;
			this.showCart = newState;
		},

		addProductToCart(product, quantity) {
			console.log({ product, quantity });
			// if (this.cartItem.length === 0 && product && quantit) {

			// }
			const toast = useToast();
			console.log('toast: ', toast);

			const isProductInCart = this.cartItems.some((p) => p._id === product._id);
			console.log('isProductInCart: ', isProductInCart);

			this.totalPrice += product.price * quantity;
			this.totalQuantities += quantity;

			//* если продукт уже в корзине
			if (isProductInCart) {
				const updatedCartItems = this.cartItems.map((cartProduct) => {
					if (cartProduct._id === product._id) {
						return {
							...cartProduct,
							quantity: cartProduct.quantity + quantity,
						};
					}
				});

				this.cartItems = updatedCartItems;
				console.log('this.cartItems: ', this.cartItems);

				// console.log('this.$vaToast: ', this.$vaToast);

				// console.log('toast: ', toast);
				// toast.init('Toast example');
				toast.init({
					title: 'Success',
					color: 'success',
					dangerouslyUseHtmlString: true,
					message: `${quantity} <b>${product.name}</b> was added to the cart`,
				});

				return;
			}

			product.quantity = quantity;
			this.cartItems = [...this.cartItems, { ...product }];
			console.log('this.cartItems: ', this.cartItems);

			// toast.init('Toast example');
			// this.$vaToast.init('Toast example');
			toast.init({
				title: 'Success',
				dangerouslyUseHtmlString: true,
				color: 'success',
				message: `${quantity} <b>${product.name}</b> was added to the cart`,
			});
		},
	},
});
