import { defineStore } from 'pinia';

export const useCartStore = defineStore({
  id: 'cart-store',
  state: () => {
    return {
      showCart: false,
      // cartItems: [],
      cartItems:
        JSON.parse(localStorage.getItem('cool-headphones-cart-items')) ?? [],
      // totalPrice: 0,
      // totalQuantities: 0,
      // qty: 1,
      qty: JSON.parse(localStorage.getItem('cool-headphones-cart-qty')) ?? 1,
    };
  },
  getters: {
    getShowCart: (state) => {
      return state.showCart;
    },
    getCartItems: (state) => {
      localStorage.setItem(
        'cool-headphones-cart-items',
        JSON.stringify(state.cartItems)
      );
      return state.cartItems;
    },
    getTotalPrice: (state) => {
      // return state.totalPrice;
      const totalPrice = state.cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
      console.log('totalPrice: ', totalPrice);

      return totalPrice;
    },
    getTotalQuantities: (state) => {
      // return state.totalQuantities;
      const totalQuantites = state.cartItems.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0);
      console.log('totalQuantites: ', totalQuantites);

      return totalQuantites;
    },
    getQty: (state) => {
      localStorage.setItem(
        'cool-headphones-cart-qty',
        JSON.stringify(state.qty)
      );
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

    decreaseQtyOnProdId(id) {
      this.cartItems = this.cartItems.map((item) => {
        if (item._id !== id) return item;

        if (item.quantity === 1) return item;

        item.quantity--;
        return item;
      });
    },
    increaseQtyOnProdId(id) {
      this.cartItems = this.cartItems.map((item) => {
        if (item._id !== id) return item;

        item.quantity++;
        return item;
      });
    },

    removeProdOnId(id) {
      this.cartItems = this.cartItems.filter((item) => {
        return item._id !== id;
      });
    },

    toggleShowCart(newState) {
      // const newShowCart = ;
      this.showCart = newState;
    },

    addProductToCart(product, quantity) {
      const isProductInCart = this.cartItems.some((p) => p._id === product._id);
      console.log('isProductInCart: ', isProductInCart);

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

        return;
      }

      product.quantity = quantity;
      this.cartItems = [...this.cartItems, { ...product }];
      console.log('this.cartItems: ', this.cartItems);
    },

    clearLocalStorage() {
      localStorage.removeItem('cool-headphones-cart-items');
      localStorage.removeItem('cool-headphones-cart-qty');
    },

    // async goToCheckout() {},
  },
});
