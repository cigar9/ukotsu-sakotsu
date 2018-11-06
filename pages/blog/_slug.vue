<template>
  <article class="p-article">
    <h1 class="p-article__ttl c-heading">{{ post.fields.title }}</h1>
    <div class="p-article__meta">
      <p class="p-article__date">
        {{ (new Date(post.fields.publishedAt)).toLocaleDateString() }}
      </p>
      <p v-if="post.fields.author" class="p-article__author">written by {{post.fields.author.fields.name}}</p>
      <p v-else class="p-article__author">written by Anonymous</p>
    </div>
    <vue-markdown class="p-article__body">{{post.fields.body}}</vue-markdown>
    <p class="p-article__back-to-index">
      <nuxt-link to="/">＜ 記事一覧へもどる</nuxt-link>
    </p>
  </article>
</template>

<script>
const pkg = require('~/package')
import VueMarkdown from 'vue-markdown'
import { createClient } from '~/plugins/contentful.js'

const client = createClient()
export default {
  head() {
    return {
      title: `${this.post.fields.title} | ${pkg.name}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.fields.description
        }
      ]
    }
  },
  components: {
    VueMarkdown
  },
  async asyncData({ env, params }) {
    return await client.getEntries({
      'content_type': env.CTF_BLOG_POST_TYPE_ID,
      'fields.slug': params.slug,
      order: '-sys.createdAt'
    }).then(entries => {
      return {
        post: entries.items[0]
      }
    })
      .catch(console.error)
  }
}
</script>

<style lang="scss">
.p-article {
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 4rem;

  &__ttl {
  }

  &__meta {
    display: flex;
    align-items: center;

    > * ~ * {
      margin-left: 1em;
    }
  }

  &__date,
  &__author {
    color: $font-color-light;
  }

  &__body {
    margin-top: 3rem;

    p {
      margin-top: 1.5em;
    }
  }

  &__back-to-index {
    margin-top: 4rem;
  }
}
</style>
