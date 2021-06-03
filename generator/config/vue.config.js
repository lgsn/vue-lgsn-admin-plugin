module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/index.scss";`
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://xxxxx.xxxxx.com/',
        changeOrigin: true
      }
    }
  }
}
