import { useCartStore } from '~~/store/cart';
import AWN from 'awesome-notifications';

export default async function useHandlePaymentClient(
  mode = 'multiple',
  product = null,
  config
) {
  const notifier = new AWN({
    position: 'top-left',
  });
  const showSpinner = useState('showSpinner');
  try {
    let lineItems = null;
    const cartStore = useCartStore();

    if (mode === 'single') {
      lineItems = [product].map((item) => {
        return {
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: useTransformImgUrl(item.image[0].asset._ref, config),
        };
      });
    }
    if (mode === 'multiple') {
      // console.log('cartStore.getCartItems: ', cartStore.getCartItems);
      // debugger;
      lineItems = cartStore.getCartItems.map((item) => {
        // console.log('item: ', item);
        // debugger;
        return {
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: useTransformImgUrl(item.image[0].asset._ref, config),
        };
      });
    }

    const currency = 'usd';

    //! убрать
    // return;

    // showSpinner
    showSpinner.value = true;

    /**
     * * [connectWithStripe, getAllProductsFromStripe] */
    // const { data, error } = await usePaymentWithStripe(lineItems, currency);
    const data = await usePaymentWithStripe(lineItems, currency, config);

    // if (error.value) {
    //   throw new Error(`${error?.status}: ${error?.statusText}`);
    // }

    // console.log('data.value.url: ', data.value.url);
    cartStore.$reset();
    cartStore.clearLocalStorage();
    window.location.href = data.url;

    showSpinner.value = false;
  } catch (error) {
    console.error(error);
    showSpinner.value = false;
    notifier.alert('An error occurred, try again later');
  }
}
