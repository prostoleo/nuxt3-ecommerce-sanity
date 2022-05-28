export default function useTransformImgUrl(imgRef) {
  const config = useRuntimeConfig();
  // const img = item.image[0].asset._ref;
  const imagePath = imgRef.replace(
    'image-',
    `https://cdn.sanity.io/images/${config.SANITY_PROJECT_ID}/production/`
  );
  // .replace('-webp', '.webp');

  const indexOfLastHyphen = imagePath.lastIndexOf('-');

  const imgPathWithoutExtension = imagePath.slice(0, indexOfLastHyphen);

  const imgExtension = imagePath.slice(indexOfLastHyphen + 1);

  return `${imgPathWithoutExtension}.${imgExtension}`;
}
