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
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [],

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
    '@nuxtjs/dotenv'
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
