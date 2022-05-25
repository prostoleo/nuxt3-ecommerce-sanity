// import { useSanity } from '@nuxtjs/sanity/dist/runtime/composables';
// import { onMounted } from '#app/nuxt';

export default async function useGetAllProductsPaths() {
  const query = '*[_type == "product"]';

  const res = onMounted(async () => {
    const sanity = useSanity();

    const { data } = async () => await sanity.fetch(query);
    console.log('data: ', data);
    return data;
  });

  return res;
}

// useGetAllProductsPaths();
