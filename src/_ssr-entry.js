import Vue from 'vue'
import App from './App'
import './directives'
// import '@/assets/scss/main.scss'
import { createRenderer } from 'vue-server-renderer'
const renderer = createRenderer()

// Components
const requireComponent = require.context('@/components', true, /\.vue$/)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = 'V' + fileName.replace(/^.+\/|\.\w+$/g, '')
  Vue.component(componentName, componentConfig.default || componentConfig)
})

// Vue.config.productionTip = false

/* eslint-disable-next-line no-new */
const app = new Vue({
  render: h => h(App)
})

renderer.renderToString(app).then(html => {
  console.log('__HTML__', html)
}).catch(err => {
  console.error(err)
})
