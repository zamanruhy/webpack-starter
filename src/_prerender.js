const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()

const app = new Vue({
  data: {
    url: 'req.url'
  },
  template: `<div>The visited URL is: {{ url }}</div>`
})

renderer.renderToString(app).then(html => {
  console.log(html)
}).catch(err => {
  console.error(err)
})
