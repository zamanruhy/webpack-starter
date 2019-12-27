const popups = []

export default {
  data () {
    return {
      scrollbarWidth: 0,
      isBodyOverflowing: false,
      popups
    }
  },
  computed: {
    modals () {
      return this.popups
        .filter(p => p.$options.name === 'Modal')
    }
  },
  mounted () {
    this.getScrollbarWidth()
  },
  beforeDestroy () {
    this.unregisterInstance()
  },
  methods: {
    registerInstance () {
      if (popups.indexOf(this) === -1) {
        popups.push(this)
      }
      if (popups.length === 1) {
        this.checkScrollbar()
        this.setScrollbar()
        document.body.style.overflow = 'hidden'
      } else {
        this.isBodyOverflowing = popups[0].isBodyOverflowing
      }
    },
    unregisterInstance () {
      popups.splice(popups.indexOf(this), 1)
      if (popups.length === 0) {
        this.resetScrollbar()
        document.body.style.overflow = ''
      }
    },
    checkScrollbar () {
      const { left, right } = document.body.getBoundingClientRect()
      this.isBodyOverflowing = left + right < window.innerWidth
    },
    getScrollbarWidth () {
      const scrollDiv = document.createElement('div')
      scrollDiv.style.cssText = `
                width: 100px;
                height: 100px;
                position: absolute;
                overflow: scroll;
                top: -9999px`
      document.body.appendChild(scrollDiv)
      this.scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth
      document.body.removeChild(scrollDiv)
    },
    setScrollbar () {
      if (!this.isBodyOverflowing) {
        return
      }
      this.offsetElements().forEach(el => {
        const offset = el.getAttribute('data-fixed') || 'padding'
        const actual = el.style[`${offset}Right`]
        const computed = getComputedStyle(el)[`${offset}Right`]
        el.setAttribute(`data-${offset}-right`, actual)
        el.style[`${offset}Right`] = parseFloat(computed) + this.scrollbarWidth + 'px'
      })
    },
    resetScrollbar () {
      if (!this.isBodyOverflowing) {
        return
      }
      this.offsetElements().forEach(el => {
        const offset = el.getAttribute('data-fixed') || 'padding'
        el.style[`${offset}Right`] = el.getAttribute(`data-${offset}-right`)
        el.removeAttribute(`data-${offset}-right`)
      })
    },
    offsetElements () {
      return [].slice.call(
        document.querySelectorAll('[data-fixed]')
      ).concat(document.body)
    },
    getFocusable (node) {
      const selector = [
        'button',
        '[href]',
        'input',
        'select',
        'textarea',
        '[tabindex]',
        '[contenteditable]'
      ]
        .map(s => `${s}:not(:disabled):not([disabled])`)
        .join(', ')
      return Array.from(node.querySelectorAll(selector))
        .filter(i => i.tabIndex > -1 && !i.disabled)
    },
    trapFocus (event) {
      const focusable = this.getFocusable(event.currentTarget)
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement

      if (focusable.length === 0) {
        event.preventDefault()
        return
      }

      if (event.shiftKey) {
        if (active === first || active === event.currentTarget) {
          last.focus()
          event.preventDefault()
        }
      } else {
        if (active === last) {
          first.focus()
          event.preventDefault()
        }
      }
    }
  }
}
