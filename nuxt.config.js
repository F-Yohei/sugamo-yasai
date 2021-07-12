export default {
  ssr: false,
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'sugamo-yasai',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: './components/Loading.vue',
  // loadinf: {
  //   duration: 5000,
  // },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
      // { src: '~/assets/variables.scss', lang: 'scss' },
  ],
  router: {
    middleware: 'authenticator',
    base: '/app/'
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vee-validate',
    { src: '~/plugins/persistedstate.js', ssr: false},
    { src: '~/plugins/axios.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    '@nuxtjs/proxy',
    ['cookie-universal-nuxt', { parseJSON: false }],
    // 'nuxt-client-init-module'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    filenames: {
      app: ({ isDev }) => isDev ? '[name].[hash].js' : '[chunkhash].js',
      chunk: ({ isDev }) => isDev ? '[name].[hash].js' : '[chunkhash].js'
      },
    transpile: [
      "vee-validate/dist/rules"
    ],
    // hardSource: true
  },
  filenames: {
    app: ({ isDev }) => isDev ? '[name].[hash].js' : '[chunkhash].js',
    chunk: ({ isDev }) => isDev ? '[name].[hash].js' : '[chunkhash].js'
  },
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    treeShaking: true,
  },
  axios: {
    proxy: true,
    credentials: true
    },
  proxy: {
    // 会員登録
    // '/regist': {
    //   target: 'https://7zzrngqa0b.execute-api.us-east-2.amazonaws.com/DEV/user/regist',
    //   pathRewrite: {
    //     '^/regist': '/'
    //   }
    // },
    // 会員情報編集
    // '/profileEdit': {
    //   target: 'https://7zzrngqa0b.execute-api.us-east-2.amazonaws.com/DEV/user/edit',
    //   pathRewrite: {
    //     '^/profileEdit': '/'
    //   }
    // },
    // ログイン
    // '/userLogin': {
    //   target: 'https://7zzrngqa0b.execute-api.us-east-2.amazonaws.com/DEV/user/login',
    //   pathRewrite: {
    //     '^/userLogin': '/'
    //   }
    // },
    // ログアウト
    // '/userLogout': {
    //   target: 'https://7zzrngqa0b.execute-api.us-east-2.amazonaws.com/DEV/user/logout',
    //   pathRewrite: {
    //     '^/userLogout': '/'
    //   }
    // },
    // 商品データ取得
    // '/getList': {
    //   target: 'https://k6pv197at7.execute-api.us-east-2.amazonaws.com/DEV/itemprices/list?sort=date&order=desc&category=vegetables&page=2',
    //   pathRewrite: {
    //     '^/getList': '/'
    //   }
    // },
    // 商品情報登録
    // '/post': {
    //   target: 'https://k6pv197at7.execute-api.us-east-2.amazonaws.com/DEV/itemprices/post?shop_name=%E3%82%B7%E3%83%A7%E3%83%83%E3%83%97%E5%90%8D&item_name=%E3%82%AD%E3%83%A3%E3%83%99%E3%83%84&item_price=50&item_unit=%E5%80%8B',
    //   pathRewrite: {
    //     '^/post': '/'
    //   }
    // },
    // 商品情報編集
    // '/editPost': {
    //   target: 'https://k6pv197at7.execute-api.us-east-2.amazonaws.com/DEV/itemprices/edit',
    //   pathRewrite: {
    //     '^/editPost': '/'
    //   }
    // },
    // 投稿削除
    // '/delete': {
    //   target: 'https://k6pv197at7.execute-api.us-east-2.amazonaws.com/DEV/itemprices/delete',
    //   pathRewrite: {
    //     '^/delete': '/'
    //   }
    // },
    // ログイン中のユーザー情報をチェック
    // '/loginCheck': {
    //   target: 'https://7zzrngqa0b.execute-api.us-east-2.amazonaws.com/DEV/user/login_check',
    //   pathRewrite: {
    //     '^/loginCheck': '/'
    //   }
    // },
    // 会員退会
    // '/quit': {
    //   target: 'https://7zzrngqa0b.execute-api.us-east-2.amazonaws.com/DEV/user/quit',
    //   pathRewrite: {
    //     '^/quit': '/'
    //   }
    // }
  }
}
