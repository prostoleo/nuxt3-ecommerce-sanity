<template>
  <Head>
    <Script
      type="module"
      src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
    />
    <Script
      nomodule
      src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
    />
  </Head>
  <div class="w-full min-h-screen grid place-items-center">
    <div>
      <h1 v-if="error.statusCode === 404">Oops, this page is not found 😞</h1>
      <h1 v-else>Oops, some error occurred 😞</h1>
      <button class="btn !max-w-full">
        <NuxtLink to="/" class="flex items-center justify-center gap-3"
          ><ion-icon name="home"></ion-icon> Home
        </NuxtLink>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['error']);
</script>

<style lang="scss" scoped></style>
