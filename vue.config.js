const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
      ? '/vue-pwa/'
      : '/',
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/_common.scss";'
      }
    }
  }
})
