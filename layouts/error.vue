<template>
  <div>
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
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
