<template>
  <teleport to="body">
    <div
      class="bg-backdrop bg-dark-800/60 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-100000"
      v-if="showSpinner"
    >
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
const showSpinner = useState('showSpinner', () => false);
</script>

<style lang="scss" scoped>
.bg-backdrop {
  --ripple-width: 80px;

  --initial-pos: 36px;
  --final-pos: 72px;

  --border-width: 4px;
  --multiplier: 1;
  --speed-anim: 1s;

  .lds-ripple {
    display: inline-block;
    position: relative;
    width: calc(var(--ripple-width, 80px) * var(--multiplier));
    height: calc(var(--ripple-width, 80px) * var(--multiplier));
  }
  .lds-ripple div {
    position: absolute;
    border: calc(var(--border-width, 4px) * var(--multiplier)) solid
      var(--clr-primary);
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple calc(var(--speed-anim) * var(--multiplier))
      cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes lds-ripple {
    0% {
      top: calc(var(--initial-pos, 36px) * var(--multiplier));
      left: calc(var(--initial-pos, 36px) * var(--multiplier));
      width: 0;
      height: 0;
      opacity: 0;
    }
    4.9% {
      top: calc(var(--initial-pos, 36px) * var(--multiplier));
      left: calc(var(--initial-pos, 36px) * var(--multiplier));
      width: 0;
      height: 0;
      opacity: 0;
    }
    5% {
      top: calc(var(--initial-pos, 36px) * var(--multiplier));
      left: calc(var(--initial-pos, 36px) * var(--multiplier));
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: calc(var(--final-pos, 72px) * var(--multiplier));
      height: calc(var(--final-pos, 72px) * var(--multiplier));
      opacity: 0;
    }
  }
}
</style>
