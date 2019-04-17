const webpack = require('webpack')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.6/css/swiper.min.css'}
    ],
    script: [
      {src: 'http://api.map.baidu.com/api?v=2.0&ak=OxAEbfrVXXqWUSC4nP8mYi3bTKRBcP6u'},
      {src: "https://s5.cnzz.com/z_stat.php?id=1276056855&web_id=1276056855"},
      {src: "https://hm.baidu.com/hm.js?cb144eff83e6ad0766f74e5b302b0bdd"},
      {src: "https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.6/js/swiper.min.js"}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  plugins: [
    '~/plugins/element-ui',
    '~/plugins/youmeng'
  ],
  //全局css
  css:[
    '~assets/css/base.css',
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*关闭ESLint
    ** Run ESLint on save
    */
    // extend (config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
    vendor: [
      'axios',
      'element-ui'
    ],
    postcss: [
      require('autoprefixer')({
        browsers: ['last 3 versions']
      })
    ],
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery'
      })
    ]
  }
}

