'use strict'

const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const prodConfig = require('./webpack.config.base')

const config = merge(prodConfig, {
  entry: {
    ssr: './src/ssr-entry.js'
  },
  target: 'node',

  // node: {
  //   fs: 'empty',
  //   module: 'empty'
  // },

  output: {
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'css-loader',
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './src/assets/scss/settings.scss'
            }
          }
        ]
      }
    ]
  }
})

// console.log(config.module.rules)

module.exports = config
