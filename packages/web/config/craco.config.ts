const { ESLINT_MODES, loaderByName } = require('@craco/craco')
const webpack = require('./webpack')
const CracoLessPlugin = require('craco-less')

module.exports = {
  reactScriptsVersion: 'react-scripts',
  eslint: {
    mode: ESLINT_MODES.file
  },
  webpack,
  plugins: [
    /**
     * CSS / Less Modules
     */
    {
      plugin: CracoLessPlugin,
      options: {
        modifyLessRule(lessRule: any) {
          // You have to exclude these file suffixes first,
          // if you want to modify the less module's suffix
          lessRule.exclude = /(?<!\.g)\.less$/
          return lessRule
        },
        modifyLessModuleRule(lessModuleRule: any) {
          // Configure the file suffix
          lessModuleRule.test = /(?<!\.g)\.less$/

          // Configure the generated local ident name.
          const cssLoader = lessModuleRule.use.find(loaderByName('css-loader'))
          cssLoader.options.modules = {
            localIdentName: '[local]_[hash:base64:5]'
          }

          return lessModuleRule
        }
      }
    }
  ]
}
