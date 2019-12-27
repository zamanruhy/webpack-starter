// const webpack = require('webpack')
// const config = require('../webpack.config.prod.ssr')

class Plugin {
  constructor () {
    this.regex = /\.html$/

    // webpack(config, (err, stats) => {
    //   if (err) throw err
    //   console.log('__STATS__', require('../../dist/static/js/ssr'))
    //
    //   // console.log('__STATS__', stats.compilation.assets)
    //   // console.log('__CONFIG__', config)
    // })
  }
  apply (compiler) {
    const myData = {}

    compiler.hooks.compilation.tap('VueLoader', compilation => {
      // console.log('compilation.hash', compilation.hash)
      compilation.hooks.normalModuleLoader.tap('VueLoader', (ctx) => {
        ctx._myData = myData
      })
    })

    compiler.hooks.emit.tap('VueLoader', (compilation) => {
      const cnt = myData.toString()
      console.log(myData)
      compilation.assets['templates.txt'] = {
        source () {
          return cnt
        },
        size () {
          return cnt.length
        }
      }
    })

    compiler.hooks.emit.tapAsync('HelloWorldPlugin', (compilation, callback) => {
      // for (let filename in compilation.assets) {
      //   if (this.regex.test(filename)) {
      //     console.log(Object.keys(compilation.assets[filename]))
      //   }
      // }
      callback()
    })

    compiler.hooks.emit.tapAsync('HelloWorldPlugin', (compilation, callback) => {
      // console.log('Object.keys(compilation)', Object.keys(compilation))
      callback()
    })

    compiler.hooks.done.tap('HelloWorldPlugin', (stats) => {
      // console.log('stats.hasErrors()', stats.hasErrors())
    })
  }
}

module.exports = Plugin
