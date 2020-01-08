import Vue from 'vue'
import './directives'

// Styles
import '@/assets/scss/main.scss'
const requireStyle = require.context('@/components', true, /\.scss$/)
requireStyle.keys().forEach(requireStyle)

// Pages
if (process.env.NODE_ENV === 'development') {
  const requirePage = require.context('@/pages', true, /\.hbs$/)
  requirePage.keys().forEach(requirePage)
  const requireCompView = require.context('@/components', true, /\.hbs$/)
  requireCompView.keys().forEach(requireCompView)
}

// Components
const requireComponent = require.context('@/components', true, /\.vue$/)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = 'V' + fileName.replace(/^.+\/|\.\w+$/g, '')
  Vue.component(componentName, componentConfig.default || componentConfig)
});

Vue.config.productionTip = false

console.time('mounted')
new Vue({
  mounted () {}
}).$mount('#app')
console.timeEnd('mounted')
