'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const VuePlugin = require('./plugins/vue')

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: 'static/js/[name].js?[contenthash:8]',
    publicPath: ''
  },
  optimization: {
    // runtimeChunk: 'single',
    splitChunks: {
      automaticNameDelimiter: '.',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/].+\.js$/,
          name: 'vendors',
          chunks: 'initial'
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        extractComments: false
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', {
            discardComments: { removeAll: true }
          }]
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../../' }
          },
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
      },
      {
        test: /\.vue$/,
        loader: path.resolve(__dirname, './loaders/vue.js')
        // enforce: 'pre'
      }
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css?[contenthash:8]'
    }),
    // new CompressionPlugin({
    //   algorithm: 'gzip',
    //   test: /\.(js|css)(\?.*)?$/,
    //   threshold: 10240,
    //   minRatio: 0.8
    // }),
    new HtmlBeautifyPlugin({
      config: {
        html: {
          indent_size: 2,
          indent_with_tabs: false,
          indent_inner_html: true,
          preserve_newlines: true,
          end_with_newline: true,
          unformatted: ['svg']
          // unformatted: ['p', 'i', 'b', 'span']
        }
      },
      replace: [' type="text/javascript"']
    }),
    new VuePlugin()
  ].concat(
    process.env.BUNDLE_ANALYZE ? new BundleAnalyzerPlugin() : []
  )
})
