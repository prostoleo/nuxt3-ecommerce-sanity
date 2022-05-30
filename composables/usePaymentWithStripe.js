export default async function usePaymentWithStripe(
  lineItems,
  currency = 'usd'
) {
  if (lineItems.length === 0 || !currency) {
    return;
  }

  const config = useRuntimeConfig();

  const { data, error } = await useFetch(config.STRIPE_PAYMENTS, {
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
  }

  return {
    data,
    error,
  };
}
