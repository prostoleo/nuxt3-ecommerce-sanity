export default async function usePaymentWithStripe(
  lineItems,
  currency = 'usd'
) {
  if (lineItems.length === 0 || !currency) {
    return;
  }

  const config = useRuntimeConfig();
  console.log('config: ', config);

  const { data, error } = await useFetch(config.STRIPE_PAYMENTS, {
    method: 'POST',
    headers: {
      // 'Access-Control-Origin': '*',
    },
    key: 'payment-with-stripe',
    // pick: ['data'],
    server: false,
    body: {
      lineItems,
      currency,
    },
  });

  if (error) {
    throw new Error(error.value);
  }

  return {
    data,
    error,
  };
}
