<template>
  <transition name="to-top">
    <button
      v-show="visible"
      class="to-top"
      type="button"
      aria-label="Scroll to top"
      data-fixed="margin"
      @click="onClick"
    >
      <v-icon name="house" class="to-top__icon" />
    </button>
  </transition>
</template>

<script>
export default {
  name: 'ToTop',
  data () {
    return {
      visible: false,
      offset: 600
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll () {
      this.visible = window.pageYOffset > this.offset
    },
    onClick () {
      this.smoothScroll()
    },
    smoothScroll () {
      let currentScroll = window.pageYOffset
      if (currentScroll > 0) {
        window.requestAnimationFrame(this.smoothScroll)
        window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
      }
    }
  }
}
</script>

<style lang="scss">
.to-top {
  font-size: 16px;
  width: 60px;
  height: 60px;
  background-color: $primary;
  border-radius: 50%;
  position: fixed;
  border: none;
  right: 40px;
  bottom: 40px;
  z-index: z(sticky) - 1;
  transition: opacity $transition;
  cursor: pointer;
  color: #ffffff;

  @include down(md) {
    width: 55px;
    height: 55px;
    right: 20px;
    bottom: 20px;
  }

  &.to-top-enter,
  &.to-top-leave-to {
    opacity: 0;
  }
}
</style>
