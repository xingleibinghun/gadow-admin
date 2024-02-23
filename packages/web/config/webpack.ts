const path = require('path')

module.exports = {
  sourceRoot: 'src',
  alias: {
    '@': path.resolve(__dirname, '..', 'src')
  }
}
