<template>
  <div class="swiper-slide">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SwiperSlide',
  mounted () {
    // console.log('swiper-slide mounted hook')
    // if (this.$parent.optionsComputed.loop) {
    //   console.log('looped')
    //   this.updateParentInstance()
    // }
  },
  updated () {
    // console.log('swiper-slide updated hook')
    // this.updateParent()
  },
  methods: {
    // updateParent () {
    //   if (this.$parent && this.$parent.swiper) {
    //     this.$parent.update()
    //   }
    // },
    // updateParentInstance: debounce(function () {
    //   if (this.$parent && this.$parent.swiper) {
    //     this.$parent.updateInstance()
    //   }
    // }, 10)
  }
}
</script>
