export default async function usePaymentWithStripe(
  lineItems,
  currency = 'usd',
  config
) {
  // const config = useRuntimeConfig();
  console.log('config: ', config);
  try {
    if (lineItems.length === 0 || !currency || !config) {
      throw new Error(`neccessary data is not provided`);
      return;
    }

    /* const { data, error } = await useFetch(config.STRIPE_PAYMENTS, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      key: 'payment-with-stripe',
      body: JSON.stringify({
        lineItems,
        currency,
        successUrl: `${window.location.href}?paymentSuccess=true`,
        cancelUrl: `${window.location.href}?paymentSuccess=false`,
      }),
    });
  
    if (error.value) {
      throw new Error(error.value);
    } */
    console.log('config.STRIPE_PAYMENTS: ', config.STRIPE_PAYMENTS);

    const response = await fetch(config.STRIPE_PAYMENTS, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({
        lineItems,
        currency,
        successUrl: `${window.location.href}?paymentSuccess=true`,
        cancelUrl: `${window.location.href}?paymentSuccess=false`,
      }),
    });
    console.log('response: ', response);

    const result = await response.json();

    if (!response.ok) {
      throw new Error(`payment failed`);
    }

    return result;
  } catch (error) {
    console.error(error);

    throw error;
  }
}
