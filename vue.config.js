module.exports = {
  outputDir: 'dist', //build输出目录
  assetsDir: 'assets', //静态资源目录（js, css, img）
  lintOnSave: false, //是否开启eslint
  devServer: {
    proxy: {
      '/hmu': {
        target: 'http://172.81.253.56:8090',
        changeOrigin: true,
        pathRewrite: {
          '^/hmu': '/hmu'
        }
      }
    }
  }
}
