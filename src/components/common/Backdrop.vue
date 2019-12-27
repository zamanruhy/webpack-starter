<template>
  <transition
    enter-class="backdrop_out"
    enter-active-class=""
    enter-to-class=""
    leave-class=""
    leave-active-class=""
    leave-to-class="backdrop_out"
  >
    <div
      v-if="visible"
      class="backdrop"
      v-on="$listeners"
    />
  </transition>
</template>

<script>
export default {
  name: 'Backdrop',
  props: {
    visible: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss">
$backdrop-transition: 0.3s easing(swing);

.backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: z(backdrop);
  background-color: #212121;
  opacity: 0.46;
  /*transition: opacity 0.4s cubic-bezier(0.35, 0, 0.25, 1);*/
  transition: opacity $backdrop-transition;
  will-change: opacity;

  &_out {
    opacity: 0;
  }
}
</style>
