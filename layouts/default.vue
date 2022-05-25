<template>
  <Head>
    <HtmlAttrs lang="en" />
    <Script
      type="module"
      src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
    />
    <Script
      nomodule
      src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
    />
  </Head>
  <div
    class="layout min-h-screen grid"
    style="grid-template-rows: auto 1fr auto"
  >
    <header>
      <Navbar />
    </header>
    <main class="main-container">
      <slot />
    </main>
    <footer>
      <Footer />
    </footer>
    <BaseSpinner />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
