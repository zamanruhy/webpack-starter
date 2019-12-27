class RemoveAssetsPlugin {
  constructor () {
    this.regex = /sprite\.svg/
  }
  apply (compiler) {
    compiler.hooks.emit.tapAsync('RemoveAssetsPlugin', (compilation, callback) => {
      for (let filename in compilation.assets) {
        if (this.regex.test(filename)) {
          delete compilation.assets[filename]
        }
      }
      callback()
    })
  }
}

module.exports = RemoveAssetsPlugin
