<template>
  <Portal
    v-if="!isHidden"
    :disabled="isHidden"
    selector="#modal-portal"
  >
    <div
      :id="id"
      ref="modal"
      class="modal"
      :class="modalClasses"
      :style="modalStyles"
      @click="onClickOut"
      @keydown.esc="onEsc"
    >
      <transition
        enter-class="modal__dialog_out"
        enter-to-class=""
        enter-active-class=""
        leave-class=""
        leave-to-class="modal__dialog_out"
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
          class="modal__dialog"
        >
          <div
            ref="content"
            class="modal__content"
            tabindex="-1"
            @keydown.tab="trapFocus"
          >
            <button
              class="modal__close"
              type="button"
              aria-label="Close modal"
              @click="hide"
            >
              <Icon name="close" />
            </button>
            <slot />
          </div>
        </div>
      </transition>
    </div>
    <Backdrop :visible="isVisible" @click="onClickOut" />
  </Portal>
</template>

<script>
import popupMixin from '@/mixins/popup'
import { Portal } from '@linusborg/vue-simple-portal'
import Backdrop from './Backdrop'
import Icon from './Icon'

export default {
  name: 'Modal',
  components: {
    Portal,
    Backdrop,
    Icon
  },
  mixins: [popupMixin],
  inheritAttrs: false,
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    visible: Boolean,
    noStack: Boolean,
    noCloseOnBackdrop: Boolean,
    noCloseOnEsc: Boolean,
    variant: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isHidden: true,
      isVisible: false,
      isTransitioning: false,
      isModalOverflowing: false,
      returnElement: null
    }
  },
  computed: {
    modalClasses () {
      return {
        [`modal_${this.variant}`]: !!this.variant
      }
    },
    modalStyles () {
      return {
        paddingLeft: this.isModalOverflowing ? `${this.scrollbarWidth}px` : ''
      }
    }
  },
  watch: {
    visible (value) {
      this[value ? 'show' : 'hide']()
    },
    isVisible (value) {
      if (value) {
        const { modal } = this.$refs
        const { zIndex } = getComputedStyle(modal)
        modal.parentElement.style.position = 'absolute'
        modal.parentElement.style.zIndex = zIndex
      }
    }
  },
  mounted () {
    this.$root.$on('show::modal', this.showHandler)
    this.$root.$on('hide::modal', this.hideHandler)
    this.$root.$on('modal::show', this.modalListener)
    if (this.visible) {
      this.show()
    }
  },
  beforeDestroy () {
    this.$root.$off('show::modal', this.showHandler)
    this.$root.$off('hide::modal', this.hideHandler)
    this.$root.$off('modal::show', this.modalListener)
  },
  methods: {
    show () {
      if (this.isVisible) {
        return
      }
      this.returnElement = document.activeElement
      if (this.modals.length) {
        if (this.noStack) {
          this.returnElement = this.modals[0].returnElement
          this.modals.forEach(m => m.hide())
        } else if (this.modals[0].noStack) {
          this.returnElement = this.modals[0].returnElement
        }
      }
      this.emitEvent('show')
      this.isHidden = false
      this.$nextTick(() => {
        this.isVisible = true
        this.$emit('change', true)
        this.$nextTick(this.observeDom)
      })
    },
    hide () {
      if (!this.isVisible) {
        return
      }
      this.emitEvent('hide')
      this.unobserveDom()
      this.isVisible = false
      this.$emit('change', false)
    },
    onBeforeEnter () {
      this.registerInstance()
      this.isTransitioning = true
      this.setResizeEvent(true)
    },
    onEnter () {
      this.checkModalOverflow()
    },
    onAfterEnter () {
      this.isTransitioning = false
      this.$nextTick(() => {
        this.setFocus()
        this.emitEvent('shown')
      })
    },
    onBeforeLeave () {
      this.isTransitioning = true
      this.setResizeEvent(false)
    },
    onLeave () {},
    onAfterLeave () {
      this.unregisterInstance()
      this.isTransitioning = false
      this.isHidden = true
      this.$nextTick(() => {
        this.returnElement?.focus()
        this.emitEvent('hidden')
      })
    },
    emitEvent (event) {
      this.$emit(event, this)
      this.$root.$emit(`modal::${event}`, this)
    },
    onClickOut (event) {
      if (
        !this.noCloseOnBackdrop &&
        !this.$refs.content.contains(event.target)
      ) {
        this.hide()
      }
    },
    onEsc () {
      if (!this.noCloseOnEsc) {
        this.hide()
      }
    },
    setFocus () {
      const active = document.activeElement
      const { content } = this.$refs
      if (!content.contains(active)) {
        content.focus()
        this.$refs.modal.scrollTop = 0
      }
    },
    setResizeEvent (on) {
      if (on) {
        window.addEventListener('resize', this.checkModalOverflow)
        window.addEventListener('orientationchange', this.checkModalOverflow)
      } else {
        window.removeEventListener('resize', this.checkModalOverflow)
        window.removeEventListener('orientationchange', this.checkModalOverflow)
      }
    },
    checkModalOverflow () {
      if (this.isVisible) {
        const modal = this.$refs.modal
        this.isModalOverflowing = modal.scrollHeight > document.documentElement.clientHeight
      }
    },
    observeDom () {
      this._observer = new MutationObserver(mutations => {
        let changed = false
        for (let i = 0; i < mutations.length && !changed; i++) {
          const mutation = mutations[i]
          const type = mutation.type
          const target = mutation.target

          if (type === 'characterData' && target.nodeType === Node.TEXT_NODE) {
            changed = true
          } else if (type === 'attributes') {
            changed = true
          } else if (
            type === 'childList' &&
            (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)
          ) {
            changed = true
          }
        }
        if (changed) {
          this.checkModalOverflow()
        }
      }).observe(this.$refs.content, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['style', 'class']
      })
    },
    unobserveDom () {
      if (this._observer) {
        this._observer.disconnect()
        this._observer = null
      }
    },
    showHandler (id) {
      if (id === this.id) {
        this.show()
      }
    },
    hideHandler (id) {
      if (id === this.id) {
        this.hide()
      }
    },
    modalListener (instance) {
      if (this.noStack && instance !== this) {
        this.hide()
      }
    }
  }
}
</script>

<style lang="scss">
$modal-transition: 0.3s easing(fast-in-fast-out);
$modal-padding-y: 30px;

.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: z(modal);

  &__dialog {
    margin: $modal-padding-y auto;
    min-height: calc(100% - #{$modal-padding-y} * 2);
    width: 100%;
    display: flex;
    align-items: center;
    transition: $modal-transition;
    transition-property: opacity, transform;
    will-change: opacity, transform;

    &_out {
      transform: scale(0.9, 0.85);
      opacity: 0;
    }
  }

  &__content {
    margin: auto;
    position: relative;
    background-color: #ffffff;
    box-shadow:
      0px 11px 15px -7px rgba(0, 0, 0, 0.2),
      0px 24px 38px 3px rgba(0, 0, 0, 0.14),
      0px 9px 46px 8px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    max-width: 100%;
    padding: 40px 40px 40px;
    outline: 0;
    width: 720px;
  }

  &__close {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 100;
    cursor: pointer;
    border: none;
    background-color: transparent;
    color: #333333;
    font-size: 20px;
    padding: 0;
  }
}

@include vue(v-modal) {
  display: none;
}
</style>
