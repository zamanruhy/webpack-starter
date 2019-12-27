const path = require('path')
const compiler = require('vue-template-compiler')
// const { getOptions } = require('loader-utils')

module.exports = function loader (source) {
  // const options = getOptions(this)
  const { name } = path.parse(this.resourcePath)

  // source = source.replace(/\[name\]/g, options.name)

  // console.log(name)

  this._myData[name] = compiler.compile(source).ast

  return `module.exports = ${source}`
}
