<template>
  <span>
    <transition
      enter-class="panel_out"
      enter-to-class=""
      enter-active-class=""
      leave-class=""
      leave-to-class="panel_out"
      leave-active-class=""
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    >
      <div
        v-show="isVisible"
        ref="panel"
        class="panel"
        tabindex="-1"
        @keydown.esc="hide"
        @keydown.tab="trapFocus"
      >
        <div class="panel__inner">
          <button
            class="panel__close"
            type="button"
            aria-label="Close panel"
            @click="hide"
          >
            <v-icon name="close" />
          </button>
          <slot />
        </div>
      </div>
    </transition>
    <v-backdrop :visible="isVisible" @click="hide" />
  </span>
</template>

<script>
import popupMixin from '@/mixins/popup'

export default {
  name: 'Panel',
  mixins: [popupMixin],
  inheritAttrs: false,
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    visible: Boolean
  },
  data () {
    return {
      isVisible: this.visible,
      returnElement: null
    }
  },
  watch: {
    visible (value) {
      this.isVisible = value
    },
    isVisible (value) {
      this.$emit('change', value)
    }
  },
  mounted () {
    this.$root.$on('show::panel', this.show)
    this.$root.$on('hide::panel', this.hide)
  },
  beforeDestroy () {
    this.$root.$off('show::panel', this.show)
    this.$root.$off('hide::panel', this.hide)
  },
  methods: {
    show () {
      this.isVisible = true
    },
    hide () {
      this.isVisible = false
    },
    onBeforeEnter () {
      this.registerInstance()
      this.returnElement = document.activeElement
      this.emitEvent('show')
    },
    onEnter () {
      this.$refs.panel.scrollTop = 0
    },
    onAfterEnter () {
      this.setFocus()
      this.emitEvent('shown')
    },
    onBeforeLeave () {
      this.emitEvent('hide')
    },
    onLeave () {},
    onAfterLeave () {
      this.unregisterInstance()
      this.returnElement?.focus()
      this.emitEvent('hidden')
    },
    emitEvent (event) {
      this.$emit(event, this)
      this.$root.$emit(`panel::${event}`, this)
    },
    setFocus () {
      const active = document.activeElement
      const { panel } = this.$refs
      if (!panel.contains(active)) {
        panel.focus()
      }
    }
  }
}
</script>

<style lang="scss">
.panel {
  background-color: #ffffff;
  position: fixed;
  top: 0;
  right: 0;
  overflow-y: auto;
  width: 340px;
  max-width: 100%;
  height: 100%;
  z-index: z(fixed);
  transition: transform 0.2s easing(fast-out-slow-in);
  will-change: transform;
  box-shadow:
    0px 8px 10px -5px rgba(0, 0, 0, 0.2),
    0px 16px 24px 2px rgba(0, 0, 0, 0.14),
    0px 6px 30px 5px rgba(0, 0, 0, 0.12);

  &_out {
    transform: translateX(calc(100% + 35px));
  }

  &__inner {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    position: relative;
    padding: 30px;
  }

  &__close {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 100;
    cursor: pointer;
    border: none;
    background-color: transparent;
    color: #333333;
    font-size: 20px;
    padding: 0;
  }

  & ~ .backdrop {
    z-index: z(fixed) - 1;
  }
}

@include vue(v-panel) {
  display: none;
}
</style>
