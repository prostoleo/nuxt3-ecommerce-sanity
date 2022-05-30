import { useCartStore } from '~~/store/cart';

export default async function useHandlePaymentClient(
  mode = 'multiple',
  product = null
) {
  try {
    const showSpinner = useState('showSpinner');

    let lineItems = null;
    const cartStore = useCartStore();

    if (mode === 'single') {
      lineItems = [product].map((item) => {
        return {
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: useTransformImgUrl(item.image[0].asset._ref),
        };
      });
    }
    if (mode === 'multiple') {
      lineItems = cartStore.getCartItems.map((item) => {
        return {
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: useTransformImgUrl(item.image[0].asset._ref),
        };
      });
    }

    const currency = 'usd';

    // showSpinner
    showSpinner.value = true;

    /**
     * * [connectWithStripe, getAllProductsFromStripe] */
    const { data, error } = await usePaymentWithStripe(lineItems, currency);

    if (error.value) {
      throw new Error(`${error?.status}: ${error?.statusText}`);
    }

    console.log('data.value.url: ', data.value.url);
    cartStore.$reset();
    cartStore.clearLocalStorage();
    window.location.href = data.value.url;

    showSpinner.value = false;
  } catch (error) {
    console.error(error);
    showSpinner.value = false;
    notifier.alert('An error occurred, try again later');
  }
}
