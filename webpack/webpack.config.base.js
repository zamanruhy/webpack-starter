'use strict'

const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const RemoveAssetsPlugin = require('./plugins/remove-assets')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: resolve('src/main.js')
  },
  output: {
    path: resolve('dist'),
    filename: 'static/js/[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      vue$: 'vue/dist/vue.common.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true,
          emitError: true
        }
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['cache-loader', 'babel-loader']
      },
      {
        test: /\.svg$/,
        include: resolve('src/assets/svg'),
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]',
              extract: true,
              spriteFilename: 'static/img/sprite.svg'
            }
          },
          'svgo-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
        exclude: resolve('src/assets/svg'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/img/[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: { disable: isDev }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'static/fonts/[name].[ext]'
        }
      },
      {
        test: /\.(hbs|handlebars)$/,
        loader: 'handlebars-loader',
        options: {
          partialDirs: [
            resolve('src/pages/layouts'),
            resolve('src/components')
          ],
          inlineRequires: /\/img\//
        }
      },
      {
        test: /\.txt$/,
        use: {
          loader: path.resolve(__dirname, './plugins/loader.js'),
          options: {
            name: 'Ruslan'
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([{
      from: resolve('public'),
      to: resolve('dist')
    }]),
    ...genHtmlWebpackPlugin(),
    new SpriteLoaderPlugin({
      plainSprite: true,
      spriteAttrs: {
        style: 'position: absolute; width: 0; height: 0'
      }
    }),
    new RemoveAssetsPlugin(),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
      // preload: {
      //   test: /swiper/,
      //   chunks: 'async'
      // }
    })
  ]
}

function genHtmlWebpackPlugin () {
  const dir = resolve('src/pages')
  return fs.readdirSync(dir)
    .filter(file => /\.hbs$/.test(file))
    .map(file => {
      const { name } = path.parse(file)
      return new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: path.join(dir, file),
        inject: 'head',
        minify: false
      })
    })
}
