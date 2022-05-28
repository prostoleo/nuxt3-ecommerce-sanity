export default async function useGetProductsFromStripe() {
  const config = useRuntimeConfig();

  const { data } = await useFetch(config.STRIPE_PRODUCTS, {
    method: 'POST',
    key: 'products-from-stripe',
    // pick: ['data'],
  });

  return data;
}
