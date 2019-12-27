import Vue from 'vue'

const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
}

const reactor = new Vue({
  data () {
    return {
      mq: {},
      above_: {},
      below_: {}
    }
  },
  created () {
    Vue.util.extend(this.mq, {
      below: (value) => {
        if (!this.below_.hasOwnProperty(value)) {
          listenToMatchMedia(`(max-width: ${value - 1}px)`, (matches) => {
            Vue.set(this.below_, value, matches)
          })
        }
        return this.below_[value]
      },
      above: (value) => {
        if (!this.above_.hasOwnProperty(value)) {
          listenToMatchMedia(`(min-width: ${value}px)`, (matches) => {
            Vue.set(this.above_, value, matches)
          })
        }
        return this.above_[value]
      }
    })
  }
})

Object.keys(breakpoints).forEach((bp) => {
  const width = breakpoints[bp]
  const query = `(min-width: ${width}px)`
  const enter = (matches) => {
    Vue.set(reactor.mq, `${bp}AndUp`, matches)
    Vue.set(reactor.mq, `${bp}AndDown`, !matches)
  }
  listenToMatchMedia(query, enter)
})

function listenToMatchMedia (query, enter) {
  const mql = window.matchMedia(query)
  const cb = ({ matches }) => {
    enter(matches)
  }
  mql.addListener(cb)
  cb(mql)
}

export default {
  computed: {
    $mq () {
      return reactor.mq
    }
  }
}
