module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  axios: {
    proxy: true
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        logLevel: 'debug',
      },
    }
  }
}
