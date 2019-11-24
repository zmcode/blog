module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: 'rgba(57,62,70,0.25098)',
    height: '2px'
  },
  /*
   ** Global CSS
   */
  css: ['iview/dist/styles/iview.css', '@/assets/css/app.css', '@/assets/css/input.less'],
  styleResources: {
    less: ['./assets/styles/variable.less', './assets/mixins/button.less']
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/iview',
    '@/plugins/filter',
    { src: '@/plugins/vue-mavon-editor', srr: false },
    { src: '@/plugins/v-viewer', srr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    // 根据不同的环境配置读取不一样的文件名
    [
      '@nuxtjs/dotenv',
      {
        filename:
          process.env.NODE_ENV === 'development'
            ? '.env'
            : `.env.${process.env.NODE_ENV}`
      }
    ]
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      pathRewrite: { '^/api': '' }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  server: {
    port: 5000 // default: 3000
  }
}
