export default {
  props: {
    mod: {
      type: [String, Array]
    }
  },
  computed: {
    modClasses () {
      const block = this.$options.block
      if (typeof block !== 'string') {
        return
      }
      const mods = this.mod ? [].concat(this.mod) : []
      return mods.map(m => block + '_' + m)
    }
  }
}
