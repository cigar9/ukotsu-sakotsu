<template>
  <article class="p-article">
    <h1 class="p-article__ttl">{{ post.fields.title }}</h1>
    <div class="p-article__meta">
      <p class="p-article__date">
        {{ (new Date(post.fields.publishedAt)).toLocaleDateString() }}
      </p>
      <p v-if="post.fields.author" class="p-article__author">written by {{post.fields.author.fields.name}}</p>
      <p v-else class="p-article__author">written by Anonymous</p>
    </div>
    <vue-markdown class="p-article__body">{{post.fields.body}}</vue-markdown>
  </article>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { createClient } from '~/plugins/contentful.js'

const client = createClient()
export default {
  head() {
    return {
      title: this.post.fields.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: ''
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
        post: entries.items[0],
      }
    })
      .catch(console.error)
  }
}
</script>

<style lang="scss" scoped>
.p-article {
  max-width: 800px;
  margin: 0 auto;

  &__ttl {
    @include font-size(2.6);
    font-weight: bold;
    font-family: "Sawarabi Mincho", serif;
    letter-spacing: 0.1em;
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
    margin-top: 2rem;
  }
}
</style>
