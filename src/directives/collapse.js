import { addClass, removeClass } from '../utils/dom'

const KEY = '__v-collapse__'

export default {
  bind (el, binding, vnode) {
    const ids = Object.keys(binding.modifiers || {})

    if (ids.length === 0) {
      return
    }

    const collapsedClass = 'collapsed'
    const expandedClass = 'expanded'

    el.addEventListener(binding.arg || 'click', (event) => {
      event.preventDefault()
      ids.forEach(id => {
        vnode.context.$root.$emit('change::collapse', id)
      })
    })

    el[KEY] = (id, visible) => {
      if (ids.indexOf(id) > -1) {
        if (visible) {
          removeClass(el, collapsedClass)
          addClass(el, expandedClass)
        } else {
          addClass(el, collapsedClass)
          removeClass(el, expandedClass)
        }
      }
    }

    vnode.context.$root.$on('collapse::change', el[KEY])
  },
  unbind (el, binding, vnode) {
    if (el[KEY]) {
      vnode.context.$root.$off('collapse::change', el[KEY])
      el[KEY] = null
    }
  }
}
