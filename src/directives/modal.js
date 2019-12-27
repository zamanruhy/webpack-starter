export default {
  bind (el, binding, vnode) {
    const id = Object.keys(binding.modifiers || {})[0]

    if (!id) {
      return
    }

    el.addEventListener('click', (e) => {
      e.preventDefault()
      vnode.context.$root.$emit('show::modal', id)
    })
  }
}
