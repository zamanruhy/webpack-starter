<template>
  <transition
    enter-class=""
    enter-active-class="collapsing"
    enter-to-class=""
    leave-class=""
    leave-active-class="collapsing"
    leave-to-class=""
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @leave="onLeave"
    @after-leave="onAfterLeave"
  >
    <div
      :is="tag"
      v-show="isVisible"
      :id="id"
    >
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Collapse',
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    accordion: {
      type: String,
      default: ''
    },
    visible: Boolean,
    tag: {
      type: String,
      default: 'div'
    }
  },
  data () {
    return {
      isVisible: this.visible
    }
  },
  watch: {
    visible (value) {
      this.isVisible = value
    },
    isVisible () {
      this.emitChange()
    }
  },
  mounted () {
    if (this.id) {
      this.$root.$on('change::collapse', this.toggleHandler)
      if (this.accordion) {
        this.$root.$on('collapse::accordion', this.accordionHandler)
      }
    }
  },
  beforeDestroy () {
    if (this.id) {
      this.$root.$off('change::collapse', this.toggleHandler)
      if (this.accordion) {
        this.$root.$off('collapse::accordion', this.accordionHandler)
      }
    }
  },
  methods: {
    toggle () {
      this.isVisible = !this.isVisible
    },
    onEnter (el) {
      el.style.height = 0
      // eslint-disable-next-line
      el.offsetHeight
      el.style.height = el.scrollHeight + 'px'
      this.$emit('show')
    },
    onAfterEnter (el) {
      el.style.height = null
      this.$emit('shown')
    },
    onLeave (el) {
      el.style.height = el.scrollHeight + 'px'
      // eslint-disable-next-line
      el.offsetHeight
      el.style.height = 0
      this.$emit('hide')
    },
    onAfterLeave (el) {
      el.style.height = null
      this.$emit('hidden')
    },
    emitChange () {
      this.$emit('change', this.isVisible)
      if (this.id) {
        this.$root.$emit('collapse::change', this.id, this.isVisible)
        if (this.accordion && this.isVisible) {
          this.$root.$emit('collapse::accordion', this.id, this.accordion)
        }
      }
    },
    toggleHandler (id) {
      if (id === this.id) {
        this.toggle()
      }
    },
    accordionHandler (id, accordion) {
      if (id !== this.id && accordion === this.accordion) {
        this.isVisible = false
      }
    }
  }
}
</script>

<style lang="scss">
.collapsing {
  overflow: hidden;
  transition: height 0.3s easing(fast-out-slow-in);
}

@include vue(v-collapse) {
  &:not([visible]) {
    display: none;
  }
}
</style>
