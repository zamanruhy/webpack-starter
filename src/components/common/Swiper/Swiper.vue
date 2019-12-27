<template>
  <div class="swiper-container">
    <slot name="before-wrapper" />

    <div
      ref="wrapper"
      class="swiper-wrapper"
    >
      <slot />
    </div>

    <div
      v-if="pagination && computedOptions.pagination.el === '.swiper-pagination'"
      key="pagination"
      ref="pagination"
      class="swiper-pagination"
    ></div>

    <template v-if="navigation">
      <div
        v-if="computedOptions.navigation.prevEl === '.swiper-button-prev'"
        ref="prev"
        class="swiper-button-prev"
      >
        <slot name="prev" />
      </div>
      <div
        v-if="computedOptions.navigation.nextEl === '.swiper-button-next'"
        ref="next"
        class="swiper-button-next"
      >
        <slot name="next" />
      </div>
    </template>

    <div
      v-if="scrollbar && computedOptions.scrollbar.el === '.swiper-scrollbar'"
      key="scrollbar"
      ref="scrollbar"
      class="swiper-scrollbar"
    ></div>

    <slot name="after-wrapper" />
  </div>
</template>

<script>
import Vue from 'vue'
// import Swiper from 'swiper'
import 'swiper/css/swiper.css'

let Swiper

const DEFAULT_EVENTS = [
  'beforeDestroy',
  'slideChange',
  'slideChangeTransitionStart',
  'slideChangeTransitionEnd',
  'slideNextTransitionStart',
  'slideNextTransitionEnd',
  'slidePrevTransitionStart',
  'slidePrevTransitionEnd',
  'transitionStart',
  'transitionEnd',
  'touchStart',
  'touchMove',
  'touchMoveOpposite',
  'sliderMove',
  'touchEnd',
  'click',
  'tap',
  'doubleTap',
  'imagesReady',
  'progress',
  'reachBeginning',
  'reachEnd',
  'fromEdge',
  'setTranslate',
  'setTransition',
  'resize'
]

export default {
  name: 'Swiper',
  model: {
    prop: 'index',
    event: 'change'
  },
  props: {
    index: {
      type: Number,
      default: 0,
      validator: Number.isInteger
    },
    navigation: Boolean,
    pagination: Boolean,
    scrollbar: Boolean,
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      localIndex: this.index
    }
  },
  computed: {
    computedOptions () {
      let { pagination, navigation, scrollbar, ...plainOptions } = this.options
      return {
        ...plainOptions,
        pagination: this.pagination ? {
          el: '.swiper-pagination',
          type: 'bullets', // 'bullets', 'fraction', 'progressbar', 'custom'
          clickable: true,
          ...pagination,
          ...this.genPaginationFns()
        } : {},
        navigation: this.navigation ? {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          ...navigation
        } : {},
        scrollbar: this.scrollbar ? {
          el: '.swiper-scrollbar',
          ...scrollbar
        } : {}
      }
    }
  },
  watch: {
    index (value) {
      this.localIndex = value
    },
    localIndex (value) {
      this.$emit('change', value)
      // const val = (value + this.$children.length) % this.$children.length
      // this.swiper && this.swiper.slideToLoop(val)
      if (this.swiper && this.swiper.realIndex !== value) {
        this.swiper.slideToLoop(value)
      }
    }
  },
  async mounted () {
    const [swiper] = await Promise.all([
      import(
        /* webpackChunkName: "swiper" */
        /* webpackPreload: true */
        'swiper/js/swiper'
      ),
      this.$nextTick()
    ])
    // debugger
    Swiper = swiper.default || swiper
    this.mountInstance()
    this.$watch('computedOptions', this.updateInstance, { deep: true })
  },
  activated () {
    // console.log('swiper activated hook')
    this.update()
  },
  async updated () {
    await this.$nextTick()
    // console.log('swiper updated hook')
    this.update()
  },
  beforeDestroy () {
    this.destroyInstance()
  },
  methods: {
    mountInstance () {
      if (this.swiper) {
        return
      }
      this.swiper = new Swiper(this.$el, {
        ...this.computedOptions,
        initialSlide: this.localIndex
      })
      this.swiper.on('slideChange', () => {
        this.localIndex = this.swiper.realIndex
        // console.log('slideChange', this.localIndex, this.swiper.realIndex)
      })
      this.bindEvents()
    },
    bindEvents () {
      DEFAULT_EVENTS.forEach(eventName => {
        this.swiper.on(eventName, (...args) => {
          this.$emit(eventName, ...args)
          if (/[A-Z]/.test(eventName)) {
            this.$emit(eventName.replace(/([A-Z])/g, '-$1').toLowerCase(), ...args)
          }
        })
      })
    },
    destroyInstance () {
      if (this.swiper) {
        this.swiper.destroy()
        this.swiper = null
      }
    },
    updateInstance () {
      this.destroyInstance()
      this.mountInstance()
      // console.log('swiper instance updated')
    },
    update () {
      if (this.swiper) {
        this.swiper.update()
        this.swiper.navigation.update()
        this.swiper.pagination.render()
        this.swiper.pagination.update()
        if (this.swiper.params.loop) {
          this.swiper.loopDestroy()
          this.swiper.loopCreate()
        }
      }
    },
    renderControl (slot, props) {
      return new Vue({
        render: h => h('div', [this.$scopedSlots[slot](props)])
      }).$mount().$el.innerHTML
    },
    genPaginationFns () {
      const obj = {}
      if (this.$scopedSlots['bullet']) {
        obj.renderBullet = (index, className) => {
          return this.renderControl('bullet', { index, className })
        }
      }
      if (this.$scopedSlots['fraction']) {
        obj.renderFraction = (currentClass, totalClass) => {
          return this.renderControl('fraction', { currentClass, totalClass })
        }
      }
      if (this.$scopedSlots['progressbar']) {
        obj.renderProgressbar = (progressbarFillClass) => {
          return this.renderControl('progressbar', { progressbarFillClass })
        }
      }
      if (this.$scopedSlots['custom-pagination']) {
        obj.renderCustom = (swiper, current, total) => {
          return this.renderControl('custom-pagination', { swiper, current, total })
        }
      }
      return obj
    }
  }
}
</script>

<style lang="scss">
:root {
  --swiper-theme-color: #{$primary};
}
@include vue(v-swiper) {
  display: flex;
  overflow: hidden;
  margin: 0 auto;
}

@include vue(v-swiper-slide) {
  display: block;
  flex: none;
  width: 100%;
}
</style>
