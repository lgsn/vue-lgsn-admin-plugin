const webpack = require('webpack')

module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugin('ignore').use(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /^\.\/(zh-cn|vi)$/i))
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/styles/global";`
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true
      }
    }
  }
}
