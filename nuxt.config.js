const pkg = require('./package')
import { getConfigForKeys } from './lib/config'

const ctfConfig = getConfigForKeys([
  'CTF_PERSON_ID',
  'CTF_BLOG_POST_TYPE_ID',
  'CTF_SPACE_ID',
  'CTF_CDA_ACCESS_TOKEN'
])
const { createClient } = require('./plugins/contentful')
const cdaClient = createClient(ctfConfig)

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'google-site-verification', content: 'ovt_lN-nWSpczoxufhCRaxsLHfoPhObprf5b0qWsMDk' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon-180x180.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/earlyaccess/sawarabimincho.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/earlyaccess/sawarabigothic.css' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },

  /*
  ** Global CSS
  */
  css: [
    '~assets/sass/global.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/contentful' }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    [
      'nuxt-sass-resources-loader',
      [
        '@/assets/sass/foundation/_variables.scss',
        '@/assets/sass/foundation/_mixin.scss'
      ]
    ],
    ['@nuxtjs/google-analytics', {
      id: 'UA-128207306-1'
    }]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
  },

  generate: {
    routes() {
      return cdaClient.getEntries({
        'content_type': ctfConfig.CTF_BLOG_POST_TYPE_ID
      }).then(entries => {
        return [
          ...entries.items.map(entry => `/blog/${entry.fields.slug}`)
        ]
      })
    }
  },

  env: {
    CTF_PERSON_ID: ctfConfig.CTF_PERSON_ID,
    CTF_SPACE_ID: ctfConfig.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: ctfConfig.CTF_CDA_ACCESS_TOKEN,
    CTF_BLOG_POST_TYPE_ID: ctfConfig.CTF_BLOG_POST_TYPE_ID
  }
}
